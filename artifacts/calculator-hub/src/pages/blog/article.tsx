import { useParams, Link } from "wouter";
import { getArticleBySlug } from "@/lib/blog";
import { calculators } from "@/lib/calculators";
import { SEO } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? "");

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
        <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const relatedCalcItems = article.relatedCalculators
    .map(id => calculators.find(c => c.id === id))
    .filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <SEO 
        title={`${article.title} | CalcHub Blog`} 
        description={article.description}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium truncate">{article.title}</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight leading-tight">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Published {article.publishedDate}</span>
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
              return <p key={idx}>{section.text}</p>;
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
                          {section.headers.map((h, i) => <TableHead key={i}>{h}</TableHead>)}
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
                <Alert key={idx} className={`my-6 ${section.variant === 'tip' ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' : section.variant === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400'}`}>
                  <AlertTitle className="font-semibold">{section.variant === 'tip' ? 'Tip' : section.variant === 'warning' ? 'Warning' : 'Info'}</AlertTitle>
                  <AlertDescription className="mt-2">{section.text}</AlertDescription>
                </Alert>
              );
            default:
              return null;
          }
        })}
      </div>

      {relatedCalcItems.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedCalcItems.map(calc => (
              <Link key={calc!.id} href={calc!.path} className="block p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all">
                <h3 className="font-semibold text-lg">{calc!.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{calc!.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
