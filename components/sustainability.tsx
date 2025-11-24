import Image from 'next/image'

export function Sustainability() {
  const initiatives = [
    'Engineering apprenticeships',
    'Rural electrification support',
    'STEM education sponsorships'
  ]

  const commitments = [
    'Energy-efficient processes',
    'Recycling and waste management',
    'Non-toxic, environmentally safe materials',
    'Worker safety & community development'
  ]

  const alignments = [
    "Ethiopia's CRGE Strategy",
    'AU Agenda 2063, Goal 7',
    'UN SDGs 7, 9, 12'
  ]

  return (
    <section id="sustainability" className="relative py-24 bg-[#05070d] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),rgba(5,7,13,0.9))]" />
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Sustainability & Impact
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Building a greener future for Ethiopia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6">Our Environmental Commitment</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              We are committed to responsible manufacturing through sustainable practices that protect our environment and empower our communities.
            </p>
            <div className="space-y-4 mb-8">
              {commitments.map((commitment) => (
                <div key={commitment} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-copper flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/70">{commitment}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image
              src="/sustainable-green-manufacturing-renewable-energy-s.jpg"
              alt="Sustainable Manufacturing"
              width={700}
              height={500}
              className="rounded-2xl w-full object-cover border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Aligned With */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-6">Aligned With:</h4>
            <div className="space-y-4">
              {alignments.map((alignment) => (
                <div key={alignment} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-copper rounded-full"></div>
                  <span className="text-white/70">{alignment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Initiatives */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-6">Community Initiatives:</h4>
            <div className="space-y-4">
              {initiatives.map((initiative) => (
                <div key={initiative} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-copper rounded-full"></div>
                  <span className="text-white/70">{initiative}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
