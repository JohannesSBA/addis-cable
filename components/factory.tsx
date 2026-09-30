import { InfoPage } from "./info-page";
export function Factory() {
  return (
    <>
      <InfoPage
        title="Precision. From the inside out"
        intro="Step inside the manufacturing operation behind every Addis Cable connection. Our Gelan facility brings material expertise and controlled production together under one roof."
        sections={[
          {
            title: "From metal to conductor.",
            description:
              "Carefully controlled drawing and stranding transform copper and aluminum into consistent, high-conductivity conductors.",
          },
          {
            title: "Built around performance.",
            description:
              "Insulation and sheathing processes are selected for the electrical, thermal, and mechanical demands of each application.",
            bullets: [
              "26 fully equipped production lines",
              "13,836 tons annual production capacity",
              "Copper, aluminum, and specialty winding wire capabilities",
            ],
          },
          {
            title: "Quality at every stage.",
            description:
              "Routine factory tests and complete production traceability help deliver reliable cables for demanding projects.",
          },
        ]}
        primaryCta={{ label: "Discuss your requirements", href: "/contact" }}
      />
      <div className="wrap facility-gallery">
        <img
          src="/media/factory-poster.jpg"
          alt="Addis Cable production floor in Gelan"
          width="1080"
          height="608"
        />
        <p className="eyebrow">OUR FACILITY / GELAN INDUSTRIAL ZONE</p>
      </div>
    </>
  );
}
