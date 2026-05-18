import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Contact() {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
      <SEO title="Contact Us" description="Get in touch with the CalcHub team." />
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">
        We're a small team building tools we hope you find useful. For bugs, suggestions, or feedback, email us directly at <strong>contact@calchub.net</strong>.
      </p>

      <div className="bg-card border rounded-lg p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="How can we help?" rows={4} />
          </div>
          <Button type="button" className="w-full">Send Message</Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            We typically respond within 2 business days.
          </p>
        </form>
      </div>
    </div>
  );
}
