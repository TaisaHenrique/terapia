import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Award, MessageCircle, TrendingUp, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useCoupleProgress } from "@/hooks/useCoupleProgress";
import { useActivities } from "@/hooks/useActivities";
import { useCoupleTherapist } from "@/hooks/useCoupleTherapist";
import { useMemo } from "react";

const CoupleDashboard = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: progressData = [] } = useCoupleProgress();
  const { data: activities = [] } = useActivities();
  const { data: therapist } = useCoupleTherapist();

  const stats = useMemo(() => {
    const completed = progressData.filter((p) => p.status === "concluida").length;
    const total = progressData.length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      completed,
      inProgress: progressData.filter((p) => p.status === "em_progresso").length,
      completionRate,
      level: profile?.nivel || 1,
      points: profile?.pontos || 0,
    };
  }, [progressData, profile]);

  if (profileLoading) {
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
          { label: "Início", href: "/couple-dashboard" },
          { label: "Atividades", href: "/activities" },
          { label: "Perfil", href: "/couple-dashboard" },
          { label: "Humor", href: "/mood-tracker" },
        ]}
        showAuth
      />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, {profile?.nome || "Usuário"}! 👋</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu espaço de crescimento pessoal!
          </p>
        </div>

        {/* Overview Cards */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center">Visão Geral</CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Acompanhe seu progresso e conquistas
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex justify-center mb-2">
                  <Award className="h-12 w-12 text-primary animate-pulse-glow" />
                </div>
                <div className="text-3xl font-bold mb-1">Nível {stats.level}</div>
                <p className="text-sm text-muted-foreground">{stats.points} Pontos</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-12 w-12 text-accent" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.completed}</div>
                <p className="text-sm text-muted-foreground">Atividades Concluídas</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex justify-center mb-2">
                  <Rocket className="h-12 w-12 text-secondary" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.inProgress}</div>
                <p className="text-sm text-muted-foreground">Em Progresso</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex justify-center mb-2">
                  <Heart className="h-12 w-12 text-success" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.completionRate}%</div>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Suas atividades mais recentes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {progressData.slice(0, 5).map((progress) => {
                const activity = activities.find((a) => a.id === progress.atividade_id);
                if (!activity) return null;

                return (
                  <div
                    key={progress.id}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-2xl">{activity.icone}</div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.titulo}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {activity.descricao}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium">{progress.progresso}%</span>
                        </div>
                        <Progress value={progress.progresso || 0} className="h-2" />
                      </div>
                    </div>
                    <Badge
                      variant={
                        progress.status === "concluida"
                          ? "default"
                          : progress.status === "em_progresso"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        progress.status === "concluida"
                          ? "bg-success"
                          : progress.status === "em_progresso"
                          ? "bg-warning"
                          : ""
                      }
                    >
                      {progress.status === "concluida"
                        ? "Concluída"
                        : progress.status === "em_progresso"
                        ? "Em Progresso"
                        : "Não Iniciada"}
                    </Badge>
                  </div>
                );
              })}
              {progressData.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma atividade iniciada ainda. Comece agora!
                </p>
              )}
              <Button className="w-full" variant="outline" asChild>
                <Link to="/activities">Ver Todas as Atividades</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acesso Rápido</CardTitle>
              <p className="text-sm text-muted-foreground">
                Navegue rapidamente para seções importantes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {therapist?.terapeuta_id ? (
                <Button variant="outline" className="w-full h-20" asChild>
                  <Link to={`/chat/${therapist.terapeuta_id}`} className="flex flex-col">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    <span>Chat com Terapeuta</span>
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full h-20" disabled>
                  <div className="flex flex-col">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    <span>Nenhum terapeuta atribuído</span>
                  </div>
                </Button>
              )}
              <Button variant="outline" className="w-full h-20" asChild>
                <Link to="/activities" className="flex flex-col">
                  <Rocket className="h-6 w-6 mb-2" />
                  <span>Atividades Terapêuticas</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full h-20" asChild>
                <Link to="/mood-tracker" className="flex flex-col">
                  <Heart className="h-6 w-6 mb-2" />
                  <span>Rastreador de Humor</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full h-20" asChild>
                <Link to="/support" className="flex flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Suporte e Ajuda</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Activities Preview */}
        {activities.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Atividades Disponíveis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Novas atividades para você começar
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {activities.slice(0, 3).map((activity, index) => {
                  const progress = progressData.find((p) => p.atividade_id === activity.id);
                  if (progress) return null;

                  return (
                    <div
                      key={activity.id}
                      className="p-4 rounded-lg border hover:border-primary transition-all animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-3xl mb-2">{activity.icone}</div>
                      <h4 className="font-semibold mb-2">{activity.titulo}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {activity.descricao}
                      </p>
                      <Button size="sm" className="w-full" asChild>
                        <Link to="/activities">Começar</Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
              <Button className="w-full mt-4 bg-gradient-primary" asChild>
                <Link to="/activities">
                  <Rocket className="mr-2 h-4 w-4" />
                  Ver Todas as Atividades
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CoupleDashboard;
