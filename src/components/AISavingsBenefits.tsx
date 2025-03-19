import { Heart, Star, Dumbbell, TrendingUp, UserPlus, Rocket, Lightbulb, Zap, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type BenefitCard = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: "personal" | "business" | "team";
};

const AISavingsBenefits = () => {
  const benefitCards: BenefitCard[] = [
    // Personal Life Benefits
    {
      id: "time-with-loved-ones",
      icon: <Heart className="h-6 w-6 text-neon-purple" />,
      title: "More time with your loved ones",
      description: "AI handles repetitive tasks so you can focus on family & friends.",
      category: "personal",
    },
    {
      id: "pursue-passions",
      icon: <Star className="h-6 w-6 text-neon-purple" />,
      title: "Pursue your passions",
      description: "Spend more time on sports, hobbies, and personal growth.",
      category: "personal",
    },
    {
      id: "reduce-stress",
      icon: <Dumbbell className="h-6 w-6 text-neon-purple" />,
      title: "Reduce stress & improve work-life balance",
      description: "Let AI handle the tedious work while you focus on what matters.",
      category: "personal",
    },
    
    // Business Benefits
    {
      id: "reinvest-savings",
      icon: <TrendingUp className="h-6 w-6 text-neon-purple" />,
      title: "Reinvest your savings into marketing & sales",
      description: "Boost revenue by reallocating funds to lead generation & branding.",
      category: "business",
    },
    {
      id: "hire-talent",
      icon: <UserPlus className="h-6 w-6 text-neon-purple" />,
      title: "Hire top talent & scale smarter",
      description: "Use AI to free up resources for hiring the right people in the right roles.",
      category: "business",
    },
    {
      id: "high-value-tasks",
      icon: <Rocket className="h-6 w-6 text-neon-purple" />,
      title: "Focus on high-value tasks",
      description: "Stop wasting time on repetitive work—AI lets you concentrate on strategic growth.",
      category: "business",
    },
    
    // Team Benefits
    {
      id: "meaningful-work",
      icon: <Lightbulb className="h-6 w-6 text-neon-purple" />,
      title: "Empower employees to do meaningful work",
      description: "AI eliminates grunt work so your team can focus on creative & strategic tasks.",
      category: "team",
    },
    {
      id: "productivity",
      icon: <Zap className="h-6 w-6 text-neon-purple" />,
      title: "Increase productivity without burnout",
      description: "AI reduces workload, improving efficiency & job satisfaction.",
      category: "team",
    },
    {
      id: "optimize-workflows",
      icon: <RefreshCw className="h-6 w-6 text-neon-purple" />,
      title: "Optimize workflows for better results",
      description: "AI streamlines processes, cutting inefficiencies & saving resources.",
      category: "team",
    },
  ];

  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const cardsRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleCards(prev => ({
                ...prev,
                [id]: true
              }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.entries(cardsRef.current).forEach(([id, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(cardsRef.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const renderBenefitsByCategory = (category: 'personal' | 'business' | 'team') => {
    const filteredBenefits = benefitCards.filter(card => card.category === category);
    
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {filteredBenefits.map((card, index) => (
          <div
            key={card.id}
            ref={el => cardsRef.current[card.id] = el}
            data-id={card.id}
            className={`bento-box transition-all duration-700 ${
              visibleCards[card.id] ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4 p-3 rounded-full bg-neon-purple/10 w-fit">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-white/70 text-balance">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const categoryHeadings = {
    personal: {
      emoji: "🏡",
      title: "For Your Personal Life: More Time & Freedom"
    },
    business: {
      emoji: "💼",
      title: "For Your Business: Growth & Efficiency"
    },
    team: {
      emoji: "🔄",
      title: "For Your Team: Higher Productivity & Impact"
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-neon-purple/30 rounded-full filter blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-neon-purple">AI Saves You More Than Just Money—</span>{" "}
            <span className="text-gradient text-shadow-neon">It Gives You Back TIME & FREEDOM!</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance">
            What will you do with the time and money AI gives you? Reinvest, grow, or simply enjoy life more?
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(categoryHeadings).map(([category, { emoji, title }]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">{emoji}</span>
                <span>{title}</span>
              </h3>
              {renderBenefitsByCategory(category as 'personal' | 'business' | 'team')}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISavingsBenefits;
