# 🚀 คู่มือสร้าง Landing Page ด้วย Next.js 16

> แนวทางการสร้าง Landing Page ที่เร็ว, SEO ดี และติดอันดับ Google

---

## สารบัญ

1. [โครงสร้างโฟลเดอร์](#1-โครงสร้างโฟลเดอร์ที่แนะนำ)
2. [หลักการ Rendering](#2-หลักการ-rendering-ที่เหมาะกับ-landing-page)
3. [SEO Strategy](#3-seo-strategy)
4. [Performance Optimization](#4-performance-optimization)
5. [Landing Page Sections Architecture](#5-landing-page-sections-architecture)
6. [Caching Strategy](#6-caching-strategy-สำหรับ-landing-page)
7. [Analytics & Tracking](#7-analytics--tracking)
8. [Deployment Checklist](#8-deployment-checklist)
9. [สรุป Key Principles](#9-สรุป-key-principles)

---

## 1. โครงสร้างโฟลเดอร์ที่แนะนำ

```
app/
├── layout.tsx              ← Root layout + metadata หลัก
├── page.tsx                ← หน้า Landing Page หลัก
├── loading.tsx             ← Loading skeleton
├── sitemap.ts              ← Dynamic sitemap
├── robots.ts               ← Robots.txt
├── manifest.ts             ← PWA manifest
├── opengraph-image.tsx     ← OG Image แบบ dynamic
├── favicon.ico
│
├── (marketing)/            ← Route Group สำหรับหน้า marketing
│   ├── features/page.tsx
│   ├── pricing/page.tsx
│   └── contact/page.tsx
│
└── api/
    └── revalidate/route.ts ← สำหรับ On-demand revalidation

components/
├── sections/               ← แยก section ของ landing page
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   └── CTA.tsx
│
├── ui/                     ← UI components ที่ reuse ได้
└── common/                 ← Header, Footer, etc.

lib/
├── metadata.ts             ← Helper สร้าง metadata
└── structured-data.ts      ← JSON-LD schemas
```

---

## 2. หลักการ Rendering ที่เหมาะกับ Landing Page

### ✅ ใช้ Static Generation เป็นหลัก

| ส่วน | วิธีการ | เหตุผล |
|------|---------|--------|
| **Hero Section** | `'use cache'` + prerender | โหลดเร็วที่สุด |
| **Features** | Static (ไม่ต้อง cache) | Content ไม่เปลี่ยน |
| **Testimonials** | `'use cache'` + revalidate | อัปเดตได้เป็นระยะ |
| **Pricing** | `'use cache'` + cacheTag | Invalidate เมื่อราคาเปลี่ยน |
| **FAQ** | Static หรือ cache | Content ค่อนข้างคงที่ |
| **Contact Form** | Client Component | ต้อง interactive |

### ❌ หลีกเลี่ยง Dynamic Rendering

Landing page ควรหลีกเลี่ยงการใช้สิ่งเหล่านี้ใน Server Component โดยตรง:

- `cookies()`
- `headers()`
- `searchParams`

เพราะจะทำให้กลายเป็น dynamic route และช้าลง

---

## 3. SEO Strategy

### 3.1 Metadata ที่ต้องมี

| ประเภท | รายละเอียด |
|--------|------------|
| **Title** | ชื่อหลัก + Brand (50-60 ตัวอักษร) |
| **Description** | สรุปสั้นๆ มี keyword (150-160 ตัวอักษร) |
| **Open Graph** | title, description, image, url, type |
| **Twitter Card** | card type, title, description, image |
| **Canonical URL** | URL หลักของหน้า |
| **Alternate** | สำหรับ multi-language (ถ้ามี) |

### 3.2 Structured Data (JSON-LD) ที่ควรใส่

| Schema Type | ใช้สำหรับ |
|-------------|----------|
| **Organization** | ข้อมูลบริษัท, logo, social links |
| **WebSite** | ชื่อเว็บ, search action |
| **Product** | ถ้าขายสินค้า/บริการ |
| **FAQPage** | ส่วน FAQ (แสดงใน Google Search) |
| **BreadcrumbList** | Navigation path |
| **LocalBusiness** | ถ้ามีหน้าร้าน/สำนักงาน |

### 3.3 Technical SEO Checklist

- [ ] `sitemap.xml` แบบ dynamic
- [ ] `robots.txt` กำหนด allow/disallow
- [ ] Canonical URL ทุกหน้า
- [ ] Mobile-friendly (Responsive)
- [ ] HTTPS
- [ ] ไม่มี duplicate content
- [ ] Heading hierarchy ถูกต้อง (H1 → H2 → H3)
- [ ] Alt text สำหรับรูปภาพทุกรูป
- [ ] Internal linking ระหว่างหน้า

### 3.4 Heading Structure ที่ถูกต้อง

```
H1: หัวข้อหลักของหน้า (มีแค่ 1 อัน)
├── H2: Features
│   ├── H3: Feature 1
│   ├── H3: Feature 2
│   └── H3: Feature 3
├── H2: Pricing
│   ├── H3: Basic Plan
│   ├── H3: Pro Plan
│   └── H3: Enterprise Plan
├── H2: FAQ
│   ├── H3: Question 1
│   └── H3: Question 2
└── H2: Contact Us
```

---

## 4. Performance Optimization

### 4.1 Core Web Vitals เป้าหมาย

| Metric | เป้าหมาย | วิธีทำ |
|--------|----------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Preload hero image, ใช้ priority |
| **INP** (Interaction to Next Paint) | < 200ms | ลด JavaScript, ใช้ Server Components |
| **CLS** (Cumulative Layout Shift) | < 0.1 | กำหนด width/height รูป, font-display |

### 4.2 Image Strategy

| เทคนิค | รายละเอียด |
|--------|------------|
| **Next/Image** | ใช้เสมอ ไม่ใช้ `<img>` ตรงๆ |
| **Priority** | ใส่ให้ hero image และ above-the-fold |
| **Lazy Loading** | รูปด้านล่างใช้ lazy (default) |
| **Format** | ให้ Next.js แปลงเป็น WebP/AVIF อัตโนมัติ |
| **Sizes** | กำหนด responsive sizes ที่ถูกต้อง |
| **Placeholder** | ใช้ blur placeholder ลด CLS |

### 4.3 Font Strategy

| เทคนิค | รายละเอียด |
|--------|------------|
| **next/font** | ใช้ built-in font optimization |
| **font-display** | swap หรือ optional |
| **Subset** | โหลดเฉพาะ latin หรือ thai ที่ใช้ |
| **Preload** | font หลักควร preload |

### 4.4 JavaScript Strategy

| หลักการ | รายละเอียด |
|---------|------------|
| **Server Components First** | ใช้เป็นหลัก ลด JS bundle |
| **Client Components** | ใช้เฉพาะส่วนที่ต้อง interactive |
| **Dynamic Import** | โหลด component หนักๆ แบบ lazy |
| **Third-party Scripts** | ใช้ `next/script` กับ strategy ที่เหมาะสม |

---

## 5. Landing Page Sections Architecture

### การแบ่ง Component Type

```
┌─────────────────────────────────────────────────┐
│  Header (Server Component)                      │
│  - Static navigation                            │
│  - 'use cache' ถ้าดึงข้อมูลจาก CMS              │
├─────────────────────────────────────────────────┤
│  Hero Section (Server Component)                │
│  - Static content                               │
│  - Priority image loading                       │
│  - CTA Button (อาจเป็น Client ถ้ามี tracking)   │
├─────────────────────────────────────────────────┤
│  Features (Server Component)                    │
│  - Static หรือ 'use cache'                      │
│  - Icon + text content                          │
├─────────────────────────────────────────────────┤
│  Testimonials (Server Component)                │
│  - 'use cache' + revalidate                     │
│  - Carousel → Client Component wrapper          │
├─────────────────────────────────────────────────┤
│  Pricing (Server Component)                     │
│  - 'use cache' + cacheTag('pricing')            │
│  - Toggle monthly/yearly → Client Component     │
├─────────────────────────────────────────────────┤
│  FAQ (Server Component)                         │
│  - 'use cache'                                  │
│  - Accordion → Client Component                 │
│  - ใส่ FAQPage JSON-LD                          │
├─────────────────────────────────────────────────┤
│  CTA Section (Server Component)                 │
│  - Static content                               │
├─────────────────────────────────────────────────┤
│  Footer (Server Component)                      │
│  - Static navigation + contact info             │
│  - Organization JSON-LD                         │
└─────────────────────────────────────────────────┘
```

### Component Type Decision Tree

```
คำถาม: Component นี้ต้อง...

1. ใช้ useState, useEffect, onClick?
   → ใช้ Client Component ('use client')

2. ดึงข้อมูลจาก API/Database?
   → ใช้ Server Component + 'use cache'

3. แสดง static content?
   → ใช้ Server Component (default)

4. ต้องการ cookies/headers?
   → อ่านค่านอก cache แล้ว pass เข้าไป
```

---

## 6. Caching Strategy สำหรับ Landing Page

### 6.1 เปิดใช้งาน Cache Components

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

### 6.2 แนะนำ cacheLife Profiles

| Profile | stale | revalidate | expire | ใช้กับ |
|---------|-------|------------|--------|--------|
| **static** | 1 ปี | 1 วัน | 1 ปี | Content ที่ไม่ค่อยเปลี่ยน |
| **dynamic** | 5 นาที | 1 นาที | 1 ชม. | Testimonials, Stats |
| **pricing** | 1 ชม. | 15 นาที | 1 วัน | Pricing tables |

### 6.3 Custom Profiles ใน Config

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    static: {
      stale: 31536000,    // 1 ปี
      revalidate: 86400,  // 1 วัน
      expire: 31536000,   // 1 ปี
    },
    marketing: {
      stale: 3600,        // 1 ชม.
      revalidate: 900,    // 15 นาที
      expire: 86400,      // 1 วัน
    },
  },
}
```

### 6.4 Revalidation Strategy

| Trigger | วิธีการ |
|---------|---------|
| **Time-based** | ใช้ `cacheLife` กำหนด revalidate interval |
| **On-demand** | Webhook จาก CMS → เรียก `revalidateTag()` |
| **Manual** | Admin dashboard → trigger revalidate |

---

## 7. Analytics & Tracking

### 7.1 Third-party Scripts Loading Strategy

| Script | Strategy | เหตุผล |
|--------|----------|--------|
| **Google Analytics** | afterInteractive | ไม่บล็อก render |
| **GTM** | afterInteractive | รอ hydration ก่อน |
| **Facebook Pixel** | lazyOnload | ไม่จำเป็นต้องโหลดเร็ว |
| **Chat Widget** | lazyOnload | โหลดทีหลังได้ |
| **Hotjar/Clarity** | worker | รันใน web worker |

### 7.2 Script Strategies ใน Next.js

| Strategy | โหลดเมื่อ | ใช้กับ |
|----------|----------|--------|
| `beforeInteractive` | ก่อน hydration | Critical scripts เท่านั้น |
| `afterInteractive` | หลัง hydration | Analytics, Tag managers |
| `lazyOnload` | หลัง load เสร็จ | Chat, Social widgets |
| `worker` | ใน Web Worker | Heavy tracking scripts |

---

## 8. Deployment Checklist

### 8.1 Pre-launch Checklist

**Performance:**
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse SEO score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] ทดสอบ Core Web Vitals ผ่านเกณฑ์

**SEO:**
- [ ] Title และ Description ครบทุกหน้า
- [ ] Open Graph image ถูกต้อง
- [ ] sitemap.xml generate ถูกต้อง
- [ ] robots.txt ถูกต้อง
- [ ] Structured Data ผ่าน validation
- [ ] Canonical URL ถูกต้อง

**Technical:**
- [ ] HTTPS enabled
- [ ] Responsive ทุก breakpoint
- [ ] ทดสอบบน mobile จริง
- [ ] ไม่มี console errors
- [ ] 404 page มี design ดี
- [ ] Error boundaries ทำงานถูกต้อง

**Content:**
- [ ] Alt text ทุกรูปภาพ
- [ ] Heading hierarchy ถูกต้อง
- [ ] Links ทำงานถูกต้อง
- [ ] ไม่มี typo/grammar errors

### 8.2 Post-launch Checklist

**Google Search Console:**
- [ ] Submit sitemap
- [ ] Request indexing หน้าหลัก
- [ ] ตรวจสอบ coverage issues
- [ ] Monitor Core Web Vitals

**Analytics:**
- [ ] Google Analytics 4 ติดตั้งถูกต้อง
- [ ] Conversion tracking ทำงาน
- [ ] Goals/Events setup

**Monitoring:**
- [ ] Uptime monitoring
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring

---

## 9. สรุป Key Principles

| หลักการ | ทำไม |
|---------|------|
| **Static First** | เร็วที่สุด, ดีต่อ SEO |
| **`'use cache'` เมื่อจำเป็น** | Control caching ได้ละเอียด |
| **Server Components เป็นหลัก** | ลด JS bundle, เร็วขึ้น |
| **Client Components เฉพาะ interactive** | แยกส่วนที่ต้อง hydrate |
| **Structured Data ครบถ้วน** | Rich snippets ใน Google |
| **Image Optimization** | LCP และ CLS ดี |
| **Font Optimization** | ไม่มี FOUT/FOIT |
| **Script Loading Strategy** | ไม่บล็อก main thread |

---

## 10. เครื่องมือที่แนะนำ

### Testing Tools

| เครื่องมือ | ใช้ทำอะไร | Link |
|-----------|----------|------|
| **PageSpeed Insights** | Core Web Vitals | https://pagespeed.web.dev |
| **Google Rich Results Test** | Structured Data | https://search.google.com/test/rich-results |
| **Facebook Debugger** | OG Image | https://developers.facebook.com/tools/debug |
| **Twitter Card Validator** | Twitter Cards | https://cards-dev.twitter.com/validator |
| **Mobile-Friendly Test** | Mobile usability | https://search.google.com/test/mobile-friendly |

### Development Tools

| เครื่องมือ | ใช้ทำอะไร |
|-----------|----------|
| **Lighthouse CI** | Automated performance testing |
| **Bundle Analyzer** | วิเคราะห์ JS bundle size |
| **next/bundle-analyzer** | Next.js specific bundle analysis |

---

## 11. Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org)
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Google Search Console](https://search.google.com/search-console)

---

> 📝 **หมายเหตุ:** คู่มือนี้อิงจาก Next.js 16.1.1 และอาจมีการเปลี่ยนแปลงในเวอร์ชันใหม่

---

*สร้างโดย Claude | อัปเดตล่าสุด: มกราคม 2026*
