import { Link } from "wouter";
import { ChevronRight, Calendar, BookOpen, FlaskConical, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/seo";
import { calculatorSEO, SITE_NAME } from "@/lib/seo";
import { calculators } from "@/lib/calculators";

interface CalcWrapperProps {
  id: string;
  children: React.ReactNode;
  variantH1?: string;
  variantNote?: string;
}

export function CalcWrapper({ id, children, variantH1, variantNote }: CalcWrapperProps) {
  const data = calculatorSEO[id];

  const relatedCalcs = data?.related
    .map((relId) => calculators.find((c) => c.id === relId))
    .filter(Boolean) ?? [];

  return (
    <>
      <SEO />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        {data && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={data.categoryPath} className="hover:text-foreground transition-colors capitalize">
              {data.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate">{variantH1 ?? data.title.split(" — ")[0].split(" | ")[0]}</span>
          </nav>
        )}

        {/* Page header */}
        <header>
          <div className="flex items-start gap-3 mb-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight leading-tight">
                {variantH1 ?? (data?.title.split(" — ")[0].split(" | ")[0])}
              </h1>
              {data && (
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Updated {data.updatedDate}
                  </span>
                  <Badge variant="secondary" className="text-xs capitalize">{data.category}</Badge>
                </div>
              )}
            </div>
          </div>
          {data?.intro && (
            <p className="text-muted-foreground leading-relaxed mt-3 text-base">
              {variantNote ?? data.intro}
            </p>
          )}
        </header>

        {/* Calculator */}
        <section aria-label="Calculator">
          {children}
        </section>

        {/* Formula & Example */}
        {(data?.formula || data?.example) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.formula && (
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-primary" />
                    Formula
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-mono leading-relaxed text-foreground/80">{data.formula}</p>
                </CardContent>
              </Card>
            )}
            {data.example && (
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground/80">{data.example}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* FAQ */}
        {data?.faq && data.faq.length > 0 && (
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {data.faq.map((item, i) => (
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
        )}

        {/* Related Calculators */}
        {relatedCalcs.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-bold tracking-tight mb-4">Related Calculators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedCalcs.map((calc) => (
                <Link
                  key={calc!.id}
                  href={calc!.path}
                  className="group p-3 rounded-lg border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{calc!.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{calc!.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground border-t pt-4">
          Results provided by {SITE_NAME} are for informational and educational purposes only. They do not constitute financial, medical, or legal advice. Always consult a qualified professional for important decisions.{" "}
          <Link href="/disclaimer" className="underline underline-offset-2 hover:text-foreground">
            Read our disclaimer.
          </Link>
        </p>
      </div>
    </>
  );
}
