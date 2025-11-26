import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Portfolio",
    bullets: [
      "Aerial bundled conductors (ABC) for LV and MV lines",
      "Bare overhead aluminum conductors (AAC/ACSR/AAAC)",
      "Service drops and insulated messenger systems",
    ],
  },
  {
    title: "Design Choices",
    bullets: [
      "UV-stabilized XLPE insulation for harsh climates",
      "Neutral messenger options for mechanical strength",
      "Stranding optimized for sag, strength, and corona performance",
      "Conformance to IEC 60228, 60502, 61089, and utility specs",
    ],
  },
  {
    title: "Deployment Support",
    bullets: [
      "Recommendations on spans, clearances, and fittings",
      "Kitting: clamps, dead-ends, and connectors via partners",
      "Training sessions for safe stringing and installation",
    ],
  },
];

export default function ConductorsPage() {
  return (
    <InfoPage
      title="Conductors & ABC"
      intro="Aerial bundled conductors and bare overhead solutions built to improve reliability and safety for distribution networks."
      sections={sections}
      primaryCta={{ label: "Download ABC overview", href: "/resources/product-catalog" }}
    />
  );
}
