
import { Button } from "@/components/ui/button";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
} from "recharts";
import { 
  ArrowRight, 
  Info,
  Users,
} from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";

interface SavingsResultsProps {
  savings: {
    oneYear: { hours: number, cost: number };
    threeYears: { hours: number, cost: number };
    fiveYears: { hours: number, cost: number };
    breakEvenDays: number;
    fullTimeEquivalent: number;
    roi: number;
  };
  yearlySavingsData: Array<{name: string, netSavings: number, costOfAI: number}>;
  implementationDays: number;
  costOfAI: number;
}

const SavingsResults = ({ 
  savings, 
  yearlySavingsData, 
  implementationDays,
  costOfAI
}: SavingsResultsProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <h3 className="text-xl font-bold mb-2 text-white">
        Savings and ROI (over 3 years)
      </h3>

      <div className="grid grid-cols-3 gap-6">
        <div className="glassmorphism rounded-xl p-4">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <span className="text-neon-purple text-lg sm:text-2xl font-bold">${Math.round(savings.threeYears.cost - costOfAI).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Net savings</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Info className="h-4 w-4 text-white/50" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                  <p className="text-sm">
                    Total 3-year savings minus the one-time cost of AI
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>

        <div className="glassmorphism rounded-xl p-4">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <span className="text-neon-purple text-lg sm:text-2xl font-bold">${Math.round(savings.threeYears.cost).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Gross savings</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Info className="h-4 w-4 text-white/50" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                  <p className="text-sm">
                    Total savings over 3 years before subtracting the one-time AI cost
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>

        <div className="glassmorphism rounded-xl p-4">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <span className="text-neon-purple text-lg sm:text-2xl font-bold">{Math.max(1, Math.round(savings.roi))}x</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">ROI</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Info className="h-4 w-4 text-white/50" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                  <p className="text-sm">
                    Return on the one-time AI investment over 3 years
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </div>

      <div className="glassmorphism rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-semibold">3-year savings</span>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Info className="h-4 w-4 text-white/50" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
              <p className="text-sm">
                Year-by-year breakdown of savings vs. cost
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="h-60">
          <ChartContainer config={{
            "netSavings": { label: "Net Savings", color: "#7C4DFF" },
            "costOfAI": { label: "Cost of AI", color: "#D946EF" }
          }}>
            <BarChart
              data={yearlySavingsData}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
            >
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <Bar dataKey="netSavings" stackId="a" fill="#7C4DFF" name="Net Savings" />
              <Bar dataKey="costOfAI" stackId="a" fill="#D946EF" name="Cost of AI" />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="bg-neon-purple/10 rounded-xl p-6 border border-neon-purple/30">
        <h4 className="text-lg font-bold text-white mb-4">Break-Even Analysis</h4>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70">Implementation:</span>
          <span className="text-white font-semibold">{implementationDays} days</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70">Break-even point:</span>
          <span className="text-neon-purple font-bold">{savings.breakEvenDays} days</span>
        </div>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-neon-purple/70 to-neon-purple" 
            style={{ width: `${Math.min(100, (implementationDays / (implementationDays + savings.breakEvenDays)) * 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="glassmorphism rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 text-neon-purple mr-2" />
          <h4 className="text-lg font-bold text-white">Workforce Impact</h4>
        </div>
        <p className="text-white/70 mb-4">
          Your AI automation is equivalent to:
        </p>
        <p className="text-3xl font-bold text-neon-purple mb-2">
          {savings.fullTimeEquivalent.toFixed(1)}
        </p>
        <p className="text-white/70">
          full-time employees per year
        </p>
      </div>

      <Button 
        className="w-full py-6 bg-neon-purple hover:bg-neon-purple/90 text-white neon-glow"
        onClick={() => window.open("https://kaizenagi.com", "_blank")}
      >
        Discuss Your Custom ROI
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default SavingsResults;
