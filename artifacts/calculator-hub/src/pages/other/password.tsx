import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  length: z.coerce.number().min(4, "Min length is 4").max(128, "Max length is 128"),
  uppercase: z.boolean().default(true),
  lowercase: z.boolean().default(true),
  numbers: z.boolean().default(true),
  symbols: z.boolean().default(true),
});

export function PasswordGenerator() {
  const [password, setPassword] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    },
  });

  function generate(values: z.infer<typeof formSchema>) {
    if (!values.uppercase && !values.lowercase && !values.numbers && !values.symbols) return;

    let chars = "";
    if (values.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (values.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (values.numbers) chars += "0123456789";
    if (values.symbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let pwd = "";
    for (let i = 0; i < values.length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
  }

  function copy() {
    navigator.clipboard.writeText(password);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(generate)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="uppercase"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Include Uppercase</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lowercase"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Include Lowercase</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numbers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Include Numbers</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="symbols"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Include Symbols</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full">Generate Password</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {password && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Generated Password</CardTitle>
              <CardDescription>Copy and store securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-background border rounded-lg break-all font-mono text-lg font-medium text-center">
                {password}
              </div>
              <Button onClick={copy} variant="secondary" className="w-full">
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}