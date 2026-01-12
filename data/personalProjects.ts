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
    description: "เว็บไซต์พอร์ตโฟลิโอธีมอวกาศสร้างด้วย Next.js 16 มาพร้อมพื้นหลังดวงดาวเคลื่อนไหว, UI สไตล์ Terminal, เอฟเฟกต์ Glassmorphism รองรับหลายภาษา (ไทย/อังกฤษ) และ SEO ที่ครบครัน",
    price: 1000,
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

];

export const featuredProjects = projects.filter(p => p.featured);
export const allProjects = projects;
export const bestsellerProjects = projects.filter(p => p.bestseller);
