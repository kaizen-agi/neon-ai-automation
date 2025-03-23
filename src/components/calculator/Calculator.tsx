import { useState, useEffect } from "react";
import CalculatorForm from "./CalculatorForm";
import SavingsResults from "./SavingsResults";
import { 
  Region, 
  TimeUnit, 
  FrequencyUnit, 
  SavingsData, 
  YearlySavingsItem, 
  ProductivityItem 
} from "./CalculatorTypes";

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
  const [savings, setSavings] = useState<SavingsData>({
    oneYear: { hours: 0, cost: 0 },
    threeYears: { hours: 0, cost: 0 },
    fiveYears: { hours: 0, cost: 0 },
    breakEvenDays: 0,
    fullTimeEquivalent: 0,
    roi: 0,
  });

  const [yearlySavingsData, setYearlySavingsData] = useState<Array<YearlySavingsItem>>([]);
  
  const [productivityData, setProductivityData] = useState<Array<ProductivityItem>>([]);

  useEffect(() => {
    const region = regions.find((r) => r.id === selectedRegion);
    if (region) {
      setHourlyRate(region.hourlyRate);
    }
  }, [selectedRegion]);

  useEffect(() => {
    calculateSavings();
  }, [hourlyRate, timeSaved, timeUnit, frequency, frequencyUnit, implementationDays, costOfAI]);

  const calculateSavings = () => {
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
    
    // Use one-time cost of AI (not distributed across years in calculations)
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

    // Distribute AI cost visualization across the chart but keep the calculation as one-time
    setYearlySavingsData([
      { name: 'Year 1', netSavings: costSavedPerYear, costOfAI: costOfAI / 3 },
      { name: 'Year 2', netSavings: costSavedPerYear, costOfAI: costOfAI / 3 },
      { name: 'Year 3', netSavings: costSavedPerYear, costOfAI: costOfAI / 3 }
    ]);

    setProductivityData([
      { name: 'Productivity', value: 59, fill: '#7DD3FC' },
      { name: 'Effectiveness', value: 41, fill: '#0284C7' }
    ]);
  };

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
            <CalculatorForm 
              regions={regions}
              selectedRegion={selectedRegion}
              hourlyRate={hourlyRate}
              timeSaved={timeSaved}
              timeUnit={timeUnit}
              frequency={frequency}
              frequencyUnit={frequencyUnit}
              implementationDays={implementationDays}
              taskDescription={taskDescription}
              costOfAI={costOfAI}
              productivityData={productivityData}
              onSelectedRegionChange={setSelectedRegion}
              onHourlyRateChange={setHourlyRate}
              onTimeSavedChange={setTimeSaved}
              onTimeUnitChange={setTimeUnit}
              onFrequencyChange={setFrequency}
              onFrequencyUnitChange={setFrequencyUnit}
              onImplementationDaysChange={setImplementationDays}
              onTaskDescriptionChange={setTaskDescription}
              onCostOfAIChange={setCostOfAI}
            />

            <SavingsResults 
              savings={savings}
              yearlySavingsData={yearlySavingsData}
              implementationDays={implementationDays}
              costOfAI={costOfAI}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
