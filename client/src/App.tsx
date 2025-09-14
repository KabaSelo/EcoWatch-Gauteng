import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/components/Landing";
import IncidentReport from "@/components/IncidentReport";
import EnvironmentalGuides from "@/components/EnvironmentalGuides";
import EnvironmentalRights from "@/components/EnvironmentalRights";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

function Router() {
  const [currentPage, setCurrentPage] = useState<'home' | 'report' | 'guides' | 'rights' | 'analytics'>('home');
  const [incidentCount, setIncidentCount] = useState(0); // Real-time incident counter

  const handleNavigation = (page: 'report' | 'guides' | 'rights' | 'analytics') => {
    setCurrentPage(page);
  };

  const handleIncidentSubmit = (report: any) => {
    console.log('Incident submitted:', report);
    // Increment real incident counter
    setIncidentCount(prev => prev + 1);
    // Show success message and return to home
    setTimeout(() => setCurrentPage('home'), 1000);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'report':
        return <IncidentReport onSubmit={handleIncidentSubmit} />;
      case 'guides':
        return <EnvironmentalGuides />;
      case 'rights':
        return <EnvironmentalRights />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <Landing onNavigate={handleNavigation} incidentCount={incidentCount} />;
    }
  };

  return (
    <Switch>
      <Route path="/" component={() => renderCurrentPage()} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
