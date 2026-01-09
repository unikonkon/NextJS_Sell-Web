import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeStore | Premium Web Templates & Source Code",
  description: "Discover premium web templates, source code, and complete project solutions. High-quality Next.js, React, and TypeScript projects ready to use. Save development time with our professionally crafted code.",
  keywords: [
    "Web Templates",
    "Source Code",
    "Next.js Templates",
    "React Templates",
    "TypeScript Projects",
    "Premium Code",
    "Website Templates",
    "Code Marketplace",
    "Web Development",
    "Buy Source Code",
    "Portfolio Templates",
    "Full Stack Projects",
  ],
  authors: [{ name: "CodeStore" }],
  creator: "CodeStore",
  openGraph: {
    title: "CodeStore | Premium Web Templates & Source Code",
    description: "Discover premium web templates, source code, and complete project solutions. High-quality Next.js, React, and TypeScript projects ready to use.",
    type: "website",
    locale: "en_US",
    url: "https://codestore.vercel.app",
    siteName: "CodeStore - Premium Code Marketplace",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeStore | Premium Web Templates & Source Code",
    description: "Discover premium web templates, source code, and complete project solutions. High-quality Next.js, React, and TypeScript projects ready to use.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#fafafa]`}
      >
        {children}
      </body>
    </html>
  );
}
