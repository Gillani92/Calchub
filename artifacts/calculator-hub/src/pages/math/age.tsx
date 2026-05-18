import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  birthdate: z.string().min(1, "Required"),
});

export function AgeCalc() {
  const [res, setRes] = useState<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { birthdate: "2000-01-01" } });

  function calc(v: z.infer<typeof formSchema>) {
    const bd = new Date(v.birthdate);
    const diff = Date.now() - bd.getTime();
    const age = new Date(diff);
    setRes({
      years: Math.abs(age.getUTCFullYear() - 1970),
      months: age.getUTCMonth(),
      days: age.getUTCDate() - 1
    });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Birthdate</CardTitle></CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calc)} className="space-y-4">
                <FormField control={form.control} name="birthdate" render={({ field }) => (
                  <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {res && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle>Your Age</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-bold">{res.years} years, {res.months} months, {res.days} days</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}