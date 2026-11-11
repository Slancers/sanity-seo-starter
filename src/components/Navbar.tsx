"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteLogo from "./SiteLogo";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/config/site";
import { solutions } from "@/data/solutions";
import { partners } from "@/data/partners";

/* ===== Icon helpers ===== */
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      marginLeft: 2,
    }}
  >
    <polyline points="3,4.5 6,7.5 9,4.5" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="19" y2="6" />
    <line x1="3" y1="11" x2="19" y2="11" />
    <line x1="3" y1="16" x2="19" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="5" y1="5" x2="17" y2="17" />
    <line x1="17" y1="5" x2="5" y2="17" />
  </svg>
);

/* ===== Dropdown icon wrapper ===== */
const DIcon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {children}
  </svg>
);

const IGrid = () => (
  <DIcon>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </DIcon>
);
const ILayers = () => (
  <DIcon>
    <polygon points="12,2 2,7 12,12 22,7" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
  </DIcon>
);
const IStar = () => (
  <DIcon>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </DIcon>
);

/* ===== Dropdown data ===== */
interface DropdownItem {
  name: string;
  desc: string;
  icon: React.ComponentType;
  href: string;
}

// Dropdown items are generated from src/data/solutions.ts and src/data/partners.ts
const solutionsItems: DropdownItem[] = [
  { name: "Overview", desc: "All services", icon: IGrid, href: "/solutions" },
  ...solutions.map((s) => ({ name: s.name, desc: s.tagline, icon: ILayers, href: `/solutions/${s.slug}` })),
];

const partnersItems: DropdownItem[] = [
  { name: "All Partners", desc: "Suppliers we trust", icon: IGrid, href: "/partners" },
  ...partners.map((p) => ({ name: p.name, desc: p.partnerLevel, icon: IStar, href: `/partners/${p.slug}` })),
];

/* ===== Dropdown component ===== */
function NavDropdown({
  label,
  items,
  wide,
  isOpen,
  onOpen,
  onClose,
}: {
  label: string;
  items: DropdownItem[];
  wide?: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    onOpen();
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div className="ui-dropdown-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className={`ui-nav-link ${isOpen ? "active" : ""}`}>
        {label} <Chevron open={isOpen} />
      </button>
      <div className={`ui-dropdown ${isOpen ? "open" : ""}`}>
        <div className={`ui-dropdown-panel ${wide ? "wide" : ""}`}>
          {items.map((item, i) => (
            <Link key={i} className="ui-dropdown-item" href={item.href}>
              <span className="ui-dropdown-item-icon">
                <item.icon />
              </span>
              <span className="ui-dropdown-item-text">
                <span className="ui-dropdown-item-name">{item.name}</span>
                <span className="ui-dropdown-item-desc">{item.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Main Navbar ===== */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`ui-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="ui-scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <div className="ui-nav-inner">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <SiteLogo />
          </Link>

          {/* Desktop Links */}
          <div className="ui-nav-links">
            <Link href="/" className={`ui-nav-link ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>

            <NavDropdown
              label="Services"
              items={solutionsItems}
              wide
              isOpen={openDropdown === "solutions"}
              onOpen={() => setOpenDropdown("solutions")}
              onClose={() => setOpenDropdown(null)}
            />

            <NavDropdown
              label="Partners"
              items={partnersItems}
              isOpen={openDropdown === "partners"}
              onOpen={() => setOpenDropdown("partners")}
              onClose={() => setOpenDropdown(null)}
            />

            <Link href="/industries" className={`ui-nav-link ${isActive("/industries") ? "active" : ""}`}>
              Industries
            </Link>
            <Link href="/case-studies" className={`ui-nav-link ${isActive("/case-studies") ? "active" : ""}`}>
              Case Studies
            </Link>
            <Link href="/plans" className={`ui-nav-link ${isActive("/plans") ? "active" : ""}`}>
              Care Plans
            </Link>
            <Link href="/blog" className={`ui-nav-link ${isActive("/blog") ? "active" : ""}`}>
              Blog
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="ui-nav-actions">
            {site.externalLink.href && (
              <a
                href={site.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-btn-store"
                onClick={() => trackEvent("external_link_click", { location: "navbar_desktop" })}
              >
                {site.externalLink.label}
              </a>
            )}
            <Link href={site.cta.href} className="ui-btn-consult" onClick={() => trackEvent("cta_click", { cta_location: "navbar_desktop", cta_text: site.cta.label })}>
              {site.cta.label}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="ui-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`ui-mobile-overlay ${mobileOpen ? "open" : ""}`}>
        <button
          className="ui-mobile-overlay-close"
          onClick={() => {
            setMobileOpen(false);
            setMobileSub(null);
          }}
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>

        <Link href="/" className="ui-mobile-nav-item" onClick={() => setMobileOpen(false)}>
          Home
        </Link>

        <div>
          <div
            className="ui-mobile-nav-item"
            onClick={() => setMobileSub(mobileSub === "solutions" ? null : "solutions")}
          >
            Services <Chevron open={mobileSub === "solutions"} />
          </div>
          <div className={`ui-mobile-sub ${mobileSub === "solutions" ? "open" : ""}`}>
            {solutionsItems.map((item, i) => (
              <Link key={i} href={item.href} className="ui-mobile-sub-item" onClick={() => setMobileOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div
            className="ui-mobile-nav-item"
            onClick={() => setMobileSub(mobileSub === "partners" ? null : "partners")}
          >
            Partners <Chevron open={mobileSub === "partners"} />
          </div>
          <div className={`ui-mobile-sub ${mobileSub === "partners" ? "open" : ""}`}>
            {partnersItems.map((item, i) => (
              <Link key={i} href={item.href} className="ui-mobile-sub-item" onClick={() => setMobileOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/industries" className="ui-mobile-nav-item" onClick={() => setMobileOpen(false)}>Industries</Link>
        <Link href="/case-studies" className="ui-mobile-nav-item" onClick={() => setMobileOpen(false)}>Case Studies</Link>
        <Link href="/plans" className="ui-mobile-nav-item" onClick={() => setMobileOpen(false)}>Care Plans</Link>
        <Link href="/blog" className="ui-mobile-nav-item" onClick={() => setMobileOpen(false)}>Blog</Link>

        <div className="ui-mobile-actions">
          {site.externalLink.href && (
            <a
              href={site.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn-store"
              onClick={() => trackEvent("external_link_click", { location: "navbar_mobile" })}
            >
              {site.externalLink.label}
            </a>
          )}
          <Link href={site.cta.href} className="ui-btn-consult" onClick={() => trackEvent("cta_click", { cta_location: "navbar_mobile", cta_text: site.cta.label })}>
            {site.cta.label}
          </Link>
        </div>
      </div>

      {/* Nav spacer */}
      <div className="ui-nav-spacer" />
    </>
  );
}
