import { Arrow } from "./brand";
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
export function InfoPage({
  title,
  intro,
  sections = [],
  primaryCta,
}: InfoPageProps) {
  return (
    <main id="main-content" className="detail-page">
      <section className="detail-hero wrap">
        <a className="breadcrumb" href="/">
          ADDIS CABLE <span> / </span> EXPLORE
        </a>
        <h1>
          {title}
          <span>.</span>
        </h1>
        <p>{intro}</p>
        {primaryCta && (
          <a href={primaryCta.href} className="button copper">
            {primaryCta.label}
            <Arrow diagonal />
          </a>
        )}
      </section>
      <section className="detail-content wrap">
        {sections.map((section, i) => (
          <article key={section.title}>
            <span className="eyebrow">0{i + 1} / ADDIS CABLE</span>
            <h2>{section.title}</h2>
            {section.description && <p>{section.description}</p>}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
      <section className="detail-cta wrap">
        <h2>Make the right connection.</h2>
        <a className="text-link" href="/contact">
          Speak to our team <Arrow diagonal />
        </a>
      </section>
    </main>
  );
}
