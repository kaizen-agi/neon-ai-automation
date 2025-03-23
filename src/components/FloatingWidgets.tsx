
import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingWidgets = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/971585812278", "_blank");
  };

  const handleEmailClick = () => {
    window.open("mailto:kaizencare@kaizenagi.com", "_blank");
  };

  return (
    <TooltipProvider>
      <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleEmailClick}
              className="w-14 h-14 rounded-full bg-neon-purple flex items-center justify-center shadow-neon-purple animate-pulse-glow transition-transform hover:scale-110"
              aria-label="Email us"
            >
              <Mail className="h-6 w-6 text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Email: kaizencare@kaizenagi.com</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleWhatsAppClick}
              className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-md transition-transform hover:scale-110"
              aria-label="WhatsApp us"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>WhatsApp: +971-58-58-12278</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default FloatingWidgets;
