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
  discount: z.coerce.number().min(0).max(100),
});

export function DiscountCalc() {
  const [result, setResult] = useState<{ savings: number, finalPrice: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: 100, discount: 20 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    const savings = v.price * (v.discount / 100);
    setResult({ savings, finalPrice: v.price - savings });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div><h1 className="text-3xl font-bold">Discount Calculator</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Item Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Original Price ($)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="discount" render={({ field }) => (
                  <FormItem><FormLabel>Discount (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Savings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Amount Saved</p><p className="text-2xl font-bold text-green-600">${result.savings.toFixed(2)}</p></div>
              <div><p className="text-sm">Final Sale Price</p><p className="text-4xl font-bold">${result.finalPrice.toFixed(2)}</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}