import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { ThemeProvider } from "@/components/theme-provider";

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

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        
        <Route path="/financial" component={FinancialIndex} />
        <Route path="/health" component={HealthIndex} />
        <Route path="/math" component={MathIndex} />
        <Route path="/other" component={OtherIndex} />

        <Route path="/mortgage" component={MortgageCalc} />
        <Route path="/compound-interest" component={CompoundInterestCalc} />
        <Route path="/loan" component={LoanCalc} />
        <Route path="/auto-loan" component={AutoLoanCalc} />
        <Route path="/salary" component={SalaryCalc} />
        <Route path="/tip" component={TipCalc} />
        <Route path="/sales-tax" component={SalesTaxCalc} />
        <Route path="/discount" component={DiscountCalc} />
        <Route path="/interest" component={SimpleInterestCalc} />
        <Route path="/investment" component={InvestmentCalc} />
        <Route path="/retirement" component={RetirementCalc} />
        <Route path="/inflation" component={InflationCalc} />
        
        <Route path="/bmi" component={BMICalc} />
        <Route path="/calorie" component={CalorieCalc} />
        <Route path="/body-fat" component={BodyFatCalc} />
        <Route path="/ideal-weight" component={IdealWeightCalc} />
        
        <Route path="/percentage" component={PercentageCalc} />
        <Route path="/age" component={AgeCalc} />
        <Route path="/random-number" component={RandomNumberCalc} />
        
        <Route path="/password" component={PasswordGenerator} />
        <Route path="/gas" component={GasCalc} />

        <Route component={NotFound} />
      </Switch>
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
