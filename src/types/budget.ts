export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
}

export interface BudgetBreakdown {
  primer_categories: BudgetCategory[];
  sekunder_categories: BudgetCategory[];
  tersier_categories: BudgetCategory[];
  total_primer: number;
  total_sekunder: number;
  total_tersier: number;
  primer_percentage: number;
  sekunder_percentage: number;
  tersier_percentage: number;
}

export interface MonthlyPrediction {
  month: string;
  month_name: string;
  income: number;
  total_expense: number;
  savings: number;
  savings_percentage: number;
  breakdown: BudgetBreakdown;
  cumulative_inflation_pct: number;
  inflation_adjusted: boolean;
}

export interface BudgetResponse {
  success: boolean;
  data: MonthlyPrediction[];
  summary: {
    average_monthly_expense: number;
    average_monthly_savings: number;
    total_months: number;
    total_predicted_expense: number;
    total_predicted_savings: number;
    average_allocation: {
      primer_percentage: number;
      sekunder_percentage: number;
      tersier_percentage: number;
    };
  };
  metadata: {
    request_params: any;
    prediction_timestamp: string;
    model_info: any;
  };
}

export interface BudgetFormData {
  income: number;
  family_size: number;
  vehicles: number;
  months_ahead: number;
  use_inflation: boolean;
  start_month?: string;
  model_type: "xgboost" | "ensemble" | "best";
}
