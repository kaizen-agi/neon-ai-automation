
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#090A10] py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">KaizenAGI</h3>
            <p className="text-white/70 max-w-xs">
              Transforming businesses with AI solutions that drive efficiency, growth, and innovation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Document Processing</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Customer Support</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Data Analysis</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Process Automation</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">About Us</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Careers</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Blog</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Documentation</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Guides</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">Support</a></li>
              <li><a href="https://kaizenagi.com" className="text-white/70 hover:text-neon-purple transition-colors">API</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-white/70 text-sm mb-6 p-4 bg-white/5 rounded-lg">
            <p className="font-poppins">
              <strong>Disclaimer:</strong> The inputs, figures, and results shown on this platform are connected to various sources, including real-world experiences, readings, and publicly available reports. They are provided as directional insights and do not represent guaranteed outcomes. Final results may vary and should always be evaluated through a personalized consultation, which allows us to tailor recommendations to your specific context. These figures should be interpreted as guidance — not as definitive promises.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © 2025-2030 Designed by KaizenAGI | All Rights Reserved | Born in Paris | Improved in Dubai
            </p>
            
            <div className="flex space-x-4">
              <a href="https://kaizenagi.com" className="text-white/50 hover:text-neon-purple transition-colors shadow-neon-purple hover:shadow-xl">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://kaizenagi.com" className="text-white/50 hover:text-neon-purple transition-colors shadow-neon-purple hover:shadow-xl">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://kaizenagi.com" className="text-white/50 hover:text-neon-purple transition-colors shadow-neon-purple hover:shadow-xl">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://kaizenagi.com" className="text-white/50 hover:text-neon-purple transition-colors shadow-neon-purple hover:shadow-xl">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://kaizenagi.com" className="text-white/50 hover:text-neon-purple transition-colors shadow-neon-purple hover:shadow-xl">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
