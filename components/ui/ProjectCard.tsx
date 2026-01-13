"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { Project, ColorScheme } from "@/data/personalProjects";

gsap.registerPlugin(ScrollTrigger);

const colorSchemeClasses: Record<ColorScheme, { gradient: string; glow: string; border: string }> = {
  pink: {
    gradient: "card-gradient-pink",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]",
    border: "hover:border-[#ec4899]/30",
  },
  purple: {
    gradient: "card-gradient-purple",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]",
    border: "hover:border-[#8b5cf6]/30",
  },
  cyan: {
    gradient: "card-gradient-cyan",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)]",
    border: "hover:border-[#06b6d4]/30",
  },
  orange: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)]",
    border: "hover:border-[#f97316]/30",
  },
  orangeLight: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(251,146,60,0.4)]",
    border: "hover:border-[#fb923c]/30",
  },
  green: {
    gradient: "card-gradient-green",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]",
    border: "hover:border-[#10b981]/30",
  },
  indigo: {
    gradient: "card-gradient-indigo",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]",
    border: "hover:border-[#6366f1]/30",
  },
  blue: {
    gradient: "card-gradient-cyan",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]",
    border: "hover:border-[#3b82f6]/30",
  },
  yellow: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.4)]",
    border: "hover:border-[#eab308]/30",
  },
  red: {
    gradient: "card-gradient-pink",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]",
    border: "hover:border-[#ef4444]/30",
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenGallery?: () => void;
}

export default function ProjectCard({ project, index, onOpenGallery }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const colorClasses = colorSchemeClasses[project.colorScheme] || colorSchemeClasses.purple;

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card fade in animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
          delay: index * 0.05,
        }
      );

      // Parallax effect on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden transition-all duration-500",
        colorClasses.glow,
        colorClasses.border,
        "hover:-translate-y-2"
      )}
    >
      {/* Header */}
      <div className="px-4 md:px-6 md:pt-4 pt-3 pb-0">
        <div className="flex justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Index Number */}
            <span className="line-number text-xl sm:text-2xl font-bold text-[#333]">
              {project.index}
            </span>
            {/* Type Badge */}
            <span className="terminal-badge sm:text-xs text-[6px] uppercase tracking-wider">
              {project.type}
            </span>
          </div>
          {/* Price Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex gap-2 items-center">
              <span className="text-xl sm:text-2xl font-bold text-white">
                ฿{project.price.toLocaleString()}
              </span>
              {project.originalPrice && (
                <>
                  <span className="text-base sm:text-lg text-[#52525b] line-through">
                    ฿{project.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 sm:px-2 py-0.5 rounded">
                    -{Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 md:px-6 pt-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white group-hover:gradient-text-purple transition-all duration-300">
          {project.title}
        </h3>
      </div>

      {/* Description Card */}
      <div className={cn("mx-4 md:mx-6 mt-3 sm:mt-4 p-2 sm:p-3 rounded-xl", colorClasses.gradient)}>
        <p className="text-xs sm:text-sm text-[#cacadb] leading-relaxed line-clamp-5">
          {project.description}
        </p>
      </div>

      {/* Image Preview */}
      <div ref={imageRef} className="relative h-40 sm:h-48 mt-3 sm:mt-4 mx-4 md:mx-6 rounded-lg overflow-hidden bg-[#0a0a0a]">
        {project.image === "notfoundBackend" ? (
          /* NestJS Backend Placeholder */
          <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] flex flex-col items-center justify-center p-4">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />

            {/* NestJS Logo */}
            <div className="relative z-10 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#e0234e]/10 border border-[#e0234e]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image src="/project/nestjs-svgrepo-com.svg" alt="NestJS" width={24} height={24} />
              </div>
            </div>

            {/* Code Snippet */}
            <div className="relative z-10 w-full max-w-[200px] bg-[#0d0d0d] border border-[#262626] rounded-lg p-3 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#1a1a1a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                <span className="text-[#52525b] text-[8px] ml-1">auth.controller.ts</span>
              </div>
              <div className="space-y-0.5">
                <div><span className="text-[#c586c0]">@Post</span><span className="text-[#dcdcaa]">(</span><span className="text-[#ce9178]">&apos;login&apos;</span><span className="text-[#dcdcaa]">)</span></div>
                <div><span className="text-[#569cd6]">async</span> <span className="text-[#dcdcaa]">login</span><span className="text-[#ffd700]">()</span> <span className="text-[#d4d4d4]">{"{"}</span></div>
                <div className="pl-2"><span className="text-[#c586c0]">return</span> <span className="text-[#9cdcfe]">jwt</span><span className="text-[#d4d4d4]">.</span><span className="text-[#dcdcaa]">sign</span><span className="text-[#d4d4d4]">();</span></div>
                <div><span className="text-[#d4d4d4]">{"}"}</span></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-[#e0234e]/10 border border-[#e0234e]/30 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#e0234e] rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-[#e0234e]">JWT</span>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full">
              <span className="text-[8px] font-mono text-[#10b981]">REST API</span>
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-full">
              <span className="text-[8px] font-mono text-[#8b5cf6]">TypeScript</span>
            </div>
          </div>
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent opacity-60" />

            {/* View Gallery Button - only show if slideImages exists */}
            {project.slideImages && project.slideImages.length > 0 && onOpenGallery && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery();
                }}
                className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-10 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono text-white bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-black/90 hover:border-white/40 transition-all duration-300 cursor-pointer group/btn"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Gallery</span>
                <span className="px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-[10px] bg-white/20 rounded">
                  {project.slideImages.length}
                </span>
              </button>
            )}
          </>
        )}
      </div>

      {/* Tech Stack */}
      <div className="p-4 md:p-6">
        <span className="text-[#cbcbdf] text-[14px]">เทคโนโลยีที่ใช้ในการสร้าง:</span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="terminal-badge text-[10px] sm:text-xs">
              <span className="text-[#8b5cf6]">{">"}</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="px-4 md:px-6 pb-4 sm:pb-6">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-primary text-xs sm:text-sm py-2 px-0 flex justify-center items-center h-9 sm:h-10"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
