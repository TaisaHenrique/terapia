import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { UserType } from "@/lib/auth";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserType;
}

export const RoleProtectedRoute = ({ children, allowedRole }: RoleProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.tipo_usuario !== allowedRole) {
    // Redireciona para o dashboard correto baseado no tipo de usuário
    const redirectPath = profile?.tipo_usuario === "terapeuta" 
      ? "/therapist-dashboard" 
      : "/couple-dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
