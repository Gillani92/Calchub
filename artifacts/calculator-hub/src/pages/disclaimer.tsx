import { SEO } from "@/components/seo";

export function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
      <SEO title="Disclaimer" description="CalcHub Disclaimer for financial and medical information." />
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

      <div className="space-y-8">
        <section>
          <p className="text-lg font-medium">
            Results from CalcHub calculators are for informational and educational purposes only. They do not constitute financial, medical, legal, or professional advice. Always consult qualified professionals for important decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Financial Disclaimer</h2>
          <p>
            The financial calculators (such as mortgage, loan, and investment calculators) provide estimates based on the information you provide and standard mathematical formulas. They do not take into account all possible fees, taxes, or market conditions. These tools should not be construed as investment or financial advice. We strongly recommend consulting with a certified financial planner, tax professional, or your lender before making major financial commitments.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Health Disclaimer</h2>
          <p>
            The health and fitness calculators (such as BMI, Calorie, and Body Fat calculators) provide broad estimates intended for general guidance. They are not diagnostic tools and cannot replace the medical judgment of a healthcare provider. Individual health requirements vary greatly based on medical history, genetics, and other factors. Always consult a physician or registered dietitian before beginning any diet, exercise program, or making decisions about your health.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Errors and Omissions</h2>
          <p>
            While we make every effort to ensure the formulas and data used on our site are accurate and up-to-date, CalcHub assumes no responsibility for any errors or omissions, or for the results obtained from the use of this information. All information on this site is provided "as is," with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information.
          </p>
        </section>
      </div>
    </div>
  );
}
