export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  relatedCalculators: string[];
  content: BlogSection[];
}

export interface BlogSection {
  type: "intro" | "h2" | "h3" | "p" | "ul" | "ol" | "callout" | "table";
  text?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  variant?: "tip" | "warning" | "info";
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "how-to-calculate-your-bmi",
    title: "How to Calculate Your BMI — The Complete Guide",
    description: "Everything you need to know about Body Mass Index: the formula, BMI categories, limitations, and what your number really means for your health.",
    category: "Health",
    readTime: "6 min read",
    publishedDate: "2026-04-10",
    updatedDate: "2026-05-18",
    relatedCalculators: ["bmi", "calorie", "ideal-weight", "body-fat"],
    content: [
      { type: "intro", text: "Body Mass Index (BMI) is the most widely used screening tool for weight status in adults. Despite its simplicity, it's often misunderstood. This guide explains exactly what BMI is, how to calculate it, what the categories mean, and where it falls short." },
      { type: "h2", text: "What Is BMI?" },
      { type: "p", text: "BMI is a numerical value derived from your height and weight. Invented by Belgian statistician Adolphe Quetelet in the 1830s, it was originally designed as a population-level tool for measuring obesity rates — not as an individual diagnostic." },
      { type: "h2", text: "The BMI Formula" },
      { type: "p", text: "Metric: BMI = weight (kg) / [height (m)]². Imperial: BMI = 703 × weight (lbs) / [height (in)]²." },
      { type: "h2", text: "BMI Categories" },
      { type: "table", headers: ["Category", "BMI Range"], rows: [["Underweight", "< 18.5"], ["Normal weight", "18.5 – 24.9"], ["Overweight", "25.0 – 29.9"], ["Obesity (Class I)", "30.0 – 34.9"], ["Obesity (Class II)", "35.0 – 39.9"], ["Obesity (Class III)", "≥ 40.0"]] },
      { type: "h2", text: "Limitations of BMI" },
      { type: "ul", items: ["Does not distinguish between muscle and fat — athletes often score 'overweight'", "Does not account for fat distribution (visceral vs. subcutaneous fat)", "The same BMI carries different health risks by age, sex, and ethnicity", "Not appropriate for children, pregnant women, or the elderly without adjusted scales"] },
      { type: "callout", variant: "tip", text: "Use BMI as a starting point, then supplement with body fat percentage measurement and waist circumference for a more complete picture of body composition." },
    ],
  },
  {
    slug: "mortgage-vs-renting",
    title: "Mortgage vs. Renting: A Financial Comparison for 2026",
    description: "Should you buy or rent? This article breaks down the true financial costs of mortgages and renting, including opportunity cost, equity, and tax implications.",
    category: "Finance",
    readTime: "8 min read",
    publishedDate: "2026-03-22",
    updatedDate: "2026-05-18",
    relatedCalculators: ["mortgage", "investment", "compound-interest", "inflation"],
    content: [
      { type: "intro", text: "The buy vs. rent debate has no universal answer — it depends on your local market, time horizon, financial situation, and personal priorities. This guide walks through the real numbers on both sides." },
      { type: "h2", text: "The Hidden Costs of Owning a Home" },
      { type: "ul", items: ["Property taxes (typically 1–2% of home value per year)", "Homeowner's insurance (0.5–1%/year)", "Maintenance and repairs (budget 1–2%/year)", "HOA fees if applicable", "Mortgage interest (especially heavy in early years)", "Closing costs when buying (2–5%) and selling (6–10%)"] },
      { type: "h2", text: "The Hidden Costs of Renting" },
      { type: "ul", items: ["No equity is being built", "Subject to annual rent increases", "No control over long-term housing costs", "Potential displacement by landlord"] },
      { type: "h2", text: "The Break-Even Horizon" },
      { type: "p", text: "Due to closing costs and the early-payment structure of mortgages (where most of your payment is interest), buying only becomes financially advantageous after a break-even period — typically 5–7 years. If you plan to move sooner, renting often wins." },
      { type: "callout", variant: "info", text: "Run both scenarios through the mortgage calculator and compound interest calculator to compare what your down payment and monthly cost difference would generate if invested instead." },
    ],
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest Explained: The Eighth Wonder of the World",
    description: "Understand how compound interest works, why starting early matters so much, and how to use it to build wealth over time.",
    category: "Finance",
    readTime: "5 min read",
    publishedDate: "2026-02-14",
    updatedDate: "2026-05-18",
    relatedCalculators: ["compound-interest", "investment", "retirement", "inflation"],
    content: [
      { type: "intro", text: "Compound interest is earning interest on interest — a seemingly small effect that becomes enormous over long time horizons. Albert Einstein reportedly called it the 'eighth wonder of the world.' Whether that quote is apocryphal or not, the math is undeniable." },
      { type: "h2", text: "Simple Interest vs. Compound Interest" },
      { type: "table", headers: ["Feature", "Simple", "Compound"], rows: [["Interest earned on", "Principal only", "Principal + prior interest"], ["Growth rate", "Linear", "Exponential"], ["Better for", "Short-term debt", "Long-term savings"]] },
      { type: "h2", text: "The Rule of 72" },
      { type: "p", text: "Divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 6%, your money doubles in 12 years. At 9%, in 8 years. At 12%, in 6 years." },
      { type: "h2", text: "Why Starting Early Is Everything" },
      { type: "p", text: "Two investors both earn 8% annually. Investor A saves $300/month from age 25–35 (10 years, $36,000 total) then stops. Investor B saves $300/month from age 35–65 (30 years, $108,000 total). At 65, Investor A has more money — despite contributing 3× less — because of 30 extra years of compounding." },
      { type: "callout", variant: "warning", text: "Compound interest works against you on debt. Credit card balances at 20–29% APR grow very quickly — pay them off as fast as possible." },
    ],
  },
  {
    slug: "understanding-calorie-deficit",
    title: "Calorie Deficit Explained: How to Lose Weight Safely",
    description: "Learn what a calorie deficit is, how to calculate yours, how much of a deficit is safe, and practical tips for maintaining one without feeling deprived.",
    category: "Health",
    readTime: "7 min read",
    publishedDate: "2026-01-30",
    updatedDate: "2026-05-18",
    relatedCalculators: ["calorie", "bmi", "macro", "ideal-weight"],
    content: [
      { type: "intro", text: "Weight loss fundamentally comes down to energy balance: consume fewer calories than your body burns, and your body draws on stored fat for energy. But the details matter enormously — too large a deficit leads to muscle loss, nutrient deficiencies, and eventual rebound." },
      { type: "h2", text: "What Is TDEE?" },
      { type: "p", text: "Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns each day, including your resting metabolism (BMR) and all physical activity. Eating at TDEE maintains your weight. Eating below it causes weight loss." },
      { type: "h2", text: "Safe Calorie Deficit Ranges" },
      { type: "table", headers: ["Weekly Goal", "Daily Deficit", "Notes"], rows: [["0.25 kg (0.5 lb) loss", "~275 kcal", "Very sustainable, minimal hunger"], ["0.5 kg (1 lb) loss", "~500 kcal", "Standard recommendation"], ["1 kg (2 lb) loss", "~1,000 kcal", "Aggressive — monitor carefully"], ["> 1 kg loss", "> 1,000 kcal", "Not recommended without medical guidance"]] },
      { type: "callout", variant: "tip", text: "Never eat below 1,200 kcal/day (women) or 1,500 kcal/day (men) without medical supervision. Very low calorie intake causes muscle loss and metabolic adaptation." },
    ],
  },
  {
    slug: "salary-negotiation-guide",
    title: "How to Negotiate Your Salary: A Data-Driven Guide",
    description: "Use salary data and these proven negotiation strategies to get paid what you're worth. Includes how to calculate your true hourly rate and compare offer packages.",
    category: "Finance",
    readTime: "6 min read",
    publishedDate: "2026-05-01",
    updatedDate: "2026-05-18",
    relatedCalculators: ["salary", "income-tax", "retirement", "investment"],
    content: [
      { type: "intro", text: "Salary negotiation is one of the highest-leverage financial decisions you'll make. A $5,000 raise compounded over a 30-year career with normal promotions can translate to hundreds of thousands of dollars in additional lifetime earnings." },
      { type: "h2", text: "Know Your Numbers Before Negotiating" },
      { type: "ul", items: ["Convert the offer to hourly rate to compare contract vs. full-time accurately", "Account for benefits: health insurance, 401k match, PTO, remote work (worth $5,000–$15,000+/year)", "Research market rate using LinkedIn Salary, Glassdoor, Levels.fyi, and the Bureau of Labor Statistics"] },
      { type: "h2", text: "The Negotiation Framework" },
      { type: "ol", items: ["Let the employer make the first offer", "Express enthusiasm while asking for time to consider", "Counter with a specific number (not a range)", "Anchor high — you can always come down", "If salary is fixed, negotiate benefits, remote work, sign-on bonus, or equity"] },
      { type: "callout", variant: "info", text: "Use the salary calculator to convert any hourly offer to annual salary so you can compare apples to apples across different job types." },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}
