import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Lightbulb, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const FutureRecommendations = () => {
  const navigate = useNavigate();
  
  // Mock data - replace with AI-generated recommendations from backend
  const recommendations = [
    {
      month: "Next Month",
      prediction: {
        income: 5000,
        estimatedExpenses: 3400,
        suggestedSavings: 1600,
      },
      insights: [
        "Rent and utilities due at month start",
        "Consider reducing dining out by 15%",
        "Good time to start emergency fund",
      ],
      priority: "medium",
    },
    {
      month: "Month 2",
      prediction: {
        income: 5000,
        estimatedExpenses: 3100,
        suggestedSavings: 1900,
      },
      insights: [
        "Lower expenses expected",
        "Increase savings by $300",
        "Review subscription services",
      ],
      priority: "low",
    },
    {
      month: "Month 3",
      prediction: {
        income: 5000,
        estimatedExpenses: 3800,
        suggestedSavings: 1200,
      },
      insights: [
        "Higher expenses expected (insurance renewal)",
        "Plan ahead for annual payments",
        "Maintain minimum savings goal",
      ],
      priority: "high",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Future Predictions</h2>
          <p className="text-muted-foreground text-sm">AI-powered budget forecasts for upcoming months</p>
        </div>
        <Lightbulb className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card 
            key={index} 
            className="glass-card animate-slide-up-delay-1"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {rec.month}
                </CardTitle>
                <Badge variant={getPriorityColor(rec.priority)}>
                  {rec.priority} priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Income</p>
                  <p className="text-sm font-semibold">${rec.prediction.income.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Est. Expenses</p>
                  <p className="text-sm font-semibold text-destructive">${rec.prediction.estimatedExpenses.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Target Savings</p>
                  <p className="text-sm font-semibold text-success">${rec.prediction.suggestedSavings.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  AI Insights
                </p>
                <ul className="space-y-2">
                  {rec.insights.map((insight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate(`/forecast/${encodeURIComponent(rec.month)}`)}
              >
                View Detailed Forecast
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};