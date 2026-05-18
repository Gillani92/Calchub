import { useState } from "react";
import { Search } from "lucide-react";

const allCalcs = [
  // Financial
  { name: "Mortgage", desc: "Monthly payments & amortization", path: "/mortgage", cat: "Financial" },
  { name: "Compound Interest", desc: "How money grows over time", path: "/compound-interest", cat: "Financial" },
  { name: "Loan", desc: "Personal loan costs", path: "/loan", cat: "Financial" },
  { name: "Auto Loan", desc: "Vehicle financing costs", path: "/auto-loan", cat: "Financial" },
  { name: "Salary", desc: "Hourly / weekly / annual conversion", path: "/salary", cat: "Financial" },
  { name: "Tip", desc: "Tips and bill splitting", path: "/tip", cat: "Financial" },
  { name: "Sales Tax", desc: "Price with tax included", path: "/sales-tax", cat: "Financial" },
  { name: "Discount", desc: "Sale price and savings", path: "/discount", cat: "Financial" },
  { name: "Simple Interest", desc: "Interest on principal", path: "/interest", cat: "Financial" },
  { name: "Investment", desc: "Returns with contributions", path: "/investment", cat: "Financial" },
  { name: "Retirement", desc: "Retirement savings projection", path: "/retirement", cat: "Financial" },
  { name: "Inflation", desc: "Future value of money", path: "/inflation", cat: "Financial" },
  { name: "Income Tax", desc: "Estimated federal tax liability", path: "/income-tax", cat: "Financial" },
  // Health
  { name: "BMI", desc: "Body Mass Index", path: "/bmi", cat: "Health" },
  { name: "Calorie", desc: "Daily energy expenditure (TDEE)", path: "/calorie", cat: "Health" },
  { name: "Body Fat", desc: "Body fat percentage (Navy method)", path: "/body-fat", cat: "Health" },
  { name: "Ideal Weight", desc: "Ideal weight range by height", path: "/ideal-weight", cat: "Health" },
  { name: "Macro", desc: "Protein / carb / fat targets", path: "/macro", cat: "Health" },
  { name: "Due Date", desc: "Pregnancy due date", path: "/due-date", cat: "Health" },
  { name: "Sleep", desc: "Optimal sleep/wake times", path: "/sleep", cat: "Health" },
  { name: "Protein", desc: "Daily protein intake", path: "/protein", cat: "Health" },
  // Math
  { name: "Scientific", desc: "Full scientific calculator", path: "/scientific", cat: "Math" },
  { name: "Percentage", desc: "Percentage of, change, ratio", path: "/percentage", cat: "Math" },
  { name: "Fraction", desc: "Add, subtract, multiply fractions", path: "/fraction", cat: "Math" },
  { name: "Age", desc: "Exact age in years / months / days", path: "/age", cat: "Math" },
  { name: "Date", desc: "Days between dates or date offset", path: "/date", cat: "Math" },
  { name: "Time", desc: "Add or subtract time", path: "/time", cat: "Math" },
  { name: "Hours", desc: "Time-in / time-out → hours worked", path: "/hours", cat: "Math" },
  { name: "GPA", desc: "Semester and cumulative GPA", path: "/gpa", cat: "Math" },
  { name: "Grade", desc: "Weighted average grade", path: "/grade", cat: "Math" },
  { name: "Standard Deviation", desc: "Mean, median, mode, std dev", path: "/standard-deviation", cat: "Math" },
  { name: "Triangle", desc: "Sides, angles, area", path: "/triangle", cat: "Math" },
  { name: "Ratio", desc: "Simplify and solve ratios", path: "/ratio", cat: "Math" },
  { name: "Random Number", desc: "Generate random numbers", path: "/random-number", cat: "Math" },
  { name: "Roman Numeral", desc: "Number ↔ Roman numeral", path: "/roman-numeral", cat: "Math" },
  { name: "Square Footage", desc: "Area and perimeter of rooms", path: "/square-footage", cat: "Math" },
  // Other
  { name: "Password Generator", desc: "Strong, secure passwords", path: "/password", cat: "Other" },
  { name: "Gas Cost", desc: "Fuel cost for a trip", path: "/gas", cat: "Other" },
  { name: "Pace", desc: "Time / distance / pace solver", path: "/pace", cat: "Other" },
  { name: "Discount", desc: "Original price + savings", path: "/discount-2", cat: "Other" },
];

const catOrder = ["Financial", "Health", "Math", "Other"];

const catColors: Record<string, { dot: string; label: string; row: string }> = {
  Financial: { dot: "bg-sky-400", label: "text-sky-400", row: "hover:bg-sky-950/30" },
  Health:    { dot: "bg-emerald-400", label: "text-emerald-400", row: "hover:bg-emerald-950/30" },
  Math:      { dot: "bg-violet-400", label: "text-violet-400", row: "hover:bg-violet-950/30" },
  Other:     { dot: "bg-amber-400", label: "text-amber-400", row: "hover:bg-amber-950/30" },
};

export function DenseDirectory() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? allCalcs.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.desc.toLowerCase().includes(query.toLowerCase()) ||
          c.cat.toLowerCase().includes(query.toLowerCase())
      )
    : allCalcs;

  const grouped = catOrder.reduce<Record<string, typeof allCalcs>>((acc, cat) => {
    const items = filtered.filter((c) => c.cat === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#c9d1d9] font-mono text-sm">
      {/* Top bar */}
      <header className="border-b border-[#21262d] px-6 py-3 flex items-center gap-6 sticky top-0 bg-[#0d0d0f]/95 backdrop-blur z-10">
        <span className="text-white font-bold tracking-tight text-base">CALC//HUB</span>
        <nav className="flex gap-4 text-xs text-[#8b949e]">
          {catOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => setQuery(cat === query ? "" : cat)}
              className={`hover:text-white transition-colors ${query === cat ? catColors[cat].label : ""}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </nav>
        <div className="ml-auto relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b949e]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="filter calculators..."
            className="bg-[#161b22] border border-[#30363d] rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-[#8b949e] focus:outline-none focus:border-[#58a6ff] w-56 transition-colors"
          />
        </div>
      </header>

      {/* Stats bar */}
      <div className="px-6 py-2 border-b border-[#21262d] flex gap-6 text-[10px] text-[#8b949e] uppercase tracking-widest">
        <span>{filtered.length} calculators</span>
        {Object.entries(grouped).map(([cat, items]) => (
          <span key={cat}>
            <span className={catColors[cat].label}>{cat}</span> {items.length}
          </span>
        ))}
      </div>

      {/* Main directory */}
      <main className="px-6 pb-12 pt-4">
        {Object.keys(grouped).length === 0 && (
          <div className="py-16 text-center text-[#8b949e] text-xs">
            No calculators match &quot;{query}&quot;
          </div>
        )}

        {catOrder.filter((c) => grouped[c]).map((cat) => (
          <section key={cat} className="mb-8">
            {/* Category header */}
            <div className="flex items-center gap-2 mb-1 pb-1 border-b border-[#21262d]">
              <span className={`w-1.5 h-1.5 rounded-full ${catColors[cat].dot}`} />
              <span className={`text-[10px] uppercase tracking-widest font-bold ${catColors[cat].label}`}>
                {cat}
              </span>
              <span className="text-[#8b949e] text-[10px] ml-1">({grouped[cat].length})</span>
            </div>

            {/* Table */}
            <table className="w-full border-collapse">
              <tbody>
                {grouped[cat].map((calc, i) => (
                  <tr
                    key={calc.path + i}
                    className={`border-b border-[#21262d]/50 cursor-pointer transition-colors ${catColors[cat].row} group`}
                  >
                    <td className="py-2 pr-4 w-52">
                      <span className="text-white group-hover:text-[#58a6ff] transition-colors font-medium">
                        {calc.name}
                      </span>
                    </td>
                    <td className="py-2 text-[#8b949e] text-xs">{calc.desc}</td>
                    <td className="py-2 pl-4 w-32 text-right">
                      <span className="text-[#30363d] group-hover:text-[#58a6ff] text-[10px] transition-colors">
                        {calc.path} →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </main>
    </div>
  );
}
