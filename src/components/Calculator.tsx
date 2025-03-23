
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ArrowRight, 
  DollarSign, 
  Clock, 
  BarChart as BarChartIcon, 
  Users,
  Info
} from "lucide-react";

type Region = {
  id: string;
  name: string;
  hourlyRate: number;
  flag: string;
};

type TimeUnit = "minutes" | "hours" | "days";
type FrequencyUnit = "daily" | "weekly" | "monthly" | "yearly";

const Calculator = () => {
  const regions: Region[] = [
    { id: "usa", name: "USA", hourlyRate: 35, flag: "🇺🇸" },
    { id: "europe", name: "Europe", hourlyRate: 30, flag: "🇪🇺" },
    { id: "gcc", name: "GCC", hourlyRate: 25, flag: "🇸🇦" },
    { id: "asia", name: "Asia", hourlyRate: 20, flag: "🇨🇳" },
  ];

  const [selectedRegion, setSelectedRegion] = useState<string>("usa");
  const [hourlyRate, setHourlyRate] = useState<number>(regions[0].hourlyRate);
  const [timeSaved, setTimeSaved] = useState<number>(30);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("minutes");
  const [frequency, setFrequency] = useState<number>(10);
  const [frequencyUnit, setFrequencyUnit] = useState<FrequencyUnit>("daily");
  const [implementationDays, setImplementationDays] = useState<number>(30);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [costOfAI, setCostOfAI] = useState<number>(5000);
  const [savings, setSavings] = useState({
    oneYear: { hours: 0, cost: 0 },
    threeYears: { hours: 0, cost: 0 },
    fiveYears: { hours: 0, cost: 0 },
    breakEvenDays: 0,
    fullTimeEquivalent: 0,
    roi: 0,
  });

  // For yearly savings chart
  const [yearlySavingsData, setYearlySavingsData] = useState<Array<{name: string, netSavings: number, costOfAI: number}>>([]);
  
  // For productivity breakdown chart
  const [productivityData, setProductivityData] = useState<Array<{name: string, value: number, fill: string}>>([]);

  useEffect(() => {
    const region = regions.find((r) => r.id === selectedRegion);
    if (region) {
      setHourlyRate(region.hourlyRate);
    }
  }, [selectedRegion]);

  useEffect(() => {
    let timeSavedInHours = timeSaved;
    if (timeUnit === "minutes") timeSavedInHours = timeSaved / 60;
    if (timeUnit === "days") timeSavedInHours = timeSaved * 8;

    let frequencyPerYear = frequency;
    if (frequencyUnit === "daily") frequencyPerYear = frequency * 250;
    if (frequencyUnit === "weekly") frequencyPerYear = frequency * 52;
    if (frequencyUnit === "monthly") frequencyPerYear = frequency * 12;

    const hoursSavedPerYear = timeSavedInHours * frequencyPerYear;
    
    const costSavedPerYear = hoursSavedPerYear * hourlyRate;
    
    const implementationTimeInDays = implementationDays;
    
    const dailySavings = costSavedPerYear / 250;
    const implementationCost = implementationTimeInDays * 8 * hourlyRate;
    const totalCost = costOfAI + implementationCost;
    const breakEvenDays = Math.ceil(totalCost / dailySavings);
    
    const fullTimeEquivalent = hoursSavedPerYear / 2000;

    const threeYearSavings = costSavedPerYear * 3;
    const roi = (threeYearSavings - costOfAI) / costOfAI;
    
    setSavings({
      oneYear: {
        hours: hoursSavedPerYear,
        cost: costSavedPerYear,
      },
      threeYears: {
        hours: hoursSavedPerYear * 3,
        cost: threeYearSavings,
      },
      fiveYears: {
        hours: hoursSavedPerYear * 5,
        cost: costSavedPerYear * 5,
      },
      breakEvenDays,
      fullTimeEquivalent,
      roi: roi,
    });

    // Prepare data for charts
    setYearlySavingsData([
      { name: 'Year 1', netSavings: costSavedPerYear, costOfAI: costOfAI / 3 },
      { name: 'Year 2', netSavings: costSavedPerYear, costOfAI: costOfAI / 3 },
      { name: 'Year 3', netSavings: costSavedPerYear, costOfAI: costOfAI / 3 }
    ]);

    setProductivityData([
      { name: 'Productivity', value: 59, fill: '#7DD3FC' },
      { name: 'Effectiveness', value: 41, fill: '#0284C7' }
    ]);
    
  }, [hourlyRate, timeSaved, timeUnit, frequency, frequencyUnit, implementationDays, costOfAI]);

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">How Much AI Saves You—In</span>{" "}
            <span className="text-gradient text-shadow-neon">Time & Money</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance">
            Calculate how much time and money your business can save with our AI automation solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto glassmorphism rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                Input Your Business Parameters
              </h3>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="taskDescription" className="text-white mb-2 block">
                    Describe your task: What process do you want to optimize?
                  </Label>
                  <Textarea
                    id="taskDescription"
                    placeholder="e.g., Automating lead qualification, Handling customer support inquiries, Managing appointment scheduling"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="region" className="text-white mb-2 block">
                    Select Your Region
                  </Label>
                  <Select
                    value={selectedRegion}
                    onValueChange={(value) => setSelectedRegion(value)}
                  >
                    <SelectTrigger id="region" className="w-full bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1D2B] border-white/10">
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          <div className="flex items-center">
                            <span className="mr-2">{region.flag}</span>
                            <span>{region.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hourlyRate" className="text-white mb-2 block">
                      Hourly Labor Cost (USD)
                    </Label>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Info className="h-4 w-4 text-white/50" />
                          <span className="sr-only">Info</span>
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                        <p className="text-sm">
                          The average hourly cost of your employees, including benefits and overhead.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timeSaved" className="text-white mb-2 block">
                        Time Saved Per Task
                      </Label>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Info className="h-4 w-4 text-white/50" />
                            <span className="sr-only">Info</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                          <p className="text-sm">
                            How much time is saved each time this task is performed with AI automation.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                      <Input
                        id="timeSaved"
                        type="number"
                        value={timeSaved}
                        onChange={(e) => setTimeSaved(parseFloat(e.target.value))}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timeUnit" className="text-white mb-2 block">
                        Time Unit
                      </Label>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Info className="h-4 w-4 text-white/50" />
                            <span className="sr-only">Info</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                          <p className="text-sm">
                            The unit of time for the time saved value.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <Select
                      value={timeUnit}
                      onValueChange={(value) => setTimeUnit(value as TimeUnit)}
                    >
                      <SelectTrigger id="timeUnit" className="w-full bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1D2B] border-white/10">
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="frequency" className="text-white mb-2 block">
                        Task Frequency
                      </Label>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Info className="h-4 w-4 text-white/50" />
                            <span className="sr-only">Info</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                          <p className="text-sm">
                            How frequently this task is performed in your business.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="relative">
                      <BarChartIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                      <Input
                        id="frequency"
                        type="number"
                        value={frequency}
                        onChange={(e) => setFrequency(parseFloat(e.target.value))}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="frequencyUnit" className="text-white mb-2 block">
                        Frequency Period
                      </Label>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Info className="h-4 w-4 text-white/50" />
                            <span className="sr-only">Info</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                          <p className="text-sm">
                            The time period for the frequency value.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <Select
                      value={frequencyUnit}
                      onValueChange={(value) => setFrequencyUnit(value as FrequencyUnit)}
                    >
                      <SelectTrigger id="frequencyUnit" className="w-full bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1D2B] border-white/10">
                        <SelectItem value="daily">Times per day</SelectItem>
                        <SelectItem value="weekly">Times per week</SelectItem>
                        <SelectItem value="monthly">Times per month</SelectItem>
                        <SelectItem value="yearly">Times per year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="implementationDays" className="text-white mb-2 block">
                      Implementation Time (days)
                    </Label>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Info className="h-4 w-4 text-white/50" />
                          <span className="sr-only">Info</span>
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                        <p className="text-sm">
                          The estimated time to implement the AI solution in business days.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <Input
                    id="implementationDays"
                    type="number"
                    value={implementationDays}
                    onChange={(e) => setImplementationDays(parseFloat(e.target.value))}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="costOfAI" className="text-white mb-2 block">
                      Cost of AI Solution (USD)
                    </Label>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Info className="h-4 w-4 text-white/50" />
                          <span className="sr-only">Info</span>
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                        <p className="text-sm">
                          The total cost of the AI solution including licenses, setup, and training.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                    <Input
                      id="costOfAI"
                      type="number"
                      value={costOfAI}
                      onChange={(e) => setCostOfAI(parseFloat(e.target.value))}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-bold mb-2 text-white">
                Savings and ROI (over 3 years)
              </h3>

              <div className="grid grid-cols-3 gap-6">
                <div className="glassmorphism rounded-xl p-4">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <span className="text-neon-purple text-4xl font-bold">${Math.round(savings.threeYears.cost - costOfAI).toLocaleString()}</span>
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
                            Return on investment = net savings / cost of AI
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism rounded-xl p-4">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <span className="text-neon-purple text-4xl font-bold">${Math.round(savings.threeYears.cost).toLocaleString()}</span>
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
                            Total savings before subtracting AI costs
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism rounded-xl p-4">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <span className="text-neon-purple text-4xl font-bold">{Math.max(1, Math.round(savings.roi))}x</span>
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
                            Return on investment over 3 years
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
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
                    <ResponsiveContainer width="100%" height="100%">
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
                        <ChartLegend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glassmorphism rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Gross savings breakdown</span>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Info className="h-4 w-4 text-white/50" />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-[#1A1D2B] border-white/10 text-white/80">
                        <p className="text-sm">
                          Distribution of savings across different benefit areas
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productivityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {productivityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={<ChartTooltipContent />} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
