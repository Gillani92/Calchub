import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  min: z.coerce.number(),
  max: z.coerce.number(),
  count: z.coerce.number().min(1).max(100),
});

export function RandomNumberCalc() {
  const [result, setResult] = useState<number[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { min: 1, max: 100, count: 1 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    if (v.min > v.max) return;
    const nums: number[] = [];
    for (let i = 0; i < v.count; i++) {
      nums.push(Math.floor(Math.random() * (v.max - v.min + 1)) + v.min);
    }
    setResult(nums);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="min" render={({ field }) => (
                    <FormItem><FormLabel>Min</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="max" render={({ field }) => (
                    <FormItem><FormLabel>Max</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="count" render={({ field }) => (
                  <FormItem><FormLabel>Quantity</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Generate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Result</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.map((n, i) => (
                  <div key={i} className="bg-background border rounded px-3 py-2 text-xl font-mono font-bold">
                    {n}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}