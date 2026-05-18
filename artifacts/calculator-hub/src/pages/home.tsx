import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Clock, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/seo";
import { calculators, categories } from "@/lib/calculators";
import { blogArticles } from "@/lib/blog";

const categoryDescriptions: Record<string, string> = {
  financial: "Mortgages, loans, investments, taxes, and retirement planning.",
  health: "BMI, calories, body fat, ideal weight, and nutrition targets.",
  math: "Percentages, fractions, age, date, GPA, statistics, and more.",
  other: "Password generator, gas cost, pace calculator, and utilities.",
};

const homeFaq = [
  { q: "Are these calculators free?", a: "Yes, every calculator on CalcHub is 100% free with no registration, subscription, or hidden fees required." },
  { q: "How accurate are the results?", a: "Our calculators use standard, peer-reviewed mathematical formulas and are regularly reviewed for accuracy. Results are for informational purposes — for financial or medical decisions, always consult a qualified professional." },
  { q: "Do you store my data?", a: "No. All calculations happen entirely in your browser. We do not collect, store, or transmit your inputs to any server." },
  { q: "Can I use CalcHub on my phone?", a: "Yes. CalcHub is fully responsive and optimized for mobile, tablet, and desktop devices with touch-friendly inputs." },
  { q: "How often are calculators updated?", a: "We review and update calculators regularly to reflect current standards and user feedback. Each calculator page shows its last updated date." },
];

export function Home() {
  const [search, setSearch] = useState("");

  const filteredCalculators = useMemo(() => {
    if (!search.trim()) return [];
    const lower = search.toLowerCase();
    return calculators.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.description.toLowerCase().includes(lower) ||
        c.category.toLowerCase().includes(lower)
    );
  }, [search]);

  const calcsByCategory = useMemo(
    () =>
      categories.reduce<Record<string, typeof calculators>>((acc, cat) => {
        acc[cat.id] = calculators.filter((c) => c.category === cat.id);
        return acc;
      }, {}),
    []
  );

  const recentArticles = blogArticles.slice(0, 3);

  return (
    <div className="flex flex-col space-y-14 pb-16">
      <SEO />

      {/* Hero */}
      <section className="flex flex-col items-center text-center space-y-4 pt-10 pb-4 md:pt-16">
        <Badge variant="secondary" className="mb-2">Free &amp; No Sign-Up Required</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl max-w-3xl">
          Free Online Calculators — Finance, Health &amp; Math
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Fast, accurate, and always free. From mortgage payments to calorie counts,
          get instant answers to your most important everyday calculations.
        </p>

        <div className="w-full max-w-xl relative mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search 30+ calculators..."
            className="pl-12 h-14 text-base rounded-full shadow-sm border-border/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search calculators"
            data-testid="input-search"
          />
        </div>
      </section>

      {/* Search results */}
      {search.trim() ? (
        <section>
          <h2 className="text-xl font-bold mb-4 tracking-tight">
            {filteredCalculators.length === 0
              ? `No results for "${search}"`
              : `${filteredCalculators.length} result${filteredCalculators.length !== 1 ? "s" : ""} for "${search}"`}
          </h2>
          {filteredCalculators.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCalculators.map((calc) => (
                <Link key={calc.id} href={calc.path}>
                  <Card className="h-full hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{calc.name}</CardTitle>
                      <CardDescription className="text-sm">{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Category tiles */}
          <section>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Calculator Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const count = calcsByCategory[category.id]?.length ?? 0;
                return (
                  <Link key={category.id} href={category.path}>
                    <Card className="h-full hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer border-muted/60 group">
                      <CardContent className="flex flex-col p-6 space-y-3">
                        <div className={`w-10 h-10 rounded-lg ${category.bg} flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${category.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{category.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-snug">
                            {categoryDescriptions[category.id]}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-muted-foreground">{count} calculators</span>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* All calculators by category */}
          {categories.map((category) => {
            const calcs = calcsByCategory[category.id] ?? [];
            if (!calcs.length) return null;
            const Icon = category.icon;
            return (
              <section key={category.id}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                    {category.name}
                  </h2>
                  <Link
                    href={category.path}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View all <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {calcs.map((calc) => (
                    <Link key={calc.id} href={calc.path}>
                      <div className="group p-3 rounded-lg border bg-card hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm transition-all cursor-pointer h-full">
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{calc.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{calc.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Blog articles */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Latest Guides &amp; Articles
              </h2>
              <Link href="/blog" className="text-sm text-primary hover:underline flex items-center gap-1">
                All articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />{article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="text-xs text-primary font-medium flex items-center gap-1">
                        Read article <ArrowRight className="w-3 h-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2 max-w-3xl">
              {homeFaq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </>
      )}
    </div>
  );
}
