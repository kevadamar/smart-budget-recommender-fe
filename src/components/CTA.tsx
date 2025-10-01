import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Free forever for basic features",
  "No credit card required",
  "Setup in under 2 minutes",
  "Cancel anytime",
];

export const CTA = () => {
  return (
    <section className="px-6 py-12 animate-slide-up-delay-3">
      <div className="glass-card p-8 rounded-3xl text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Start Managing Your
          <br />
          <span className="gradient-text">Budget Today</span>
        </h2>

        <div className="space-y-3 py-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        <Button size="lg" className="w-full gradient-primary hover:opacity-90 transition-opacity" asChild>
          <Link to="/chat">Get Started Free</Link>
        </Button>

        <p className="text-xs text-muted-foreground">
          Join 50,000+ users taking control of their finances
        </p>
      </div>
    </section>
  );
};
