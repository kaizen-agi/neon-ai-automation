
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Instagram } from "lucide-react";

const CTA = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the CTA section's position
      const ctaSection = document.getElementById("cta-section");
      const calculator = document.getElementById("calculator");
      
      if (ctaSection && calculator) {
        const ctaRect = ctaSection.getBoundingClientRect();
        const calculatorRect = calculator.getBoundingClientRect();
        
        // Show floating CTA when scrolled past calculator but not yet at CTA section
        setShowFloatingCTA(
          calculatorRect.bottom < 0 && ctaRect.top > window.innerHeight
        );
        
        // Make the CTA sticky when it's about to go out of view
        setIsSticky(ctaRect.top <= 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Floating CTA */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 right-6 z-40 animate-scale-in">
          <Button
            className="bg-neon-purple hover:bg-neon-purple/90 text-white px-6 py-6 rounded-lg shadow-neon-purple animate-pulse-glow"
            onClick={() => window.open("https://kaizenagi.com", "_blank")}
          >
            Discover Your Savings
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Main CTA Section */}
      <section id="cta-section" className="py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`max-w-4xl mx-auto glassmorphism rounded-2xl transition-all duration-300 ${
              isSticky
                ? "sticky top-20 border border-neon-purple/50"
                : ""
            }`}
          >
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                <span className="text-white">Want the same</span>{" "}
                <span className="text-gradient text-shadow-neon">results?</span>
              </h2>
              
              <p className="text-xl text-white/80 text-center mb-10 max-w-2xl mx-auto">
                Let's discuss how AI can transform your business operations, reduce costs, 
                and drive efficiency with our integrated ChatBot, CallBot & Automation solutions.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                <Button
                  className="bg-neon-purple hover:bg-neon-purple/90 text-white px-8 py-6 rounded-lg neon-glow text-lg w-full md:w-auto"
                  onClick={() => window.open("https://kaizenagi.com", "_blank")}
                >
                  Book a Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="flex items-center gap-4">
                  <p className="text-white/80">Follow for insights:</p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 hover:bg-white/5"
                    onClick={() => window.open("https://linkedin.com", "_blank")}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 hover:bg-white/5"
                    onClick={() => window.open("https://instagram.com", "_blank")}
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/60 text-sm">
                  Companies using our AI solutions have seen ROI within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
