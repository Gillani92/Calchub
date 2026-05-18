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
  age: z.coerce.number().min(15).max(100),
  sex: z.string(),
  weight: z.coerce.number().min(30).max(300),
  height: z.coerce.number().min(100).max(250),
  activity: z.string(),
});

export function CalorieCalc() {
  const [result, setResult] = useState<{ tdee: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { age: 30, sex: "male", weight: 75, height: 175, activity: "1.2" },
  });

  function calc(v: z.infer<typeof formSchema>) {
    let bmr = 10 * v.weight + 6.25 * v.height - 5 * v.age;
    bmr += v.sex === "male" ? 5 : -161;
    setResult({ tdee: bmr * parseFloat(v.activity) });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Your Stats</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="sex" render={({ field }) => (
                    <FormItem><FormLabel>Sex</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select sex" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="weight" render={({ field }) => (
                    <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="height" render={({ field }) => (
                    <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="activity" render={({ field }) => (
                  <FormItem><FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select activity" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="1.2">Sedentary</SelectItem>
                        <SelectItem value="1.375">Light Exercise</SelectItem>
                        <SelectItem value="1.55">Moderate Exercise</SelectItem>
                        <SelectItem value="1.725">Active</SelectItem>
                        <SelectItem value="1.9">Very Active</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Daily Calories</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">Maintain Weight</p><p className="text-4xl font-bold">{Math.round(result.tdee)} kcal</p></div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm">Mild Weight Loss (0.25kg/wk)</p><p className="text-xl font-bold">{Math.round(result.tdee - 250)} kcal</p>
              </div>
              <div><p className="text-sm">Weight Loss (0.5kg/wk)</p><p className="text-xl font-bold">{Math.round(result.tdee - 500)} kcal</p></div>
              <div><p className="text-sm">Weight Gain (0.5kg/wk)</p><p className="text-xl font-bold">{Math.round(result.tdee + 500)} kcal</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}