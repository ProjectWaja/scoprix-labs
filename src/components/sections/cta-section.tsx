import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Automate Your Change Orders?</h2>
        <p className="text-xl text-blue-100 mb-8">Start your free trial today—no credit card required.</p>
        
        <Link 
          href="/demo"
          className="inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-300 h-12 px-6 text-base"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
  )
}