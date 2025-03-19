
import { useEffect, useRef, useState } from "react";
import { Building2, Users, Home, ShoppingBag } from "lucide-react";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  position: string;
  region: string;
  icon: React.ReactNode;
  stats: {
    before: string;
    after: string;
    metric: string;
  };
};

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: "hr",
      quote: "By implementing KaizenAGI's CallBot, we reduced our hiring process from 6 weeks to 2 weeks, saving over 250 hours of manual work per month!",
      author: "Sarah Johnson",
      position: "HR Director",
      region: "USA",
      icon: <Users className="h-6 w-6" />,
      stats: {
        before: "6 weeks",
        after: "2 weeks",
        metric: "hiring process time"
      }
    },
    {
      id: "sales",
      quote: "With ChatBot handling our inbound leads, our conversion rate increased by 30%, and our sales reps only talk to high-intent prospects.",
      author: "Mohammed Al-Farsi",
      position: "Sales Manager",
      region: "GCC",
      icon: <Building2 className="h-6 w-6" />,
      stats: {
        before: "15%",
        after: "45%",
        metric: "conversion rate"
      }
    },
    {
      id: "realestate",
      quote: "Our CallBot pre-qualifies tenants automatically, filtering 80% of irrelevant inquiries—saving our agents hundreds of hours per month.",
      author: "Elena Müller",
      position: "Real Estate CEO",
      region: "Europe",
      icon: <Home className="h-6 w-6" />,
      stats: {
        before: "100%",
        after: "20%",
        metric: "agent time on irrelevant inquiries"
      }
    },
    {
      id: "ecommerce",
      quote: "Automation enabled us to respond instantly to 10,000+ monthly inquiries. Customer satisfaction skyrocketed while reducing costs by 40%.",
      author: "Jin Wei",
      position: "E-Commerce Brand",
      region: "Asia",
      icon: <ShoppingBag className="h-6 w-6" />,
      stats: {
        before: "24 hours",
        after: "instant",
        metric: "response time"
      }
    }
  ];

  const [animatedStats, setAnimatedStats] = useState<Record<string, boolean>>({});
  const statsRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setAnimatedStats(prev => ({
                ...prev,
                [id]: true
              }));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.entries(statsRefs.current).forEach(([id, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(statsRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-teal/20 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Success</span>{" "}
            <span className="text-gradient text-shadow-neon">Stories</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance">
            Real businesses achieving extraordinary results with our AI solutions.
            These testimonials showcase the transformative power of integrated AI automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bento-box transition-all duration-500 group"
            >
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center mr-3 neon-glow group-hover:animate-pulse-glow">
                  {testimonial.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{testimonial.author}</h3>
                  <p className="text-white/60 text-sm">
                    {testimonial.position}, {testimonial.region}
                  </p>
                </div>
              </div>

              <p className="text-white/80 mb-6 text-balance">"{testimonial.quote}"</p>

              <div 
                ref={el => statsRefs.current[testimonial.id] = el}
                data-id={testimonial.id}
                className="bg-gradient-to-r from-neon-purple/10 to-transparent p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-white/60 text-xs uppercase">Before</p>
                    <p className={`text-white font-bold text-xl ${animatedStats[testimonial.id] ? 'animate-slide-up' : 'opacity-0'}`}>
                      {testimonial.stats.before}
                    </p>
                  </div>
                  
                  <div className="h-0.5 flex-1 mx-4 bg-gradient-to-r from-neon-purple to-neon-teal relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white/80 text-xs">
                      {testimonial.stats.metric}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white/60 text-xs uppercase">After</p>
                    <p className={`text-neon-purple font-bold text-xl ${animatedStats[testimonial.id] ? 'animate-slide-up' : 'opacity-0'}`}>
                      {testimonial.stats.after}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
