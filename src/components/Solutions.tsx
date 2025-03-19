
import { useState, useEffect, useRef } from "react";
import { MessageSquare, Phone, Zap } from "lucide-react";

type Solution = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Solutions = () => {
  const [activeTab, setActiveTab] = useState<string>("chatbot");
  const solutionsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const solutions: Solution[] = [
    {
      id: "chatbot",
      title: "ChatBot",
      description:
        "Instantly engage customers 24/7 with our AI-powered ChatBot. Qualify leads, answer questions, and handle routine inquiries automatically, freeing your team to focus on high-value tasks.",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      id: "callbot",
      title: "CallBot",
      description:
        "Transform your phone systems with human-like AI conversations. Our CallBot handles inbound and outbound calls, pre-qualifies prospects, and captures essential information without human intervention.",
      icon: <Phone className="h-6 w-6" />,
    },
    {
      id: "automation",
      title: "Automation",
      description:
        "Streamline repetitive tasks with custom automation workflows. From data entry to document processing, our AI solutions integrate with your existing systems to optimize operations and reduce errors.",
      icon: <Zap className="h-6 w-6" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (solutionsRef.current) {
      observer.observe(solutionsRef.current);
    }

    return () => {
      if (solutionsRef.current) {
        observer.unobserve(solutionsRef.current);
      }
    };
  }, []);

  const activeSolution = solutions.find((s) => s.id === activeTab);

  return (
    <section
      id="solutions"
      ref={solutionsRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient text-shadow-neon">AI-Powered</span>{" "}
            <span className="text-white">Solutions</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance">
            Our integrated AI ecosystem works together to transform your business operations, 
            creating seamless experiences for your customers and employees.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center mb-10 gap-2">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === solution.id
                    ? "bg-neon-purple text-white shadow-neon-purple"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setActiveTab(solution.id)}
              >
                <div className="flex items-center space-x-2">
                  {solution.icon}
                  <span>{solution.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="glassmorphism rounded-2xl p-8 transition-all duration-500 animate-scale-in min-h-[300px]">
            {activeSolution && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="mb-4 flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center mr-4 neon-glow">
                      {activeSolution.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gradient">
                      {activeSolution.title}
                    </h3>
                  </div>
                  <p className="text-white/80 mb-6">{activeSolution.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-neon-purple mr-2">•</span>
                      <p className="text-white/80">
                        {activeSolution.id === "chatbot"
                          ? "Instant response to customer inquiries 24/7"
                          : activeSolution.id === "callbot"
                          ? "Handles high call volumes without increasing staff"
                          : "Reduces manual data entry by up to 90%"}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-neon-purple mr-2">•</span>
                      <p className="text-white/80">
                        {activeSolution.id === "chatbot"
                          ? "Qualifies leads before your team engages"
                          : activeSolution.id === "callbot"
                          ? "Natural voice interaction that feels human"
                          : "Seamless integration with your existing systems"}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-neon-purple mr-2">•</span>
                      <p className="text-white/80">
                        {activeSolution.id === "chatbot"
                          ? "Reduces response time from hours to seconds"
                          : activeSolution.id === "callbot"
                          ? "Pre-qualifies prospects before human engagement"
                          : "Customized workflows for your specific needs"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="aspect-video w-full bg-gradient-to-br from-neon-purple/20 to-neon-teal/20 rounded-xl flex items-center justify-center">
                    <div className="text-5xl text-neon-purple">
                      {activeSolution.id === "chatbot" ? (
                        <MessageSquare className="w-20 h-20 opacity-80" />
                      ) : activeSolution.id === "callbot" ? (
                        <Phone className="w-20 h-20 opacity-80" />
                      ) : (
                        <Zap className="w-20 h-20 opacity-80" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
