import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/utils/analytics";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  return <>{children}</>;
}