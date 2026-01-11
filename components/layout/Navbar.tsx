"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Mail, Menu, X, FolderOpen, Send, Tag } from "lucide-react";

const navItems = [
  { id: "products", label: "ขายผลิตภัณฑ์ของเรา", icon: FolderOpen },
  { id: "about", label: "ข้อมูลเพิ่มเติม", icon: Send },
];

const storeInfo = {
  github: "https://github.com/codestore",
  email: "support@codestore.dev",
};

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [activeSection, setActiveSection] = useState("home");

  // GSAP animation for mobile menu
  const animateMobileMenu = useCallback((open: boolean) => {
    if (!mobileMenuRef.current) return;

    if (open) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          opacity: 0,
          y: -20,
          clipPath: "inset(0 0 100% 0)"
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.4,
          ease: "power3.out"
        }
      );
      // Stagger animate menu items
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".menu-item"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.25,
        ease: "power2.in"
      });
    }
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        menuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Animate menu when state changes
  useEffect(() => {
    animateMobileMenu(isMobileMenuOpen);
  }, [isMobileMenuOpen, animateMobileMenu]);

  useEffect(() => {

    // Scroll handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }

      lastScrollY.current = currentScrollY;

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-2" : "py-1 sm:py-5",
        // isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative flex items-center gap-2">
            <span className="font-mono text-lg font-bold">
              <span className="text-[#8b5cf6]">{"<"}</span>
              <span className="text-white group-hover:text-[#ec4899] transition-colors">Code</span>
              <span className="text-[#10b981]">Store</span>
              <span className="text-[#8b5cf6]">{" />"}</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            const IconComponent = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors group flex items-center gap-2",
                  isActive ? "text-white" : "text-[#a1a1aa] hover:text-white"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IconComponent className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-[#ec4899]" : "text-[#52525b] group-hover:text-[#8b5cf6]"
                )} />
                <span className="relative z-10">{item.label}</span>
                <span
                  className={cn(
                    "absolute inset-0 rounded-lg bg-white/5 transition-opacity",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-1 left-4 right-4 h-px bg-linear-to-r from-[#ec4899] to-[#8b5cf6] transition-transform origin-left",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </a>
            );
          })}
        </div>

        {/* Desktop Social Links + Cart */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Links */}
          {/* <div className="flex items-center gap-2 pr-4">
            <a
              href={storeInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#52525b] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={`mailto:${storeInfo.email}`}
              className="p-2 text-[#52525b] hover:text-[#ec4899] hover:bg-[#ec4899]/10 rounded-lg transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div> */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-[#a1a1aa] hover:text-white transition-colors relative"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              className={cn(
                "w-6 h-6 absolute inset-0 transition-all duration-300",
                isMobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              className={cn(
                "w-6 h-6 absolute inset-0 transition-all duration-300",
                isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass border-t border-[#262626] overflow-hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {/* Navigation Links */}
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const IconComponent = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "menu-item px-4 py-3 rounded-lg transition-colors flex items-center gap-3",
                  isActive
                    ? "text-white bg-white/5"
                    : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
                )}
              >
                <IconComponent className={cn(
                  "w-5 h-5",
                  isActive ? "text-[#ec4899]" : "text-[#52525b]"
                )} />
                {item.label}
              </a>
            );
          })}

          {/* Divider */}
          <div className="menu-item my-2 h-px bg-[#262626]" />

          {/* Contact Info */}
          {/* <div className="menu-item px-4 py-2 flex flex-col gap-3">
            <span className="text-xs font-mono text-[#52525b] uppercase tracking-wider">Contact</span>
            <a
              href={`mailto:${storeInfo.email}`}
              className="flex items-center gap-3 text-[#a1a1aa] hover:text-[#ec4899] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-mono">{storeInfo.email}</span>
            </a>
          </div> */}

          {/* Social Links */}
          {/* <div className="menu-item px-4 py-2 flex items-center gap-3">
            <a
              href={storeInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#141414] border border-[#262626] text-[#a1a1aa] hover:text-white hover:border-[#333] transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm font-mono">GitHub</span>
            </a>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
