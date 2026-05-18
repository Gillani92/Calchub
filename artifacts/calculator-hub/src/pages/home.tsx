import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculators, categories } from "@/lib/calculators";

export function Home() {
  const [search, setSearch] = useState("");

  const filteredCalculators = useMemo(() => {
    if (!search.trim()) return [];
    const lower = search.toLowerCase();
    return calculators.filter(
      (c) => c.name.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower)
    );
  }, [search]);

  return (
    <div className="flex flex-col space-y-12 pb-12">
      <section className="flex flex-col items-center text-center space-y-4 pt-10 pb-8 md:pt-20 md:pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Ultimate Calculator Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-[700px]">
          Fast, accurate, and free calculators for finance, health, math, and everyday needs.
        </p>
        
        <div className="w-full max-w-xl relative mt-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search calculators..." 
            className="pl-10 h-14 text-lg rounded-full shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {search.trim() ? (
        <section>
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Search Results</h2>
          {filteredCalculators.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No calculators found matching "{search}"
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCalculators.map((calc) => (
                <Link key={calc.id} href={calc.path}>
                  <Card className="h-full hover-elevate transition-all cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{calc.name}</CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.id} href={category.path}>
                    <Card className="h-full hover-elevate transition-all cursor-pointer border-muted/60">
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <div className={`p-4 rounded-full ${category.bg}`}>
                          <Icon className={`h-8 w-8 ${category.color}`} />
                        </div>
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Popular Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calculators.slice(0, 6).map((calc) => (
                <Link key={calc.id} href={calc.path}>
                  <Card className="h-full hover-elevate transition-all cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{calc.name}</CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}