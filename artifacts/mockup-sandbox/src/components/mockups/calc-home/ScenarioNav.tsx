import { useState } from "react";
import { Home, TrendingUp, Car, ShoppingCart, Baby, Dumbbell, Scale, GraduationCap, Briefcase, ChevronRight, Search } from "lucide-react";

const scenarios = [
  {
    id: "home",
    label: "Buying a Home",
    icon: Home,
    color: { bg: "bg-blue-50", border: "border-blue-100", icon: "bg-blue-500", badge: "bg-blue-100 text-blue-700", hover: "hover:border-blue-200 hover:bg-blue-50/80" },
    blurb: "Understand what you can afford before you shop.",
    calcs: [
      { name: "Mortgage Calculator", desc: "Monthly payment for any home price" },
      { name: "Loan Calculator", desc: "Generic loan payments" },
      { name: "Compound Interest", desc: "How a down payment grows in savings" },
      { name: "Inflation", desc: "Future price of the home" },
    ],
  },
  {
    id: "invest",
    label: "Growing Wealth",
    icon: TrendingUp,
    color: { bg: "bg-emerald-50", border: "border-emerald-100", icon: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", hover: "hover:border-emerald-200 hover:bg-emerald-50/80" },
    blurb: "Stocks, savings accounts, or retirement — model your future.",
    calcs: [
      { name: "Investment Calculator", desc: "Portfolio growth with contributions" },
      { name: "Compound Interest", desc: "Power of compounding over time" },
      { name: "Retirement Calculator", desc: "Projected nest egg at retirement" },
      { name: "Inflation", desc: "Real purchasing power over time" },
    ],
  },
  {
    id: "car",
    label: "Buying a Car",
    icon: Car,
    color: { bg: "bg-sky-50", border: "border-sky-100", icon: "bg-sky-500", badge: "bg-sky-100 text-sky-700", hover: "hover:border-sky-200 hover:bg-sky-50/80" },
    blurb: "Know your true cost before you sign.",
    calcs: [
      { name: "Auto Loan Calculator", desc: "Monthly payment and total cost" },
      { name: "Gas Cost Calculator", desc: "Annual fuel spend by MPG" },
      { name: "Discount Calculator", desc: "Savings from a price negotiation" },
      { name: "Sales Tax Calculator", desc: "Final out-the-door price with tax" },
    ],
  },
  {
    id: "budget",
    label: "Daily Spending",
    icon: ShoppingCart,
    color: { bg: "bg-violet-50", border: "border-violet-100", icon: "bg-violet-500", badge: "bg-violet-100 text-violet-700", hover: "hover:border-violet-200 hover:bg-violet-50/80" },
    blurb: "Quick answers for everyday money decisions.",
    calcs: [
      { name: "Tip Calculator", desc: "Split any restaurant bill" },
      { name: "Sales Tax Calculator", desc: "Final price including tax" },
      { name: "Discount Calculator", desc: "Sale price and what you save" },
      { name: "Salary Calculator", desc: "Hourly rate to annual and back" },
    ],
  },
  {
    id: "pregnancy",
    label: "Having a Baby",
    icon: Baby,
    color: { bg: "bg-pink-50", border: "border-pink-100", icon: "bg-pink-500", badge: "bg-pink-100 text-pink-700", hover: "hover:border-pink-200 hover:bg-pink-50/80" },
    blurb: "Track milestones and plan the months ahead.",
    calcs: [
      { name: "Due Date Calculator", desc: "Estimated delivery date" },
      { name: "Calorie Calculator", desc: "Adjusted energy needs during pregnancy" },
      { name: "Macro Calculator", desc: "Nutrition targets by trimester" },
      { name: "Sleep Calculator", desc: "Optimal sleep windows" },
    ],
  },
  {
    id: "fitness",
    label: "Getting Fit",
    icon: Dumbbell,
    color: { bg: "bg-orange-50", border: "border-orange-100", icon: "bg-orange-500", badge: "bg-orange-100 text-orange-700", hover: "hover:border-orange-200 hover:bg-orange-50/80" },
    blurb: "Set real targets backed by real science.",
    calcs: [
      { name: "BMI Calculator", desc: "Where you sit on the scale" },
      { name: "Calorie Calculator", desc: "Daily energy to hit your goal" },
      { name: "Body Fat Calculator", desc: "Body composition estimate" },
      { name: "Macro Calculator", desc: "Protein / carb / fat split" },
    ],
  },
  {
    id: "weight",
    label: "Managing Weight",
    icon: Scale,
    color: { bg: "bg-teal-50", border: "border-teal-100", icon: "bg-teal-500", badge: "bg-teal-100 text-teal-700", hover: "hover:border-teal-200 hover:bg-teal-50/80" },
    blurb: "Understand your body's numbers, not just the scale.",
    calcs: [
      { name: "Ideal Weight Calculator", desc: "Healthy target range for your height" },
      { name: "Calorie Calculator", desc: "TDEE and deficit / surplus" },
      { name: "Protein Calculator", desc: "Daily protein for muscle retention" },
      { name: "BMI Calculator", desc: "Body Mass Index" },
    ],
  },
  {
    id: "school",
    label: "School & Grades",
    icon: GraduationCap,
    color: { bg: "bg-indigo-50", border: "border-indigo-100", icon: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700", hover: "hover:border-indigo-200 hover:bg-indigo-50/80" },
    blurb: "Plan the grade you need and track your GPA.",
    calcs: [
      { name: "GPA Calculator", desc: "Semester and cumulative GPA" },
      { name: "Grade Calculator", desc: "Weighted average and final needed" },
      { name: "Percentage Calculator", desc: "Score as a percentage" },
      { name: "Age Calculator", desc: "Exact age for enrollment cutoffs" },
    ],
  },
  {
    id: "work",
    label: "Work & Income",
    icon: Briefcase,
    color: { bg: "bg-slate-50", border: "border-slate-200", icon: "bg-slate-600", badge: "bg-slate-100 text-slate-700", hover: "hover:border-slate-300 hover:bg-slate-100/80" },
    blurb: "Evaluate offers and understand your take-home pay.",
    calcs: [
      { name: "Salary Calculator", desc: "Hourly ↔ annual conversion" },
      { name: "Income Tax Calculator", desc: "Federal tax estimate" },
      { name: "Hours Calculator", desc: "Timesheet hours worked" },
      { name: "Retirement Calculator", desc: "401k projection from your salary" },
    ],
  },
];

export function ScenarioNav() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>("home");

  const filtered = query.trim()
    ? scenarios.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.calcs.some((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      )
    : scenarios;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-6">
        <span className="text-gray-900 font-bold text-lg tracking-tight">CalcHub</span>
        <nav className="flex gap-1 text-sm">
          <button className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-900 font-medium text-sm">By Goal</button>
          <button className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 text-sm">All Tools</button>
        </nav>
        <div className="ml-auto relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search goals or tools..."
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Intro */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">What are you trying to figure out?</h1>
          <p className="text-gray-500 text-sm">Pick your situation — we&apos;ll show you the right tools.</p>
        </div>

        {/* Scenario grid */}
        <div className="space-y-2">
          {filtered.map((scenario) => {
            const Icon = scenario.icon;
            const isOpen = expanded === scenario.id;
            const c = scenario.color;

            return (
              <div
                key={scenario.id}
                className={`border rounded-xl bg-white transition-all cursor-pointer ${c.border} ${!isOpen ? c.hover : ""} ${isOpen ? "shadow-sm" : ""}`}
                onClick={() => setExpanded(isOpen ? null : scenario.id)}
              >
                {/* Row header */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${c.icon}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-sm">{scenario.label}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.badge}`}>
                        {scenario.calcs.length} tools
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 leading-snug">{scenario.blurb}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </div>

                {/* Expanded tools */}
                {isOpen && (
                  <div className={`border-t ${c.border} px-5 py-4 ${c.bg} grid grid-cols-2 gap-2`}>
                    {scenario.calcs.map((calc) => (
                      <button
                        key={calc.name}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border border-white hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-sm font-medium group-hover:text-gray-700 leading-tight">{calc.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5 leading-snug">{calc.desc}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0 mt-0.5 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No goals matching &quot;{query}&quot; — try browsing all tools instead.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
