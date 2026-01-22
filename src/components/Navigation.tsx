"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const navItems: Array<{ label: string; href: string; isExternal?: boolean }> = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog", isExternal: true },
];

export default function Navigation({
  isMenuOpen,
  setIsMenuOpen,
}: NavigationProps): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-neutral-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            Will Smerdon
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.isExternal ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors link-underline"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors link-underline"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="#contact"
              className="text-sm px-4 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.isExternal ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg text-neutral-600 hover:text-neutral-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg text-neutral-600 hover:text-neutral-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <a
                href="#contact"
                className="text-lg text-neutral-600 hover:text-neutral-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
