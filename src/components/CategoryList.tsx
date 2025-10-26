import type { BudgetCategory } from "@/types/budget";

interface CategoryListProps {
  categories: BudgetCategory[];
  color: "primer" | "sekunder" | "tersier";
}

export function CategoryList({ categories, color }: CategoryListProps) {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatName = (name: string) => {
    return name
      .replace(/_expenditure$/, "")
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const colorMap = {
    primer: "text-primer",
    sekunder: "text-sekunder",
    tersier: "text-tersier",
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <span className="text-sm">{formatName(category.name)}</span>
          <div className="text-right">
            <p className="text-sm font-semibold">
              {formatCurrency(category.amount)}
            </p>
            <p className={`text-xs ${colorMap[color]}`}>
              {category.percentage.toFixed(1)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
