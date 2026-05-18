import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  x: z.coerce.number(),
  y: z.coerce.number().min(0.000000000001, "Cannot be exactly 0"),
});

export function PercentageCalc() {
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      x: 20,
      y: 100,
    },
  });

  function calculateWhatPercent(values: z.infer<typeof formSchema>) {
    setResult((values.x / values.y) * 100);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculateWhatPercent)} className="space-y-4">
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="x"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Value X</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="mt-8 font-medium">is what % of</span>
                  <FormField
                    control={form.control}
                    name="y"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Value Y</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result !== null && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Percentage calculation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Percentage</p>
                <p className="text-4xl font-bold text-primary">
                  {result.toFixed(2)}%
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}