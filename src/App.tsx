import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleProtectedRoute } from "./components/RoleProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateTherapist from "./pages/CreateTherapist";
import CoupleDashboard from "./pages/CoupleDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import MoodTracker from "./pages/MoodTracker";
import Activities from "./pages/Activities";
import Chat from "./pages/Chat";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-therapist" element={<CreateTherapist />} />
            <Route
              path="/couple-dashboard"
              element={
                <RoleProtectedRoute allowedRole="casal">
                  <CoupleDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/therapist-dashboard"
              element={
                <RoleProtectedRoute allowedRole="terapeuta">
                  <TherapistDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/mood-tracker"
              element={
                <RoleProtectedRoute allowedRole="casal">
                  <MoodTracker />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/activities"
              element={
                <RoleProtectedRoute allowedRole="casal">
                  <Activities />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/chat/:destinatarioId"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
