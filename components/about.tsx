import { InfoPage } from "./info-page";
export function About() {
  return (
    <InfoPage
      title="Rooted here. Reaching further"
      intro="We’re building the connections that help Ethiopia grow. Addis Cable Manufacturing PLC produces copper and aluminum electrical cables, conductors, and winding wires from Gelan Industrial Zone."
      sections={[
        {
          title: "Made in Ethiopia. Made with purpose.",
          description:
            "Founded under the umbrella of Chombe Seyoum Electrical Product, Addis Cable brings local manufacturing expertise to a national challenge: a dependable supply of quality electrical conductors.",
          bullets: [
            "Serving power utilities, industrial parks, infrastructure, and real estate",
            "Supporting projects with responsive delivery and technical coordination",
          ],
        },
        {
          title: "The capacity to keep progress moving.",
          description:
            "Our integrated manufacturing operation combines material processing, conductor production, insulation, and testing.",
          bullets: [
            "13,836 tons of combined annual copper and aluminum capacity",
            "26 fully equipped production lines",
            "300+ product variations",
          ],
        },
        {
          title: "Quality is a commitment.",
          description:
            "Our conductors follow IEC and Ethiopian standards, with routine testing and traceability throughout production.",
        },
      ]}
      primaryCta={{ label: "Explore our manufacturing", href: "/factory" }}
    />
  );
}
