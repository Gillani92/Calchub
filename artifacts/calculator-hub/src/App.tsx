import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { ThemeProvider } from "@/components/theme-provider";
import { lazy, Suspense } from "react";
import { CalcWrapper } from "@/components/calc-wrapper";

import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";

import { FinancialIndex } from "@/pages/financial";
import { HealthIndex } from "@/pages/health";
import { MathIndex } from "@/pages/math";
import { OtherIndex } from "@/pages/other";

import { MortgageCalc } from "@/pages/financial/mortgage";
import { CompoundInterestCalc } from "@/pages/financial/compound-interest";
import { LoanCalc } from "@/pages/financial/loan";
import { AutoLoanCalc } from "@/pages/financial/auto-loan";
import { SalaryCalc } from "@/pages/financial/salary";
import { TipCalc } from "@/pages/financial/tip";
import { SalesTaxCalc } from "@/pages/financial/sales-tax";
import { DiscountCalc } from "@/pages/financial/discount";
import { SimpleInterestCalc } from "@/pages/financial/interest";
import { InvestmentCalc } from "@/pages/financial/investment";
import { RetirementCalc } from "@/pages/financial/retirement";
import { InflationCalc } from "@/pages/financial/inflation";

import { BMICalc } from "@/pages/health/bmi";
import { CalorieCalc } from "@/pages/health/calorie";
import { BodyFatCalc } from "@/pages/health/body-fat";
import { IdealWeightCalc } from "@/pages/health/ideal-weight";

import { PercentageCalc } from "@/pages/math/percentage";
import { AgeCalc } from "@/pages/math/age";
import { RandomNumberCalc } from "@/pages/math/random-number";

import { PasswordGenerator } from "@/pages/other/password";
import { GasCalc } from "@/pages/other/gas";

import { SEOVariantPage } from "@/pages/seo-variants";

const About = lazy(() => import("@/pages/about").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("@/pages/contact").then((m) => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import("@/pages/privacy").then((m) => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import("@/pages/terms").then((m) => ({ default: m.Terms })));
const Disclaimer = lazy(() => import("@/pages/disclaimer").then((m) => ({ default: m.Disclaimer })));
const BlogIndex = lazy(() => import("@/pages/blog/index").then((m) => ({ default: m.BlogIndex })));
const BlogArticle = lazy(() => import("@/pages/blog/article").then((m) => ({ default: m.BlogArticle })));

const queryClient = new QueryClient();

function wrap(id: string, Component: React.ComponentType) {
  return function WrappedCalc() {
    return (
      <CalcWrapper id={id}>
        <Component />
      </CalcWrapper>
    );
  };
}

const Mortgage = wrap("mortgage", MortgageCalc);
const CompoundInterest = wrap("compound-interest", CompoundInterestCalc);
const Loan = wrap("loan", LoanCalc);
const AutoLoan = wrap("auto-loan", AutoLoanCalc);
const Salary = wrap("salary", SalaryCalc);
const Tip = wrap("tip", TipCalc);
const SalesTax = wrap("sales-tax", SalesTaxCalc);
const Discount = wrap("discount", DiscountCalc);
const SimpleInterest = wrap("interest", SimpleInterestCalc);
const Investment = wrap("investment", InvestmentCalc);
const Retirement = wrap("retirement", RetirementCalc);
const Inflation = wrap("inflation", InflationCalc);

const BMI = wrap("bmi", BMICalc);
const Calorie = wrap("calorie", CalorieCalc);
const BodyFat = wrap("body-fat", BodyFatCalc);
const IdealWeight = wrap("ideal-weight", IdealWeightCalc);

const Percentage = wrap("percentage", PercentageCalc);
const Age = wrap("age", AgeCalc);
const RandomNumber = wrap("random-number", RandomNumberCalc);

const Password = wrap("password", PasswordGenerator);
const Gas = wrap("gas", GasCalc);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />

          <Route path="/financial" component={FinancialIndex} />
          <Route path="/health" component={HealthIndex} />
          <Route path="/math" component={MathIndex} />
          <Route path="/other" component={OtherIndex} />

          {/* Financial calculators */}
          <Route path="/mortgage" component={Mortgage} />
          <Route path="/compound-interest" component={CompoundInterest} />
          <Route path="/loan" component={Loan} />
          <Route path="/auto-loan" component={AutoLoan} />
          <Route path="/salary" component={Salary} />
          <Route path="/tip" component={Tip} />
          <Route path="/sales-tax" component={SalesTax} />
          <Route path="/discount" component={Discount} />
          <Route path="/interest" component={SimpleInterest} />
          <Route path="/investment" component={Investment} />
          <Route path="/retirement" component={Retirement} />
          <Route path="/inflation" component={Inflation} />

          {/* Health calculators */}
          <Route path="/bmi" component={BMI} />
          <Route path="/calorie" component={Calorie} />
          <Route path="/body-fat" component={BodyFat} />
          <Route path="/ideal-weight" component={IdealWeight} />

          {/* Math calculators */}
          <Route path="/percentage" component={Percentage} />
          <Route path="/age" component={Age} />
          <Route path="/random-number" component={RandomNumber} />

          {/* Other tools */}
          <Route path="/password" component={Password} />
          <Route path="/gas" component={Gas} />

          {/* Programmatic SEO variants */}
          <Route path="/bmi-calculator-for-men" component={SEOVariantPage} />
          <Route path="/bmi-calculator-for-women" component={SEOVariantPage} />
          <Route path="/bmi-calculator-kg" component={SEOVariantPage} />
          <Route path="/bmi-calculator-pounds" component={SEOVariantPage} />
          <Route path="/mortgage-calculator-with-taxes" component={SEOVariantPage} />
          <Route path="/calorie-calculator-for-weight-loss" component={SEOVariantPage} />
          <Route path="/calorie-calculator-for-muscle-gain" component={SEOVariantPage} />
          <Route path="/compound-interest-calculator-monthly" component={SEOVariantPage} />

          {/* Blog */}
          <Route path="/blog" component={BlogIndex} />
          <Route path="/blog/:slug" component={BlogArticle} />

          {/* Legal / info pages */}
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/disclaimer" component={Disclaimer} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="calculator-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
