import { Brain, PiggyBank, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Smart algorithms analyze your spending patterns",
    color: "text-primary",
  },
  {
    icon: PiggyBank,
    title: "Auto Savings",
    description: "Automatically set aside money based on your habits",
    color: "text-accent",
  },
  {
    icon: TrendingUp,
    title: "Goal Tracking",
    description: "Monitor progress towards your financial goals",
    color: "text-success",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-level encryption keeps your data safe",
    color: "text-secondary",
  },
];

export const Features = () => {
  return (
    <section className="px-6 py-12 animate-slide-up-delay-1">
      <h2 className="text-2xl font-bold text-center mb-8">
        Everything You Need to
        <br />
        <span className="gradient-text">Manage Your Budget</span>
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-card p-6 rounded-2xl animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
