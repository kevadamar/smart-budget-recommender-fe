import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="px-6 py-12 animate-slide-up">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">AI-Powered Budget Insights</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smart Budget
          <br />
          <span className="gradient-text">Recommendations</span>
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-md">
          Get personalized budget advice powered by AI. Track spending, save smarter, and achieve your financial goals.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs pt-4">
          <Button size="lg" className="w-full gradient-primary hover:opacity-90 transition-opacity" asChild>
            <Link to="/chat">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full" asChild>
            <Link to="/chat">See How It Works</Link>
          </Button>
        </div>

        <div className="flex gap-6 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold gradient-text">50K+</div>
            <div>Active Users</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold gradient-text">$2M+</div>
            <div>Saved</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold gradient-text">4.8★</div>
            <div>Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};
