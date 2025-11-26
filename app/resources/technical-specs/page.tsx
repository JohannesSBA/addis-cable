import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Datasheets Available",
    bullets: [
      "LV power and control cables (PVC/XLPE/LSZH)",
      "MV/HV XLPE cables with screening and armoring options",
      "ABC, bare conductors, and service drops",
      "Enamelled winding wires by thermal class and size",
    ],
  },
  {
    title: "Included Details",
    bullets: [
      "Electrical characteristics: resistance, reactance, current ratings",
      "Construction: conductor class, insulation, screen, sheath, armor",
      "Mechanical data: diameter, weight, minimum bend radius",
      "Test references and standards compliance",
    ],
  },
  {
    title: "How to Request",
    bullets: [
      "Share your voltage level and installation method",
      "Specify required standards (IEC, ES, utility specs)",
      "We will provide relevant datasheets and test certificates",
    ],
  },
];

export default function TechnicalSpecsPage() {
  return (
    <InfoPage
      title="Technical Specs"
      intro="Detailed datasheets, electrical parameters, and construction details to support design and procurement."
      sections={sections}
      primaryCta={{ label: "Request datasheets", href: "/resources/contact-support" }}
    />
  );
}
