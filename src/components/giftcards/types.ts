export const PRICE_PER_TREE = 3.5;
export const CO2E_PER_TREE = 0.025; // tonnes CO2e per tree (mock)

export interface Recipient {
  id: string;
  email: string;
  trees: number;
  message: string;
  error?: string;
}

export interface CsvRow {
  id: string;
  email: string;
  name: string;
  trees: string;
  message: string;
  errors: Partial<Record<"email" | "trees", string>>;
  skipped?: boolean;
}

export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const formatUsd = (value: number) =>
  `US$${value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const uid = () => Math.random().toString(36).slice(2, 10);
