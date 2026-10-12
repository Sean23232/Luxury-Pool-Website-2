import { Header } from "@/components/Header";
import { SideRail } from "@/components/SideRail";
import { HeroSection } from "@/components/Hero";
import { BrandIntroduction } from "@/components/BrandIntroduction";
import { InspirationGallery } from "@/components/InspirationGallery";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FinalCallToAction } from "@/components/FinalCallToAction";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="skip-link eyebrow border border-champagne bg-ink px-5 py-3 text-[0.62rem] text-stock"
      >
        Skip to content
      </a>

      <Header />
      <SideRail />

      <main id="main">
        <HeroSection />
        <BrandIntroduction />
        <InspirationGallery />
        <ServicesSection />
        <ProcessSection />
        <WhyChooseUs />
        <ServiceAreas />
        <FinalCallToAction />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
