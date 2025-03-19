
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(counterRef.current, 0, 2000000, 2000);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  const animateValue = (
    element: HTMLElement | null,
    start: number,
    end: number,
    duration: number
  ) => {
    if (!element) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-teal/20 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 glassmorphism px-4 py-2 rounded-full animate-slide-up">
            <span className="text-xs sm:text-sm font-medium text-neon-purple">
              AI-POWERED BUSINESS AUTOMATION
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up [animation-delay:200ms]">
            <span className="text-white text-balance">Transform Your Business With</span>{" "}
            <span className="text-gradient text-shadow-neon">AI Automation</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up [animation-delay:300ms] text-balance">
            Revolutionize your operations with integrated AI solutions. Save time, reduce costs, and scale your business with ChatBot, CallBot & Automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up [animation-delay:400ms]">
            <Button
              className="bg-neon-purple hover:bg-neon-purple/90 text-white px-8 py-6 rounded-lg neon-glow text-lg w-full sm:w-auto"
              onClick={() => window.open("https://kaizenagi.com", "_blank")}
            >
              Book a Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 text-white px-8 py-6 rounded-lg text-lg w-full sm:w-auto"
              onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
            >
              Calculate Your ROI
            </Button>
          </div>

          <div className="glassmorphism rounded-xl p-6 inline-block animate-slide-up [animation-delay:500ms]">
            <p className="text-white/90 text-sm mb-2">Companies using KaizenAGI AI have saved over</p>
            <div className="flex items-baseline justify-center">
              <span
                ref={counterRef}
                className="text-3xl md:text-4xl font-bold text-neon-purple"
              >
                0
              </span>
              <span className="text-xl md:text-2xl font-bold text-white ml-2">
                hours
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/50"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
