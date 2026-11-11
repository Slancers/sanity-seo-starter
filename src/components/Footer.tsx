"use client";

import { Linkedin, Instagram, Twitter } from "lucide-react";
import SiteLogo from "./SiteLogo";
import { trackEvent } from "@/lib/analytics";
import { site, fullAddress } from "@/config/site";
import { solutions } from "@/data/solutions";
import { partners } from "@/data/partners";

const company = [
  { name: "About", href: "/about" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Care Plans", href: "/plans" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.x, label: "X", Icon: Twitter },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="ui-footer">
      <div className="ui-footer-inner">
        <div className="ui-footer-cols">
          <div className="ui-footer-col ui-footer-brand">
            <SiteLogo />
            <p className="ui-footer-desc">{site.description}</p>
          </div>

          <div className="ui-footer-col">
            <h4 className="ui-footer-heading">Services</h4>
            <ul className="ui-footer-links">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <a href={`/solutions/${s.slug}`}>{s.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ui-footer-col">
            <h4 className="ui-footer-heading">Company</h4>
            <ul className="ui-footer-links">
              {company.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ui-footer-col">
            <h4 className="ui-footer-heading">Partners</h4>
            <ul className="ui-footer-links">
              {partners.map((p) => (
                <li key={p.slug}>
                  <a href={`/partners/${p.slug}`}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ui-footer-col">
            <h4 className="ui-footer-heading">Contact</h4>
            <ul className="ui-footer-links">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  onClick={() => trackEvent("email_click", { location: "footer" })}
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <span className="ui-footer-text">{fullAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ui-footer-divider" />

        <div className="ui-footer-bottom">
          <p className="ui-footer-copy">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <div className="ui-footer-social">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="ui-footer-social-link"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
