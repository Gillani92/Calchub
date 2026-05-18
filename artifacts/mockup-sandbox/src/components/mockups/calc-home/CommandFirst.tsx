import { useState, useEffect, useRef } from "react";
import { ArrowRight, Hash, DollarSign, Heart, Cpu, Settings } from "lucide-react";

const allCalcs = [
  { name: "Mortgage Calculator", path: "/mortgage", cat: "Financial", keywords: ["home", "house", "loan", "payment"] },
  { name: "Compound Interest", path: "/compound-interest", cat: "Financial", keywords: ["savings", "growth", "invest"] },
  { name: "Loan Calculator", path: "/loan", cat: "Financial", keywords: ["borrow", "debt", "payment"] },
  { name: "Auto Loan", path: "/auto-loan", cat: "Financial", keywords: ["car", "vehicle", "financing"] },
  { name: "Salary Calculator", path: "/salary", cat: "Financial", keywords: ["hourly", "annual", "wage", "income"] },
  { name: "Tip Calculator", path: "/tip", cat: "Financial", keywords: ["restaurant", "bill", "split"] },
  { name: "Sales Tax", path: "/sales-tax", cat: "Financial", keywords: ["tax", "total", "price"] },
  { name: "Discount Calculator", path: "/discount", cat: "Financial", keywords: ["sale", "savings", "percent off"] },
  { name: "Investment Calculator", path: "/investment", cat: "Financial", keywords: ["return", "portfolio", "stocks"] },
  { name: "Retirement Calculator", path: "/retirement", cat: "Financial", keywords: ["401k", "pension", "future"] },
  { name: "Inflation Calculator", path: "/inflation", cat: "Financial", keywords: ["cpi", "future value", "purchasing"] },
  { name: "BMI Calculator", path: "/bmi", cat: "Health", keywords: ["weight", "height", "body"] },
  { name: "Calorie Calculator", path: "/calorie", cat: "Health", keywords: ["tdee", "diet", "energy", "food"] },
  { name: "Body Fat Calculator", path: "/body-fat", cat: "Health", keywords: ["navy", "fat", "fitness"] },
  { name: "Ideal Weight", path: "/ideal-weight", cat: "Health", keywords: ["weight", "height"] },
  { name: "Macro Calculator", path: "/macro", cat: "Health", keywords: ["protein", "carbs", "fat", "diet"] },
  { name: "Due Date Calculator", path: "/due-date", cat: "Health", keywords: ["pregnancy", "baby", "weeks"] },
  { name: "Sleep Calculator", path: "/sleep", cat: "Health", keywords: ["bedtime", "wake", "cycle"] },
  { name: "Scientific Calculator", path: "/scientific", cat: "Math", keywords: ["trig", "log", "sin", "cos"] },
  { name: "Percentage Calculator", path: "/percentage", cat: "Math", keywords: ["percent", "of", "change"] },
  { name: "Fraction Calculator", path: "/fraction", cat: "Math", keywords: ["divide", "add", "mixed number"] },
  { name: "Age Calculator", path: "/age", cat: "Math", keywords: ["birthday", "years", "born"] },
  { name: "Date Calculator", path: "/date", cat: "Math", keywords: ["days between", "difference", "calendar"] },
  { name: "GPA Calculator", path: "/gpa", cat: "Math", keywords: ["grade", "school", "university"] },
  { name: "Standard Deviation", path: "/standard-deviation", cat: "Math", keywords: ["statistics", "variance", "mean"] },
  { name: "Triangle Calculator", path: "/triangle", cat: "Math", keywords: ["area", "angles", "sides"] },
  { name: "Random Number", path: "/random-number", cat: "Math", keywords: ["generate", "dice", "random"] },
  { name: "Password Generator", path: "/password", cat: "Other", keywords: ["secure", "random", "characters"] },
  { name: "Gas Cost Calculator", path: "/gas", cat: "Other", keywords: ["fuel", "trip", "mpg"] },
  { name: "Pace Calculator", path: "/pace", cat: "Other", keywords: ["running", "distance", "speed"] },
];

const catIcon: Record<string, any> = {
  Financial: DollarSign,
  Health: Heart,
  Math: Hash,
  Other: Settings,
};

const catStyle: Record<string, { bg: string; text: string; border: string }> = {
  Financial: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  Health:    { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  Math:      { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  Other:     { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

const popularCalcs = ["Mortgage Calculator", "BMI Calculator", "Tip Calculator", "Percentage Calculator", "Salary Calculator", "Age Calculator"];

export function CommandFirst() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? allCalcs.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.cat.toLowerCase().includes(query.toLowerCase()) ||
          c.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : [];

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Escape") {
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [results.length]);

  const showResults = query.trim().length > 0;
  const showPopular = !showResults;

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-start pt-24 px-4">
      {/* Wordmark */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-white/40" />
          <span className="text-white text-xl font-semibold tracking-tight">CalcHub</span>
        </div>
        <p className="text-[#71717a] text-sm">Every calculator you need, instantly.</p>
      </div>

      {/* Command input */}
      <div className="w-full max-w-xl">
        <div className={`relative border rounded-xl overflow-hidden transition-all ${showResults ? "border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.04)]" : "border-white/10"}`}>
          <div className="flex items-center px-4 py-3.5 gap-3 bg-[#18181b]">
            <svg className="w-4 h-4 text-[#71717a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any calculator..."
              className="flex-1 bg-transparent text-white placeholder:text-[#52525b] text-base focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-[#52525b] hover:text-white text-xs transition-colors">
                ESC
              </button>
            )}
            {!query && (
              <kbd className="text-[#52525b] text-xs border border-[#27272a] rounded px-1.5 py-0.5">⌘K</kbd>
            )}
          </div>

          {/* Results list */}
          {showResults && (
            <div className="border-t border-white/5 max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-8 text-center text-[#71717a] text-sm">
                  No calculators found for &quot;{query}&quot;
                </div>
              ) : (
                results.map((calc, i) => {
                  const Icon = catIcon[calc.cat];
                  const style = catStyle[calc.cat];
                  return (
                    <div
                      key={calc.path}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                        i === selected ? "bg-white/5" : "hover:bg-white/[0.03]"
                      }`}
                      onMouseEnter={() => setSelected(i)}
                    >
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${style.bg} border ${style.border}`}>
                        <Icon className={`w-3.5 h-3.5 ${style.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-white text-sm">{calc.name}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${style.bg} ${style.text} font-medium`}>
                        {calc.cat}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-opacity ${i === selected ? "opacity-100 text-white/50" : "opacity-0"}`} />
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Keyboard hints */}
        {showResults && results.length > 0 && (
          <div className="flex gap-4 mt-2 px-1 text-[10px] text-[#52525b]">
            <span><kbd className="border border-[#27272a] rounded px-1 mr-1">↑↓</kbd>navigate</span>
            <span><kbd className="border border-[#27272a] rounded px-1 mr-1">↵</kbd>open</span>
            <span><kbd className="border border-[#27272a] rounded px-1 mr-1">ESC</kbd>clear</span>
          </div>
        )}
      </div>

      {/* Popular calculators */}
      {showPopular && (
        <div className="w-full max-w-xl mt-10">
          <p className="text-[#52525b] text-xs uppercase tracking-widest mb-3 px-1">Popular</p>
          <div className="grid grid-cols-2 gap-1.5">
            {popularCalcs.map((name) => {
              const calc = allCalcs.find((c) => c.name === name);
              if (!calc) return null;
              const Icon = catIcon[calc.cat];
              const style = catStyle[calc.cat];
              return (
                <button
                  key={calc.path}
                  onClick={() => setQuery(calc.name)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#18181b] border border-white/5 hover:border-white/10 hover:bg-[#1c1c1f] transition-all text-left group"
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${style.bg}`}>
                    <Icon className={`w-3 h-3 ${style.text}`} />
                  </div>
                  <span className="text-[#a1a1aa] group-hover:text-white text-sm transition-colors truncate">{calc.name}</span>
                </button>
              );
            })}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {["Financial", "Health", "Math", "Other"].map((cat) => {
              const style = catStyle[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setQuery(cat)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all hover:scale-105 ${style.bg} ${style.text} ${style.border}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="fixed bottom-6 text-[10px] text-[#3f3f46] tracking-widest uppercase">
        {allCalcs.length} calculators available
      </p>
    </div>
  );
}
