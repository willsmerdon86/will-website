"use client";

import { ArrowUp, Linkedin, Rss } from "lucide-react";

export default function Footer(): JSX.Element {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Will Smerdon</h3>
            <p className="text-neutral-400">
              Revenue Accounting & Order to Cash Leader
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/willsmerdon/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="/feed.xml"
              className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
              aria-label="RSS Feed"
              title="Subscribe to RSS Feed"
            >
              <Rss className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
              aria-label="Contact"
            >
              <span className="text-sm">Contact</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Will Smerdon. All rights reserved.</p>
          <p>Based in Seattle, WA</p>
        </div>
      </div>
    </footer>
  );
}
