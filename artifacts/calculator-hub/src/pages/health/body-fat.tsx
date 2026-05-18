import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  sex: z.string(),
  age: z.coerce.number().min(1),
  weight: z.coerce.number().min(1),
  height: z.coerce.number().min(1),
  neck: z.coerce.number().min(1),
  waist: z.coerce.number().min(1),
  hip: z.coerce.number().optional(), // only for females
});

export function BodyFatCalc() {
  const [result, setResult] = useState<{ bf: number, category: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { sex: "male", age: 30, weight: 75, height: 175, neck: 38, waist: 85, hip: 95 },
  });

  const sex = form.watch("sex");

  function calc(v: z.infer<typeof formSchema>) {
    let bf = 0;
    // Navy method
    if (v.sex === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(v.waist - v.neck) + 0.15456 * Math.log10(v.height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(v.waist + (v.hip || 0) - v.neck) + 0.22100 * Math.log10(v.height)) - 450;
    }
    
    let category = "Average";
    if (v.sex === "male") {
      if (bf < 6) category = "Essential fat";
      else if (bf < 14) category = "Athletes";
      else if (bf < 18) category = "Fitness";
      else if (bf < 25) category = "Average";
      else category = "Obese";
    } else {
      if (bf < 14) category = "Essential fat";
      else if (bf < 21) category = "Athletes";
      else if (bf < 25) category = "Fitness";
      else if (bf < 32) category = "Average";
      else category = "Obese";
    }
    setResult({ bf, category });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Measurements (cm/kg)</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="sex" render={({ field }) => (
                  <FormItem><FormLabel>Sex</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="weight" render={({ field }) => (
                    <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="neck" render={({ field }) => (
                  <FormItem><FormLabel>Neck (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="waist" render={({ field }) => (
                  <FormItem><FormLabel>Waist (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                {sex === "female" && (
                  <FormField control={form.control} name="hip" render={({ field }) => (
                    <FormItem><FormLabel>Hip (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                )}
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Result</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Body Fat %</p><p className="text-4xl font-bold">{result.bf.toFixed(1)}%</p></div>
              <div><p className="text-sm">Category</p><p className="text-xl font-bold">{result.category}</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}