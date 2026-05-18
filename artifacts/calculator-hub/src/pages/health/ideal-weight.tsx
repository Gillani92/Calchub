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
  height: z.coerce.number().min(100),
});

export function IdealWeightCalc() {
  const [result, setResult] = useState<{ devine: number, robinson: number, miller: number, hamwi: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { sex: "male", height: 175 },
  });

  function calc(v: z.infer<typeof formSchema>) {
    // inches over 5 ft (60 inches)
    const heightInches = v.height / 2.54;
    const over5ft = Math.max(0, heightInches - 60);

    let devine, robinson, miller, hamwi;
    if (v.sex === "male") {
      devine = 50 + 2.3 * over5ft;
      robinson = 52 + 1.9 * over5ft;
      miller = 56.2 + 1.41 * over5ft;
      hamwi = 48 + 2.7 * over5ft;
    } else {
      devine = 45.5 + 2.3 * over5ft;
      robinson = 49 + 1.7 * over5ft;
      miller = 53.1 + 1.36 * over5ft;
      hamwi = 45.5 + 2.2 * over5ft;
    }
    setResult({ devine, robinson, miller, hamwi });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
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
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Formulas (kg)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><p className="text-sm">J. Devine (1974)</p><p className="text-2xl font-bold">{result.devine.toFixed(1)} kg</p></div>
              <div><p className="text-sm">J. Robinson (1983)</p><p className="text-2xl font-bold">{result.robinson.toFixed(1)} kg</p></div>
              <div><p className="text-sm">D. Miller (1983)</p><p className="text-2xl font-bold">{result.miller.toFixed(1)} kg</p></div>
              <div><p className="text-sm">G. Hamwi (1964)</p><p className="text-2xl font-bold">{result.hamwi.toFixed(1)} kg</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}