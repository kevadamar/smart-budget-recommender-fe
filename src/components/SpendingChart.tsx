import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const SpendingChart = () => {
  // Mock data - replace with actual spending data from backend
  const categories = [
    { name: "Rent", amount: 1200, percentage: 37.5, color: "bg-primary" },
    { name: "Food", amount: 600, percentage: 18.75, color: "bg-accent" },
    { name: "Transport", amount: 400, percentage: 12.5, color: "bg-success" },
    { name: "Utilities", amount: 300, percentage: 9.4, color: "bg-secondary" },
    { name: "Entertainment", amount: 400, percentage: 12.5, color: "bg-muted" },
    { name: "Other", amount: 300, percentage: 9.4, color: "bg-border" },
  ];

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Spending Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center pb-4 border-b border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-3xl font-bold">${totalExpenses.toLocaleString()}</p>
        </div>

        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category.name}</span>
                <span className="text-muted-foreground">${category.amount.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${category.color} transition-all duration-500`}
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};