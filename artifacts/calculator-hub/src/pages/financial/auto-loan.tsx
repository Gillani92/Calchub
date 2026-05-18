import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  price: z.coerce.number().min(0),
  downPayment: z.coerce.number().min(0),
  tradeIn: z.coerce.number().min(0),
  rate: z.coerce.number().min(0),
  term: z.coerce.number().min(1),
});

export function AutoLoanCalc() {
  const [result, setResult] = useState<{ payment: number, totalAmount: number, totalInterest: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: 25000, downPayment: 5000, tradeIn: 2000, rate: 4.5, term: 60 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const principal = v.price - v.downPayment - v.tradeIn;
    if (principal <= 0) {
      setResult({ payment: 0, totalAmount: 0, totalInterest: 0 });
      return;
    }
    const r = v.rate / 100 / 12;
    let payment = 0;
    if (r === 0) {
      payment = principal / v.term;
    } else {
      payment = (principal * r * Math.pow(1 + r, v.term)) / (Math.pow(1 + r, v.term) - 1);
    }
    const totalAmount = payment * v.term;
    setResult({ payment, totalAmount, totalInterest: totalAmount - principal });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Vehicle & Loan Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Vehicle Price ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="downPayment" render={({ field }) => (
                  <FormItem><FormLabel>Down Payment ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="tradeIn" render={({ field }) => (
                  <FormItem><FormLabel>Trade-in Value ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="rate" render={({ field }) => (
                  <FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="term" render={({ field }) => (
                  <FormItem><FormLabel>Loan Term (months)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Loan Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Monthly Payment</p><p className="text-4xl font-bold">${result.payment.toFixed(2)}</p></div>
              <div><p className="text-sm">Total Interest</p><p className="text-xl font-bold">${result.totalInterest.toFixed(2)}</p></div>
              <div><p className="text-sm">Total Paid</p><p className="text-xl font-bold">${result.totalAmount.toFixed(2)}</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}