import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Analytics } from '@/components/analytics'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://scoprixlabs.com'),
  title: {
    default: 'Scoprix Labs - AI Construction Change Order Automation | HVAC COR Software',
    template: '%s | Scoprix Labs'
  },
  description: 'Automate HVAC change orders with AI. Scoprix analyzes construction documents, detects changes, and generates CORs with 96% accuracy. Save 75% on rework costs.',
  keywords: [
    'HVAC change orders',
    'construction automation',
    'mechanical contractor software', 
    'COR automation',
    'construction document analysis',
    'HVAC estimating software',
    'vendor quote validation',
    'construction AI',
    'SMACNA standards',
    'mechanical contractors'
  ],
  authors: [{ name: 'Scoprix Labs', url: 'https://scoprixlabs.com' }],
  creator: 'Scoprix Labs',
  publisher: 'Scoprix Labs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scoprixlabs.com',
    siteName: 'Scoprix Labs',
    title: 'Scoprix Labs - AI Construction Change Order Automation',
    description: 'Automate HVAC change orders with AI. Save 75% on COR processing time with 96% accuracy.',
    images: [
      {
        url: '/images/og-scoprix-dashboard.jpg',
        width: 1200,
        height: 630,
        alt: 'Scoprix HVAC change order automation dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scoprix Labs - AI Construction Change Order Automation',
    description: 'Automate HVAC change orders with AI. Save 75% on COR processing time.',
    images: ['/images/twitter-scoprix-card.jpg'],
    creator: '@scoprixlabs',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://scoprixlabs.com',
  },
  category: 'Construction Software',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Scoprix Core',
  applicationCategory: 'Construction Management Software',
  operatingSystem: 'Web-based',
  description: 'AI-powered change order automation for HVAC and mechanical contractors',
  author: {
    '@type': 'Organization',
    name: 'Scoprix Labs',
    url: 'https://scoprixlabs.com',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '99',
    priceValidUntil: '2024-12-31',
    availability: 'https://schema.org/InStock',
    url: 'https://scoprixlabs.com/pricing',
  },
  featureList: [
    'Automated COR generation',
    'PDF document analysis', 
    'Vendor quote validation',
    'ROM budget estimation',
    'SMACNA labor standards',
    'Real-time change detection'
  ],
  screenshot: 'https://scoprixlabs.com/images/scoprix-dashboard.jpg',
  downloadUrl: 'https://app.scoprixlabs.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
    bestRating: '5',
    worstRating: '1'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link rel="preconnect" href="https://api.scoprixlabs.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-section {
              background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
              min-height: 60vh;
            }
            .hero-title {
              font-size: clamp(2rem, 5vw, 3.5rem);
              font-weight: 700;
              line-height: 1.1;
            }
            .loading-spinner {
              border: 2px solid #f3f3f3;
              border-top: 2px solid #3B82F6;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}