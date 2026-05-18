import { Link } from "wouter";
import { blogArticles } from "@/lib/blog";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BlogIndex() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <SEO 
        title="Calculator Guides & Educational Articles | CalcHub" 
        description="Learn about personal finance, health metrics, and everyday math with our in-depth guides and articles."
      />
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Calculator Guides & Educational Articles</h1>
        <p className="text-lg text-muted-foreground">
          Deep dives into the math behind your money, health, and everyday decisions. 
          Learn how to interpret your results and make better choices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogArticles.map((article) => (
          <Card key={article.slug} className="flex flex-col h-full hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>
              <CardTitle className="text-xl">
                <Link href={`/blog/${article.slug}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm mt-2">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{article.publishedDate}</span>
                <Link href={`/blog/${article.slug}`} className="text-sm font-medium text-primary hover:underline">
                  Read article →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
