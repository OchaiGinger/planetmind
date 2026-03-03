import Navigation from "@/components/Navigation";
import DataNodeReveal from "@/components/sections/DataNodeReveal";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import SplitStats from "@/components/sections/SplitStats";
import Testimonials from "@/components/sections/Testimonials";
import ScrollReveal from "@/components/sections/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy selection:bg-mint selection:text-navy">
      <Navigation />
      <Hero />
      <HowItWorks />
      <DataNodeReveal />
      <SplitStats />
      <Testimonials />
      <ScrollReveal />
      <Footer />
    </main>
  );
}
