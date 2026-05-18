import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  amount: z.coerce.number().min(0),
  rate: z.coerce.number().min(0),
  months: z.coerce.number().min(1),
});

export function LoanCalc() {
  const [result, setResult] = useState<{ payment: number, total: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 10000, rate: 5, months: 60 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const r = v.rate / 100 / 12;
    const payment = (v.amount * r * Math.pow(1 + r, v.months)) / (Math.pow(1 + r, v.months) - 1);
    setResult({ payment, total: payment * v.months });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div><h1 className="text-3xl font-bold">Loan Calculator</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Input</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="amount" render={({ field }) => (
                  <FormItem><FormLabel>Loan Amount ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="rate" render={({ field }) => (
                  <FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="months" render={({ field }) => (
                  <FormItem><FormLabel>Term (months)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Result</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Monthly Payment</p><p className="text-4xl font-bold">${result.payment.toFixed(2)}</p></div>
              <div><p className="text-sm">Total Cost</p><p className="text-xl font-bold">${result.total.toFixed(2)}</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}