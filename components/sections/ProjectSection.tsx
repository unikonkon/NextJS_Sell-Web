"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { Project } from "@/data/personalProjects";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/ui/ProjectCard";
import { featuredProjects } from "@/data/personalProjects";

gsap.registerPlugin(ScrollTrigger);

// Extract unique types from projects
const projectTypes = ["ALL", ...Array.from(new Set(featuredProjects.map(p => p.type)))] as const;
type ProjectType = typeof projectTypes[number];

// Type color mapping for filter buttons and timeline dots
const typeColors: Record<string, { active: string; text: string; border: string; glow: string; hex: string; rgba: string }> = {
  "ALL": { active: "bg-[#ec4899]", text: "text-[#ec4899]", border: "border-[#ec4899]/30", glow: "rgba(236,72,153,0.4)", hex: "#ec4899", rgba: "rgba(236,72,153,0.5)" },
  "WEB APP": { active: "bg-[#3b82f6]", text: "text-[#3b82f6]", border: "border-[#3b82f6]/30", glow: "rgba(59,130,246,0.4)", hex: "#3b82f6", rgba: "rgba(59,130,246,0.5)" },
  "MOBILE APP": { active: "bg-[#10b981]", text: "text-[#10b981]", border: "border-[#10b981]/30", glow: "rgba(16,185,129,0.4)", hex: "#10b981", rgba: "rgba(16,185,129,0.5)" },
  "DESIGN": { active: "bg-[#f97316]", text: "text-[#f97316]", border: "border-[#f97316]/30", glow: "rgba(249,115,22,0.4)", hex: "#f97316", rgba: "rgba(249,115,22,0.5)" },
  "FULL STACK": { active: "bg-[#8b5cf6]", text: "text-[#8b5cf6]", border: "border-[#8b5cf6]/30", glow: "rgba(139,92,246,0.4)", hex: "#8b5cf6", rgba: "rgba(139,92,246,0.5)" },
  "AI APP": { active: "bg-[#06b6d4]", text: "text-[#06b6d4]", border: "border-[#06b6d4]/30", glow: "rgba(6,182,212,0.4)", hex: "#06b6d4", rgba: "rgba(6,182,212,0.5)" },
  "TOOL": { active: "bg-[#eab308]", text: "text-[#eab308]", border: "border-[#eab308]/30", glow: "rgba(234,179,8,0.4)", hex: "#eab308", rgba: "rgba(234,179,8,0.5)" },
  "PORTFOLIO": { active: "bg-[#6366f1]", text: "text-[#6366f1]", border: "border-[#6366f1]/30", glow: "rgba(99,102,241,0.4)", hex: "#6366f1", rgba: "rgba(99,102,241,0.5)" },
  "API": { active: "bg-[#ef4444]", text: "text-[#ef4444]", border: "border-[#ef4444]/30", glow: "rgba(239,68,68,0.4)", hex: "#ef4444", rgba: "rgba(239,68,68,0.5)" },
  "AI APP & FULL STACK": { active: "bg-[#8b5cf6]", text: "text-[#8b5cf6]", border: "border-[#8b5cf6]/30", glow: "rgba(139,92,246,0.4)", hex: "#8b5cf6", rgba: "rgba(139,92,246,0.5)" },
};

// Get dot color based on project type
const getDotColor = (projectType: string) => {
  return typeColors[projectType] || typeColors["ALL"];
};

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollCtxRef = useRef<gsap.Context | null>(null);

  const [activeFilter, setActiveFilter] = useState<ProjectType>("ALL");
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects);
  const [galleryModal, setGalleryModal] = useState<{ isOpen: boolean; project: Project | null }>({
    isOpen: false,
    project: null
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Setup scroll-based animations for timeline and dots
  const setupScrollAnimations = useCallback(() => {
    // Clean up previous scroll context
    if (scrollCtxRef.current) {
      scrollCtxRef.current.revert();
    }

    if (!gridRef.current || !timelineLineRef.current) return;

    scrollCtxRef.current = gsap.context(() => {
      // Timeline line draw animation - same as ExperienceSection
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      // Dots animation - each dot appears as scroll reaches it
      dotsRef.current.forEach((dot) => {
        if (!dot) return;

        // Initial state
        gsap.set(dot, { scale: 0, opacity: 0 });

        // Animate dot when scroll reaches it
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top center+=150",
            end: "top center",
            scrub: 0.3,
            toggleActions: "play none none reverse",
          },
        });

        // Pulse animation - starts after dot is visible
        const pulseElement = dot.querySelector('.dot-pulse');
        if (pulseElement) {
          gsap.to(pulseElement, {
            scale: 2,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dot,
              start: "top center+=100",
              toggleActions: "play pause resume pause",
            },
          });
        }
      });

      // Cards animation - stagger based on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.3,
            },
          }
        );
      });
    }, gridRef);
  }, []);

  // Filter projects with animation
  const handleFilterChange = useCallback((type: ProjectType) => {
    // Kill existing scroll triggers before animating
    if (scrollCtxRef.current) {
      scrollCtxRef.current.revert();
      scrollCtxRef.current = null;
    }

    // Kill any existing timeline animations to prevent overlap
    if (timelineLineRef.current) {
      gsap.killTweensOf(timelineLineRef.current);
    }

    // Animate out current cards and timeline
    const currentCards = cardsRef.current.filter(Boolean);
    const currentDots = dotsRef.current.filter(Boolean);

    // Kill existing tweens on cards and dots
    currentCards.forEach(card => card && gsap.killTweensOf(card));
    currentDots.forEach(dot => {
      if (dot) {
        gsap.killTweensOf(dot);
        const pulse = dot.querySelector('.dot-pulse');
        if (pulse) gsap.killTweensOf(pulse);
      }
    });

    // Create a timeline for smooth sequential animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Update filter after out animation
        setActiveFilter(type);
        const newProjects = type === "ALL"
          ? featuredProjects
          : featuredProjects.filter(p => p.type === type);
        setFilteredProjects(newProjects);

        // Reset refs for new cards
        cardsRef.current = [];
        dotsRef.current = [];

        // Animate in new cards after state update
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const newCards = cardsRef.current.filter(Boolean);
            const newDots = dotsRef.current.filter(Boolean);

            // Create timeline for in animation
            const tlIn = gsap.timeline({
              onComplete: () => {
                // Re-setup scroll animations after filter change completes
                setTimeout(() => setupScrollAnimations(), 150);
              }
            });

            // Animate cards in
            tlIn.fromTo(newCards,
              { opacity: 0, y: 30, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.05,
                stagger: 0.06,
                ease: "power2.out",
              },
              0
            );

            // Animate dots in
            tlIn.fromTo(newDots,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.07,
                stagger: 0.06,
                ease: "back.out(1.5)",
              },
              0.1
            );

          });
        });
      }
    });

    // Animate timeline shrinking
    if (timelineLineRef.current) {
      tl.to(timelineLineRef.current, {
        scaleY: 0,
        duration: 0.25,
        ease: "power2.in",
      }, 0);
    }

    // Animate dots out
    tl.to(currentDots, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    }, 0);

    // Animate cards out
    tl.to(currentCards, {
      opacity: 0,
      y: 15,
      scale: 0.98,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    }, 0);

  }, [activeFilter, setupScrollAnimations]);

  // Open gallery modal
  const openGalleryModal = useCallback((project: Project) => {
    setGalleryModal({ isOpen: true, project });
    document.body.style.overflow = 'hidden';

    // Animate modal in
    requestAnimationFrame(() => {
      if (modalRef.current && modalContentRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(modalContentRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
        );
      }
    });
  }, []);

  // Close gallery modal
  const closeGalleryModal = useCallback(() => {
    if (modalRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in"
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => {
          setGalleryModal({ isOpen: false, project: null });
          document.body.style.overflow = '';
        }
      });
    } else {
      setGalleryModal({ isOpen: false, project: null });
      document.body.style.overflow = '';
    }
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && galleryModal.isOpen) {
        closeGalleryModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [galleryModal.isOpen, closeGalleryModal]);

  // Initial setup for header and filter animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Filter buttons animation
      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filterRef.current,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Setup scroll animations when filtered projects change
  useEffect(() => {
    // Delay to ensure DOM is updated
    const timer = setTimeout(() => {
      setupScrollAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollCtxRef.current) {
        scrollCtxRef.current.revert();
      }
    };
  }, [filteredProjects, setupScrollAnimations]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span
            className="h-px w-12 transition-colors duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${typeColors[activeFilter]?.hex || "#8b5cf6"})`,
            }}
          />
          <span
            className="font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-500"
            style={{ color: typeColors[activeFilter]?.hex || "#5ce2f6" }}
          >
            PERSONAL PROJECT
          </span>
          <span
            className="h-px w-12 transition-colors duration-500"
            style={{
              background: `linear-gradient(to left, transparent, ${typeColors[activeFilter]?.hex || "#8b5cf6"})`,
            }}
          />
        </div>

        {/* Title */}
        <h2 className="text-section">
          <span className="text-white">git status </span>
          <span className="gradient-text-pink italic">--short personal-project</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-[#a1a1aa] max-w-xl mx-auto">
          <span className="font-mono text-[#52525b]">{"// "}</span>
          A selection of projects that showcase my skills and passion for building digital products
        </p>

        {/* Filter Buttons */}
        <div
          ref={filterRef}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {/* Terminal command prefix */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a] font-mono text-xs">
            <span className="text-[#10b981]">$</span>
            <span className="text-[#52525b]">filter --type</span>
          </div>

          {/* Filter buttons */}
          {projectTypes.map((type) => {
            const colors = typeColors[type] || typeColors["ALL"];
            const isActive = activeFilter === type;
            const count = type === "ALL"
              ? featuredProjects.length
              : featuredProjects.filter(p => p.type === type).length;

            return (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`
                  relative px-3 py-1.5 font-mono text-xs rounded-lg border transition-all duration-300 cursor-pointer
                  ${isActive
                    ? `${colors.active} text-white border-transparent`
                    : `bg-[#0d0d0d] ${colors.text} ${colors.border} hover:bg-[#141414]`
                  }
                  group
                `}
                style={{
                  boxShadow: isActive ? `0 0 20px ${colors.glow}` : "none",
                }}
              >
                <span className="flex items-center gap-1.5">
                  {type === "ALL" && <span>*</span>}
                  {type}
                  <span className={`
                    px-1 py-0.5 text-[9px] rounded
                    ${isActive ? "bg-white/20" : "bg-[#1a1a1a]"}
                  `}>
                    {count}
                  </span>
                </span>

                {/* Active indicator line */}
                {isActive && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/50 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filter result text */}
        <div className="mt-4 font-mono text-xs text-[#52525b] flex items-center justify-center gap-2">
          <span className="text-[#10b981]">→</span>
          <span>
            Showing <span className={typeColors[activeFilter]?.text || "text-[#ec4899]"}>{filteredProjects.length}</span> projects
            {activeFilter !== "ALL" && (
              <span> matching <span className="text-[#a1a1aa]">&quot;{activeFilter}&quot;</span></span>
            )}
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={timelineContainerRef} className="max-w-7xl mx-auto relative">
        {/* Timeline (Desktop only) - Same structure as ExperienceSection */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          {/* Background line (gray) */}
          <div className="w-full h-full bg-[#1a1a1a]" />
          {/* Animated gradient line */}
          <div
            ref={timelineLineRef}
            className="absolute inset-0 w-full h-full origin-top transition-colors duration-500"
            style={{
              background: `linear-gradient(to bottom, ${typeColors[activeFilter]?.hex || "#ec4899"}, #8b5cf6, #06b6d4)`,
            }}
          />
        </div>

        {/* Project Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {filteredProjects.map((project, index) => {
            const dotColor = getDotColor(project.type);

            return (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative group ${index % 2 === 1 ? "lg:mt-[170px]" : ""}`}
              >
                {/* Timeline Dot (Desktop only) - with animation */}
                <div
                  ref={(el) => { dotsRef.current[index] = el; }}
                  className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 items-center justify-center ${index % 2 === 0 ? "-right-5" : "-left-5"
                    }`}
                >
                  {/* Pulse ring */}
                  <div
                    className="dot-pulse absolute w-4 h-4 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: dotColor.rgba }}
                  />
                  {/* Main dot */}
                  <div
                    className="relative w-4 h-4 rounded-full border-4 border-[#0a0a0a] transition-colors duration-300"
                    style={{
                      backgroundColor: dotColor.hex,
                      boxShadow: `0 0 20px ${dotColor.rgba}`,
                    }}
                  />
                  {/* Connector line */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-px w-6 transition-colors duration-300"
                    style={{
                      background: index % 2 === 0
                        ? `linear-gradient(to left, ${dotColor.hex}, transparent)`
                        : `linear-gradient(to right, transparent, ${dotColor.hex})`,
                    }}
                  />
                  {/* Type label on hover */}
                  <div
                    className={`absolute whitespace-nowrap px-2 py-0.5 rounded text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${index % 2 === 0 ? "right-full" : "left-full"
                      }`}
                    style={{
                      backgroundColor: `${dotColor.hex}20`,
                      color: dotColor.hex,
                      border: `1px solid ${dotColor.hex}30`,
                    }}
                  >
                    {project.type}
                  </div>
                </div>

                <ProjectCard
                  project={project}
                  index={index}
                  onOpenGallery={() => openGalleryModal(project)}
                />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="font-mono text-sm text-[#52525b]">
              <span className="text-[#ef4444]">ERROR:</span> No projects found matching filter
            </div>
            <button
              onClick={() => handleFilterChange("ALL")}
              className="mt-4 px-4 py-2 font-mono text-xs text-[#ec4899] border border-[#ec4899]/30 rounded-lg hover:bg-[#ec4899]/10 transition-colors"
            >
              Reset filter
            </button>
          </div>
        )}

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/unikonkon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#a1a1aa] hover:text-white transition-colors group"
          >
            <span>View all projects on GitHub</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative Line Numbers */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#262626] space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>{String(i + 100).padStart(3, "0")}</div>
        ))}
      </div>

      {/* Gallery Modal */}
      {galleryModal.isOpen && galleryModal.project && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-8 "
          onClick={closeGalleryModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-4xl my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between py-2 px-4 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm text-[#a1a1aa]">
                  {galleryModal.project.title}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono text-[#8b5cf6] bg-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30">
                  {galleryModal.project.slideImages?.length} images
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeGalleryModal}
                className="flex items-center justify-center w-8 h-8 text-[#52525b] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Gallery Images */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[82vh]">
              {galleryModal.project.slideImages?.map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative w-full rounded-lg overflow-hidden bg-[#0a0a0a] border border-[#1a1a1a] group/img"
                >
                  <div className="relative w-full aspect-video">
                    <Image
                      src={img}
                      alt={`${galleryModal.project!.title} - Screenshot ${imgIndex + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 900px"
                    />
                    {/* Overlay with image number */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg font-mono text-xs text-white/80">
                      {String(imgIndex + 1).padStart(2, '0')} / {String(galleryModal.project!.slideImages!.length).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
