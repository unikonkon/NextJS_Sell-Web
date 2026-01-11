"use client";

import GridBackground from "@/components/layout/GridBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <>
      {/* Background */}
      <GridBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">

        {/* Project Section */}
        <ProjectSection />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      {/* <Footer /> */}

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-[#262626] to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-mono text-sm text-[#52525b]">
            <span className="text-[#10b981]">{"// "}</span>
            &copy; 2025 CodeStore. All rights reserved.
          </div>

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
    </>
  );
}
