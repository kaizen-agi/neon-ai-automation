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
  ArrowRight, 
  DollarSign, 
  Clock, 
  BarChart, 
  Users
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
  const [savings, setSavings] = useState({
    oneYear: { hours: 0, cost: 0 },
    threeYears: { hours: 0, cost: 0 },
    fiveYears: { hours: 0, cost: 0 },
    breakEvenDays: 0,
    fullTimeEquivalent: 0,
  });

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
    const breakEvenDays = Math.ceil(implementationCost / dailySavings);
    
    const fullTimeEquivalent = hoursSavedPerYear / 2000;
    
    setSavings({
      oneYear: {
        hours: hoursSavedPerYear,
        cost: costSavedPerYear,
      },
      threeYears: {
        hours: hoursSavedPerYear * 3,
        cost: costSavedPerYear * 3,
      },
      fiveYears: {
        hours: hoursSavedPerYear * 5,
        cost: costSavedPerYear * 5,
      },
      breakEvenDays,
      fullTimeEquivalent,
    });
  }, [hourlyRate, timeSaved, timeUnit, frequency, frequencyUnit, implementationDays]);

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">ROI</span>{" "}
            <span className="text-gradient text-shadow-neon">Calculator</span>
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
                  <Label htmlFor="hourlyRate" className="text-white mb-2 block">
                    Hourly Labor Cost (USD)
                  </Label>
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
                    <Label htmlFor="timeSaved" className="text-white mb-2 block">
                      Time Saved Per Task
                    </Label>
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
                    <Label htmlFor="timeUnit" className="text-white mb-2 block">
                      Time Unit
                    </Label>
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
                    <Label htmlFor="frequency" className="text-white mb-2 block">
                      Task Frequency
                    </Label>
                    <div className="relative">
                      <BarChart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
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
                    <Label htmlFor="frequencyUnit" className="text-white mb-2 block">
                      Frequency Period
                    </Label>
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
                  <Label htmlFor="implementationDays" className="text-white mb-2 block">
                    Implementation Time (days)
                  </Label>
                  <Input
                    id="implementationDays"
                    type="number"
                    value={implementationDays}
                    onChange={(e) => setImplementationDays(parseFloat(e.target.value))}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                How Much AI Saves You—In Time & Money
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="glassmorphism p-4 rounded-xl text-center">
                    <p className="text-white/70 text-sm mb-2">1 Year</p>
                    <p className="text-2xl font-bold text-neon-purple">${Math.round(savings.oneYear.cost).toLocaleString()}</p>
                    <p className="text-white/70 text-sm">{Math.round(savings.oneYear.hours).toLocaleString()} hrs</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-xl text-center">
                    <p className="text-white/70 text-sm mb-2">3 Years</p>
                    <p className="text-2xl font-bold text-neon-purple">${Math.round(savings.threeYears.cost).toLocaleString()}</p>
                    <p className="text-white/70 text-sm">{Math.round(savings.threeYears.hours).toLocaleString()} hrs</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-xl text-center">
                    <p className="text-white/70 text-sm mb-2">5 Years</p>
                    <p className="text-2xl font-bold text-neon-purple">${Math.round(savings.fiveYears.cost).toLocaleString()}</p>
                    <p className="text-white/70 text-sm">{Math.round(savings.fiveYears.hours).toLocaleString()} hrs</p>
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
      </div>
    </section>
  );
};

export default Calculator;
