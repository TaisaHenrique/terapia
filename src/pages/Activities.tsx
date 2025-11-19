import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useActivities } from "@/hooks/useActivities";
import { useCoupleProgress } from "@/hooks/useCoupleProgress";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Target, Award, Save } from "lucide-react";

const Activities = () => {
  const { data: activities = [], isLoading } = useActivities();
  const { data: progressData = [], createProgress, updateProgress } = useCoupleProgress();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

  const handleStartActivity = (activityId: string) => {
    const existing = progressData.find((p) => p.atividade_id === activityId);
    
    if (existing) {
      toast.info("Você já começou esta atividade!");
      return;
    }

    createProgress(
      {
        atividade_id: activityId,
        status: "em_progresso",
        progresso: 0,
        data_inicio: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Atividade iniciada com sucesso!");
        },
      }
    );
  };

  const handleCompleteActivity = (progressId: string) => {
    updateProgress(
      {
        id: progressId,
        status: "concluida",
        progresso: 100,
        data_conclusao: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Parabéns! Atividade concluída! 🎉");
        },
      }
    );
  };

  const getActivityProgress = (activityId: string) => {
    return progressData.find((p) => p.atividade_id === activityId);
  };

  const handleSaveFeedback = (progressId: string) => {
    const feedback = feedbacks[progressId];
    if (!feedback?.trim()) {
      toast.error("Por favor, adicione uma reflexão antes de salvar.");
      return;
    }

    updateProgress(
      {
        id: progressId,
        feedback: feedback.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Reflexão salva com sucesso!");
          setFeedbacks((prev) => ({ ...prev, [progressId]: "" }));
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const inProgress = progressData.filter((p) => p.status === "em_progresso");
  const completed = progressData.filter((p) => p.status === "concluida");
  const notStarted = activities.filter(
    (a) => !progressData.find((p) => p.atividade_id === a.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        items={[
          { label: "Início", href: "/couple-dashboard" },
          { label: "Atividades", href: "/activities" },
          { label: "Perfil", href: "/couple-dashboard" },
          { label: "Humor", href: "/mood-tracker" },
        ]}
        showAuth
      />

      <main className="container py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-8">Atividades Terapêuticas</h1>

        {/* Activity Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Andamento
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inProgress.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Concluídas
              </CardTitle>
              <Award className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completed.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Disponíveis
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{notStarted.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Available Activities */}
        {notStarted.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Atividades Disponíveis</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notStarted.map((activity, index) => (
                <Card
                  key={activity.id}
                  className="hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl">{activity.icone}</div>
                      <Badge variant="secondary">{activity.categoria}</Badge>
                    </div>
                    <CardTitle className="text-lg">{activity.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{activity.descricao}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {activity.duracao_estimada && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {activity.duracao_estimada} min
                        </span>
                      )}
                      {activity.pontos_recompensa && (
                        <span className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          +{activity.pontos_recompensa} pts
                        </span>
                      )}
                    </div>
                    <Button
                      className="w-full bg-gradient-primary"
                      onClick={() => handleStartActivity(activity.id)}
                    >
                      Iniciar Atividade
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* In Progress Activities */}
        {inProgress.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Em Andamento</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {inProgress.map((progress) => {
                const activity = activities.find((a) => a.id === progress.atividade_id);
                if (!activity) return null;

                return (
                  <Card key={progress.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-3xl">{activity.icone}</div>
                        <Badge className="bg-warning">Em Andamento</Badge>
                      </div>
                      <CardTitle className="text-lg">{activity.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{activity.descricao}</p>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium">{progress.progresso}%</span>
                        </div>
                        <Progress value={progress.progresso || 0} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Reflexão sobre a atividade
                          </label>
                          <Textarea
                            placeholder="Como foi a experiência? Teve alguma dificuldade?"
                            value={feedbacks[progress.id] || progress.feedback || ""}
                            onChange={(e) =>
                              setFeedbacks((prev) => ({
                                ...prev,
                                [progress.id]: e.target.value,
                              }))
                            }
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleSaveFeedback(progress.id)}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Reflexão
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={() => handleCompleteActivity(progress.id)}
                          >
                            Marcar como Concluída
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Completed Activities */}
        {completed.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Atividades Concluídas</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completed.map((progress) => {
                const activity = activities.find((a) => a.id === progress.atividade_id);
                if (!activity) return null;

                return (
                  <Card key={progress.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-3xl">{activity.icone}</div>
                        <Badge className="bg-success">Concluída</Badge>
                      </div>
                      <CardTitle className="text-lg">{activity.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.descricao}
                      </p>
                      {progress.data_conclusao && (
                        <p className="text-xs text-muted-foreground">
                          Concluída em{" "}
                          {new Date(progress.data_conclusao).toLocaleDateString("pt-BR")}
                        </p>
                      )}
                      
                      {progress.feedback ? (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Reflexão:</label>
                          <p className="text-sm p-3 bg-muted rounded-lg whitespace-pre-wrap">
                            {progress.feedback}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Adicionar reflexão sobre a atividade
                          </label>
                          <Textarea
                            placeholder="Como foi a experiência? Teve alguma dificuldade?"
                            value={feedbacks[progress.id] || ""}
                            onChange={(e) =>
                              setFeedbacks((prev) => ({
                                ...prev,
                                [progress.id]: e.target.value,
                              }))
                            }
                            className="min-h-[100px]"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSaveFeedback(progress.id)}
                            className="w-full"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Reflexão
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {activities.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma atividade disponível</h3>
              <p className="text-muted-foreground">
                As atividades serão adicionadas pelo seu terapeuta.
              </p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Activities;
