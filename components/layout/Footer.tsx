"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/codestore",
    username: "codestore",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/codestore",
    username: "codestore",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:support@codestore.dev",
    username: "support@codestore.dev",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#work" },
  { name: "Categories", href: "#categories" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const categories = [
  { name: "AI Applications", href: "#ai-apps" },
  { name: "Web Apps", href: "#web-apps" },
  { name: "Portfolio Templates", href: "#portfolios" },
  { name: "Backend APIs", href: "#apis" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative border-t border-[#262626] bg-[#0a0a0a]"
    >
      {/* Contact Section */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-[#10b981]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#10b981]">
              CONTACT US
            </span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-[#10b981]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="font-mono text-[#ec4899]">GET</span>{" "}
            <span className="text-[#52525b]">/api/</span>
            <span className="gradient-text-cyan">support</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-lg mx-auto">
            Need help with your purchase? Have questions about our products? We&apos;re here to help!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <a
            href="mailto:support@codestore.dev"
            className="group p-6 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#ec4899]/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#ec4899]/10 flex items-center justify-center text-[#ec4899] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="block font-mono text-xs text-[#52525b]">support</span>
                <span className="text-white group-hover:text-[#ec4899] transition-colors">support@codestore.dev</span>
              </div>
            </div>
          </a>

          {/* Sales Card */}
          <a
            href="mailto:sales@codestore.dev"
            className="group p-6 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#8b5cf6]/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 6H3m4 7v6a1 1 0 001 1h1a1 1 0 001-1v-6m5 0v6a1 1 0 001 1h1a1 1 0 001-1v-6" />
                </svg>
              </div>
              <div>
                <span className="block font-mono text-xs text-[#52525b]">sales</span>
                <span className="text-white group-hover:text-[#8b5cf6] transition-colors">sales@codestore.dev</span>
              </div>
            </div>
          </a>

          {/* Response Time Card */}
          <div className="group p-6 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#06b6d4]/30 transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center text-[#06b6d4] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="block font-mono text-xs text-[#52525b]">response time</span>
                <span className="text-white group-hover:text-[#06b6d4] transition-colors">Within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-sm text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-[#52525b] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-mono text-sm text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-[#52525b] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-mono text-sm text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="font-mono text-xs text-[#52525b] hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#docs" className="font-mono text-xs text-[#52525b] hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#refund" className="font-mono text-xs text-[#52525b] hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#license" className="font-mono text-xs text-[#52525b] hover:text-white transition-colors">License</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-mono text-sm text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#terms" className="font-mono text-xs text-[#52525b] hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="font-mono text-xs text-[#52525b] hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#cookie" className="font-mono text-xs text-[#52525b] hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#8b5cf6]/30 transition-all duration-300 hover:-translate-y-1"
              aria-label={link.name}
            >
              <div className="text-[#52525b] group-hover:text-[#8b5cf6] transition-colors">
                {link.icon}
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-[#262626] to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-mono text-sm text-[#52525b]">
            <span className="text-[#10b981]">{"// "}</span>
            &copy; 2025 CodeStore. All rights reserved.
          </div>

          {/* Payment Methods */}
          {/* <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#52525b]">Secure payments:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#141414] border border-[#262626] rounded text-xs text-[#a1a1aa]">Visa</span>
              <span className="px-2 py-1 bg-[#141414] border border-[#262626] rounded text-xs text-[#a1a1aa]">Mastercard</span>
              <span className="px-2 py-1 bg-[#141414] border border-[#262626] rounded text-xs text-[#a1a1aa]">PayPal</span>
            </div>
          </div> */}

          {/* Code Style Message */}
          <div className="font-mono text-xs text-[#52525b] hidden lg:block">
            <span className="text-[#8b5cf6]">const</span>{" "}
            <span className="text-[#ec4899]">quality</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-[#10b981]">&quot;Premium&quot;</span>
            <span className="text-white">;</span>
          </div>
        </div>

        {/* Built With */}
        <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex justify-center">
          <div className="font-mono text-xs text-[#333] flex items-center gap-2">
            <span>Built with</span>
            <span className="text-[#ec4899]">{"<"}</span>
            <span className="text-[#52525b]">Next.js</span>
            <span className="text-[#ec4899]">{"/>"}</span>
            <span>+</span>
            <span className="text-[#52525b]">TailwindCSS</span>
            <span>+</span>
            <span className="text-[#52525b]">GSAP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
