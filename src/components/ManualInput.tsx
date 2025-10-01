import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Expense {
  id: string;
  category: string;
  amount: string;
}

export const ManualInput = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", category: "", amount: "" },
  ]);

  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now().toString(), category: "", amount: "" }]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const updateExpense = (id: string, field: "category" | "amount", value: string) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (will be connected to backend later)
    console.log({ income, expenses });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="income" className="text-base font-medium">
          Monthly Income
        </Label>
        <Input
          id="income"
          type="number"
          placeholder="5000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="text-lg"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Expenses</Label>
          <Button type="button" onClick={addExpense} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex gap-2">
              <Input
                placeholder="Category (e.g., Rent)"
                value={expense.category}
                onChange={(e) => updateExpense(expense.id, "category", e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => updateExpense(expense.id, "amount", e.target.value)}
                className="w-32"
              />
              {expenses.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeExpense(expense.id)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full gradient-primary">
        Generate Budget Plan
      </Button>
    </form>
  );
};
