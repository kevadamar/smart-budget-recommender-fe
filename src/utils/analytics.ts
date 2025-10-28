// Google Analytics utility functions
// Using gtag for GA4 tracking

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer: any[];
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-YX4CCWJKCX', {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }
};

// Track budget form submission
export const trackBudgetSubmission = (formData: any) => {
  trackEvent('budget_form_submitted', {
    income_level: formData.income,
    family_size: formData.family_size,
    has_debt: formData.has_debt,
    event_category: 'engagement',
  });
};

// Track budget results viewed
export const trackBudgetResultsViewed = (results: any) => {
  trackEvent('budget_results_viewed', {
    total_recommendations: results.recommendations?.length || 0,
    event_category: 'engagement',
  });
};

// Track model health status
export const trackModelHealth = (isHealthy: boolean, modelsLoaded: boolean) => {
  trackEvent('model_health_check', {
    is_healthy: isHealthy,
    models_loaded: modelsLoaded,
    event_category: 'system',
  });
};

// Track errors
export const trackError = (error: string, context?: string) => {
  trackEvent('error_occurred', {
    error_message: error,
    context: context || 'general',
    event_category: 'error',
  });
};

// Track user interactions
export const trackUserInteraction = (action: string, element: string) => {
  trackEvent('user_interaction', {
    action: action,
    element: element,
    event_category: 'interaction',
  });
};