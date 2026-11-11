import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { MapPin, Mail, Clock } from "lucide-react";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";
import { site, fullAddress } from "@/config/site";

export const metadata = buildMetadata({
  title: `Contact ${site.name} — Book a Free Consultation`,
  description: `Planning an office, restaurant, clinic or store? Contact ${site.name} for a free consultation on interior design and fit-out.`,
  path: "/contact",
});

const contactInfo = [
  { icon: MapPin, label: "Studio", value: fullAddress, href: undefined },
  { icon: Mail, label: "Email", value: site.contact.salesEmail, href: `mailto:${site.contact.salesEmail}` },
  { icon: Clock, label: "Hours", value: site.contact.hoursText, href: undefined },
];

export default function ContactPage() {
  const jsonLd = localBusinessSchema;

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="ui-contact-hero">
        <div className="ui-contact-hero-inner">
          <p className="ui-contact-eyebrow">Get in Touch</p>
          <h1 className="ui-contact-headline">
            Let&rsquo;s Talk About Your Space
          </h1>
          <p className="ui-contact-sub">
            Whether you&rsquo;re moving offices, opening a restaurant or
            refreshing a clinic — tell us what you&rsquo;re planning and
            we&rsquo;ll help you shape it.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="ui-contact-body">
        <div className="ui-contact-body-inner">
          {/* Form Column */}
          <div className="ui-contact-form-col">
            <h2 className="ui-contact-form-title">
              Request a Free Consultation
            </h2>
            <p className="ui-contact-form-desc">
              Fill in the details below and our team will get back to you within
              one business day.
            </p>
            <ContactForm />
          </div>

          {/* Info Column */}
          <div className="ui-contact-info-col">
            <div className="ui-contact-info-card">
              <h3 className="ui-contact-info-heading">Contact Information</h3>
              <div className="ui-contact-info-list">
                {contactInfo.map((item) => (
                  <div key={item.label} className="ui-contact-info-item">
                    <span className="ui-contact-info-icon">
                      <item.icon size={20} strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="ui-contact-info-label">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="ui-contact-info-value link"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="ui-contact-info-value">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ui-contact-info-card">
              <h3 className="ui-contact-info-heading">Why Work With Us</h3>
              <ul className="ui-contact-why-list">
                <li>200+ spaces delivered since {site.foundingYear}</li>
                <li>Design and build under one roof</li>
                <li>Fixed budgets from complete drawings</li>
                <li>Care plans after handover</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
