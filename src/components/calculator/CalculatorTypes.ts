
export type Region = {
  id: string;
  name: string;
  hourlyRate: number;
  flag: string;
};

export type TimeUnit = "minutes" | "hours" | "days";
export type FrequencyUnit = "daily" | "weekly" | "monthly" | "yearly";

export interface SavingsData {
  oneYear: { hours: number, cost: number };
  threeYears: { hours: number, cost: number };
  fiveYears: { hours: number, cost: number };
  breakEvenDays: number;
  fullTimeEquivalent: number;
  roi: number;
}

export interface YearlySavingsItem {
  name: string;
  netSavings: number;
  costOfAI: number;
}

export interface ProductivityItem {
  name: string;
  value: number;
  fill: string;
}
