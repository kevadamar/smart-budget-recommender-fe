import { Card } from "@/components/ui/card";
import { Calendar, TrendingUp } from "lucide-react";
import type { MonthlyPrediction } from "@/types/budget";
import { CategoryList } from "./CategoryList";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MonthlyCardProps {
  data: MonthlyPrediction;
  index: number;
}

export function MonthlyCard({ data, index }: MonthlyCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className="overflow-hidden gradient-card shadow-md border-0 hover:shadow-lg transition-all"
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <CollapsibleTrigger className="w-full p-5 text-left hover:bg-muted/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{data.month_name}</h4>
                <p className="text-xs text-muted-foreground">{data.month}</p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Expense</p>
              <p className="font-semibold text-sm">
                {formatCurrency(data.total_expense)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Savings</p>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm text-success">
                  {formatCurrency(data.savings)}
                </p>
                <TrendingUp className="w-3 h-3 text-success" />
              </div>
              <p className="text-xs text-success/80">
                {data.savings_percentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-5 pb-5 pt-2 space-y-4 border-t border-border/50">
            {/* Essential Categories */}
            <div>
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Essential ({data.breakdown.primer_percentage.toFixed(1)}%)
              </h5>
              <CategoryList
                categories={data.breakdown.primer_categories}
                color="primer"
              />
            </div>

            {/* Important Categories */}
            <div>
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Important ({data.breakdown.sekunder_percentage.toFixed(1)}%)
              </h5>
              <CategoryList
                categories={data.breakdown.sekunder_categories}
                color="sekunder"
              />
            </div>

            {/* Optional Categories */}
            <div>
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Optional ({data.breakdown.tersier_percentage.toFixed(1)}%)
              </h5>
              <CategoryList
                categories={data.breakdown.tersier_categories}
                color="tersier"
              />
            </div>

            {data.inflation_adjusted && (
              <p className="text-xs text-muted-foreground italic pt-2">
                * Adjusted for {data.cumulative_inflation_pct.toFixed(2)}% cumulative inflation
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
