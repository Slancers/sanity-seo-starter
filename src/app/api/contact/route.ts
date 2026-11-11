import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { projectId, dataset, apiVersion } from "@/sanity/env";

const writeClient = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, service, message } = body;

    if (!projectId || !process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Contact form is not configured yet. Run `npm run setup` to connect Sanity." },
        { status: 503 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const doc = {
      _type: "contactSubmission",
      name,
      email,
      phone: phone || "",
      company: company || "",
      service: service || "",
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    await writeClient.create(doc);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
