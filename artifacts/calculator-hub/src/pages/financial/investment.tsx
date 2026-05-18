import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  initial: z.coerce.number().min(0),
  monthly: z.coerce.number().min(0),
  rate: z.coerce.number().min(0),
  years: z.coerce.number().min(1),
});

export function InvestmentCalc() {
  const [result, setResult] = useState<{ total: number, contributions: number, interest: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { initial: 10000, monthly: 500, rate: 7, years: 20 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const r = v.rate / 100 / 12;
    const n = v.years * 12;
    const initialFuture = v.initial * Math.pow(1 + r, n);
    const contributionsFuture = v.monthly * ((Math.pow(1 + r, n) - 1) / r);
    const total = initialFuture + contributionsFuture;
    const totalContributions = v.initial + (v.monthly * n);
    setResult({ total, contributions: totalContributions, interest: total - totalContributions });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Investment Plan</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="initial" render={({ field }) => (
                  <FormItem><FormLabel>Initial Investment ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="monthly" render={({ field }) => (
                  <FormItem><FormLabel>Monthly Contribution ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="rate" render={({ field }) => (
                  <FormItem><FormLabel>Annual Return Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="years" render={({ field }) => (
                  <FormItem><FormLabel>Years to Grow</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Future Value</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Total Balance</p><p className="text-4xl font-bold">${result.total.toFixed(2)}</p></div>
              <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                <div><p className="text-sm">Total Contributions</p><p className="text-xl font-bold">${result.contributions.toFixed(2)}</p></div>
                <div><p className="text-sm">Total Interest Earned</p><p className="text-xl font-bold">${result.interest.toFixed(2)}</p></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}