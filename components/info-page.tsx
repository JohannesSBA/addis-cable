import Link from "next/link";

export type InfoSection = {
  title: string;
  description?: string;
  bullets?: string[];
};

type CTA = { label: string; href: string };

interface InfoPageProps {
  title: string;
  intro: string;
  sections?: InfoSection[];
  primaryCta?: CTA;
}

export function InfoPage({ title, intro, sections = [], primaryCta }: InfoPageProps) {
  return (
    <main className="bg-[#0a0c12] text-white min-h-screen">
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,112,52,0.16),transparent_50%)]" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "220px 180px",
              maskImage: "radial-gradient(circle at center, black, transparent 70%)",
            }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
            Addis Cable Manufacturing PLC
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-3xl mb-6">
            {intro}
          </p>
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary text-white px-5 py-3 text-sm sm:text-base shadow-[0_18px_50px_rgba(0,0,0,0.45)] border border-white/10"
            >
              {primaryCta.label}
            </Link>
          )}

          {sections.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
                >
                  <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                  {section.description && (
                    <p className="text-sm text-white/70 leading-relaxed mb-3">
                      {section.description}
                    </p>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 text-sm text-white/80">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
