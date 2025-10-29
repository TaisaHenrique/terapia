import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActivities } from "@/hooks/useActivities";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trophy } from "lucide-react";

const ManageActivities = () => {
  const { data: activities = [], isLoading } = useActivities();
  const { mutate: createActivity, isPending } = useCreateActivity();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    icone: "❤️",
    duracao_estimada: 30,
    pontos_recompensa: 10,
    nivel_dificuldade: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createActivity(formData, {
      onSuccess: () => {
        toast.success("Atividade criada com sucesso!");
        setShowForm(false);
        setFormData({
          titulo: "",
          descricao: "",
          categoria: "",
          icone: "❤️",
          duracao_estimada: 30,
          pontos_recompensa: 10,
          nivel_dificuldade: 1,
        });
      },
      onError: (error) => {
        toast.error("Erro ao criar atividade: " + error.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        items={[
          { label: "Dashboard", href: "/therapist-dashboard" },
          { label: "Gerenciar Atividades", href: "/manage-activities" },
        ]}
        showAuth
      />

      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Gerenciar Atividades</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Atividade
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Criar Nova Atividade</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comunicacao">Comunicação</SelectItem>
                        <SelectItem value="intimidade">Intimidade</SelectItem>
                        <SelectItem value="confianca">Confiança</SelectItem>
                        <SelectItem value="diversao">Diversão</SelectItem>
                        <SelectItem value="crescimento">Crescimento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icone">Ícone (Emoji)</Label>
                    <Input
                      id="icone"
                      value={formData.icone}
                      onChange={(e) => setFormData({ ...formData, icone: e.target.value })}
                      placeholder="❤️"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração (minutos)</Label>
                    <Input
                      id="duracao"
                      type="number"
                      value={formData.duracao_estimada}
                      onChange={(e) => setFormData({ ...formData, duracao_estimada: parseInt(e.target.value) })}
                      min="5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pontos">Pontos de Recompensa</Label>
                    <Input
                      id="pontos"
                      type="number"
                      value={formData.pontos_recompensa}
                      onChange={(e) => setFormData({ ...formData, pontos_recompensa: parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nivel">Nível de Dificuldade (1-5)</Label>
                    <Input
                      id="nivel"
                      type="number"
                      value={formData.nivel_dificuldade}
                      onChange={(e) => setFormData({ ...formData, nivel_dificuldade: parseInt(e.target.value) })}
                      min="1"
                      max="5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Criando..." : "Criar Atividade"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">{activity.icone}</div>
                  <span className="text-sm text-muted-foreground">{activity.categoria}</span>
                </div>
                <CardTitle className="text-lg">{activity.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{activity.descricao}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {activity.duracao_estimada && (
                    <span>{activity.duracao_estimada} min</span>
                  )}
                  {activity.pontos_recompensa && (
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {activity.pontos_recompensa} pts
                    </span>
                  )}
                  <span>Nível {activity.nivel_dificuldade}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activities.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma atividade criada</h3>
              <p className="text-muted-foreground mb-4">
                Comece criando atividades para seus casais.
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira Atividade
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ManageActivities;
