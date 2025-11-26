import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Factory Certifications",
    bullets: [
      "Quality management system aligned with ISO 9001",
      "Routine testing with documented records per batch",
      "Traceability from raw material to finished drums",
    ],
  },
  {
    title: "Type & Routine Tests",
    bullets: [
      "Type-tested MV/HV constructions with accredited labs",
      "Routine tests: conductor resistance, insulation withstand, sheath integrity",
      "Sample tests: aging, tensile/elongation, hot-set where applicable",
    ],
  },
  {
    title: "Documentation",
    bullets: [
      "Test certificates provided with shipments on request",
      "Compliance statements against IEC and Ethiopian standards",
      "Project-specific QA dossiers available for EPCs and utilities",
    ],
  },
];

export default function CertificationsPage() {
  return (
    <InfoPage
      title="Certifications"
      intro="Certified processes and test evidence that demonstrate compliance with IEC and local standards."
      sections={sections}
      primaryCta={{ label: "Request certificates", href: "/resources/contact-support" }}
    />
  );
}
