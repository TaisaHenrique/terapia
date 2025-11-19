import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAllProfiles } from "@/hooks/useAllProfiles";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, UserX, UserCheck } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function AdminPanel() {
  const { data: profiles, isLoading } = useAllProfiles();
  const { data: userRole, isLoading: roleLoading } = useUserRole();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await updateProfile.mutateAsync({
        userId,
        ativo: !currentStatus,
      });

      toast({
        title: "Status atualizado",
        description: `Conta ${!currentStatus ? "ativada" : "desativada"} com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da conta.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar items={[]} showAuth={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
            <CardDescription>Gerencie contas de usuários</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {profiles?.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{profile.nome}</h3>
                        <Badge variant={profile.ativo ? "default" : "secondary"}>
                          {profile.ativo ? "Ativa" : "Desativada"}
                        </Badge>
                        <Badge variant="outline">{profile.tipo_usuario}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {profile.email}
                      </p>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={profile.ativo ? "destructive" : "default"}
                          size="sm"
                          onClick={() => setSelectedUserId(profile.id)}
                        >
                          {profile.ativo ? (
                            <>
                              <UserX className="h-4 w-4 mr-2" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Ativar
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {profile.ativo ? "Desativar" : "Ativar"} conta?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {profile.ativo
                              ? "Esta ação desativará a conta do usuário. O usuário não poderá fazer login até que a conta seja reativada."
                              : "Esta ação reativará a conta do usuário. O usuário poderá fazer login normalmente."}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleToggleStatus(profile.id, profile.ativo)}
                          >
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
