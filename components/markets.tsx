import { InfoPage } from "./info-page";
export function Markets() {
  return (
    <InfoPage
      title="Where progress takes shape"
      intro="Cables connect more than circuits. They connect communities, enable industry, and help important projects move forward."
      sections={[
        {
          title: "Energy & utilities",
          description:
            "Conductors for grid connections, distribution networks, and renewable energy installations.",
        },
        {
          title: "Buildings & real estate",
          description:
            "Reliable low voltage cables for residential, commercial, and mixed-use development.",
        },
        {
          title: "Industry & manufacturing",
          description:
            "Robust constructions for industrial parks, factories, motors, and electrical equipment.",
        },
        {
          title: "Transport & infrastructure",
          description:
            "Cable solutions for the systems that keep cities and communities moving.",
        },
      ]}
      primaryCta={{ label: "Find your cable solution", href: "/contact" }}
    />
  );
}
