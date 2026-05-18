import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  homePrice: z.coerce.number().min(0, "Must be greater than 0"),
  downPayment: z.coerce.number().min(0, "Must be greater than 0"),
  loanTerm: z.coerce.number().min(1, "Must be at least 1 year").max(50, "Max 50 years"),
  interestRate: z.coerce.number().min(0, "Must be greater than 0").max(100, "Max 100%"),
});

export function MortgageCalc() {
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPrincipal: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homePrice: 300000,
      downPayment: 60000,
      loanTerm: 30,
      interestRate: 6.5,
    },
  });

  function calculate(values: z.infer<typeof formSchema>) {
    const principal = values.homePrice - values.downPayment;
    const monthlyRate = values.interestRate / 100 / 12;
    const numPayments = values.loanTerm * 12;

    if (principal <= 0) {
      setResult({ monthlyPayment: 0, totalPrincipal: 0, totalInterest: 0, totalCost: 0 });
      return;
    }

    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalCost = monthlyPayment * numPayments;
    const totalInterest = totalCost - principal;

    setResult({
      monthlyPayment,
      totalPrincipal: principal,
      totalInterest,
      totalCost
    });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mortgage Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your monthly mortgage payments and total interest over the life of the loan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculate)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="homePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="downPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Down Payment ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loanTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Term (years)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>Your estimated mortgage details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-4xl font-bold text-primary">
                  ${result.monthlyPayment.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Principal Amount</p>
                  <p className="font-semibold">${result.totalPrincipal.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="font-semibold">${result.totalInterest.toFixed(2)}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm text-muted-foreground">Total Cost of Loan</p>
                  <p className="font-semibold">${result.totalCost.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}