import { Link } from "wouter";
import { Calculator } from "lucide-react";
import { Nav } from "./nav";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="border-t bg-muted/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
                <Calculator className="w-5 h-5 text-primary" />
                CalcHub
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Free online calculators for finance, health, math, and everyday decisions.
              </p>
            </div>

            {/* Financial */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Financial</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/mortgage" className="hover:text-foreground transition-colors">Mortgage</Link></li>
                <li><Link href="/compound-interest" className="hover:text-foreground transition-colors">Compound Interest</Link></li>
                <li><Link href="/loan" className="hover:text-foreground transition-colors">Loan</Link></li>
                <li><Link href="/salary" className="hover:text-foreground transition-colors">Salary</Link></li>
                <li><Link href="/retirement" className="hover:text-foreground transition-colors">Retirement</Link></li>
                <li><Link href="/investment" className="hover:text-foreground transition-colors">Investment</Link></li>
              </ul>
            </div>

            {/* Health & Math */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Health &amp; Math</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/bmi" className="hover:text-foreground transition-colors">BMI Calculator</Link></li>
                <li><Link href="/calorie" className="hover:text-foreground transition-colors">Calorie Calculator</Link></li>
                <li><Link href="/body-fat" className="hover:text-foreground transition-colors">Body Fat</Link></li>
                <li><Link href="/percentage" className="hover:text-foreground transition-colors">Percentage</Link></li>
                <li><Link href="/age" className="hover:text-foreground transition-colors">Age Calculator</Link></li>
                <li><Link href="/random-number" className="hover:text-foreground transition-colors">Random Number</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Use</Link></li>
                <li><Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>© 2026 CalcHub. All rights reserved.</p>
            <p>Results are for informational purposes only — not professional advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
