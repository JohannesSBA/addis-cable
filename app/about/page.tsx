export const metadata = {
  title: "Our Company",
  description:
    "Discover Addis Cable Manufacturing PLC: precision electrical cables and conductors, proudly manufactured in Ethiopia.",
  alternates: { canonical: "/about" },
};
import { About } from "@/components/about";

export default function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}
