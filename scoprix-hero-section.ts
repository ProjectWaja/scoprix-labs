'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Building, 
  Zap, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Play,
  FileText,
  DollarSign,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section 
      className="hero-section relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700" />
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse-soft" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-overlay filter blur-xl animate-pulse-soft animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-overlay filter blur-xl animate-pulse-soft animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Built by contractors, for contractors</span>
              <Shield className="w-4 h-4 text-green-300" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              id="hero-heading"
              className="hero-title text-white mb-6"
            >
              Stop Losing Money on{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Manual Change Orders
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-blue-100 mb-8 leading-relaxed"
            >
              Scoprix automates HVAC change order generation with AI. Upload construction documents, 
              detect changes between plan sets, and generate justified CORs in minutes—not hours.
            </motion.p>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mb-10"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">96%</div>
                <div className="text-sm text-blue-200">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">75%</div>
                <div className="text-sm text-blue-200">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$10K+</div>
                <div className="text-sm text-blue-200">Avg. COR Value</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/demo" className="inline-flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo (2 min)
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 text-sm text-blue-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>SMACNA Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>No Credit Card Required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Dashboard Mockup */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Metro Hospital HVAC</div>
                    <div className="text-blue-200 text-sm">Project #4521</div>
                  </div>
                </div>
                <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </div>
              </div>

              {/* File Upload Area */}
              <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-xl p-8 text-center mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-white font-medium mb-1">HVAC-Floor-2-100%CD.pdf</div>
                <div className="text-blue-200 text-sm">2.8 MB • Processing...</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
              </div>

              {/* Results Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div>
                      <div className="text-white text-sm font-medium">VRF Unit - NEMA 4X Missing</div>
                      <div className="text-red-200 text-xs">Critical specification gap detected</div>
                    </div>
                  </div>
                  <div className="text-red-300 font-bold">+$2,500</div>
                </div>

                <div className="flex items-center justify-between bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div>
                      <div className="text-white text-sm font-medium">Ductwork Size Change</div>
                      <div className="text-yellow-200 text-xs">24" x 12" → 30" x 12" upgrade</div>
                    </div>
                  </div>
                  <div className="text-yellow-300 font-bold">+$850</div>
                </div>

                <div className="flex items-center justify-between bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <div className="text-white text-sm font-medium">COR-2024-003 Generated</div>
                      <div className="text-green-200 text-xs">Ready for review and submission</div>
                    </div>
                  </div>
                  <div className="text-green-300 font-bold">$3,350</div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
                Generate Change Order
              </button>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 