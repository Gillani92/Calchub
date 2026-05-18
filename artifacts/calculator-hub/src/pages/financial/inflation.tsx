import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  amount: z.coerce.number().min(0),
  rate: z.coerce.number(),
  years: z.coerce.number().min(1),
});

export function InflationCalc() {
  const [result, setResult] = useState<{ future: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 100, rate: 3, years: 10 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const future = v.amount * Math.pow(1 + v.rate / 100, v.years);
    setResult({ future });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div><h1 className="text-3xl font-bold">Inflation Calculator</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="amount" render={({ field }) => (
                  <FormItem><FormLabel>Initial Amount ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="rate" render={({ field }) => (
                  <FormItem><FormLabel>Inflation Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="years" render={({ field }) => (
                  <FormItem><FormLabel>Years</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Future Cost</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">Equivalent Value</p>
              <p className="text-4xl font-bold">${result.future.toFixed(2)}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}