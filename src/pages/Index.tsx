import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";

const Index = () => {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[500px] mx-auto pt-16">
        <Hero />
        <Features />
        <CTA />
        
        <footer className="px-6 py-8 text-center text-sm text-muted-foreground">
          <p>© {year} SmartBudget. Built with ❤️ for better financial futures.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
