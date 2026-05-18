import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({ hourly: z.coerce.number().min(0) });

export function SalaryCalc() {
  const [res, setRes] = useState<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { hourly: 25 } });

  function calc(v: z.infer<typeof formSchema>) {
    setRes({ yearly: v.hourly * 40 * 52, monthly: (v.hourly * 40 * 52) / 12, weekly: v.hourly * 40 });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div><h1 className="text-3xl font-bold">Salary Calculator</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Input</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="hourly" render={({ field }) => (
                  <FormItem><FormLabel>Hourly Wage ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {res && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Equivalent Salary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Yearly (40hr/wk)</p><p className="text-4xl font-bold">${res.yearly.toLocaleString()}</p></div>
              <div><p className="text-sm">Monthly</p><p className="text-xl font-bold">${res.monthly.toLocaleString()}</p></div>
              <div><p className="text-sm">Weekly</p><p className="text-xl font-bold">${res.weekly.toLocaleString()}</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}