import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  principal: z.coerce.number().min(0),
  rate: z.coerce.number().min(0),
  time: z.coerce.number().min(0),
});

export function SimpleInterestCalc() {
  const [result, setResult] = useState<{ interest: number, total: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { principal: 1000, rate: 5, time: 5 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const interest = v.principal * (v.rate / 100) * v.time;
    setResult({ interest, total: v.principal + interest });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="principal" render={({ field }) => (
                  <FormItem><FormLabel>Principal Amount ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="rate" render={({ field }) => (
                  <FormItem><FormLabel>Annual Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="time" render={({ field }) => (
                  <FormItem><FormLabel>Time (years)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
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
              <div><p className="text-sm">Total Interest</p><p className="text-2xl font-bold">${result.interest.toFixed(2)}</p></div>
              <div><p className="text-sm">Total Balance</p><p className="text-4xl font-bold">${result.total.toFixed(2)}</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}