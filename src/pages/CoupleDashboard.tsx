import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Calendar, Award, MessageCircle, TrendingUp, Star, Rocket, Smile } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const progressData = [
  { month: "Jan", engajamento: 55, comunicacao: 40, resolucao: 35 },
  { month: "Fev", engajamento: 60, comunicacao: 50, resolucao: 45 },
  { month: "Mar", engajamento: 70, comunicacao: 65, resolucao: 55 },
  { month: "Abr", engajamento: 75, comunicacao: 70, resolucao: 60 },
  { month: "Mai", engajamento: 80, comunicacao: 75, resolucao: 65 },
];

const achievements = [
  {
    title: "Conexão Inicial",
    description: "Primeira sessão de terapia concluída.",
    icon: Heart,
    color: "text-secondary",
  },
  {
    title: "Escuta Ativa",
    description: "Demonstração de empatia e escuta.",
    icon: Smile,
    color: "text-accent",
  },
  {
    title: "Construtores de Sonhos",
    description: "Traçaram metas de relacionamento claras.",
    icon: Star,
    color: "text-warning",
  },
  {
    title: "Crescimento Contínuo",
    description: "Engajamento regular nas atividades.",
    icon: TrendingUp,
    color: "text-success",
  },
];

const goals = [
  { id: 1, label: "Comunicação aberta sobre sentimentos", completed: true },
  { id: 2, label: "Noite de encontro semanal", completed: false },
  { id: 3, label: "Apoiar os sonhos um do outro", completed: true },
  { id: 4, label: "Planejar uma viagem juntos", completed: false },
];

const upcomingSessions = [
  {
    date: "15 de Julho, 2024",
    time: "14:00 com Dr. Sofia Ribeiro",
    status: "Agendada",
  },
  {
    date: "22 de Julho, 2024",
    time: "10:00 com Dr. Sofia Ribeiro",
    status: "Agendada",
  },
  {
    date: "29 de Julho, 2024",
    time: "16:00 com Dr. Sofia Ribeiro",
    status: "Agendada",
  },
];

const CoupleDashboard = () => {
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
          <h1 className="text-3xl font-bold mb-2">Ana & Bruno</h1>
          <p className="text-muted-foreground">
            Bem-vindos ao seu espaço de crescimento mútuo!
          </p>
        </div>

        {/* Overview Cards */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-center">Visão Geral da Terapia</CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Uma atualização rápida sobre o seu progresso e o que está por vir.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-1">3 Meses</div>
                <p className="text-sm text-muted-foreground">Jornada Concluída</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Calendar className="h-12 w-12 text-accent" />
                </div>
                <div className="text-3xl font-bold mb-1">2 Próximas</div>
                <p className="text-sm text-muted-foreground">Sessões Agendadas</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-12 w-12 text-secondary" />
                </div>
                <div className="text-3xl font-bold mb-1">75%</div>
                <p className="text-sm text-muted-foreground">Metas Alcançadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso da Terapia</CardTitle>
              <p className="text-sm text-muted-foreground">
                Acompanhe o desenvolvimento em áreas chave da sua terapia.
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engajamento" fill="hsl(var(--primary))" name="Engajamento" />
                  <Bar dataKey="comunicacao" fill="hsl(var(--secondary))" name="Comunicação" />
                  <Bar
                    dataKey="resolucao"
                    fill="hsl(var(--accent))"
                    name="Resolução de Conflitos"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas Sessões</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visualize seus próximos encontros com a terapeuta.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">{session.date}</p>
                    <p className="text-sm text-muted-foreground">{session.time}</p>
                  </div>
                  <Badge variant="secondary">{session.status}</Badge>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Ver Calendário Completo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Goals and Achievements */}
        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Metas do Relacionamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-start gap-3">
                  <Checkbox checked={goal.completed} className="mt-1" />
                  <span
                    className={`flex-1 ${
                      goal.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {goal.label}
                  </span>
                </div>
              ))}
              <Button className="w-full mt-4 bg-gradient-primary" asChild>
                <Link to="/activities">
                  <Rocket className="mr-2 h-4 w-4" />
                  Agendar Nova Sessão
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Emblemas Conquistados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <achievement.icon className={`h-8 w-8 mb-2 ${achievement.color}`} />
                    <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
            <p className="text-sm text-muted-foreground">
              Navegue rapidamente para seções importantes.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <Button variant="outline" className="h-20" asChild>
                <Link to="/chat" className="flex flex-col">
                  <MessageCircle className="h-6 w-6 mb-2" />
                  Ir para o Chat
                </Link>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <Link to="/activities" className="flex flex-col">
                  <Rocket className="h-6 w-6 mb-2" />
                  Recursos e Exercícios
                </Link>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <Link to="/support" className="flex flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Histórico de Sessões
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CoupleDashboard;
