import { useParams, Link } from "wouter";
import { getArticleBySlug } from "@/lib/blog";
import { calculators } from "@/lib/calculators";
import { SEO } from "@/components/seo";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { blogArticles } from "@/lib/blog";

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? "");

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const relatedCalcItems = article.relatedCalculators
    .map(id => calculators.find(c => c.id === id))
    .filter(Boolean);

  const articleIndex = blogArticles.findIndex(a => a.slug === slug);
  const prevArticle = articleIndex > 0 ? blogArticles[articleIndex - 1] : null;
  const nextArticle = articleIndex < blogArticles.length - 1 ? blogArticles[articleIndex + 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishedDate,
    "dateModified": article.updatedDate,
    "author": {
      "@type": "Organization",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
    },
    "url": `${SITE_URL}/blog/${article.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `${SITE_URL}/blog/${article.slug}` },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <SEO
        title={`${article.title} | CalcHub Blog`}
        description={article.description}
        canonical={`${SITE_URL}/blog/${article.slug}`}
        jsonLd={[articleSchema, breadcrumbSchema]}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium truncate">{article.title}</span>
      </nav>

      <header className="space-y-4">
        <Badge variant="secondary">{article.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight leading-tight">{article.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{article.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" /> {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {article.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Published {article.publishedDate}
          </span>
          {article.updatedDate !== article.publishedDate && (
            <span className="text-xs">Updated {article.updatedDate}</span>
          )}
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        {article.content.map((section, idx) => {
          switch (section.type) {
            case "intro":
              return <p key={idx} className="text-xl leading-relaxed text-muted-foreground">{section.text}</p>;
            case "h2":
              return <h2 key={idx} className="text-2xl font-bold mt-10 mb-4">{section.text}</h2>;
            case "h3":
              return <h3 key={idx} className="text-xl font-semibold mt-8 mb-3">{section.text}</h3>;
            case "p":
              return <p key={idx} className="leading-relaxed">{section.text}</p>;
            case "ul":
              return (
                <ul key={idx} className="list-disc pl-6 space-y-2">
                  {section.items?.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              );
            case "ol":
              return (
                <ol key={idx} className="list-decimal pl-6 space-y-2">
                  {section.items?.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
              );
            case "table":
              return (
                <div key={idx} className="my-6 overflow-x-auto border rounded-lg">
                  <Table>
                    {section.headers && (
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          {section.headers.map((h, i) => <TableHead key={i} className="font-semibold">{h}</TableHead>)}
                        </TableRow>
                      </TableHeader>
                    )}
                    <TableBody>
                      {section.rows?.map((row, i) => (
                        <TableRow key={i}>
                          {row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              );
            case "callout":
              return (
                <Alert key={idx} className={`my-6 ${
                  section.variant === "tip"
                    ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
                    : section.variant === "warning"
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400"
                }`}>
                  <AlertTitle className="font-semibold">
                    {section.variant === "tip" ? "💡 Tip" : section.variant === "warning" ? "⚠️ Warning" : "ℹ️ Info"}
                  </AlertTitle>
                  <AlertDescription className="mt-2">{section.text}</AlertDescription>
                </Alert>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* Author / trust signal */}
      <div className="flex items-start gap-4 p-4 bg-muted/40 rounded-lg border mt-8">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-sm">{article.author}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Our editorial team reviews every article for accuracy and clarity. {SITE_NAME} calculators use peer-reviewed mathematical formulas and are updated regularly.
          </p>
          <Link href="/about" className="text-xs text-primary hover:underline mt-1 inline-block">
            About CalcHub →
          </Link>
        </div>
      </div>

      {/* Related Calculators */}
      {relatedCalcItems.length > 0 && (
        <div className="pt-8 border-t">
          <h2 className="text-xl font-bold mb-4">Try These Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedCalcItems.map(calc => (
              <Link key={calc!.id} href={calc!.path}>
                <div className="group p-4 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">{calc!.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{calc!.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Article navigation */}
      {(prevArticle || nextArticle) && (
        <div className="grid grid-cols-2 gap-4 pt-8 border-t">
          {prevArticle ? (
            <Link href={`/blog/${prevArticle.slug}`}>
              <div className="group p-4 border rounded-lg hover:border-primary/40 hover:bg-muted/40 transition-all cursor-pointer">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </p>
                <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">{prevArticle.title}</p>
              </div>
            </Link>
          ) : <div />}
          {nextArticle ? (
            <Link href={`/blog/${nextArticle.slug}`}>
              <div className="group p-4 border rounded-lg hover:border-primary/40 hover:bg-muted/40 transition-all cursor-pointer text-right">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-end gap-1">
                  Next <ArrowRight className="w-3 h-3" />
                </p>
                <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">{nextArticle.title}</p>
              </div>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground border-t pt-4">
        Content on {SITE_NAME} is for informational and educational purposes only and does not constitute financial, medical, or legal advice.{" "}
        <Link href="/disclaimer" className="underline underline-offset-2 hover:text-foreground">Read our disclaimer.</Link>
      </p>
    </article>
  );
}
