import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  bill: z.coerce.number().min(0),
  tipPercent: z.coerce.number().min(0),
  people: z.coerce.number().min(1),
});

export function TipCalc() {
  const [result, setResult] = useState<{ tipAmount: number, totalAmount: number, tipPerPerson: number, totalPerPerson: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { bill: 50, tipPercent: 20, people: 1 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const tipAmount = v.bill * (v.tipPercent / 100);
    const totalAmount = v.bill + tipAmount;
    setResult({
      tipAmount,
      totalAmount,
      tipPerPerson: tipAmount / v.people,
      totalPerPerson: totalAmount / v.people
    });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Bill Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="bill" render={({ field }) => (
                  <FormItem><FormLabel>Bill Amount ($)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="tipPercent" render={({ field }) => (
                  <FormItem><FormLabel>Tip (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="people" render={({ field }) => (
                  <FormItem><FormLabel>Number of People</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Tip Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Total Tip</p><p className="text-2xl font-bold">${result.tipAmount.toFixed(2)}</p></div>
              <div><p className="text-sm">Total Bill (with tip)</p><p className="text-4xl font-bold">${result.totalAmount.toFixed(2)}</p></div>
              {form.getValues().people > 1 && (
                <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                  <div><p className="text-sm">Tip per Person</p><p className="text-xl font-bold">${result.tipPerPerson.toFixed(2)}</p></div>
                  <div><p className="text-sm">Total per Person</p><p className="text-xl font-bold">${result.totalPerPerson.toFixed(2)}</p></div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}