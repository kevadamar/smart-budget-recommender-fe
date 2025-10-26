import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function BudgetForm({ onSubmit, isLoading }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    income: "",
    family_size: "4",
    vehicles: "0",
    months_ahead: "1",
    use_inflation: true,
    model_type: "best",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      income: parseFloat(formData.income),
      family_size: parseInt(formData.family_size),
      vehicles: parseInt(formData.vehicles),
      months_ahead: parseInt(formData.months_ahead),
      use_inflation: formData.use_inflation,
      model_type: formData.model_type,
    };

    onSubmit(submitData);
  };

  const formatCurrency = (value: string) => {
    const num = value.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setFormData({ ...formData, income: formatted });
  };

  return (
    <Card className="p-6 shadow-lg border-0 gradient-card animate-scale-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Income */}
        <div className="space-y-2">
          <Label htmlFor="income" className="text-sm font-medium">
            Monthly Income (IDR)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              Rp
            </span>
            <Input
              id="income"
              type="text"
              required
              placeholder="10,000,000"
              value={formData.income}
              onChange={handleIncomeChange}
              className="pl-10 h-12 transition-all focus:shadow-md"
            />
          </div>
        </div>

        {/* Family Size */}
        <div className="space-y-2">
          <Label htmlFor="family_size" className="text-sm font-medium">
            Family Size
          </Label>
          <Select
            value={formData.family_size}
            onValueChange={(value) =>
              setFormData({ ...formData, family_size: value })
            }
          >
            <SelectTrigger className="h-12 transition-all focus:shadow-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} {size === 1 ? "member" : "members"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vehicles */}
        <div className="space-y-2">
          <Label htmlFor="vehicles" className="text-sm font-medium">
            Number of Vehicles
          </Label>
          <Select
            value={formData.vehicles}
            onValueChange={(value) =>
              setFormData({ ...formData, vehicles: value })
            }
          >
            <SelectTrigger className="h-12 transition-all focus:shadow-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5].map((count) => (
                <SelectItem key={count} value={count.toString()}>
                  {count} {count === 1 ? "vehicle" : "vehicles"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Months Ahead */}
        <div className="space-y-2">
          <Label htmlFor="months_ahead" className="text-sm font-medium">
            Forecast Period
          </Label>
          <Select
            value={formData.months_ahead}
            onValueChange={(value) =>
              setFormData({ ...formData, months_ahead: value })
            }
          >
            <SelectTrigger className="h-12 transition-all focus:shadow-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 month</SelectItem>
              <SelectItem value="2">2 months</SelectItem>
              <SelectItem value="3">3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inflation Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="space-y-0.5">
            <Label htmlFor="inflation" className="text-sm font-medium">
              Apply Inflation
            </Label>
            <p className="text-xs text-muted-foreground">
              Adjust predictions for inflation
            </p>
          </div>
          <Switch
            id="inflation"
            checked={formData.use_inflation}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, use_inflation: checked })
            }
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !formData.income}
          className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Budget
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
