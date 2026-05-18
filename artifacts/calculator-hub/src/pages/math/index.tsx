import { Link } from "wouter";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculators } from "@/lib/calculators";

export function MathIndex() {
  const mathCalcs = calculators.filter(c => c.category === "math");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Math Calculators</h1>
        <p className="text-muted-foreground mt-2">
          Solve percentages, fractions, dates, and complex equations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mathCalcs.map((calc) => (
          <Link key={calc.id} href={calc.path}>
            <Card className="h-full hover-elevate transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{calc.name}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}