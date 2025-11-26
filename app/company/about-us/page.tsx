import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Who We Are",
    bullets: [
      "Ethiopia-based manufacturer of copper and aluminum conductors",
      "Serving utilities, infrastructure, industry, and real estate developers",
      "Focused on reliability, safety, and locally available stock",
    ],
  },
  {
    title: "What We Deliver",
    bullets: [
      "Low, medium, and high voltage power cables",
      "Aerial bundled conductors and overhead lines",
      "Enamelled winding wires for OEMs and repair centers",
    ],
  },
  {
    title: "How We Operate",
    bullets: [
      "Quality system aligned with ISO 9001",
      "End-to-end traceability from rod to finished drum",
      "Technical support for design, installation, and testing",
    ],
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      title="About Addis Cable"
      intro="An Ethiopian cable manufacturer committed to powering growth with dependable conductors and customer-first support."
      sections={sections}
      primaryCta={{ label: "Meet our team", href: "/company/our-story" }}
    />
  );
}
