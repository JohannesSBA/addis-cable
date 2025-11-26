import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Manufacturing Practices",
    bullets: [
      "Energy-efficient lines and heat recovery where feasible",
      "Recycling of copper and aluminum process scrap",
      "Responsible polymer handling and waste segregation",
    ],
  },
  {
    title: "Product Impact",
    bullets: [
      "Long-life insulation systems to reduce replacement cycles",
      "Optimized conductor designs for lower losses",
      "Local sourcing to cut transport emissions where possible",
    ],
  },
  {
    title: "People & Community",
    bullets: [
      "Technical training and safety programs for employees",
      "Support for local vocational partnerships",
      "Compliance with Ethiopian labor and environmental regulations",
    ],
  },
];

export default function SustainabilityPage() {
  return (
    <InfoPage
      title="Sustainability"
      intro="Reducing waste, improving energy efficiency, and building skills so our products and operations contribute to a more sustainable grid."
      sections={sections}
      primaryCta={{ label: "See our initiatives", href: "/company/partnerships" }}
    />
  );
}
