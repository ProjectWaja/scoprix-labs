import Link from 'next/link'
import { Building } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Scoprix Labs</span>
        </div>
        
        <div className="text-center text-gray-400">
          <p>© 2024 Scoprix Labs. Built for construction professionals by construction professionals.</p>
        </div>
      </div>
    </footer>
  )
}