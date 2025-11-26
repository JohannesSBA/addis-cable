import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Use Cases",
    bullets: [
      "Bulk power corridors and substation interconnects",
      "Utility transmission reinforcement projects",
      "Grid upgrades requiring compact, high-reliability designs",
    ],
  },
  {
    title: "Engineering",
    bullets: [
      "Copper or aluminum conductors with segmented designs for lower losses",
      "Triple-extruded XLPE insulation with metallic screen",
      "Armoring and oversheaths specified for soil, UV, and rodent protection",
      "Standards: IEC 60840 / 62067 alignment and local authority requirements",
    ],
  },
  {
    title: "Assurance",
    bullets: [
      "Routine and sample tests per IEC: PD, sheath integrity, dimensional checks",
      "Type-tested constructions for HV performance",
      "Project-specific QA plans and drum-by-drum traceability",
    ],
  },
];

export default function HighVoltagePage() {
  return (
    <InfoPage
      title="High Voltage Cables"
      intro="High-voltage XLPE cables designed for Ethiopian transmission projects where uptime and efficiency matter most."
      sections={sections}
      primaryCta={{ label: "Plan a HV scope review", href: "/resources/technical-specs" }}
    />
  );
}
