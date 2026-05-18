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
  tax: z.coerce.number().min(0),
});

export function SalesTaxCalc() {
  const [result, setResult] = useState<{ taxAmount: number, finalPrice: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: 100, tax: 8.5 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const taxAmount = v.price * (v.tax / 100);
    setResult({ taxAmount, finalPrice: v.price + taxAmount });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div><h1 className="text-3xl font-bold">Sales Tax Calculator</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Purchase Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Before-Tax Price ($)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="tax" render={({ field }) => (
                  <FormItem><FormLabel>Sales Tax Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
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
              <div><p className="text-sm">Tax Amount</p><p className="text-2xl font-bold">${result.taxAmount.toFixed(2)}</p></div>
              <div><p className="text-sm">Final Price</p><p className="text-4xl font-bold">${result.finalPrice.toFixed(2)}</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}