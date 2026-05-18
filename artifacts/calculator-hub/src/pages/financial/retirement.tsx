import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  currentAge: z.coerce.number().min(0),
  retirementAge: z.coerce.number().min(0),
  currentSavings: z.coerce.number().min(0),
  monthlyContribution: z.coerce.number().min(0),
  annualReturn: z.coerce.number().min(0),
});

export function RetirementCalc() {
  const [result, setResult] = useState<{ total: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { currentAge: 30, retirementAge: 65, currentSavings: 50000, monthlyContribution: 1000, annualReturn: 7 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const years = v.retirementAge - v.currentAge;
    if (years <= 0) return;
    const r = v.annualReturn / 100 / 12;
    const n = years * 12;
    const savingsFuture = v.currentSavings * Math.pow(1 + r, n);
    const contributionsFuture = v.monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    setResult({ total: savingsFuture + contributionsFuture });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="currentAge" render={({ field }) => (
                    <FormItem><FormLabel>Current Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="retirementAge" render={({ field }) => (
                    <FormItem><FormLabel>Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="currentSavings" render={({ field }) => (
                  <FormItem><FormLabel>Current Savings ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="monthlyContribution" render={({ field }) => (
                  <FormItem><FormLabel>Monthly Contribution ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="annualReturn" render={({ field }) => (
                  <FormItem><FormLabel>Annual Return (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Projected Savings</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">Total at Retirement</p>
              <p className="text-4xl font-bold">${result.total.toFixed(2)}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}