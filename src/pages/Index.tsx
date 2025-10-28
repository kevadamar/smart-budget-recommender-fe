import { useEffect, useState } from "react";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetResults } from "@/components/BudgetResults";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackPageView, trackModelHealth, trackBudgetSubmission, trackBudgetResultsViewed, trackError } from "@/utils/analytics";
import type { BudgetResponse } from "@/types/budget";

const Index = () => {
  const [results, setResults] = useState<BudgetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkHealth = async () => {
    try {
      // Replace with your actual API endpoint
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const response = await fetch(`${API_URL}/health`);

      if (!response.ok) {
        throw new Error("API is not healthy");
      }

      const data = await response.json();

      // Check if response status is 200 and models_loaded is true
      if (response.status === 200 && data.models_loaded === true) {
        toast({
          title: "Success",
          description: "Model is ready!",
        });
        trackModelHealth(true, data.models_loaded);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed load model!",
        });
        trackModelHealth(false, data.models_loaded || false);
      }
    } catch (error) {
      console.error("Health check failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed load model!",
      });
      trackError("Health check failed", "checkHealth");
    }
  }

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch budget prediction");
      }

      const data: BudgetResponse = await response.json();
      setResults(data);
      trackBudgetResultsViewed(data);
    } catch (error) {
      console.error("Error fetching budget prediction:", error);
      trackError("Failed to fetch budget prediction", "handleSubmit");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="mx-auto max-w-[500px] px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-primary/10 shadow-glow">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Smart Budget Planner
          </h1>
          <p className="text-muted-foreground">
            AI-powered household budget recommendations
          </p>
        </div>

        {/* Main Content */}
        <div className={`space-y-6`} >
          {!results ? (
            <BudgetForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <BudgetResults data={results} onReset={handleReset} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-muted-foreground animate-fade-in">
          • Powered by AI & ❤️ •
        </div>
      </div>
    </div>
  );
};

export default Index;
