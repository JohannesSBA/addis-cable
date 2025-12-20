import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Products } from "@/components/products";
import { Quality } from "@/components/quality";
import { Sustainability } from "@/components/sustainability";
import { Partnership } from "@/components/partnership";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Products />
      <CTA />
    </main>
  );
}
