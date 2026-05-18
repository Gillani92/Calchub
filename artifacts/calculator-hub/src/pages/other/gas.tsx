import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  distance: z.coerce.number().min(0),
  mpg: z.coerce.number().min(0.1),
  price: z.coerce.number().min(0),
});

export function GasCalc() {
  const [res, setRes] = useState<number | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { distance: 100, mpg: 25, price: 3.5 } });

  function calc(v: z.infer<typeof formSchema>) {
    setRes((v.distance / v.mpg) * v.price);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Trip Details</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="distance" render={({ field }) => (
                  <FormItem><FormLabel>Distance (miles)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="mpg" render={({ field }) => (
                  <FormItem><FormLabel>Vehicle MPG</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Gas Price ($/gal)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {res !== null && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Total Cost</CardTitle></CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${res.toFixed(2)}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}