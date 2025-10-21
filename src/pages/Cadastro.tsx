import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Logo } from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, UserType } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const [userType, setUserType] = useState<UserType>("casal");
  const [formData, setFormData] = useState({
    email: "",
    nome: "",
    senha: "",
    confirmarSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "destructive",
      });
      return;
    }

    if (formData.senha.length < 8) {
      toast({
        title: "Erro",
        description: "A senha deve ter no mínimo 8 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await auth.signUp({
        email: formData.email,
        password: formData.senha,
        nome: formData.nome,
        tipo_usuario: userType,
      });

      if (error) {
        toast({
          title: "Erro ao criar conta",
          description: error.message === "User already registered" 
            ? "Este e-mail já está cadastrado" 
            : error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Redirecionando...",
      });

      // Redirecionar baseado no tipo de usuário
      setTimeout(() => {
        navigate(userType === "terapeuta" ? "/therapist-dashboard" : "/couple-dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente.",
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
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <p className="text-sm text-muted-foreground">
            Comece sua jornada de transformação
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label>Tipo de Conta</Label>
              <RadioGroup value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="casal" id="casal" />
                  <Label htmlFor="casal" className="flex-1 cursor-pointer">
                    Casal - Iniciar terapia
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="terapeuta" id="terapeuta" />
                  <Label htmlFor="terapeuta" className="flex-1 cursor-pointer">
                    Terapeuta - Acompanhar casais
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                placeholder={userType === "casal" ? "Ana & Bruno" : "Dr. Sofia Ribeiro"}
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                placeholder="Digite a senha novamente"
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                required
                minLength={8}
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-primary" size="lg" disabled={loading}>
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Já tem uma conta? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Faça login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;
