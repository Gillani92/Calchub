import { SEO } from "@/components/seo";

export function About() {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
      <SEO title="About CalcHub" description="Learn about CalcHub's mission to provide free, accurate online calculators." />
      <h1 className="text-3xl font-bold mb-6">About CalcHub</h1>
      <p className="text-lg text-muted-foreground mb-8">
        CalcHub provides free, accurate online calculators for financial planning, health tracking, and everyday math. No sign-up, no paywalls, no data collection.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Tools</h2>
          <p className="mb-4">
            We organize our calculators into categories to help you find exactly what you need:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Financial:</strong> From complex mortgage amortizations to simple tips and sales tax.</li>
            <li><strong>Health:</strong> Track your BMI, estimate body fat, and calculate your daily caloric needs.</li>
            <li><strong>Math & Other:</strong> Everyday utilities like percentage calculators, age finders, and password generators.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="mb-4">
            We believe that basic computational tools should be accessible to everyone without compromising privacy or user experience.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Accuracy:</strong> Our calculators use standard mathematical and scientific formulas.</li>
            <li><strong>Privacy:</strong> We don't send your data to any servers. All calculations happen entirely in your browser.</li>
            <li><strong>Free Forever:</strong> No paywalls, no subscriptions, no locked features.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p>
            All results provided by CalcHub are for informational and educational purposes only. They do not constitute financial, medical, legal, or professional advice. Always consult a qualified professional for important decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
