import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Use of the Site",
    bullets: [
      "Content is provided for general information about Addis Cable products",
      "Do not misuse or attempt to disrupt the site or services",
      "We may update content and availability without notice",
    ],
  },
  {
    title: "Product Information",
    bullets: [
      "Specifications are subject to change; confirm current datasheets before purchasing",
      "Sales are governed by separate commercial terms and purchase agreements",
      "Local standards and installation practices must be followed",
    ],
  },
  {
    title: "Liability",
    bullets: [
      "Site content is provided without warranties; use at your own discretion",
      "Addis Cable is not liable for indirect or consequential damages from site use",
      "Some jurisdictions do not allow exclusions; your rights may vary",
    ],
  },
  {
    title: "Contact",
    bullets: [
      "Email: legal@addiscable.et",
      "Address: Gelan Industrial Zone, Sheger City, Ethiopia",
    ],
  },
];

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      intro="The terms that govern your use of Addis Cable websites and the information we provide online."
      sections={sections}
    />
  );
}
