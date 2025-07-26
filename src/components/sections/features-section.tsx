import { FileText, Zap, Shield } from 'lucide-react'

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Automate Change Orders
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Automated COR Generation</h3>
            <p className="text-gray-600">Generate change orders automatically with SMACNA labor rates.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Document Analysis</h3>
            <p className="text-gray-600">Advanced AI detects every specification change automatically.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">CYA Protection</h3>
            <p className="text-gray-600">Complete audit trails for compliance and documentation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}