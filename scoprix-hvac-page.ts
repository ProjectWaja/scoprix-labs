import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Building, 
  FileText, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  DollarSign,
  Shield,
  Target,
  Wrench,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'HVAC Change Order Automation Software | Scoprix Core',
  description: 'Stop manual COR creation. Scoprix automatically detects HVAC specification changes between 50% and 100% CDs. Generate justified change orders in minutes.',
  keywords: [
    'HVAC change orders',
    'COR automation',
    'construction document analysis',
    'HVAC estimating',
    'mechanical contractor software',
    'change order generation',
    'HVAC specifications',
    'construction AI'
  ],
  alternates: {
    canonical: 'https://scoprixlabs.com/hvac-change-order-automation',
  },
  openGraph: {
    title: 'HVAC Change Order Automation Software | Scoprix Core',
    description: 'Automate HVAC change order generation with AI. Detect specification changes and generate CORs with 96% accuracy.',
    url: 'https://scoprixlabs.com/hvac-change-order-automation',
    images: [
      {
        url: '/images/og-hvac-automation.jpg',
        width: 1200,
        height: 630,
        alt: 'HVAC change order automation dashboard',
      },
    ],
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'HVAC Change Order Automation',
  description: 'AI-powered HVAC change order generation from construction document analysis',
  provider: {
    '@type': 'Organization',
    name: 'Scoprix Labs',
    url: 'https://scoprixlabs.com'
  },
  serviceType: 'Construction Software',
  areaServed: ['California', 'Arizona', 'Nevada', 'Washington'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HVAC Automation Features',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automated COR Generation',
          description: 'Generate change orders automatically from plan comparisons'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Document Analysis',
          description: 'AI analysis of construction documents and specifications'
        }
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '89',
    bestRating: '5'
  }
}

export default function HVACAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      
      <main role="main">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
                  <Wrench className="w-4 h-4 text-yellow-300" />
                  <span>Phase 1 MVP - Now Available</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  HVAC Change Order{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Automation
                  </span>
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Stop spending hours creating change orders manually. Scoprix automatically detects 
                  HVAC specification changes between 50% and 100% construction documents, then generates 
                  justified CORs with labor and material calculations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Link href="/demo">
                      <Building className="w-5 h-5 mr-2" />
                      Start Free Trial
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Link href="/case-studies">
                      <FileText className="w-5 h-5 mr-2" />
                      View Case Studies
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">96%</div>
                    <div className="text-sm text-blue-200">Detection Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">2.4min</div>
                    <div className="text-sm text-blue-200">Avg. Processing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">$10K+</div>
                    <div className="text-sm text-blue-200">Avg. COR Value</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">HVAC-Floor-2-50%CD.pdf</span>
                      <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">ORIGINAL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">HVAC-Floor-2-100%CD.pdf</span>
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">REVISED</span>
                    </div>
                    <div className="border-t border-white/20 pt-4">
                      <div className="text-white font-medium mb-2">Changes Detected:</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-red-500/20 border border-red-500/30 rounded p-2">
                          <span className="text-red-200 text-sm">VRF Unit - NEMA 4X Required</span>
                          <span className="text-red-300 font-bold">+$2,500</span>
                        </div>
                        <div className="flex items-center justify-between bg-yellow-500/20 border border-yellow-500/30 rounded p-2">
                          <span className="text-yellow-200 text-sm">Ductwork Size Increase</span>
                          <span className="text-yellow-300 font-bold">+$850</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                The Change Order Problem Every Contractor Faces
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Manual COR creation is costing you time, money, and sanity. Here's what happens without automation:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hours of Manual Review</h3>
                <p className="text-gray-600 mb-4">
                  Spending 3-5 hours comparing 100+ page plan sets to find specification changes.
                </p>
                <div className="text-red-600 font-bold">Cost: $500+ per COR in labor</div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Missed Changes</h3>
                <p className="text-gray-600 mb-4">
                  Human error leads to missed specification changes, resulting in scope gaps and budget overruns.
                </p>
                <div className="text-yellow-600 font-bold">Cost: $10K+ in unrecovered work</div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Weak Justifications</h3>
                <p className="text-gray-600 mb-4">
                  GCs push back on CORs without proper documentation and cost breakdowns.
                </p>
                <div className="text-purple-600 font-bold">Cost: 30-40% rejection rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                The Scoprix Solution: AI-Powered COR Automation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built by a former ACCO Project Manager who lived these problems daily. 
                Here's how we solve them:
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">1. Upload Your Plan Sets</h3>
                <p className="text-gray-600 mb-6">
                  Simply drag and drop your 50% and 100% construction documents. Scoprix supports 
                  PDF plans, DWG files, and specifications. Our AI processes everything in minutes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>PDF.js holistic parsing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>OCR for scanned documents</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Secure, SOC 2 compliant processing</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
                <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center">
                  <Building className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <div className="text-gray-900 font-medium mb-2">Drop your HVAC plans here</div>
                  <div className="text-gray-500 text-sm">PDF, DWG, DXF supported</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">2. AI Detects Every Change</h3>
                <p className="text-gray-600 mb-6">
                  Our AI compares documents holistically, identifying equipment changes, specification 
                  modifications, and scope additions with 96% accuracy. No more manual page-by-page reviews.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Equipment specification changes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>NEMA rating modifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Capacity and sizing adjustments</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>New equipment additions</span>
                  </li>
                </ul>
              </div>
              <div className="lg:order-1">
                <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3">
                      <div>
                        <div className="font-medium text-gray-900">VRF Unit - IDF Room 201</div>
                        <div className="text-sm text-red-600">NEMA 4X → NEMA 1 (Critical Gap)</div>
                      </div>
                      <div className="text-red-600 font-bold">96% confidence</div>
                    </div>
                    <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div>
                        <div className="font-medium text-gray-900">Ductwork - Main Distribution</div>
                        <div className="text-sm text-yellow-600">24" x 12" → 30" x 12"</div>
                      </div>
                      <div className="text-yellow-600 font-bold">94% confidence</div>
                    </div>
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div>
                        <div className="font