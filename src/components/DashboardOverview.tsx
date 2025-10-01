import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const DashboardOverview = () => {
  // Mock data - replace with actual data from backend
  const currentMonth = {
    income: 5000,
    expenses: 3200,
    savings: 1800,
    savingsGoal: 2000,
  };

  const savingsProgress = (currentMonth.savings / currentMonth.savingsGoal) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Your financial overview for this month</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentMonth.income.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${currentMonth.expenses.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <PiggyBank className="w-5 h-5" />
            Savings Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Current Savings</span>
              <span className="font-semibold">${currentMonth.savings.toLocaleString()}</span>
            </div>
            <Progress value={savingsProgress} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-muted-foreground">Goal: ${currentMonth.savingsGoal.toLocaleString()}</span>
              <span className="text-muted-foreground">{savingsProgress.toFixed(0)}%</span>
            </div>
          </div>
          
          {savingsProgress >= 100 ? (
            <div className="flex items-center gap-2 text-sm text-success">
              <TrendingUp className="w-4 h-4" />
              <span>Great job! You've reached your savings goal!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>${(currentMonth.savingsGoal - currentMonth.savings).toLocaleString()} left to reach your goal</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};