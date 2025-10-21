import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error, session } = await auth.signIn(email, password);

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message === "Invalid login credentials" 
            ? "E-mail ou senha incorretos" 
            : error.message,
          variant: "destructive",
        });
        return;
      }

      if (session?.user) {
        // Buscar perfil do usuário para redirecionar corretamente
        const { data: profile } = await supabase
          .from("profiles")
          .select("tipo_usuario")
          .eq("id", session.user.id)
          .maybeSingle();

        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta.",
        });

        // Redirecionar baseado no tipo de usuário
        navigate(profile?.tipo_usuario === "terapeuta" ? "/therapist-dashboard" : "/couple-dashboard");
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Bem-vindo de volta!</CardTitle>
          <p className="text-sm text-muted-foreground">
            Entre para continuar sua jornada
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="/recuperar-senha"
                className="text-sm text-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-gradient-primary" size="lg" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Não tem uma conta? </span>
              <Link to="/cadastro" className="text-primary hover:underline font-medium">
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
