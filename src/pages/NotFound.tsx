
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0C14] px-4">
      <div className="text-center max-w-md mx-auto glassmorphism rounded-2xl p-8">
        <h1 className="text-7xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-white/80 mb-8">The page you're looking for doesn't exist.</p>
        <Button 
          onClick={() => window.location.href = "/"}
          className="bg-neon-purple hover:bg-neon-purple/90 text-white neon-glow"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
