
import { useState, useEffect } from "react";
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  DollarSign, 
  Clock, 
  BarChart as BarChartIcon, 
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type Region = {
  id: string;
  name: string;
  hourlyRate: number;
  flag: string;
};

type TimeUnit = "minutes" | "hours" | "days";
type FrequencyUnit = "daily" | "weekly" | "monthly" | "yearly";

interface CalculatorFormProps {
  regions: Region[];
  selectedRegion: string;
  hourlyRate: number;
  timeSaved: number;
  timeUnit: TimeUnit;
  frequency: number;
  frequencyUnit: FrequencyUnit;
  implementationDays: number;
  taskDescription: string;
  costOfAI: number;
  productivityData: Array<{name: string, value: number, fill: string}>;
  onSelectedRegionChange: (value: string) => void;
  onHourlyRateChange: (value: number) => void;
  onTimeSavedChange: (value: number) => void;
  onTimeUnitChange: (value: TimeUnit) => void;
  onFrequencyChange: (value: number) => void;
  onFrequencyUnitChange: (value: FrequencyUnit) => void;
  onImplementationDaysChange: (value: number) => void;
  onTaskDescriptionChange: (value: string) => void;
  onCostOfAIChange: (value: number) => void;
}

const CalculatorForm = ({
  regions,
  selectedRegion,
  hourlyRate,
  timeSaved,
  timeUnit,
  frequency,
  frequencyUnit,
  implementationDays,
  taskDescription,
  costOfAI,
  productivityData,
  onSelectedRegionChange,
  onHourlyRateChange,
  onTimeSavedChange,
  onTimeUnitChange,
  onFrequencyChange,
  onFrequencyUnitChange,
  onImplementationDaysChange,
  onTaskDescriptionChange,
  onCostOfAIChange,
}: CalculatorFormProps) => {
  return (
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
            onChange={(e) => onTaskDescriptionChange(e.target.value)}
            className="bg-white/5 border-white/10 text-white min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="region" className="text-white mb-2 block">
            Select Your Region
          </Label>
          <Select
            value={selectedRegion}
            onValueChange={onSelectedRegionChange}
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
              onChange={(e) => onHourlyRateChange(parseFloat(e.target.value))}
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
                onChange={(e) => onTimeSavedChange(parseFloat(e.target.value))}
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
              onValueChange={(value) => onTimeUnitChange(value as TimeUnit)}
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
                onChange={(e) => onFrequencyChange(parseFloat(e.target.value))}
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
              onValueChange={(value) => onFrequencyUnitChange(value as FrequencyUnit)}
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
            onChange={(e) => onImplementationDaysChange(parseFloat(e.target.value))}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="costOfAI" className="text-white mb-2 block">
              Cost of AI Solution (USD) <span className="text-neon-purple font-medium">(One-time cost)</span>
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
                  Prospective solution costs associated with the AI use cases in scope (excludes maintenance, AI and telecommunication fees).
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
              onChange={(e) => onCostOfAIChange(parseFloat(e.target.value))}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
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
            <ChartContainer config={{
              "Productivity": { label: "Productivity", color: "#7DD3FC" },
              "Effectiveness": { label: "Effectiveness", color: "#0284C7" }
            }}>
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
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
