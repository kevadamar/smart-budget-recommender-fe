import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Wallet, PieChart } from "lucide-react";
import type { BudgetResponse } from "@/types/budget";
import { MonthlyCard } from "./MonthlyCard";
import { SummaryCard } from "./SummaryCard";

interface BudgetResultsProps {
  data: BudgetResponse;
  onReset: () => void;
}

export function BudgetResults({ data, onReset }: BudgetResultsProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onReset}
        className="gap-2 hover:bg-muted/50 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        New Calculation
      </Button>

      {/* Summary Cards */}
      <div className="grid gap-4">
        <SummaryCard
          title="Average Monthly Savings"
          value={data.summary.average_monthly_savings}
          icon={TrendingUp}
          iconColor="text-success"
          bgColor="bg-success/10"
        />
        
        <SummaryCard
          title="Average Monthly Expense"
          value={data.summary.average_monthly_expense}
          icon={Wallet}
          iconColor="text-secondary"
          bgColor="bg-secondary/10"
        />
      </div>

      {/* Allocation Overview */}
      <Card className="p-6 gradient-card shadow-lg border-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <PieChart className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-semibold text-lg">Average Allocation</h3>
        </div>
        
        <div className="space-y-3">
          <AllocationBar
            label="Essential"
            percentage={data.summary.average_allocation.primer_percentage}
            color="bg-primer"
          />
          <AllocationBar
            label="Important"
            percentage={data.summary.average_allocation.sekunder_percentage}
            color="bg-sekunder"
          />
          <AllocationBar
            label="Optional"
            percentage={data.summary.average_allocation.tersier_percentage}
            color="bg-tersier"
          />
        </div>
      </Card>

      {/* Monthly Predictions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg px-1">Monthly Breakdown</h3>
        {data.data.map((month, index) => (
          <MonthlyCard
            key={month.month}
            data={month}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function AllocationBar({
  label,
  percentage,
  color,
}: {
  label: string;
  percentage: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
