
import { useEffect, useRef, useState } from "react";

type UseCase = {
  id: string;
  industry: string;
  title: string;
  description: string;
  impact: string;
  color: string;
};

const UseCases = () => {
  const useCases: UseCase[] = [
    {
      id: "hr",
      industry: "HR",
      title: "Automated Interview Scheduling",
      description: "KaizenAGI's CallBot saved our HR team 5 months per year by automating interview scheduling.",
      impact: "70% reduction in administrative workload",
      color: "from-neon-purple/20 to-neon-purple/5",
    },
    {
      id: "sales",
      industry: "Sales",
      title: "Lead Qualification",
      description: "Automating lead qualification with ChatBot boosted our revenue by 30%.",
      impact: "3x increase in sales team productivity",
      color: "from-neon-teal/20 to-neon-teal/5",
    },
    {
      id: "realestate",
      industry: "Real Estate",
      title: "Property Inquiries",
      description: "AI-powered automation helped our agents close deals 50% faster.",
      impact: "80% reduction in unqualified leads",
      color: "from-neon-orange/20 to-neon-orange/5",
    },
    {
      id: "support",
      industry: "Customer Support",
      title: "Instant Resolution",
      description: "Instant AI responses cut support wait times by 80%.",
      impact: "95% customer satisfaction rate",
      color: "from-blue-500/20 to-blue-500/5",
    },
  ];

  const [visibleCases, setVisibleCases] = useState<Record<string, boolean>>({});
  const caseRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleCases(prev => ({
                ...prev,
                [id]: true
              }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    Object.entries(caseRefs.current).forEach(([id, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(caseRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="use-cases" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-neon-teal/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Industry</span>{" "}
            <span className="text-gradient text-shadow-neon">Use Cases</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance">
            See how businesses across different industries are leveraging our AI solutions 
            to transform their operations and boost efficiency.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.id}
                ref={el => caseRefs.current[useCase.id] = el}
                data-id={useCase.id}
                className={`rounded-2xl overflow-hidden transition-all duration-500 ${
                  visibleCases[useCase.id] ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="h-full glassmorphism">
                  <div className={`h-2 bg-gradient-to-r ${useCase.color}`}></div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-4">
                      {useCase.industry}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                    <p className="text-white/70 mb-6">"{useCase.description}"</p>
                    
                    <div className="flex items-center">
                      <div className="flex-1 h-px bg-white/10"></div>
                      <span className="mx-4 text-white/50 text-sm">IMPACT</span>
                      <div className="flex-1 h-px bg-white/10"></div>
                    </div>
                    
                    <p className="mt-4 text-center text-lg font-semibold text-neon-purple">{useCase.impact}</p>
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

export default UseCases;
