# Scoprix Labs - Production Deployment Guide

## 🚀 Quick Start (Cursor + Vercel)

### 1. **Clone & Setup in Cursor**
```bash
# In Cursor terminal
git clone <your-repo>
cd scoprix-labs
npm install
```

### 2. **Environment Variables**
Create `.env.local`:
```bash
# Core App
NEXTAUTH_URL=https://scoprixlabs.com
NEXTAUTH_SECRET=your-nextauth-secret-key

# Database (if using)
DATABASE_URL=your-database-connection-string

# API Keys
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id

# Email (for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@scoprixlabs.com
SMTP_PASS=your-app-password

# Vercel-specific
VERCEL_URL=scoprixlabs.com
```

### 3. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod

# Or connect GitHub repo in Vercel dashboard
```

## 📁 **File Structure Created**
```
scoprix-labs/
├── src/
│   ├── app/
│   │   ├── globals.css                    ✅ Scoprix design system
│   │   ├── layout.tsx                     ✅ SEO optimized root layout
│   │   ├── page.tsx                       ✅ Homepage with schema markup
│   │   ├── hvac-change-order-automation/  ✅ Phase 1 landing page
│   │   ├── vendor-quote-validation/       📝 Phase 2 (create next)
│   │   └── los-angeles-hvac-contractors/  📝 Location page (create next)
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx                 ✅ Scoprix design system
│   │   ├── layout/
│   │   │   ├── header.tsx                 📝 Create navigation
│   │   │   └── footer.tsx                 📝 Create footer
│   │   └── sections/
│   │       ├── hero-section.tsx           ✅ Interactive hero
│   │       ├── features-section.tsx       📝 Create features
│   │       └── cta-section.tsx            📝 Create CTA
│   └── lib/
│       └── utils.ts                       ✅ Utilities + construction helpers
├── public/
│   ├── images/                            📝 Add hero images, screenshots
│   ├── icons/                             📝 Add favicons, logos
│   ├── manifest.json                      📝 Create PWA manifest
│   └── robots.txt                         🚀 Auto-generated
├── tailwind.config.js                     ✅ Scoprix design tokens
├── next.config.js                         ✅ Production optimized
├── next-sitemap.config.js                 ✅ SEO sitemap config
└── package.json                           ✅ All dependencies
```

## 🎯 **Next Development Steps**

### **Immediate (Week 1)**
1. **Create Missing Components** in Cursor:
   ```bash
   # Create these files:
   src/components/layout/header.tsx
   src/components/layout/footer.tsx
   src/components/sections/features-section.tsx
   src/components/sections/process-section.tsx
   src/components/sections/testimonials-section.tsx
   src/components/sections/cta-section.tsx
   ```

2. **Add Images to Public Folder**:
   ```
   public/images/
   ├── hero-construction.webp              # Hero background
   ├── scoprix-dashboard.jpg               # Dashboard screenshot
   ├── og-scoprix-dashboard.jpg            # Open Graph image
   ├── twitter-scoprix-card.jpg            # Twitter card
   └── og-hvac-automation.jpg              # HVAC page OG image
   ```

3. **Create Additional Landing Pages**:
   ```bash
   # Priority pages for SEO
   src/app/vendor-quote-validation/page.tsx
   src/app/los-angeles-hvac-contractors/page.tsx
   src/app/construction-document-analysis/page.tsx
   ```

### **SEO Implementation (Week 2)**
4. **Analytics Setup**:
   ```typescript
   // src/components/analytics.tsx
   'use client'
   import Script from 'next/script'
   
   export function Analytics() {
     return (
       <>
         <Script
           src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
         />
         <Script id="google-analytics">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
           `}
         </Script>
       </>
     )
   }
   ```

5. **Create LLMs.txt**:
   ```
   public/llms.txt
   # Scoprix Labs AI Knowledge Base
   # [Copy content from SEO strategy artifact]
   ```

### **Advanced Features (Week 3-4)**
6. **PDF.js Integration**:
   ```bash
   npm install pdfjs-dist
   ```

7. **API Routes for Forms**:
   ```typescript
   // src/app/api/contact/route.ts
   // src/app/api/demo-request/route.ts
   ```

8. **Database Integration** (if needed):
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

## 🔧 **Performance Optimizations**

### **Image Optimization**
```typescript
// Use Next.js Image component everywhere
import Image from 'next/image'

<Image
  src="/images/scoprix-dashboard.jpg"
  alt="Scoprix HVAC change order automation dashboard"
  width={1200}
  height={675}
  priority={true} // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### **Font Optimization**
```typescript
// Already implemented in layout.tsx with:
// - font-display: swap
// - Preload critical fonts
// - Variable font support
```

### **Bundle Analysis**
```bash
# Check bundle size
npm run build:analyze

# Optimize if needed
```

## 📊 **SEO Verification Checklist**

### **Technical SEO** ✅
- [x] Meta tags optimized for construction keywords
- [x] Schema markup for SoftwareApplication
- [x] Open Graph and Twitter cards
- [x] Canonical URLs
- [x] Sitemap generation
- [x] Robots.txt optimization
- [x] Mobile-first responsive design

### **Content SEO** 📝
- [ ] Service-specific landing pages
- [ ] Location-specific content
- [ ] Blog content strategy
- [ ] Internal linking structure
- [ ] Image alt tags
- [ ] Header hierarchy (H1, H2, H3)

### **Performance** ✅
- [x] Core Web Vitals optimization
- [x] Image optimization
- [x] Font loading strategy
- [x] JavaScript code splitting
- [x] CSS optimization
- [x] Compression enabled

## 🚨 **Production Checklist**

### **Before Going Live**
- [ ] Test all forms and CTAs
- [ ] Verify Google Analytics tracking
- [ ] Check mobile responsiveness
- [ ] Test page load speeds
- [ ] Validate HTML/CSS
- [ ] Check accessibility (WCAG 2.1 AA)
- [ ] Verify SSL certificate
- [ ] Test contact forms
- [ ] Check 404 page
- [ ] Verify sitemap submission

### **Post-Launch**
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics goals
- [ ] Monitor Core Web Vitals
- [ ] Check for crawl errors
- [ ] Monitor conversion rates
- [ ] A/B test CTAs
- [ ] Track keyword rankings

## 🤖 **AI Integration Roadmap**

### **Phase 1: Static Site** (Current)
- Landing pages with conversion optimization
- Contact forms and lead generation
- SEO-optimized content

### **Phase 2: Interactive Demo**
- File upload simulation
- PDF.js document processing demo
- Interactive change detection showcase

### **Phase 3: Full MVP**
- User authentication
- Real PDF processing
- COR generation
- Database integration

## 📞 **Support & Maintenance**

### **Monitoring**
- Vercel Analytics (built-in)
- Google Search Console
- PageSpeed Insights
- Uptime monitoring

### **Updates**
```bash
# Regular updates
npm update
npm audit fix

# Next.js updates
npm install next@latest

# Dependency security
npm audit
```

This deployment guide ensures your Scoprix Labs website launches with enterprise-grade SEO, performance, and conversion optimization from day one! 🚀