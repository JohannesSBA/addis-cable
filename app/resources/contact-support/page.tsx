import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "How We Can Help",
    bullets: [
      "Product selection and sizing for your application",
      "Datasheets, test certificates, and compliance letters",
      "Stock checks, lead times, and delivery scheduling",
    ],
  },
  {
    title: "What to Share",
    bullets: [
      "Voltage level, installation method, and environment",
      "Required standards (IEC, ES, utility specs)",
      "Timeline, drum lengths, and any special packaging",
    ],
  },
  {
    title: "Reach Us",
    bullets: [
      "Email: sales@addiscable.et",
      "Phone: +251 (0)11 123 4567",
      "Gelan Industrial Zone, Sheger City, Ethiopia",
    ],
  },
];

export default function ContactSupportPage() {
  return (
    <InfoPage
      title="Contact Support"
      intro="Tell us about your project and we will connect you with a sales engineer to recommend the right conductors."
      sections={sections}
      primaryCta={{ label: "Email sales@addiscable.et", href: "mailto:sales@addiscable.et" }}
    />
  );
}
