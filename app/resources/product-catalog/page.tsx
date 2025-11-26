import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "What You Get",
    bullets: [
      "Full portfolio across LV, MV/HV, ABC, and winding wires",
      "Standard constructions, conductor sizes, and insulation options",
      "Recommended applications and installation notes",
    ],
  },
  {
    title: "Request a Copy",
    description:
      "Need the latest PDF? Reach out and we will share the current revision with project-specific recommendations.",
    bullets: [
      "Include your voltage class, load profile, and environment",
      "We can pre-highlight best-fit constructions for your scope",
    ],
  },
];

export default function ProductCatalogPage() {
  return (
    <InfoPage
      title="Product Catalog"
      intro="Browse our conductor range with key dimensions, materials, and application guidance."
      sections={sections}
      primaryCta={{ label: "Request the catalog PDF", href: "/resources/contact-support" }}
    />
  );
}
