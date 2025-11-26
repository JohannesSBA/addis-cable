import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Guidance Topics",
    bullets: [
      "Storage, handling, and drum management",
      "Pulling tensions, sidewall pressure, and bend radius",
      "Termination and jointing considerations for LV/MV",
      "Sheath testing, phasing, and commissioning checks",
    ],
  },
  {
    title: "Field Support",
    bullets: [
      "On-site toolbox talks for installers",
      "Recommended accessories and compatible hardware",
      "Inspection checklists before energization",
    ],
  },
  {
    title: "Request Guides",
    bullets: [
      "Tell us cable type, voltage class, and installation environment",
      "We provide PDF guides and commissioning templates",
      "Option for virtual walkthrough of critical steps",
    ],
  },
];

export default function InstallationGuidesPage() {
  return (
    <InfoPage
      title="Installation Guides"
      intro="Best practices for storing, installing, terminating, and commissioning Addis Cable products safely."
      sections={sections}
      primaryCta={{ label: "Get installation guidance", href: "/resources/contact-support" }}
    />
  );
}
