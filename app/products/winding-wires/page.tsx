import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Applications",
    bullets: [
      "Motors, transformers, generators, and EV drivetrains",
      "Appliance coils and control relays",
      "Repair, rewind, and OEM production lines",
    ],
  },
  {
    title: "Specifications",
    bullets: [
      "Thermal classes 130L, 155, 180, and 200C+",
      "Round and rectangular copper conductors with smooth enamel",
      "Polyurethane, polyester-imide, and dual coat systems",
      "Tightly controlled diameter, adhesion, and flexibility",
    ],
  },
  {
    title: "Advantages",
    bullets: [
      "Surface quality that reduces partial discharge risk",
      "Batch-to-batch consistency for automated winding",
      "Local availability with export-ready packaging",
    ],
  },
];

export default function WindingWiresPage() {
  return (
    <InfoPage
      title="Winding Wires"
      intro="Precision enamelled winding wires engineered for high thermal endurance and consistent coil performance."
      sections={sections}
      primaryCta={{ label: "Request winding wire specs", href: "/resources/technical-specs" }}
    />
  );
}
