
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";
import Calculator from "@/components/calculator/Calculator";
import UseCases from "@/components/UseCases";
import Summary from "@/components/Summary";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AISavingsBenefits from "@/components/AISavingsBenefits";
import FloatingWidgets from "@/components/FloatingWidgets";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  // Initialize intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          // Fix TypeScript error - use instanceof HTMLElement check
          if (entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
      // Fix TypeScript error - use instanceof HTMLElement check
      if (el instanceof HTMLElement) {
        el.style.opacity = '0';
      }
      observer.observe(el);
    });

    return () => {
      animateElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0C14] overflow-hidden font-poppins">
      <Navbar />
      <Hero />
      <Solutions />
      <Testimonials />
      <Calculator />
      <AISavingsBenefits />
      <UseCases />
      <Summary />
      <LeadForm />
      <CTA />
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default Index;
