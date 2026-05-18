import { Calculator, HeartPulse, Sigma, Settings2 } from "lucide-react";

export type Category = "financial" | "health" | "math" | "other";

export interface CalculatorDef {
  id: string;
  name: string;
  description: string;
  path: string;
  category: Category;
  icon?: any;
}

export const calculators: CalculatorDef[] = [
  // Financial
  { id: "mortgage", name: "Mortgage", description: "Calculate monthly payments and amortization.", path: "/mortgage", category: "financial" },
  { id: "compound-interest", name: "Compound Interest", description: "See how your money grows over time.", path: "/compound-interest", category: "financial" },
  { id: "loan", name: "Loan", description: "Determine costs of personal loans.", path: "/loan", category: "financial" },
  { id: "auto-loan", name: "Auto Loan", description: "Estimate vehicle financing costs.", path: "/auto-loan", category: "financial" },
  { id: "salary", name: "Salary", description: "Convert between hourly, weekly, and annual pay.", path: "/salary", category: "financial" },
  { id: "tip", name: "Tip", description: "Calculate tips and split bills.", path: "/tip", category: "financial" },
  { id: "sales-tax", name: "Sales Tax", description: "Calculate total price with tax.", path: "/sales-tax", category: "financial" },
  { id: "discount", name: "Discount", description: "Find out how much you save.", path: "/discount", category: "financial" },
  { id: "interest", name: "Simple Interest", description: "Calculate simple interest.", path: "/interest", category: "financial" },
  { id: "investment", name: "Investment", description: "Calculate returns with contributions.", path: "/investment", category: "financial" },
  { id: "retirement", name: "Retirement", description: "Plan your retirement savings.", path: "/retirement", category: "financial" },
  { id: "inflation", name: "Inflation", description: "Calculate future value of money.", path: "/inflation", category: "financial" },
  
  // Health
  { id: "bmi", name: "BMI", description: "Calculate your Body Mass Index.", path: "/bmi", category: "health" },
  { id: "calorie", name: "Calorie", description: "Find your daily energy expenditure.", path: "/calorie", category: "health" },
  { id: "body-fat", name: "Body Fat", description: "Estimate your body fat percentage.", path: "/body-fat", category: "health" },
  { id: "ideal-weight", name: "Ideal Weight", description: "Find your ideal weight.", path: "/ideal-weight", category: "health" },
  
  // Math
  { id: "percentage", name: "Percentage", description: "Solve percentage problems quickly.", path: "/percentage", category: "math" },
  { id: "age", name: "Age", description: "Calculate exact age from birthdate.", path: "/age", category: "math" },
  { id: "random-number", name: "Random Number", description: "Generate random numbers.", path: "/random-number", category: "math" },
  
  // Other
  { id: "password", name: "Password Generator", description: "Create strong, secure passwords.", path: "/password", category: "other" },
  { id: "gas", name: "Gas Cost", description: "Estimate fuel costs for your trip.", path: "/gas", category: "other" },
];

export const categories = [
  { id: "financial", name: "Financial", icon: Calculator, color: "text-blue-500", bg: "bg-blue-500/10", path: "/financial" },
  { id: "health", name: "Health & Fitness", icon: HeartPulse, color: "text-red-500", bg: "bg-red-500/10", path: "/health" },
  { id: "math", name: "Math", icon: Sigma, color: "text-purple-500", bg: "bg-purple-500/10", path: "/math" },
  { id: "other", name: "Other Tools", icon: Settings2, color: "text-orange-500", bg: "bg-orange-500/10", path: "/other" },
];