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
    id: "job-matching-ai",
    index: "01",
    type: "AI APP & FULL STACK",
    title: "Job Matching AI",
    category: "AI Application",
    description: "แอปจับคู่งานด้วย AI สำหรับหางานที่ตรงใจ วิเคราะห์เรซูเม่และแนะนำงานที่เหมาะสม โดยใช้เทคโนโลยี RAG และ vector search อัจฉริยะ",
    price: 2499,
    originalPrice: 3499,
    image: "/project/JobMatching1.png",
    slideImages: [
      "/project/JobMatching1.png",
      "/project/JobMatching2.png",
      "/project/JobMatching3.png",
      "/project/JobMatching4.png",
      "/project/JobMatching5.png",
      "/project/JobMatching6.png",
      "/project/JobMatching7.png"
    ],
    technologies: ["Next.js 16", "TypeScript", "Google Gemini Pro 1.5", "RAG", "IndexedDB", "TailwindCSS", "Node.js", "ulixee", "huggingface/transformers"],
    features: ["AI Resume Analysis", "Job Matching Algorithm", "Vector Search", "Real-time Updates", "Responsive Design"],
    demoUrl: "https://jobmatchingai.vercel.app/",
    colorScheme: "indigo",
    featured: true,
    bestseller: true
  },
  {
    id: "crypto-news",
    index: "02",
    type: "AI APP & FULL STACK",
    title: "Crypto News Analysis",
    category: "AI Application",
    description: "แอกรวมข่าวคริปโตที่ขับเคลื่อนด้วย AI วิเคราะห์หัวข้อข่าวและคำนวณคะแนนเทรนด์อัตโนมัติด้วย Google Gemini API พร้อมอัปเดตรายงานแบบเรียลไทม์จาก RSS สื่อคริปโตชั้นนำ",
    price: 1999,
    originalPrice: 2799,
    image: "/project/CryptoNews3.png",
    slideImages: [
      "/project/CryptoNews1.png",
      "/project/CryptoNews2.png",
      "/project/CryptoNews3.png",
      "/project/CryptoNews4.png",
      "/project/CryptoNews5.png",
      "/project/CryptoNews6.png",
      "/project/CryptoNews7.png",
      "/project/CryptoNews8.png"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Google Gemini API", "TailwindCSS", "RSS Parser"],
    features: ["AI Sentiment Analysis", "Real-time News Feed", "Trending Score", "Supabase Integration", "Modern UI"],
    demoUrl: "https://crypto-news-aggregator-alpha.vercel.app/",
    colorScheme: "orange",
    featured: true
  },

];

export const featuredProjects = projects.filter(p => p.featured);
export const allProjects = projects;
export const bestsellerProjects = projects.filter(p => p.bestseller);
