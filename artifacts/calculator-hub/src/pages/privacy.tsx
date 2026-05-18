import { SEO } from "@/components/seo";

export function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
      <SEO title="Privacy Policy" description="CalcHub's Privacy Policy. Learn how we handle your data." />
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: May 18, 2026</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Collect</h2>
          <p>
            We believe in data minimization. We only collect minimal, anonymized analytics to understand how our website is used (e.g., page views, referring sites, and basic device information). We do not collect personally identifiable information unless you explicitly provide it (such as when contacting us).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Don't Collect</h2>
          <p>
            Your privacy is our priority. <strong>Calculator inputs never leave your browser.</strong> We do not transmit, log, or store any of the numbers, financial data, or health metrics you enter into our calculators. All computations are performed locally on your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p>
            CalcHub uses basic session cookies necessary for the functioning of the site (for instance, remembering your dark mode preference). We do not use intrusive tracking cookies or cross-site advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third Parties</h2>
          <p>
            We may use trusted third-party services for essential infrastructure (like hosting) and basic analytics. These providers are bound by their own strict privacy policies and are not permitted to use your data for independent purposes. We do not sell or share your data with advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data (such as the right to access, correct, or delete any data we might hold). Because we generally do not hold personal data, these requests are typically not applicable, but you may contact us with any concerns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us at <strong>privacy@calchub.net</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
