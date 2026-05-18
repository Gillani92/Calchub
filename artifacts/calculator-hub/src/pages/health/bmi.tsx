import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  weight: z.coerce.number().min(1, "Weight must be greater than 0"),
  height: z.coerce.number().min(1, "Height must be greater than 0"),
});

export function BMICalc() {
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 70,
      height: 175,
    },
  });

  function calculate(values: z.infer<typeof formSchema>) {
    const heightInMeters = values.height / 100;
    const bmi = values.weight / (heightInMeters * heightInMeters);
    
    let category = "Normal weight";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi >= 25 && bmi < 29.9) category = "Overweight";
    else if (bmi >= 30) category = "Obesity";

    setResult({ bmi, category });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BMI Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your Body Mass Index based on weight and height.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculate)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Your BMI</CardTitle>
              <CardDescription>Body Mass Index estimation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">BMI</p>
                <p className="text-4xl font-bold text-primary">
                  {result.bmi.toFixed(1)}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-border/50">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold text-xl">{result.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}