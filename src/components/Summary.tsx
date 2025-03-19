
import { useEffect, useState, useRef } from "react";
import { Users, BarChart3, Building, ShoppingCart } from "lucide-react";

type SummaryItem = {
  id: string;
  title: string;
  before: string;
  after: string;
  icon: React.ReactNode;
};

const Summary = () => {
  const summaryItems: SummaryItem[] = [
    {
      id: "hr",
      title: "HR",
      before: "Before KaizenAGI, we manually processed 1,000 applications per month.",
      after: "Now, our CallBot pre-screens applicants, cutting HR workload by 70%.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: "sales",
      title: "Sales",
      before: "Our sales team wasted time on low-intent prospects.",
      after: "Our ChatBot captures and qualifies leads 24/7, ensuring our sales team only speaks to high-intent prospects.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      id: "realestate",
      title: "Real Estate",
      before: "We used to waste hours handling unqualified inquiries.",
      after: "Now, CallBot filters leads, so our agents only focus on serious buyers.",
      icon: <Building className="h-6 w-6" />,
    },
    {
      id: "ecommerce",
      title: "E-Commerce",
      before: "Customer questions went unanswered for days.",
      after: "AI automation helped us respond instantly to thousands of customers, boosting retention rates by 40%.",
      icon: <ShoppingCart className="h-6 w-6" />,
    },
  ];

  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleItems(prev => ({
                ...prev,
                [id]: true
              }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.entries(itemRefs.current).forEach(([id, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(itemRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/30 rounded-full filter blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">AI-Driven</span>{" "}
            <span className="text-gradient text-shadow-neon">Transformation</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance">
            See how businesses across industries have transformed with our AI solutions.
            The before and after stories speak for themselves.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {summaryItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => itemRefs.current[item.id] = el}
                data-id={item.id}
                className={`bento-box transition-all duration-700 ${
                  visibleItems[item.id] ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-white/50 mr-2"></div>
                      <p className="text-sm text-white/50 uppercase">Before</p>
                    </div>
                    <p className="text-white/70 text-balance pl-4">{item.before}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-neon-purple mr-2"></div>
                      <p className="text-sm text-neon-purple uppercase">After</p>
                    </div>
                    <p className="text-white pl-4 text-balance">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
