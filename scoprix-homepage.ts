import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { ProcessSection } from '@/components/sections/process-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Scoprix Labs - AI Construction Change Order Automation | HVAC COR Software',
  description: 'Automate HVAC change orders with AI. Scoprix analyzes construction documents, detects changes, and generates CORs with 96% accuracy. Save 75% on rework costs.',
  alternates: {
    canonical: 'https://scoprixlabs.com',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://scoprixlabs.com/#organization',
  name: 'Scoprix Labs',
  url: 'https://scoprixlabs.com',
  logo: 'https://scoprixlabs.com/images/scoprix-logo.png',
  description: 'AI-powered construction automation tools for HVAC and mechanical contractors',
  foundingDate: '2024',
  founders: [{
    '@type': 'Person',
    name: 'Willis Tang',
    jobTitle: 'Founder & CEO',
    description: 'Former Project Manager at ACCO Engineered Systems'
  }],
  areaServed: [
    'California',
    'Arizona', 
    'Nevada',
    'Washington'
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '34.0522',
      longitude: '-118.2437'
    },
    geoRadius: '500'
  },
  contactPoint: [{
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4822',
    contactType: 'customer service',
    availableLanguage: 'English',
    serviceUrl: 'https://scoprixlabs.com/contact'
  }],
  sameAs: [
    'https://twitter.com/scoprixlabs',
    'https://linkedin.com/company/scoprixlabs'
  ]
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      
      <main role="main">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      
      <Footer />
    </>
  )
}