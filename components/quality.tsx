export function Quality() {
  const values = [
    {
      name: 'Trust & Transparency',
      description: 'Ethical business built on honesty and reliability.'
    },
    {
      name: 'Customer Commitment',
      description: 'Consistently delivering on performance and timelines.'
    },
    {
      name: 'Technical Mastery',
      description: 'Skilled engineers and advanced manufacturing practices.'
    },
    {
      name: 'Innovation',
      description: 'Continuous investment in R&D and modern machinery.'
    },
    {
      name: 'Social Responsibility',
      description: 'Sustainable operations, job creation, and community support.'
    }
  ]

  const standards = [
    'ISO 9001:2015',
    'IEC 60228',
    'IEC 60502',
    'IEC 60227',
    'Ethiopian Standards (ESA)'
  ]

  const tests = [
    'Conductor resistance',
    'Tensile strength',
    'Insulation thickness',
    'Voltage endurance',
    'Heat aging & flame resistance',
    'Elongation & dielectric strength'
  ]

  return (
    <section id="quality" className="relative py-24 bg-gradient-to-b from-white via-[#fff7ee] to-white">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle,_rgba(255,205,164,0.18),_transparent_55%)]" />
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Quality, Innovation & Values
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Uncompromising standards in every meter of cable we produce
          </p>
        </div>

        {/* Quality Assurance */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6">Quality Assurance</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We comply with international and national standards to ensure every product meets the highest quality benchmarks.
            </p>
            <div className="space-y-3 mb-8">
              <h4 className="font-semibold text-lg mb-3">Standards We Meet:</h4>
              {standards.map((standard) => (
                <div key={standard} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-copper rounded-full"></div>
                  {standard}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Every Batch is Tested For:</h4>
            <div className="grid grid-cols-2 gap-4">
              {tests.map((test) => (
                <div key={test} className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-slate-600">{test}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.name}
                className="bg-white rounded-2xl p-6 border border-orange-100 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-copper/10 rounded-lg flex items-center justify-center text-copper font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-lg">{value.name}</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
