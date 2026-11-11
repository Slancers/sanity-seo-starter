"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { solutions } from "@/data/solutions";
import { site } from "@/config/site";

// Options come from your services list in src/data/solutions.ts
const serviceOptions = [...solutions.map((s) => s.name), "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      trackEvent("form_submission", {
        form_name: "contact",
        service: String(formData.get("service") || "not_selected"),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "error") {
    return (
      <div className="ui-contact-success">
        <div className="ui-contact-success-icon" style={{ color: "#ef4444" }}>!</div>
        <h3 className="ui-contact-success-title">Something Went Wrong</h3>
        <p className="ui-contact-success-text">
          We couldn&apos;t send your message. Please try again or reach us
          directly at {site.contact.email}.
        </p>
        <button
          className="ui-contact-reset-btn"
          onClick={() => setStatus("idle")}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className="ui-contact-success">
        <div className="ui-contact-success-icon">&#10003;</div>
        <h3 className="ui-contact-success-title">Message Sent</h3>
        <p className="ui-contact-success-text">
          Thank you for reaching out. Our team will review your requirements and
          get back to you within one business day.
        </p>
        <button
          className="ui-contact-reset-btn"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="ui-contact-form" onSubmit={handleSubmit}>
      <div className="ui-contact-row">
        <div className="ui-contact-field">
          <label htmlFor="contact-name" className="ui-contact-label">
            Full Name <span className="ui-required">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="ui-contact-input"
          />
        </div>
        <div className="ui-contact-field">
          <label htmlFor="contact-company" className="ui-contact-label">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            placeholder="Company name"
            className="ui-contact-input"
          />
        </div>
      </div>

      <div className="ui-contact-row">
        <div className="ui-contact-field">
          <label htmlFor="contact-email" className="ui-contact-label">
            Email <span className="ui-required">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="ui-contact-input"
          />
        </div>
        <div className="ui-contact-field">
          <label htmlFor="contact-phone" className="ui-contact-label">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="ui-contact-input"
          />
        </div>
      </div>

      <div className="ui-contact-field">
        <label htmlFor="contact-service" className="ui-contact-label">
          Service of Interest
        </label>
        <select
          id="contact-service"
          name="service"
          className="ui-contact-select"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </div>

      <div className="ui-contact-field">
        <label htmlFor="contact-message" className="ui-contact-label">
          Project Details <span className="ui-required">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project — scope, timeline, budget range, or any questions you have."
          className="ui-contact-textarea"
        />
      </div>

      <button
        type="submit"
        className="ui-contact-submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            Send Message <Send size={16} strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  );
}
