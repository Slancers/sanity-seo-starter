#!/usr/bin/env node
/**
 * Setup wizard — connects this site to Sanity and writes .env.local.
 *
 *   npm run setup                 interactive wizard
 *   npm run setup -- --help       all options (including non-interactive flags for CI / AI agents)
 *   npm run seed                  import the demo content only
 *   npm run seed -- --remove      delete the demo content
 *
 * Uses only Node built-ins and the Sanity CLI that ships with this project.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin, stdout, exit, argv, env, versions, platform } from "node:process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENV_FILE = join(ROOT, ".env.local");
const SANITY_BIN = join(ROOT, "node_modules", ".bin", platform === "win32" ? "sanity.cmd" : "sanity");

/* ─────────────── CLI flags ─────────────── */

const HELP = `
Sanity SEO Starter — setup wizard

Usage:
  npm run setup [-- options]
  npm run seed  [-- --remove]

Options:
  --project-id <id>      Use an existing Sanity project
  --project-name <name>  Create a new Sanity project with this name
  --dataset <name>       Dataset to use (default: production)
  --site-url <url>       Public site URL (default: http://localhost:3000)
  --ga-id <id>           Google Analytics 4 ID (optional)
  --seed / --no-seed     Import (or skip) the demo blog posts and case studies
  --no-token             Don't create a write token for the contact form
  --no-cors              Don't add CORS origins
  --yes, -y              Non-interactive: accept defaults, never prompt
  --seed-only            Only import the demo content (used by npm run seed)
  --remove               With --seed-only: delete the demo content instead
  --help, -h             Show this help

Examples:
  npm run setup
  npm run setup -- --yes --project-name "My Site" --site-url https://example.com
  npm run setup -- --yes --project-id abc123 --no-seed
`;

function parseArgs(args) {
  const opts = { seed: undefined, token: true, cors: true };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    const next = () => {
      const v = args[++i];
      if (v === undefined || v.startsWith("--")) fail(`Missing value for ${a}`);
      return v;
    };
    switch (a) {
      case "--project-id": opts.projectId = next(); break;
      case "--project-name": opts.projectName = next(); break;
      case "--dataset": opts.dataset = next(); break;
      case "--site-url": opts.siteUrl = next(); break;
      case "--ga-id": opts.gaId = next(); break;
      case "--seed": opts.seed = true; break;
      case "--no-seed": opts.seed = false; break;
      case "--no-token": opts.token = false; break;
      case "--no-cors": opts.cors = false; break;
      case "--yes": case "-y": opts.yes = true; break;
      case "--seed-only": opts.seedOnly = true; break;
      case "--remove": opts.remove = true; break;
      case "--help": case "-h": opts.help = true; break;
      default: fail(`Unknown option: ${a}\nRun "npm run setup -- --help" to see all options.`);
    }
  }
  if (opts.projectId && opts.projectName) fail("Use either --project-id or --project-name, not both.");
  return opts;
}

/* ─────────────── Output helpers ─────────────── */

const color = (code) => (s) => (stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const bold = color(1), dim = color(2), green = color(32), yellow = color(33), red = color(31), cyan = color(36);

const step = (n, total, title) => console.log(`\n${bold(cyan(`[${n}/${total}]`))} ${bold(title)}`);
const ok = (msg) => console.log(`  ${green("✓")} ${msg}`);
const warn = (msg) => console.log(`  ${yellow("!")} ${msg}`);
const info = (msg) => console.log(`  ${dim(msg)}`);
function fail(msg) {
  console.error(`\n${red("✗")} ${msg}\n`);
  exit(1);
}

/* ─────────────── Prompts ─────────────── */

let rl;
let nonInteractive = false;

async function ask(question, fallback = "") {
  if (nonInteractive) return fallback;
  rl ??= createInterface({ input: stdin, output: stdout });
  const suffix = fallback ? dim(` (${fallback})`) : "";
  const answer = (await rl.question(`  ${question}${suffix}: `)).trim();
  return answer || fallback;
}

async function confirm(question, fallback = true) {
  if (nonInteractive) return fallback;
  const answer = (await ask(`${question} ${dim(fallback ? "[Y/n]" : "[y/N]")}`)).toLowerCase();
  if (!answer) return fallback;
  return answer.startsWith("y");
}

/* ─────────────── .env.local ─────────────── */

function readEnvFile() {
  if (!existsSync(ENV_FILE)) return {};
  const values = {};
  for (const line of readFileSync(ENV_FILE, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) values[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return values;
}

/** Updates keys in .env.local, keeping any other lines (and comments) intact. */
function writeEnvFile(updates) {
  const lines = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, "utf8").split(/\r?\n/) : [];
  const remaining = { ...updates };
  const out = lines.map((line) => {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=/);
    if (m && m[1] in remaining) {
      const v = remaining[m[1]];
      delete remaining[m[1]];
      return `${m[1]}=${v}`;
    }
    return line;
  });
  while (out.length && out[out.length - 1] === "") out.pop();
  if (!lines.length) out.push("# Generated by `npm run setup`. Never commit this file.");
  for (const [k, v] of Object.entries(remaining)) out.push(`${k}=${v}`);
  writeFileSync(ENV_FILE, out.join("\n") + "\n", { mode: 0o600 });
}

/* ─────────────── Sanity CLI ─────────────── */

/** Runs the Sanity CLI. `interactive` hands the terminal to the CLI (for login). */
function sanity(args, { interactive = false, extraEnv = {} } = {}) {
  const res = spawnSync(SANITY_BIN, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: interactive ? "inherit" : ["ignore", "pipe", "pipe"],
    env: { ...env, ...extraEnv, FORCE_COLOR: "0", NO_COLOR: "1" },
    shell: platform === "win32",
  });
  if (res.error) fail(`Could not run the Sanity CLI: ${res.error.message}`);
  return { ok: res.status === 0, out: (res.stdout || "").trim(), err: (res.stderr || "").trim() };
}

function parseJson(text) {
  const start = text.search(/[[{]/);
  if (start === -1) return null;
  try {
    return JSON.parse(text.slice(start));
  } catch {
    return null;
  }
}

/** Finds the first value for any of `keys` anywhere in a JSON structure. */
function findValue(obj, keys) {
  if (!obj || typeof obj !== "object") return undefined;
  for (const k of keys) if (typeof obj[k] === "string" && obj[k]) return obj[k];
  for (const v of Object.values(obj)) {
    const found = findValue(v, keys);
    if (found) return found;
  }
  return undefined;
}

function listProjects() {
  const res = sanity(["projects", "list"]);
  if (!res.ok) return null;
  return res.out
    .split("\n")
    .slice(1)
    .map((line) => line.trim().split(/\s{2,}/))
    .filter((cols) => cols[0] && /^[a-z0-9]+$/.test(cols[0]))
    .map(([id, , name]) => ({ id, name: name || "" }));
}

async function ensureLoggedIn() {
  let projects = listProjects();
  if (projects) return projects;
  if (nonInteractive) fail('Not logged in to Sanity. Run "npx sanity login" first, then re-run setup.');
  info("You need a free Sanity account. A browser window will open so you can log in or sign up.");
  sanity(["login"], { interactive: true });
  projects = listProjects();
  if (!projects) fail('Still not logged in. Run "npx sanity login" manually, then re-run setup.');
  return projects;
}

/* ─────────────── Demo content ─────────────── */

async function importDemoContent({ projectId, dataset, token }) {
  const { demoDocuments } = await import("./demo-content.mjs");
  const dir = mkdtempSync(join(tmpdir(), "sanity-seed-"));
  const file = join(dir, "demo-content.ndjson");
  writeFileSync(file, demoDocuments.map((d) => JSON.stringify(d)).join("\n") + "\n");
  try {
    const args = ["datasets", "import", file, "--dataset", dataset, "--project-id", projectId, "--replace"];
    const res = sanity(args, { extraEnv: token ? { SANITY_IMPORT_TOKEN: token } : {} });
    if (!res.ok) {
      warn("Demo content import failed:");
      info(res.err || res.out);
      return false;
    }
    ok(`Imported ${demoDocuments.length} demo documents (3 blog posts, 2 case studies).`);
    return true;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

async function removeDemoContent({ projectId, dataset }) {
  const { demoIds } = await import("./demo-content.mjs");
  const res = sanity(["documents", "delete", ...demoIds, "--project-id", projectId, "--dataset", dataset]);
  if (!res.ok) fail(`Could not delete demo content:\n${res.err || res.out}`);
  ok(`Deleted ${demoIds.length} demo documents.`);
}

/* ─────────────── Main ─────────────── */

async function main() {
  const opts = parseArgs(argv.slice(2));
  if (opts.help) {
    console.log(HELP);
    return;
  }
  nonInteractive = Boolean(opts.yes) || !stdin.isTTY;

  const [major, minor] = versions.node.split(".").map(Number);
  if (major < 20 || (major === 20 && minor < 9)) fail(`Node.js 20.9 or newer is required (you have ${versions.node}).`);
  if (!existsSync(SANITY_BIN)) fail('Dependencies are not installed. Run "npm install" first.');

  const existing = readEnvFile();

  /* ── Seed-only mode (npm run seed) ── */
  if (opts.seedOnly) {
    const projectId = opts.projectId || existing.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = opts.dataset || existing.NEXT_PUBLIC_SANITY_DATASET || "production";
    if (!projectId) fail('No Sanity project configured. Run "npm run setup" first.');
    await ensureLoggedIn();
    console.log(`\n${bold(opts.remove ? "Removing" : "Importing")} demo content — project ${projectId}, dataset ${dataset}`);
    if (opts.remove) await removeDemoContent({ projectId, dataset });
    else await importDemoContent({ projectId, dataset, token: existing.SANITY_WRITE_TOKEN });
    return;
  }

  console.log(`\n${bold("Sanity SEO Starter — setup")}`);
  console.log(dim("Connects this site to Sanity and writes your settings to .env.local. Takes about 2 minutes."));
  if (nonInteractive) info("Running non-interactively: using flags and defaults.");

  const TOTAL = 6;

  /* 1. Site URL */
  step(1, TOTAL, "Site URL");
  info("Used for canonical URLs, the sitemap and social previews. Use your real domain in production.");
  const siteUrl = (opts.siteUrl || (await ask("Site URL", existing.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))).replace(/\/$/, "");
  if (!/^https?:\/\/[^\s]+$/.test(siteUrl)) fail(`"${siteUrl}" is not a valid URL (it should start with http:// or https://).`);
  writeEnvFile({ NEXT_PUBLIC_SITE_URL: siteUrl });
  ok(`Site URL: ${siteUrl}`);

  /* 2. Sanity account */
  step(2, TOTAL, "Sanity account");
  const projects = await ensureLoggedIn();
  ok("Logged in to Sanity.");

  /* 3. Project + dataset */
  step(3, TOTAL, "Sanity project");
  let projectId = opts.projectId;
  let createdProject = false;
  const dataset = opts.dataset || existing.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!projectId && !opts.projectName) {
    const current = existing.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (current && (await confirm(`Keep the project already in .env.local (${current})?`, true))) {
      projectId = current;
    } else if (!nonInteractive && projects.length && !(await confirm("Create a new Sanity project? (recommended)", true))) {
      info("Your projects:");
      projects.slice(0, 15).forEach((p) => info(`  ${p.id}  ${p.name}`));
      warn("Choose a project made for this site. Demo content and settings will be added to it.");
      projectId = await ask("Project ID");
      if (!projects.some((p) => p.id === projectId)) fail(`Project "${projectId}" was not found in your account.`);
    }
  }

  if (!projectId) {
    if (nonInteractive && !opts.projectName) {
      fail('Non-interactive mode needs to know which project to use.\nPass --project-name "My Site" to create one, or --project-id <id> to use an existing one.');
    }
    const name = opts.projectName || (await ask("Name for the new project", "My Website"));
    info(`Creating project "${name}" with a public "${dataset}" dataset…`);
    const res = sanity(["projects", "create", name, "--dataset", dataset, "--dataset-visibility", "public", "--yes", "--json"]);
    const created = parseJson(res.out);
    projectId = findValue(created, ["projectId", "id"]);
    if (!res.ok || !projectId) fail(`Could not create the project:\n${res.err || res.out}`);
    createdProject = true;
    ok(`Created project ${bold(name)} (${projectId}).`);
  } else {
    ok(`Using project ${projectId}.`);
    const list = sanity(["datasets", "list", "--project-id", projectId]);
    const hasDataset = list.ok && list.out.split(/\s+/).includes(dataset);
    if (!hasDataset) {
      const res = sanity(["datasets", "create", dataset, "--visibility", "public", "--project-id", projectId]);
      if (!res.ok) fail(`Could not create dataset "${dataset}":\n${res.err || res.out}`);
      ok(`Created public dataset "${dataset}".`);
    } else {
      ok(`Dataset "${dataset}" exists.`);
    }
  }
  writeEnvFile({ NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset });

  /* 4. CORS */
  step(4, TOTAL, "CORS origins");
  if (!opts.cors) {
    info("Skipped (--no-cors).");
  } else {
    info("Lets your site and the /studio editor talk to Sanity from the browser.");
    const origins = [...new Set(["http://localhost:3000", siteUrl])];
    for (const origin of origins) {
      const res = sanity(["cors", "add", origin, "--credentials", "--project-id", projectId]);
      const msg = `${res.err} ${res.out}`;
      if (res.ok) ok(`Allowed ${origin}`);
      else if (/already|exists|conflict|409/i.test(msg)) ok(`${origin} was already allowed`);
      else warn(`Could not add ${origin}: ${res.err || res.out}\n    Add it manually at https://www.sanity.io/manage/project/${projectId}/api`);
    }
  }

  /* 5. Write token for the contact form */
  step(5, TOTAL, "Contact form token");
  let token = existing.SANITY_WRITE_TOKEN;
  if (!opts.token) {
    info("Skipped (--no-token). The contact form stays disabled until SANITY_WRITE_TOKEN is set.");
  } else if (token && !createdProject && existing.NEXT_PUBLIC_SANITY_PROJECT_ID === projectId) {
    ok("A write token is already set in .env.local.");
  } else {
    info("Creates an Editor token so contact-form submissions are saved in Sanity. Stored only in .env.local.");
    const res = sanity(["tokens", "add", "Website contact form", "--role", "editor", "--yes", "--json", "--project-id", projectId]);
    token = findValue(parseJson(res.out), ["key", "token"]);
    if (!res.ok || !token) {
      warn(`Could not create a token: ${res.err || res.out}`);
      info(`Create one manually at https://www.sanity.io/manage/project/${projectId}/api (role: Editor) and set SANITY_WRITE_TOKEN in .env.local.`);
      token = undefined;
    } else {
      writeEnvFile({ SANITY_WRITE_TOKEN: token });
      ok("Token created and saved to .env.local.");
    }
  }

  /* 6. Demo content + analytics */
  step(6, TOTAL, "Demo content & analytics");
  const seed = opts.seed ?? (await confirm("Import demo blog posts and case studies? (easy to delete later)", createdProject));
  if (seed) await importDemoContent({ projectId, dataset, token });
  else info('Skipped. Run "npm run seed" any time to add the demo content.');

  const gaId = opts.gaId ?? (await ask("Google Analytics 4 ID (optional, press Enter to skip)", existing.NEXT_PUBLIC_GA_ID || ""));
  writeEnvFile({ NEXT_PUBLIC_GA_ID: gaId, NEXT_PUBLIC_SANITY_API_VERSION: existing.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01" });
  ok(gaId ? `Analytics enabled (${gaId}).` : "Analytics disabled (add NEXT_PUBLIC_GA_ID later to enable).");

  /* Done */
  console.log(`\n${green(bold("Setup complete!"))} Your settings are in .env.local.\n`);
  console.log(bold("Next steps"));
  console.log(`  1. ${cyan("npm run dev")}  and open ${siteUrl.startsWith("http://localhost") ? siteUrl : "http://localhost:3000"}`);
  console.log(`  2. Edit blog posts and case studies at ${cyan("/studio")}`);
  console.log(`  3. Make it yours: edit ${cyan("src/config/site.ts")} (see README → "Make it yours")`);
  console.log(`  4. Deploy: add the values from .env.local to your host's environment variables`);
  if (seed) console.log(dim(`\n  Remove the demo content later with: npm run seed -- --remove`));
  console.log("");
}

main()
  .catch((err) => fail(err?.message || String(err)))
  .finally(() => rl?.close());
