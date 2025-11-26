import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Origins",
    bullets: [
      "Founded to localize reliable conductor supply for Ethiopia",
      "Grew with national grid expansion and industrial park demand",
      "Built on engineering rigor and close customer collaboration",
    ],
  },
  {
    title: "Milestones",
    bullets: [
      "Commissioned multi-line copper and aluminum production",
      "Introduced MV/HV XLPE capabilities for utility projects",
      "Expanded QC lab for routine and type-test verifications",
    ],
  },
  {
    title: "Looking Ahead",
    bullets: [
      "Investing in higher voltage ranges and smart monitoring",
      "Strengthening export readiness and regional partnerships",
      "Growing talent through technical training and apprenticeships",
    ],
  },
];

export default function OurStoryPage() {
  return (
    <InfoPage
      title="Our Story"
      intro="From local beginnings to a trusted national supplier, Addis Cable continues to scale capacity, quality, and service."
      sections={sections}
      primaryCta={{ label: "Explore our partnerships", href: "/company/partnerships" }}
    />
  );
}
