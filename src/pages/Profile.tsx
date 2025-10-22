import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { data: profile, isLoading } = useProfile();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nome, setNome] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditToggle = () => {
    if (!editing) {
      setNome(profile?.nome || "");
    }
    setEditing(!editing);
  };

  const handleSaveProfile = async () => {
    if (!profile?.id) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ nome })
        .eq("id", profile.id);

      if (error) throw error;

      toast.success("Perfil atualizado com sucesso!");
      setEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("A nova senha deve ter no mínimo 6 caracteres");
      return;
    }

    setSaving(true);
    try {
      // Primeiro, reautenticar com a senha atual
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("Usuário não encontrado");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        toast.error("Senha atual incorreta");
        return;
      }

      // Atualizar para a nova senha
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message || "Erro ao alterar senha");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        items={
          profile?.tipo_usuario === "terapeuta"
            ? [
                { label: "Dashboard", href: "/therapist-dashboard" },
                { label: "Perfil", href: "/profile" },
                { label: "Suporte", href: "/support" },
              ]
            : [
                { label: "Início", href: "/couple-dashboard" },
                { label: "Atividades", href: "/activities" },
                { label: "Perfil", href: "/profile" },
                { label: "Humor", href: "/mood-tracker" },
              ]
        }
        showAuth
      />

      <main className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

        <div className="grid gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile?.nome?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {profile?.tipo_usuario === "terapeuta" ? "Terapeuta" : "Cliente"}
                  </p>
                  {!editing && (
                    <Button variant="outline" size="sm" onClick={handleEditToggle} className="mt-2">
                      Editar Perfil
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  {editing ? (
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  ) : (
                    <p className="text-lg">{profile?.nome}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <p className="text-lg text-muted-foreground">{profile?.email}</p>
                </div>

                {profile?.tipo_usuario === "casal" && (
                  <div className="space-y-2">
                    <Label>Pontos</Label>
                    <p className="text-lg font-semibold text-primary">
                      {profile?.pontos || 0} pontos - Nível {profile?.nivel || 1}
                    </p>
                  </div>
                )}
              </div>

              {editing && (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} disabled={saving}>
                    {saving ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button variant="outline" onClick={handleEditToggle} disabled={saving}>
                    Cancelar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alterar Senha */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>

                <Button type="submit" disabled={saving}>
                  {saving ? "Alterando..." : "Alterar Senha"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
