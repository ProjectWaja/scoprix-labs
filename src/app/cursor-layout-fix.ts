import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

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
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Scoprix Core',
  applicationCategory: 'Construction Management Software',
  operatingSystem: 'Web-based',
  description: 'AI-powered change order automation for HVAC and mechanical contractors',
  featureList: [
    'Automated COR generation',
    'PDF document analysis', 
    'Vendor quote validation',
    'ROM budget estimation',
    'SMACNA labor standards',
    'Real-time change detection'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}