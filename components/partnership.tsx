export function Partnership() {
  const partners = [
    'Chinese and global cable manufacturers',
    'Development finance institutions (DFIs)',
    'Infrastructure investors localizing Belt and Road supply',
    'EPC contractors seeking Ethiopian manufacturing bases'
  ]

  const advantages = [
    {
      icon: '📍',
      title: 'Strategic Location',
      description: "Gelan Industrial Zone hub with proximity to Ethiopia's mega projects"
    },
    {
      icon: '⚡',
      title: 'Large-Scale Capacity',
      description: '13,836 tons annual production capability'
    },
    {
      icon: '👥',
      title: 'Skilled Workforce',
      description: 'Experienced engineers and technical staff'
    },
    {
      icon: '💼',
      title: 'Favorable Investment',
      description: 'Supportive investment climate with local market access'
    },
    {
      icon: '📈',
      title: 'Growing National Demand',
      description: 'Expanding infrastructure across Ethiopia'
    }
  ]

  return (
    <section id="partnership" className="py-24 bg-gradient-to-br from-white via-[#fff8f1] to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Partnership & Investment Opportunities
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Empowering Ethiopia's industrial growth
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">We Welcome Collaboration With:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div key={partner} className="bg-white rounded-2xl p-6 border border-orange-100 text-center shadow-sm">
                <p className="text-slate-600 font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          Our Gelan factory offers an investment platform that combines local market access, logistics proximity, favorable tax policies, and a skilled workforce ready to deliver world-class cables for Ethiopia's growth.
        </p>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Our Competitive Advantages</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="bg-white rounded-2xl p-6 border border-orange-100 shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h4 className="font-bold text-lg mb-2">{advantage.title}</h4>
                <p className="text-slate-600 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
