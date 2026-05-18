import { SEO } from "@/components/seo";

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
      <SEO title="Terms of Use" description="CalcHub's Terms of Use." />
      <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective Date: May 18, 2026</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using CalcHub ("the Website"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
          <p>
            CalcHub provides various calculators for personal, non-commercial use. You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Accuracy Disclaimer</h2>
          <p>
            While we strive for accuracy, the results provided by CalcHub are for informational and educational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any information on the site. You should not rely solely on these tools for critical financial, medical, or legal decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            The content, layout, design, data, databases, and graphics on this website are protected by intellectual property laws and are owned by CalcHub. You may not reproduce, modify, copy, or distribute any part of our site for commercial purposes without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            CalcHub and its creators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Website, or from relying on any information provided on the Website. Use the calculators at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will indicate the date of the latest update at the top of this page. Your continued use of the Website after any changes constitutes your acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            For any questions regarding these Terms, please contact us at <strong>legal@calchub.net</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
