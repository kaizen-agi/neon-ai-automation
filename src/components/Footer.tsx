
import { Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/10 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-96 h-32 bg-neon-purple/10 rounded-full filter blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <Zap className="h-6 w-6 text-neon-purple mr-2" />
              <span className="text-xl font-bold text-gradient">KaizenAGI</span>
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#solutions" className="text-white/70 hover:text-white transition-colors">
              AI Solutions
            </a>
            <a href="#testimonials" className="text-white/70 hover:text-white transition-colors">
              Success Stories
            </a>
            <a href="#calculator" className="text-white/70 hover:text-white transition-colors">
              ROI Calculator
            </a>
            <a href="#use-cases" className="text-white/70 hover:text-white transition-colors">
              Use Cases
            </a>
            <a href="https://kaizenagi.com" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:text-neon-purple/80 transition-colors">
              Book a Call
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} KaizenAGI. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
