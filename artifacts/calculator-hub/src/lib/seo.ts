export interface CalculatorSEO {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  categoryPath: string;
  schema: "FinancialCalculator" | "HealthCalculator" | "MathCalculator" | "WebApplication";
  faq: Array<{ q: string; a: string }>;
  related: string[];
  intro: string;
  formula?: string;
  example?: string;
  updatedDate: string;
}

export const SITE_NAME = "CalcHub";
export const SITE_URL = "https://calchub.net";
export const SITE_DESCRIPTION =
  "Free online calculators for finance, health, math, and everyday decisions. Fast, accurate, and always free.";

export const calculatorSEO: Record<string, CalculatorSEO> = {
  mortgage: {
    id: "mortgage",
    path: "/mortgage",
    title: "Mortgage Calculator — Monthly Payment & Amortization | CalcHub",
    description:
      "Calculate your monthly mortgage payment, total interest paid, and full amortization schedule. Enter home price, down payment, interest rate, and loan term.",
    keywords: ["mortgage calculator", "monthly mortgage payment", "home loan calculator", "amortization schedule", "mortgage interest"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "A mortgage calculator helps you estimate your monthly payment and total interest cost before you commit to a home loan. Enter the purchase price, your down payment, the annual interest rate, and loan term to see exactly what you'll owe each month.",
    formula: "Monthly Payment = P × [r(1+r)^n] / [(1+r)^n – 1], where P = principal, r = monthly interest rate, n = number of payments.",
    example: "A $400,000 home with 20% down ($80,000), a 6.5% annual rate, and a 30-year term results in a ~$2,024/month payment and roughly $329,000 in total interest over the life of the loan.",
    faq: [
      { q: "What credit score do I need to get the best mortgage rate?", a: "Most lenders reserve their lowest rates for borrowers with a credit score of 740 or higher. Scores between 680–739 still qualify for good rates, while scores below 620 often require government-backed loans." },
      { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 15-year mortgage has higher monthly payments but dramatically lower total interest. A 30-year mortgage offers lower monthly payments and more cash-flow flexibility. Use the calculator to compare both scenarios." },
      { q: "What is included in a mortgage payment?", a: "A typical mortgage payment covers Principal (P), Interest (I), Property Taxes (T), and Homeowner's Insurance (I) — collectively called PITI. Some loans also include PMI if your down payment is below 20%." },
      { q: "How does the down payment affect my monthly payment?", a: "A larger down payment reduces the loan principal, which lowers monthly payments and total interest. Putting at least 20% down also eliminates private mortgage insurance (PMI)." },
    ],
    related: ["loan", "compound-interest", "investment", "inflation"],
  },

  "compound-interest": {
    id: "compound-interest",
    path: "/compound-interest",
    title: "Compound Interest Calculator — Watch Your Money Grow | CalcHub",
    description:
      "Calculate compound interest on savings or investments. See how principal grows with regular contributions over time, including annual, monthly, and daily compounding.",
    keywords: ["compound interest calculator", "compound interest formula", "investment growth calculator", "savings calculator", "interest compounding"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "Compound interest is interest earned on both the original principal and the previously accumulated interest — the engine behind long-term wealth building. Even modest contributions, compounded over decades, can produce surprisingly large balances.",
    formula: "A = P(1 + r/n)^(nt), where A = final amount, P = principal, r = annual rate, n = compounding periods per year, t = years.",
    example: "$10,000 invested at 7% annually, compounded monthly, grows to approximately $20,097 in 10 years — even without adding a single dollar more.",
    faq: [
      { q: "How often should interest compound for the best results?", a: "More frequent compounding (daily vs. annually) produces slightly higher returns. Daily compounding is marginally better than monthly, which is better than annual — but the difference narrows as the compounding frequency increases." },
      { q: "What is the Rule of 72?", a: "The Rule of 72 is a shortcut: divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 6%, your money doubles in roughly 12 years." },
      { q: "Does compound interest work against me on debt?", a: "Yes. On credit cards and loans, compound interest works against you — you pay interest on interest. That is why high-interest debt should be paid off quickly." },
    ],
    related: ["investment", "retirement", "inflation", "mortgage"],
  },

  loan: {
    id: "loan",
    path: "/loan",
    title: "Loan Calculator — Monthly Payment & Total Cost | CalcHub",
    description:
      "Calculate monthly payments, total interest, and total cost for any personal loan. Enter principal, interest rate, and term to see your full repayment breakdown.",
    keywords: ["loan calculator", "personal loan calculator", "monthly loan payment", "loan interest calculator", "loan payoff calculator"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "Whether it's a personal loan, home equity loan, or debt consolidation, this calculator shows your exact monthly payment and the total you'll pay over the life of the loan.",
    formula: "Monthly Payment = [P × r × (1+r)^n] / [(1+r)^n – 1], where r = monthly rate, n = total months.",
    example: "A $15,000 loan at 8% for 3 years has a monthly payment of approximately $470, totaling $16,920 — meaning $1,920 in interest.",
    faq: [
      { q: "What is a good interest rate on a personal loan?", a: "Rates vary by credit score. Excellent credit (720+) typically qualifies for 6–12%. Average credit (630–720) often sees 13–20%. Rates above 25% are generally considered high." },
      { q: "Can I pay off a loan early without penalty?", a: "Many personal loans allow early payoff. Check your loan agreement for prepayment penalties — some lenders charge a fee to recoup lost interest income." },
    ],
    related: ["mortgage", "auto-loan", "compound-interest", "salary"],
  },

  "auto-loan": {
    id: "auto-loan",
    path: "/auto-loan",
    title: "Auto Loan Calculator — Car Payment Estimator | CalcHub",
    description:
      "Estimate your monthly car payment. Enter vehicle price, down payment, trade-in value, interest rate, and loan term to see your true cost of financing a vehicle.",
    keywords: ["auto loan calculator", "car payment calculator", "car loan estimator", "vehicle financing calculator", "monthly car payment"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "An auto loan calculator helps you compare financing options and understand the total cost of vehicle ownership before you sign at the dealership. Include your down payment and trade-in value for an accurate monthly payment.",
    formula: "Financed Amount = Vehicle Price – Down Payment – Trade-In Value + Fees. Monthly Payment uses standard amortization formula.",
    example: "A $32,000 car with $4,000 down and a $3,000 trade-in at 6.9% for 60 months gives a monthly payment of approximately $493.",
    faq: [
      { q: "Is it better to get financing from the dealer or my bank?", a: "Banks and credit unions often offer lower rates than dealership financing, especially for used vehicles. Always get pre-approved before visiting the dealership to use as a negotiating tool." },
      { q: "How long should my auto loan term be?", a: "Shorter terms mean less total interest. 48–60 months is generally recommended; 72–84 month terms lower payments but significantly increase total interest paid and risk of being underwater on the loan." },
    ],
    related: ["loan", "gas", "salary", "discount"],
  },

  salary: {
    id: "salary",
    path: "/salary",
    title: "Salary Calculator — Hourly to Annual Pay Converter | CalcHub",
    description:
      "Convert between hourly, daily, weekly, biweekly, monthly, and annual salary. Quickly compare job offers or understand your true hourly rate from an annual salary.",
    keywords: ["salary calculator", "hourly to annual salary", "annual salary to hourly", "pay calculator", "wage calculator"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "Whether you're evaluating a job offer, calculating overtime, or comparing contract vs. full-time pay, this salary converter instantly shows your equivalent pay across all timeframes.",
    formula: "Annual = Hourly × Hours per Week × 52. Monthly = Annual / 12. Daily = Hourly × Hours per Day.",
    example: "$25/hour × 40 hours/week × 52 weeks = $52,000/year. Monthly: $4,333. Biweekly: $2,000.",
    faq: [
      { q: "How many working hours are in a year?", a: "A standard full-time schedule is 40 hours/week × 52 weeks = 2,080 hours per year. After 10 federal holidays, it's approximately 2,000 billable hours." },
      { q: "What is a good salary in the United States?", a: "The median US household income is approximately $74,000. What's 'good' depends heavily on location — the same salary goes much further in rural areas than in high cost-of-living cities." },
    ],
    related: ["income-tax", "retirement", "investment", "tip"],
  },

  tip: {
    id: "tip",
    path: "/tip",
    title: "Tip Calculator — Split Bills & Calculate Gratuity | CalcHub",
    description:
      "Calculate tip amount and split the bill among any number of people. Choose your tip percentage or enter a custom amount. Instant results for any restaurant or service.",
    keywords: ["tip calculator", "bill splitter", "gratuity calculator", "restaurant tip calculator", "split bill calculator"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "Quickly calculate how much to tip and split the total among your group. Works for restaurants, taxis, hotel staff, delivery drivers, and any other tipped service.",
    formula: "Tip Amount = Bill × (Tip % / 100). Per Person = (Bill + Tip) / Number of People.",
    example: "$87 dinner for 4 people with a 20% tip: tip = $17.40, total = $104.40, per person = $26.10.",
    faq: [
      { q: "How much should I tip at a restaurant?", a: "The standard tip at full-service restaurants is 18–20% for good service, 15% for average service, and 20–25% for exceptional service. Counter service typically warrants 10–15%." },
      { q: "Should I tip on the pre-tax or post-tax amount?", a: "Etiquette is split on this. Tipping on the pre-tax amount is technically correct, but most people tip on the total for simplicity. The difference on a typical bill is small." },
    ],
    related: ["sales-tax", "discount", "salary", "loan"],
  },

  "sales-tax": {
    id: "sales-tax",
    path: "/sales-tax",
    title: "Sales Tax Calculator — Add or Remove Tax Instantly | CalcHub",
    description:
      "Calculate sales tax on any purchase. Add tax to find the final price, or work backward to find the pre-tax price. Supports any tax rate for any US state or country.",
    keywords: ["sales tax calculator", "tax calculator", "add sales tax", "remove sales tax", "price with tax"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "Sales tax varies by state, county, and city — it can range from 0% to over 10%. This calculator handles both directions: find the final price including tax, or strip tax from a price you already paid.",
    formula: "Final Price = Pre-tax Price × (1 + Tax Rate). Pre-tax Price = Final Price / (1 + Tax Rate).",
    example: "A $299 item with 8.25% sales tax: $299 × 1.0825 = $321.67 final price. Tax amount = $22.67.",
    faq: [
      { q: "Which US states have no sales tax?", a: "Oregon, Montana, New Hampshire, Delaware, and Alaska have no statewide sales tax (though some Alaska localities do charge local tax)." },
      { q: "Is sales tax calculated on the pre-discount or post-discount price?", a: "Sales tax is calculated on the final sale price after any discounts are applied — not on the original price." },
    ],
    related: ["discount", "tip", "income-tax", "salary"],
  },

  discount: {
    id: "discount",
    path: "/discount",
    title: "Discount Calculator — Sale Price & Savings | CalcHub",
    description:
      "Calculate the discounted price, savings amount, and final cost from any percent-off deal. Works for retail sales, coupon codes, and bulk discounts.",
    keywords: ["discount calculator", "sale price calculator", "percent off calculator", "savings calculator", "coupon calculator"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro:
      "Whether you're shopping a Black Friday sale or applying a coupon code, this calculator instantly shows the discounted price and how much you're saving.",
    formula: "Sale Price = Original Price × (1 – Discount % / 100). Savings = Original Price – Sale Price.",
    example: "$150 jacket at 35% off: Sale Price = $150 × 0.65 = $97.50. You save $52.50.",
    faq: [
      { q: "How do I calculate a percentage off in my head?", a: "For 10% off, move the decimal one place left ($80 → $8 off). For 20% off, double that. For 25% off, divide by 4. Stack them for other percentages." },
      { q: "What's the difference between 50% off and buy-one-get-one-free?", a: "They are mathematically equivalent on a per-unit basis — both result in half the original price per item. However, BOGO requires buying two items while 50% off applies to a single purchase." },
    ],
    related: ["sales-tax", "tip", "investment", "salary"],
  },

  interest: {
    id: "interest",
    path: "/interest",
    title: "Simple Interest Calculator — Principal, Rate & Time | CalcHub",
    description:
      "Calculate simple interest on a loan or investment. Enter principal, annual interest rate, and time period to find interest earned or owed.",
    keywords: ["simple interest calculator", "simple interest formula", "interest calculator", "loan interest", "savings interest"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro: "Simple interest is calculated only on the original principal, making it straightforward to compute. It's commonly used for short-term loans, car loans, and some savings accounts.",
    formula: "Interest = P × R × T, where P = principal, R = annual rate (decimal), T = time in years. Total = P + Interest.",
    example: "$5,000 at 4% for 3 years: Interest = $5,000 × 0.04 × 3 = $600. Total = $5,600.",
    faq: [
      { q: "What is the difference between simple and compound interest?", a: "Simple interest is earned only on the principal. Compound interest is earned on the principal plus accumulated interest — making it grow faster over time." },
    ],
    related: ["compound-interest", "loan", "mortgage", "investment"],
  },

  investment: {
    id: "investment",
    path: "/investment",
    title: "Investment Calculator — Future Value with Contributions | CalcHub",
    description:
      "Calculate how your investments grow over time. Add initial investment, monthly contributions, expected return rate, and time horizon to project your portfolio's future value.",
    keywords: ["investment calculator", "portfolio calculator", "future value calculator", "investment return calculator", "stock market calculator"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro: "This investment calculator projects the future value of a portfolio that starts with an initial lump sum and receives regular monthly contributions — modeling real-world investing behavior.",
    formula: "FV = PV × (1+r)^n + PMT × [((1+r)^n – 1) / r], where r = monthly rate, n = months, PMT = monthly contribution.",
    example: "$10,000 initial investment with $500/month for 20 years at 7% annual return grows to approximately $297,000 — with only $130,000 contributed out-of-pocket.",
    faq: [
      { q: "What average return should I use for the stock market?", a: "The S&P 500 has averaged approximately 10% annually before inflation (about 7% after inflation) over long periods. Using 6–7% is a conservative and commonly recommended estimate for planning." },
      { q: "Does the order of returns matter?", a: "Yes — sequence of returns risk is real. Poor returns early in retirement can be far more damaging than the same average return distributed differently. This calculator assumes a constant rate." },
    ],
    related: ["retirement", "compound-interest", "inflation", "mortgage"],
  },

  retirement: {
    id: "retirement",
    path: "/retirement",
    title: "Retirement Calculator — Project Your Nest Egg | CalcHub",
    description:
      "Project your retirement savings balance. Enter current age, retirement age, current savings, monthly contribution, and expected return to see your estimated nest egg.",
    keywords: ["retirement calculator", "401k calculator", "retirement savings calculator", "nest egg calculator", "retirement planning"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro: "Retirement planning starts with knowing where you're headed. This calculator projects your savings balance at retirement age, accounting for your current savings, ongoing contributions, and expected investment growth.",
    formula: "Uses future value of a growing annuity formula across years until retirement age.",
    example: "A 35-year-old with $50,000 saved, contributing $800/month until age 65 at 7% return would accumulate approximately $1,180,000.",
    faq: [
      { q: "How much do I need to retire?", a: "A common rule of thumb is 25× your annual expenses (based on the 4% safe withdrawal rate). If you spend $60,000/year, you'd need $1.5 million. But this varies by health, lifestyle, and Social Security." },
      { q: "What is the 4% rule?", a: "The 4% rule suggests you can withdraw 4% of your portfolio in year one of retirement, then adjust for inflation annually, with a high probability of your money lasting 30 years." },
    ],
    related: ["investment", "compound-interest", "salary", "inflation"],
  },

  inflation: {
    id: "inflation",
    path: "/inflation",
    title: "Inflation Calculator — Future Value of Money | CalcHub",
    description:
      "Calculate how inflation erodes purchasing power over time. Enter an amount, start year, and end year to see what today's dollars will be worth in the future.",
    keywords: ["inflation calculator", "purchasing power calculator", "CPI calculator", "future value of money", "inflation rate calculator"],
    category: "Financial Calculators",
    categoryPath: "/financial",
    schema: "FinancialCalculator",
    updatedDate: "2026-05-18",
    intro: "Inflation silently reduces the value of money over time. This calculator shows you what a sum of money will be worth in the future given an assumed inflation rate.",
    formula: "Future Value = Present Value × (1 + Inflation Rate)^Years",
    example: "$100,000 today at 3% annual inflation is worth only $74,400 in purchasing power after 10 years.",
    faq: [
      { q: "What is the average US inflation rate?", a: "The Federal Reserve targets 2% annual inflation as healthy for the economy. Historical US inflation since 1913 averages about 3.3% annually, though recent years have seen higher spikes." },
    ],
    related: ["investment", "retirement", "compound-interest", "salary"],
  },

  bmi: {
    id: "bmi",
    path: "/bmi",
    title: "BMI Calculator — Body Mass Index for Adults | CalcHub",
    description:
      "Calculate your Body Mass Index (BMI) using height and weight. Supports imperial (lbs/ft) and metric (kg/cm) units. See your BMI category and healthy weight range.",
    keywords: ["bmi calculator", "body mass index calculator", "bmi chart", "bmi formula", "healthy weight calculator", "bmi for adults"],
    category: "Health Calculators",
    categoryPath: "/health",
    schema: "HealthCalculator",
    updatedDate: "2026-05-18",
    intro: "BMI (Body Mass Index) is a widely used screening tool that estimates whether a person has a healthy body weight relative to their height. While BMI does not measure body fat directly, it is a useful first-pass indicator for most adults.",
    formula: "BMI = weight (kg) / [height (m)]². Imperial: BMI = 703 × weight (lbs) / [height (in)]².",
    example: "A person 5'9\" (175 cm) weighing 165 lbs (75 kg): BMI = 75 / (1.75)² = 24.5 — Normal weight.",
    faq: [
      { q: "What are the BMI categories?", a: "Underweight: < 18.5 | Normal weight: 18.5–24.9 | Overweight: 25–29.9 | Obesity Class I: 30–34.9 | Obesity Class II: 35–39.9 | Obesity Class III: ≥ 40." },
      { q: "Is BMI accurate for athletes or muscular people?", a: "BMI can overestimate obesity in muscular athletes because muscle is denser than fat. Athletes may show a 'high' BMI while having very low body fat. Consider also measuring body fat percentage." },
      { q: "Does BMI differ for men and women?", a: "The BMI formula is the same for both sexes, but the health risks associated with a given BMI can differ. Women naturally carry more body fat than men at the same BMI." },
      { q: "What is a healthy BMI?", a: "For adults 20 and older, a BMI between 18.5 and 24.9 is considered normal or healthy." },
    ],
    related: ["calorie", "body-fat", "ideal-weight", "macro"],
  },

  calorie: {
    id: "calorie",
    path: "/calorie",
    title: "Calorie Calculator — Daily Calorie Needs (TDEE) | CalcHub",
    description:
      "Calculate your daily calorie needs using the Mifflin-St Jeor formula. Enter age, sex, height, weight, and activity level to find your TDEE and calorie targets for weight loss or gain.",
    keywords: ["calorie calculator", "TDEE calculator", "daily calorie needs", "calorie deficit calculator", "BMR calculator", "weight loss calories"],
    category: "Health Calculators",
    categoryPath: "/health",
    schema: "HealthCalculator",
    updatedDate: "2026-05-18",
    intro: "Your Total Daily Energy Expenditure (TDEE) is the number of calories you burn each day, accounting for your basal metabolic rate and physical activity. Eating below TDEE causes weight loss; eating above causes weight gain.",
    formula: "Mifflin-St Jeor BMR (Male): (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5. Female: same but −161. TDEE = BMR × Activity Multiplier.",
    example: "A 30-year-old woman, 165 cm, 70 kg, moderately active: BMR ≈ 1,477 kcal. TDEE ≈ 1,477 × 1.55 = 2,289 kcal/day.",
    faq: [
      { q: "How many calories should I eat to lose weight?", a: "A deficit of 500 calories/day below TDEE leads to approximately 1 lb (0.45 kg) of weight loss per week. Avoid going below 1,200 kcal (women) or 1,500 kcal (men) without medical supervision." },
      { q: "What activity multiplier should I use?", a: "Sedentary (desk job, no exercise): 1.2 | Lightly active (1–3 days/week): 1.375 | Moderately active (3–5 days): 1.55 | Very active (6–7 days): 1.725 | Extra active (athlete/physical job): 1.9." },
      { q: "What is the most accurate calorie formula?", a: "The Mifflin-St Jeor equation (1990) is currently considered the most accurate for estimating BMR in most populations. The Katch-McArdle formula is more accurate if you know your lean body mass." },
    ],
    related: ["bmi", "macro", "body-fat", "protein"],
  },

  "body-fat": {
    id: "body-fat",
    path: "/body-fat",
    title: "Body Fat Calculator — Estimate Body Fat Percentage | CalcHub",
    description:
      "Estimate your body fat percentage using the US Navy method or BMI method. Enter height, weight, and body measurements for an accurate body composition estimate.",
    keywords: ["body fat calculator", "body fat percentage calculator", "navy body fat calculator", "body composition calculator"],
    category: "Health Calculators",
    categoryPath: "/health",
    schema: "HealthCalculator",
    updatedDate: "2026-05-18",
    intro: "Body fat percentage is a more precise health indicator than BMI because it directly estimates how much of your body weight is fat vs. lean tissue. The Navy circumference method is a validated field method requiring only a tape measure.",
    formula: "Navy Method (Male): 86.010 × log10(abdomen − neck) − 70.041 × log10(height) + 36.76. Navy Method (Female): 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387.",
    example: "A 5'10\" male with a 36\" waist and 15\" neck: estimated body fat ≈ 20% (Fitness category).",
    faq: [
      { q: "What are healthy body fat ranges?", a: "Men: Essential fat 2–5%, Athletes 6–13%, Fitness 14–17%, Average 18–24%, Obese 25%+. Women: Essential 10–13%, Athletes 14–20%, Fitness 21–24%, Average 25–31%, Obese 32%+." },
      { q: "Is the Navy method accurate?", a: "The Navy method has a margin of error of approximately ±3–4% body fat and is widely used by military branches for fitness assessments." },
    ],
    related: ["bmi", "calorie", "ideal-weight", "macro"],
  },

  "ideal-weight": {
    id: "ideal-weight",
    path: "/ideal-weight",
    title: "Ideal Weight Calculator — Healthy Weight Range by Height | CalcHub",
    description:
      "Find your ideal body weight based on height and sex using four validated formulas: Devine, Robinson, Miller, and Hamwi. Understand your healthy weight range.",
    keywords: ["ideal weight calculator", "healthy weight calculator", "ideal body weight", "weight for height", "Devine formula"],
    category: "Health Calculators",
    categoryPath: "/health",
    schema: "HealthCalculator",
    updatedDate: "2026-05-18",
    intro: "Several medical formulas exist to estimate ideal body weight. This calculator computes results from all four major formulas so you can understand the full healthy weight range for your height.",
    formula: "Devine (male): 50 + 2.3 × (height inches – 60). Devine (female): 45.5 + 2.3 × (height inches – 60). Robinson and Miller formulas vary by sex.",
    example: "A 5'8\" male: Devine = 68 kg, Robinson = 70 kg, Miller = 66.7 kg, Hamwi = 72 kg. Average ideal weight ≈ 69 kg (152 lbs).",
    faq: [
      { q: "Are ideal weight formulas accurate for everyone?", a: "These formulas were developed from population averages and may not apply to people with high muscle mass, different bone structures, or athletes. They provide a useful reference range, not a rigid target." },
    ],
    related: ["bmi", "body-fat", "calorie", "macro"],
  },

  percentage: {
    id: "percentage",
    path: "/percentage",
    title: "Percentage Calculator — 3 Ways to Solve Any % Problem | CalcHub",
    description:
      "Solve any percentage problem: what is X% of Y, X is what percent of Y, and percent change from X to Y. Fast and instant with step-by-step solutions.",
    keywords: ["percentage calculator", "percent calculator", "percent of", "percentage change calculator", "percentage increase", "percentage decrease"],
    category: "Math Calculators",
    categoryPath: "/math",
    schema: "MathCalculator",
    updatedDate: "2026-05-18",
    intro: "Three questions cover virtually every percentage problem you'll encounter. This calculator solves all three instantly and shows the arithmetic so you can understand the result.",
    formula: "What is X% of Y? → Y × X/100. X is what % of Y? → (X/Y) × 100. % Change → ((New – Old)/Old) × 100.",
    example: "What is 15% of 240? → 240 × 0.15 = 36. 36 is what % of 240? → (36/240) × 100 = 15%. Change from 200 to 250 → ((250–200)/200) × 100 = 25% increase.",
    faq: [
      { q: "How do I calculate percentage increase or decrease?", a: "% Change = ((New Value – Old Value) / Old Value) × 100. Positive = increase, negative = decrease." },
      { q: "How do I find what percentage one number is of another?", a: "Divide the part by the whole, then multiply by 100. Example: 45 is what % of 180? → (45/180) × 100 = 25%." },
    ],
    related: ["fraction", "ratio", "discount", "sales-tax"],
  },

  age: {
    id: "age",
    path: "/age",
    title: "Age Calculator — Exact Age in Years, Months & Days | CalcHub",
    description:
      "Calculate your exact age in years, months, and days from your birthdate. Find days until your next birthday, and your age on any specific past or future date.",
    keywords: ["age calculator", "age in years months days", "birthday calculator", "how old am I", "exact age calculator"],
    category: "Math Calculators",
    categoryPath: "/math",
    schema: "WebApplication",
    updatedDate: "2026-05-18",
    intro: "This age calculator gives you your precise age broken down into years, months, and days — not just the number of birthdays you've had. It also shows how many days are left until your next birthday.",
    formula: "Age is calculated by subtracting the birth date from the current date, accounting for varying month lengths and leap years.",
    example: "Born July 4, 1990, calculating on May 18, 2026: Age = 35 years, 10 months, 14 days.",
    faq: [
      { q: "How do I calculate someone's age from their birthdate?", a: "Subtract the birth year from the current year. If the birthday hasn't occurred yet this year, subtract one. This calculator does all of this automatically to the day." },
      { q: "Does leap year affect age calculation?", a: "Yes — February 29 birthdays are rare but the calculator handles them correctly, treating the birthday as March 1 in non-leap years." },
    ],
    related: ["date", "time", "due-date", "percentage"],
  },

  "random-number": {
    id: "random-number",
    path: "/random-number",
    title: "Random Number Generator — Generate Numbers Instantly | CalcHub",
    description:
      "Generate random numbers between any minimum and maximum value. Generate single numbers, lists, or unique non-repeating sets. Perfect for games, decisions, and statistics.",
    keywords: ["random number generator", "random number picker", "generate random number", "number randomizer", "random integer generator"],
    category: "Math Calculators",
    categoryPath: "/math",
    schema: "WebApplication",
    updatedDate: "2026-05-18",
    intro: "Need to pick a random number for a game, make an unbiased decision, or generate a sample set for statistics? Set your range and count, and get truly random results instantly.",
    formula: "Uses cryptographically secure Math.random() or crypto.getRandomValues() for unbiased integer generation in a given range.",
    example: "Generate a number between 1 and 100: result might be 47. Generate 6 unique numbers from 1–49 (lottery-style): 3, 17, 22, 31, 38, 45.",
    faq: [
      { q: "Are the random numbers truly random?", a: "Browser-based random number generators use pseudorandom algorithms. They are random enough for most everyday uses (games, selections), but not suitable for cryptographic security purposes." },
      { q: "Can I generate random numbers without repeats?", a: "Yes — enable the 'no duplicates' option to generate a list of unique numbers within your range. Useful for lottery picks or drawing without replacement." },
    ],
    related: ["percentage", "probability", "ratio", "fraction"],
  },

  password: {
    id: "password",
    path: "/password",
    title: "Password Generator — Strong, Secure Passwords | CalcHub",
    description:
      "Generate strong, random passwords instantly. Choose length and character sets (uppercase, lowercase, numbers, symbols). Copy with one click. No passwords are stored or transmitted.",
    keywords: ["password generator", "strong password generator", "secure password generator", "random password", "password creator"],
    category: "Other Tools",
    categoryPath: "/other",
    schema: "WebApplication",
    updatedDate: "2026-05-18",
    intro: "A strong password is your first line of defense against unauthorized access. This generator creates cryptographically random passwords using your chosen character sets — all processing happens in your browser and nothing is ever transmitted.",
    formula: "Uses the Web Crypto API (crypto.getRandomValues()) to ensure true randomness, not predictable pseudorandom sequences.",
    example: "12-character password with all character types: X#4kP2@mLq9! — extremely difficult to brute-force.",
    faq: [
      { q: "How long should a strong password be?", a: "Security experts recommend at least 12 characters. 16+ characters with mixed types provides excellent security. Longer is always better." },
      { q: "Is it safe to use an online password generator?", a: "This generator runs entirely in your browser — no password is sent to any server. You can verify this by turning off your internet connection and the generator will still work." },
      { q: "Should I use a password manager?", a: "Yes. A password manager lets you use a unique, randomly generated password for every account, which is the single most effective way to protect your online accounts." },
    ],
    related: ["random-number"],
  },

  gas: {
    id: "gas",
    path: "/gas",
    title: "Gas Cost Calculator — Fuel Cost for Any Trip | CalcHub",
    description:
      "Calculate fuel cost for any road trip. Enter distance, gas mileage (MPG), and gas price to instantly see your total fuel expense. Supports miles/km and MPG/L per 100km.",
    keywords: ["gas cost calculator", "fuel cost calculator", "trip cost calculator", "MPG calculator", "gas mileage calculator"],
    category: "Other Tools",
    categoryPath: "/other",
    schema: "WebApplication",
    updatedDate: "2026-05-18",
    intro: "Planning a road trip or comparing the true cost of driving vs. flying? This gas calculator gives you an exact fuel cost estimate based on your vehicle's fuel efficiency and current gas prices.",
    formula: "Fuel Needed (gallons) = Distance (miles) / MPG. Fuel Cost = Fuel Needed × Price per Gallon.",
    example: "500-mile trip in a car that gets 28 MPG at $3.60/gallon: 500/28 = 17.9 gallons × $3.60 = $64.43 fuel cost.",
    faq: [
      { q: "How do I find my car's MPG?", a: "Check your vehicle's window sticker or fuel economy label. The EPA publishes ratings at fueleconomy.gov. You can also calculate it by dividing miles driven by gallons used between fill-ups." },
      { q: "Does driving speed affect fuel economy?", a: "Yes significantly. Most vehicles achieve peak fuel economy at 45–55 mph. Highway driving above 65 mph typically reduces MPG by 7–14% for every 5 mph increase." },
    ],
    related: ["auto-loan", "salary", "discount"],
  },
};

export const programmaticVariants: Array<{
  path: string;
  calculatorId: string;
  title: string;
  description: string;
  h1: string;
  variantNote: string;
}> = [
  {
    path: "/bmi-calculator-for-men",
    calculatorId: "bmi",
    title: "BMI Calculator for Men — Body Mass Index | CalcHub",
    description: "BMI calculator specifically for men. Calculate your body mass index, understand healthy BMI ranges for males, and what your result means.",
    h1: "BMI Calculator for Men",
    variantNote: "For adult males, a BMI between 18.5 and 24.9 is generally considered healthy. Men tend to carry more muscle mass than women, so consider body fat percentage alongside BMI for a fuller picture.",
  },
  {
    path: "/bmi-calculator-for-women",
    calculatorId: "bmi",
    title: "BMI Calculator for Women — Body Mass Index | CalcHub",
    description: "BMI calculator for women. Calculate your body mass index and learn what healthy BMI ranges mean for adult females.",
    h1: "BMI Calculator for Women",
    variantNote: "Women naturally carry more body fat than men at the same BMI — a BMI of 22 may indicate different body composition by sex. The calculator uses the same universal formula; results are identical, but the health interpretation may differ.",
  },
  {
    path: "/bmi-calculator-kg",
    calculatorId: "bmi",
    title: "BMI Calculator in KG and CM (Metric) | CalcHub",
    description: "Calculate BMI using kilograms and centimeters. Metric BMI calculator for adults worldwide. Instant result with category.",
    h1: "BMI Calculator — Metric (kg & cm)",
    variantNote: "This version defaults to metric units (kilograms and centimeters). The BMI formula in metric is: weight (kg) divided by height (m) squared.",
  },
  {
    path: "/bmi-calculator-pounds",
    calculatorId: "bmi",
    title: "BMI Calculator in Pounds and Feet | CalcHub",
    description: "Calculate BMI using pounds and feet/inches. Imperial BMI calculator for adults in the United States. Instant result with healthy weight range.",
    h1: "BMI Calculator — Imperial (lbs & inches)",
    variantNote: "This version defaults to imperial units. The imperial BMI formula is: 703 × weight (lbs) ÷ height (inches)².",
  },
  {
    path: "/mortgage-calculator-with-taxes",
    calculatorId: "mortgage",
    title: "Mortgage Calculator with Taxes & Insurance (PITI) | CalcHub",
    description: "Calculate your total monthly mortgage payment including principal, interest, property taxes, and homeowner's insurance (PITI).",
    h1: "Mortgage Calculator with Taxes & Insurance",
    variantNote: "The true cost of homeownership includes property taxes (typically 1–2% of home value annually) and homeowner's insurance (about 0.5–1% annually). This view helps you see the full PITI payment.",
  },
  {
    path: "/calorie-calculator-for-weight-loss",
    calculatorId: "calorie",
    title: "Calorie Calculator for Weight Loss | CalcHub",
    description: "Find your calorie deficit for safe, sustainable weight loss. Calculate TDEE and see exactly how many calories to eat to lose 0.5, 1, or 2 lbs per week.",
    h1: "Calorie Calculator for Weight Loss",
    variantNote: "To lose weight, you need to eat fewer calories than you burn. A 500 kcal/day deficit leads to roughly 1 lb (0.45 kg) of loss per week. Deficits above 1,000 kcal/day are not recommended without medical supervision.",
  },
  {
    path: "/calorie-calculator-for-muscle-gain",
    calculatorId: "calorie",
    title: "Calorie Calculator for Muscle Gain (Bulking) | CalcHub",
    description: "Calculate how many calories to eat to build muscle. Find your TDEE and recommended caloric surplus for lean bulking.",
    h1: "Calorie Calculator for Muscle Gain",
    variantNote: "Building muscle requires a caloric surplus. A modest surplus of 250–500 kcal/day above TDEE, combined with resistance training, supports lean muscle gain while minimizing fat accumulation.",
  },
  {
    path: "/compound-interest-calculator-monthly",
    calculatorId: "compound-interest",
    title: "Compound Interest Calculator — Monthly Compounding | CalcHub",
    description: "Calculate compound interest compounded monthly. See how monthly compounding affects your savings or investment returns compared to annual compounding.",
    h1: "Compound Interest Calculator — Monthly Compounding",
    variantNote: "Monthly compounding means interest is calculated and added to your balance 12 times per year. This produces slightly higher returns than annual compounding — the more frequent, the better for growth.",
  },
];

export function getPageSEO(path: string): { title: string; description: string; canonical: string } {
  const staticPages: Record<string, { title: string; description: string }> = {
    "/": { title: "Free Online Calculators — Finance, Health & Math | CalcHub", description: SITE_DESCRIPTION },
    "/financial": { title: "Financial Calculators — Free Online Money Tools | CalcHub", description: "Free financial calculators for mortgages, loans, investments, retirement, taxes, and more." },
    "/health": { title: "Health & Fitness Calculators — BMI, Calories & More | CalcHub", description: "Free health calculators for BMI, calorie needs, body fat, ideal weight, macros, and more." },
    "/math": { title: "Math Calculators — Percentage, Fraction, Age & More | CalcHub", description: "Free math calculators for percentages, fractions, age, date, GPA, statistics, and more." },
    "/other": { title: "Other Free Online Tools — Password, Gas & More | CalcHub", description: "Free miscellaneous calculators: password generator, gas cost, pace calculator, and more." },
    "/blog": { title: "Calculator Guides & Educational Articles | CalcHub Blog", description: "In-depth guides, tutorials, and explanations for financial, health, and math topics from the CalcHub team." },
    "/about": { title: "About CalcHub — Our Mission & Team | CalcHub", description: "Learn about CalcHub, our mission to provide free, accurate calculators, and the team behind the tools." },
    "/contact": { title: "Contact CalcHub | CalcHub", description: "Get in touch with the CalcHub team. Report a bug, suggest a calculator, or ask a question." },
    "/privacy": { title: "Privacy Policy | CalcHub", description: "Read CalcHub's privacy policy. We don't sell your data — learn what we collect and why." },
    "/terms": { title: "Terms of Use | CalcHub", description: "Read CalcHub's terms of use and conditions for using our free calculator tools." },
    "/disclaimer": { title: "Disclaimer | CalcHub", description: "CalcHub's disclaimer: our calculators are for informational purposes only and do not constitute professional advice." },
  };

  const calcSEO = Object.values(calculatorSEO).find((c) => c.path === path);
  if (calcSEO) {
    return { title: calcSEO.title, description: calcSEO.description, canonical: `${SITE_URL}${path}` };
  }

  const variant = programmaticVariants.find((v) => v.path === path);
  if (variant) {
    return { title: variant.title, description: variant.description, canonical: `${SITE_URL}${variant.path}` };
  }

  const staticPage = staticPages[path];
  if (staticPage) {
    return { title: staticPage.title, description: staticPage.description, canonical: `${SITE_URL}${path}` };
  }

  return { title: `CalcHub — Free Online Calculators`, description: SITE_DESCRIPTION, canonical: `${SITE_URL}${path}` };
}
