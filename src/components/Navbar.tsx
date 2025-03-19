
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient">KaizenAGI</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#solutions"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            AI Solutions
          </a>
          <a
            href="#testimonials"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Success Stories
          </a>
          <a
            href="#calculator"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            ROI Calculator
          </a>
          <a
            href="#use-cases"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Use Cases
          </a>
          <Button
            className="bg-neon-purple hover:bg-neon-purple/90 text-white neon-glow"
            onClick={() => window.open("https://kaizenagi.com", "_blank")}
          >
            Book a Call
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 py-4 animate-slide-up">
          <nav className="flex flex-col space-y-4 px-6">
            <a
              href="#solutions"
              className="text-white/80 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Solutions
            </a>
            <a
              href="#testimonials"
              className="text-white/80 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Success Stories
            </a>
            <a
              href="#calculator"
              className="text-white/80 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              ROI Calculator
            </a>
            <a
              href="#use-cases"
              className="text-white/80 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Use Cases
            </a>
            <Button
              className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full neon-glow"
              onClick={() => {
                window.open("https://kaizenagi.com", "_blank");
                setMobileMenuOpen(false);
              }}
            >
              Book a Call
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
