import { useLocation } from "wouter";
import { programmaticVariants } from "@/lib/seo";
import { CalcWrapper } from "@/components/calc-wrapper";

import { MortgageCalc } from "@/pages/financial/mortgage";
import { CompoundInterestCalc } from "@/pages/financial/compound-interest";
import { BMICalc } from "@/pages/health/bmi";
import { CalorieCalc } from "@/pages/health/calorie";

const calcComponents: Record<string, React.ComponentType> = {
  "mortgage": MortgageCalc,
  "compound-interest": CompoundInterestCalc,
  "bmi": BMICalc,
  "calorie": CalorieCalc,
};

export function SEOVariantPage() {
  const [location] = useLocation();
  const variant = programmaticVariants.find((v) => v.path === location);

  if (!variant) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      </div>
    );
  }

  const CalculatorComponent = calcComponents[variant.calculatorId];
  if (!CalculatorComponent) return null;

  return (
    <CalcWrapper
      id={variant.calculatorId}
      variantH1={variant.h1}
      variantNote={variant.variantNote}
    >
      <CalculatorComponent />
    </CalcWrapper>
  );
}
