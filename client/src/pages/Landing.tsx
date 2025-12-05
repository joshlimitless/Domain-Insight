import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import DashboardPreview from "@/components/DashboardPreview";
import IntegrationsSection from "@/components/IntegrationsSection";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Landing() {
  const registerRef = useRef<HTMLDivElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header onCtaClick={scrollToRegister} />
      <main className="overflow-x-hidden">
        <HeroSection onCtaClick={scrollToRegister} />
        <ProblemSection />
        <BenefitsSection />
        <DashboardPreview />
        <IntegrationsSection />
        <div ref={registerRef}>
          <RegistrationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
