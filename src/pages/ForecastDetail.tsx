import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle2, Calendar } from "lucide-react";

const ForecastDetail = () => {
  const { month } = useParams();
  const navigate = useNavigate();

  // Mock detailed data - replace with actual data based on month param
  const forecastData = {
    month: month || "Next Month",
    prediction: {
      income: 5000,
      estimatedExpenses: 3400,
      suggestedSavings: 1600,
    },
    categoryBreakdown: [
      { category: "Rent", amount: 1200, percentage: 35 },
      { category: "Food & Dining", amount: 600, percentage: 18 },
      { category: "Transportation", amount: 400, percentage: 12 },
      { category: "Utilities", amount: 300, percentage: 9 },
      { category: "Entertainment", amount: 300, percentage: 9 },
      { category: "Shopping", amount: 400, percentage: 12 },
      { category: "Other", amount: 200, percentage: 6 },
    ],
    recommendations: [
      {
        type: "warning",
        title: "High Dining Expenses",
        description: "Your dining out expenses are 20% higher than last month. Consider meal prepping to save $150.",
      },
      {
        type: "success",
        title: "Great Savings Rate",
        description: "You're on track to save 32% of your income this month. Keep it up!",
      },
      {
        type: "info",
        title: "Upcoming Payment",
        description: "Insurance renewal due on the 15th. Make sure to have $500 available.",
      },
    ],
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "success": return <CheckCircle2 className="w-5 h-5 text-success" />;
      default: return <TrendingUp className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[500px] mx-auto pt-20 px-6 pb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                {forecastData.month}
              </h1>
              <p className="text-muted-foreground text-sm">Detailed budget forecast and insights</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="glass-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs text-muted-foreground">Income</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-lg font-bold">${forecastData.prediction.income.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs text-muted-foreground">Expenses</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-lg font-bold text-destructive">${forecastData.prediction.estimatedExpenses.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs text-muted-foreground">Savings</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-lg font-bold text-success">${forecastData.prediction.suggestedSavings.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {forecastData.categoryBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">${item.amount.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.percentage}% of total expenses</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {forecastData.recommendations.map((rec, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 mt-0.5">
                    {getRecommendationIcon(rec.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForecastDetail;
