import { Nav } from "./nav";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-7xl mx-auto px-4">
          <p className="text-sm leading-loose text-muted-foreground">
            Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}