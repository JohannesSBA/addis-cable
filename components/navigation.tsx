"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow, Brand } from "./brand";
const links = [
  { label: "Our products", href: "/#products" },
  { label: "Our company", href: "/about" },
  { label: "Manufacturing", href: "/factory" },
  { label: "Resources", href: "/resources/product-catalog" },
  { label: "Verify product", href: "/authorized" },
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-enquiry" href="/contact">
          Let’s talk <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span className={open ? "is-open" : ""} />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {links.map((link, i) => (
          <a href={link.href} onClick={() => setOpen(false)} key={link.href}>
            <span>0{i + 1}</span>
            {link.label}
            <Arrow diagonal />
          </a>
        ))}
        <a href="/contact" onClick={() => setOpen(false)}>
          <span>06</span>Start a project
          <Arrow diagonal />
        </a>
      </nav>
    </header>
  );
}
