import Link from "next/link";

const faqs = [
  {
    question: "Why choose Addis Cable for electrical wires and cables in Ethiopia?",
    answer:
      "We are Ethiopia's largest integrated producer of copper and aluminum power cables, IEC type-tested and ISO 9001 certified, built for Addis Ababa grids, industrial parks, rail, and real estate projects.",
    schemaAnswer:
      "Addis Cable is Ethiopia's largest integrated producer of IEC type-tested, ISO 9001 certified copper and aluminum electrical cables for Addis Ababa and nationwide infrastructure.",
  },
  {
    question: "Do you serve Addis Ababa, Sheger City, and projects across Ethiopia?",
    answer:
      "Yes—our Gelan Industrial Zone plant serves Addis Ababa, Sheger City, and every region of Ethiopia with nationwide logistics partners for dependable delivery.",
    schemaAnswer:
      "Addis Cable serves Addis Ababa, Sheger City, and every region of Ethiopia with nationwide logistics partners for dependable delivery.",
  },
  {
    question: "Which cable types can you supply?",
    answer:
      "Low, medium, and high voltage power cables, AAC/AAAC/ACSR conductors, ABC bundled cables, and enamelled winding wires for motors, transformers, and generators.",
    schemaAnswer:
      "We manufacture low, medium, and high voltage power cables, AAC/AAAC/ACSR conductors, ABC bundled cables, and enamelled winding wires for motors, transformers, and generators.",
  },
  {
    question: "What standards and certifications do your products meet?",
    answer:
      "Our conductors and wires follow IEC and Ethiopian standards, type-tested and produced in an ISO 9001 quality system with full traceability and routine factory tests.",
    schemaAnswer:
      "Addis Cable products follow IEC and Ethiopian standards, type-tested and produced in an ISO 9001 quality system with full traceability and routine factory tests.",
  },
  {
    question: "How quickly can I get technical data sheets or a catalog?",
    answer:
      "You can download technical specs and the latest catalog instantly from our resources hub, or request tailored engineering support from our sales engineers.",
    schemaAnswer:
      "Technical data sheets and the latest catalog are available in the resources hub, and sales engineers provide tailored engineering support.",
  },
  {
    question: "How do I place an order or request a quotation?",
    answer:
      "Send your BOQ, conductor sizes, or load requirements and our Addis Ababa-based team will size, specify, and quote cables optimized for cost, lead time, and compliance.",
    schemaAnswer:
      "Share BOQ, conductor sizes, or load requirements and the Addis Ababa team will size, specify, and quote compliant cables with optimized cost and lead time.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.schemaAnswer,
    },
  })),
};

export function FAQ() {
  return (
    <section className="relative bg-[#05070d] text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>
      <div className="relative max-w-6xl mx-auto space-y-10">
        <div className="space-y-4 max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-xs text-white/50">
            Addis Cable FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Answers for Addis Ababa and nationwide cable buyers
          </h2>
          <p className="text-white/70 leading-relaxed">
            Fast clarity for utilities, EPCs, contractors, and manufacturers
            sourcing copper and aluminum cables in Ethiopia.
          </p>
          <div className="flex gap-4 text-sm text-white/70">
            <Link
              href="/contact"
              className="rounded-full bg-white/10 px-4 py-2 border border-white/15 hover:border-white/40 transition-colors"
            >
              Talk to a sales engineer
            </Link>
            <Link
              href="/resources/product-catalog"
              className="rounded-full bg-white/5 px-4 py-2 border border-white/10 hover:border-white/30 transition-colors"
            >
              Download catalog
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-white/70 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
