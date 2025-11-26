import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Systems",
    bullets: [
      "Quality management aligned with ISO 9001 principles",
      "Incoming inspection of rod, polymers, and armoring materials",
      "In-process controls on resistance, insulation thickness, eccentricity, and spark tests",
    ],
  },
  {
    title: "Testing",
    bullets: [
      "Routine tests: conductor resistance, high-voltage withstand, partial discharge (MV/HV)",
      "Sample tests: aging, tensile/elongation, hot-set, flame resistance where applicable",
      "Type tests performed with accredited partners for new designs",
    ],
  },
  {
    title: "Traceability",
    bullets: [
      "Drum-level serialization and batch records",
      "Factory acceptance inspections and test certificates on request",
      "Retention samples for post-installation verification",
    ],
  },
];

export default function QualityPage() {
  return (
    <InfoPage
      title="Quality Standards"
      intro="Disciplined quality control, certified processes, and documented testing underpin every cable that leaves our factory."
      sections={sections}
      primaryCta={{ label: "Request a QA plan", href: "/resources/certifications" }}
    />
  );
}
