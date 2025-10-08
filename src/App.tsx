import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoupleDashboard from "./pages/CoupleDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import MoodTracker from "./pages/MoodTracker";
import Activities from "./pages/Activities";
import Chat from "./pages/Chat";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/couple-dashboard" element={<CoupleDashboard />} />
          <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/support" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
