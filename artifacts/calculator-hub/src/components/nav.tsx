import { Link, useLocation } from "wouter";
import { Calculator, HeartPulse, Sigma, Settings2, Moon, Sun, Menu, BookOpen } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Nav() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/financial", label: "Financial", icon: Calculator },
    { href: "/health", label: "Health", icon: HeartPulse },
    { href: "/math", label: "Math", icon: Sigma },
    { href: "/other", label: "Other", icon: Settings2 },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ];

  const isActive = (path: string) => location.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 max-w-7xl mx-auto">
        <div className="flex md:hidden mr-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-2 font-bold text-xl mb-8">
                  <Calculator className="h-6 w-6 text-primary" />
                  <span>CalcHub</span>
                </div>
              </Link>
              <div className="flex flex-col gap-3">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md ${
                        isActive(link.href) ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <Link href="/" className="flex items-center gap-2 mr-6 shrink-0 cursor-pointer">
          <Calculator className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">CalcHub</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground ${
                isActive(link.href) ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}