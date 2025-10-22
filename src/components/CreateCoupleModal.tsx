import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export const CreateCoupleModal = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    parceiro1Nome: "",
    parceiro1Email: "",
    parceiro1Senha: "",
    parceiro2Nome: "",
    parceiro2Email: "",
    parceiro2Senha: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-couple`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            parceiro1: {
              nome: formData.parceiro1Nome,
              email: formData.parceiro1Email,
              senha: formData.parceiro1Senha,
            },
            parceiro2: {
              nome: formData.parceiro2Nome,
              email: formData.parceiro2Email,
              senha: formData.parceiro2Senha,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar casal");
      }

      toast.success("Casal cadastrado com sucesso!");
      setOpen(false);
      setFormData({
        parceiro1Nome: "",
        parceiro1Email: "",
        parceiro1Senha: "",
        parceiro2Nome: "",
        parceiro2Email: "",
        parceiro2Senha: "",
      });
      
      // Recarregar a página para atualizar a lista de clientes
      window.location.reload();
    } catch (error: any) {
      console.error("Erro ao cadastrar casal:", error);
      toast.error(error.message || "Erro ao cadastrar casal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar Novo Casal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Casal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Parceiro 1</h3>
            <div className="space-y-2">
              <Label htmlFor="parceiro1Nome">Nome Completo</Label>
              <Input
                id="parceiro1Nome"
                value={formData.parceiro1Nome}
                onChange={(e) => setFormData({ ...formData, parceiro1Nome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parceiro1Email">Email</Label>
              <Input
                id="parceiro1Email"
                type="email"
                value={formData.parceiro1Email}
                onChange={(e) => setFormData({ ...formData, parceiro1Email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parceiro1Senha">Senha</Label>
              <Input
                id="parceiro1Senha"
                type="password"
                value={formData.parceiro1Senha}
                onChange={(e) => setFormData({ ...formData, parceiro1Senha: e.target.value })}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Parceiro 2</h3>
            <div className="space-y-2">
              <Label htmlFor="parceiro2Nome">Nome Completo</Label>
              <Input
                id="parceiro2Nome"
                value={formData.parceiro2Nome}
                onChange={(e) => setFormData({ ...formData, parceiro2Nome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parceiro2Email">Email</Label>
              <Input
                id="parceiro2Email"
                type="email"
                value={formData.parceiro2Email}
                onChange={(e) => setFormData({ ...formData, parceiro2Email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parceiro2Senha">Senha</Label>
              <Input
                id="parceiro2Senha"
                type="password"
                value={formData.parceiro2Senha}
                onChange={(e) => setFormData({ ...formData, parceiro2Senha: e.target.value })}
                required
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-gradient-primary">
            {loading ? "Cadastrando..." : "Cadastrar Casal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
