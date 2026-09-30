export const metadata = {
  title: "Connected to our community",
  description:
    "Manufacturing in Ethiopia means investing in the people and places around us. Our commitment extends beyond the factory floor.",
  alternates: { canonical: "/csr" },
};
import { InfoPage } from "@/components/info-page";
export default function CSRPage() {
  return (
    <InfoPage
      title="Connected to our community"
      intro="Manufacturing in Ethiopia means investing in the people and places around us. Our commitment extends beyond the factory floor."
      sections={[
        {
          title: "Building local capability",
          description:
            "Local manufacturing supports technical skills, employment, and a dependable domestic supply of electrical conductors.",
        },
        {
          title: "Responsible production",
          description:
            "We work toward efficient material use, careful process control, and responsible manufacturing practices.",
        },
        {
          title: "A lasting contribution",
          description:
            "Reliable electrical infrastructure helps communities, businesses, and essential services grow.",
        },
      ]}
      primaryCta={{ label: "Learn about our company", href: "/about" }}
    />
  );
}
