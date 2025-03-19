
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

const FloatingWidgets = () => {
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);

  return (
    <div className="fixed right-6 bottom-24 z-40 flex flex-col gap-4">
      {/* Email Widget */}
      <div className="relative">
        <a 
          href="mailto:kaizencare@kaizenagi.com"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-purple shadow-neon-purple transition-all duration-300 hover:shadow-neon-purple-lg"
          onMouseEnter={() => setIsHoveringEmail(true)}
          onMouseLeave={() => setIsHoveringEmail(false)}
        >
          <Mail className="text-white h-6 w-6" />
        </a>
        
        {isHoveringEmail && (
          <div className="absolute right-14 top-2 bg-black/80 text-white px-3 py-2 rounded-lg backdrop-blur-sm border border-neon-purple/30 shadow-neon-purple whitespace-nowrap">
            kaizencare@kaizenagi.com
          </div>
        )}
      </div>

      {/* WhatsApp Widget */}
      <div className="relative">
        <a 
          href="tel:+971585812278"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-purple shadow-neon-purple transition-all duration-300 hover:shadow-neon-purple-lg"
          onMouseEnter={() => setIsHoveringPhone(true)}
          onMouseLeave={() => setIsHoveringPhone(false)}
        >
          <Phone className="text-white h-6 w-6" />
        </a>
        
        {isHoveringPhone && (
          <div className="absolute right-14 top-2 bg-black/80 text-white px-3 py-2 rounded-lg backdrop-blur-sm border border-neon-purple/30 shadow-neon-purple whitespace-nowrap">
            +971-58-58-12278
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWidgets;
