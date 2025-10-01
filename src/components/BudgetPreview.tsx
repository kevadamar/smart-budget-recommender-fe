import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const budgetItems = [
  { category: "Housing", amount: 1200, budget: 1500, color: "primary" },
  { category: "Food", amount: 450, budget: 500, color: "success" },
  { category: "Transport", amount: 180, budget: 200, color: "accent" },
  { category: "Entertainment", amount: 120, budget: 150, color: "secondary" },
];

export const BudgetPreview = () => {
  return (
    <section className="px-6 py-12 animate-slide-up-delay-2">
      <h2 className="text-2xl font-bold text-center mb-8">
        Your Budget at a
        <br />
        <span className="gradient-text">Glance</span>
      </h2>

      <Card className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-border/50">
          <div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
            <div className="text-3xl font-bold gradient-text">$1,950</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Monthly Budget</div>
            <div className="text-2xl font-semibold">$2,350</div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {budgetItems.map((item, index) => {
            const percentage = (item.amount / item.budget) * 100;
            const isOverBudget = percentage > 90;

            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">${item.amount}</span>
                    <span className="text-muted-foreground">/ ${item.budget}</span>
                    {isOverBudget ? (
                      <ArrowUpRight className="w-4 h-4 text-warning" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-success" />
                    )}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full gradient-primary transition-all duration-500 rounded-full`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex gap-2">
          <div className="flex-1 p-3 rounded-xl bg-success/10 text-center">
            <div className="text-xs text-success font-medium">Saved</div>
            <div className="text-lg font-bold text-success">$400</div>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-muted text-center">
            <div className="text-xs text-muted-foreground font-medium">Remaining</div>
            <div className="text-lg font-bold">$400</div>
          </div>
        </div>
      </Card>
    </section>
  );
};
