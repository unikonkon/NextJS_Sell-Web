export type ColorScheme = 'orange' | 'orangeLight' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'indigo' | 'cyan' | 'pink';

export interface Project {
  id: string;
  index: string;
  type: "WEB APP" | "MOBILE APP" | "DESIGN" | "AI APP & FULL STACK" | "PORTFOLIO" | "API";
  title: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  slideImages?: string[];
  technologies: string[];
  features: string[];
  demoUrl?: string;
  colorScheme: ColorScheme;
  featured?: boolean;
  bestseller?: boolean;
}

export const projects: Project[] = [
  {
    id: "modern-programmer-space",
    index: "01",
    type: "PORTFOLIO",
    title: "Modern Programmer Space",
    category: "Portfolio Website",
    description: "เว็บไซต์พอร์ตโฟลิโอธีมอวกาศสร้างด้วย Next.js 16 มาพร้อมพื้นหลังดวงดาวเคลื่อนไหว, UI สไตล์ Terminal, เอฟเฟกต์ Glassmorphism รองรับหลายภาษา (ไทย/อังกฤษ) และ SEO ที่พร้อมใช้งานแก้ไขต่อ",
    price: 1100,
    originalPrice: 1499,
    image: "/project/sellweb-portfolio-01/01.png",
    slideImages: [
      "/project/sellweb-portfolio-01/01.png",
      "/project/sellweb-portfolio-01/02.png",
      "/project/sellweb-portfolio-01/03.png",
      "/project/sellweb-portfolio-01/04.png",
      "/project/sellweb-portfolio-01/05.png",
      "/project/sellweb-portfolio-01/06.png",
      "/project/sellweb-portfolio-01/07.png"
    ],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Node.js 18+", "Canvas Animation"],
    features: ["Animated Starfield Background", "Terminal-style UI", "Multi-language Support", "Glassmorphism Effects", "SEO Optimization", "Responsive Design"],
    demoUrl: "https://sellweb-portfolio-01.vercel.app/",
    colorScheme: "purple",
    featured: true
  },
  {
    id: "modern-minimalist-programmer",
    index: "02",
    type: "PORTFOLIO",
    title: "Modern Minimalist Programmer",
    category: "Portfolio Website",
    description: "เว็บไซต์พอร์ตโฟลิโอสไตล์มินิมอลและโมเดิร์น สร้างด้วย Next.js 16 มาพร้อมธีมมืดสไตล์ Code Editor, เอฟเฟกต์พิมพ์ข้อความแบบ Terminal, อนิเมชัน GSAP, รองรับหลายภาษา (ไทย/อังกฤษ), ไอคอน SVG แบบกำหนดเอง และ SEO ที่พร้อมใช้งานแก้ไขต่อ",
    price: 1100,
    originalPrice: 1499,
    image: "/project/sellweb-portfolio-02/01.png",
    slideImages: [
      "/project/sellweb-portfolio-02/01.png",
      "/project/sellweb-portfolio-02/02.png",
      "/project/sellweb-portfolio-02/03.png",
      "/project/sellweb-portfolio-02/04.png",
      "/project/sellweb-portfolio-02/05.png",
      "/project/sellweb-portfolio-02/06.png",
      "/project/sellweb-portfolio-02/07.png"
    ],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Node.js 18+"],
    features: [
      "Responsive Design (Mobile-first)",
      "Dark Theme (Code Editor Style)",
      "Multi-language Support (TH/EN)",
      "GSAP Animations",
      "Terminal Typing Effect",
      "Custom SVG Icons",
      "SEO Optimization",
      "Experience Timeline",
      "Skills Grid with Icons",
      "Contact Form"
    ],
    demoUrl: "https://sellweb-portfolio-02.vercel.app/",
    colorScheme: "cyan",
    featured: true,
    bestseller: true
  },
  {
    id: "modern-minimalist-programmer-smooth",
    index: "03",
    type: "PORTFOLIO",
    title: "Modern Minimalist Programmer Smooth",
    category: "Portfolio Website",
    description: "เว็บไซต์พอร์ตโฟลิโอสไตล์มินิมอลพร้อมอนิเมชันที่ลื่นไหล สร้างด้วย Next.js 16 มาพร้อมธีมมืดสไตล์ Code Editor, UI แบบ Terminal พร้อมเอฟเฟกต์ Mouse Follow, อนิเมชัน GSAP ที่นุ่มนวล, แสดงประวัติการทำงานแบบ Git Commit History, รองรับหลายภาษา (ไทย/อังกฤษ), และ SEO ที่พร้อมใช้งานแก้ไขต่อ",
    price: 1100,
    originalPrice: 1499,
    image: "/project/sellweb-portfolio-03/01.png",
    slideImages: [
      "/project/sellweb-portfolio-03/01.png",
      "/project/sellweb-portfolio-03/02.png",
      "/project/sellweb-portfolio-03/03.png",
      "/project/sellweb-portfolio-03/04.png",
      "/project/sellweb-portfolio-03/05.png",
      "/project/sellweb-portfolio-03/06.png",
      "/project/sellweb-portfolio-03/07.png"
    ],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Node.js 18+"],
    features: [
      "Smooth GSAP Animations",
      "Terminal-style UI with Mouse Follow Effect",
      "Git-style Commit History Display",
      "Dark Theme (Code Editor Style)",
      "Multi-language Support (TH/EN)",
      "Responsive Design (Mobile-first)",
      "Scroll-triggered Animations",
      "Experience Timeline with Git Commits",
      "Skills Grid with Version Display",
      "SEO Optimization",
      "Custom SVG Icons",
      "Contact Form"
    ],
    demoUrl: "https://sellweb-portfolio-03.vercel.app/",
    colorScheme: "indigo",
    featured: true,
    bestseller: true
  },

];

export const featuredProjects = projects.filter(p => p.featured);
export const allProjects = projects;
export const bestsellerProjects = projects.filter(p => p.bestseller);
