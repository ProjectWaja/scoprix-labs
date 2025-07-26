import Link from 'next/link'
import { Building } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Stop Losing Money on{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Manual Change Orders
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Scoprix automates HVAC change order generation with AI. Upload construction documents, 
            detect changes between plan sets, and generate justified CORs in minutes—not hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link 
              href="/demo"
              className="inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-300 h-12 px-6 text-base"
            >
              <Building className="w-5 h-5 mr-2" />
              Start Free Trial
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">96%</div>
              <div className="text-sm text-blue-200">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">75%</div>
              <div className="text-sm text-blue-200">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">$10K+</div>
              <div className="text-sm text-blue-200">Avg. COR Value</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}