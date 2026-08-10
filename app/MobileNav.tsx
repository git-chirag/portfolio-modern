"use client";

import { useRef } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#proof", label: "Proof" },
  { href: "#contact", label: "Say hello ➤" },
] as const;

export function MobileNav() {
  const menuRef = useRef<HTMLDetailsElement | null>(null);

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <details className="mobile-nav" ref={menuRef}>
      <summary aria-label="Open navigation">Menu</summary>
      <nav aria-label="Mobile navigation">
        {links.map((link) => (
          <a href={link.href} key={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
