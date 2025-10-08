import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, TrendingUp, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const progressData = [
  { month: "Jan", progress: 45 },
  { month: "Fev", progress: 52 },
  { month: "Mar", progress: 61 },
  { month: "Abr", progress: 68 },
  { month: "Mai", progress: 80 },
  { month: "Jun", progress: 85 },
  { month: "Jul", progress: 88 },
  { month: "Ago", progress: 92 },
  { month: "Set", progress: 95 },
  { month: "Out", progress: 96 },
  { month: "Nov", progress: 97 },
  { month: "Dez", progress: 98 },
];

const topicsData = [
  { name: "Comunicação", value: 12 },
  { name: "Conflito", value: 8 },
  { name: "Intimidade", value: 7 },
  { name: "Estresse", value: 5 },
  { name: "Outros", value: 3 },
];

const upcomingSessions = [
  {
    id: 1,
    time: "10:00 - 11:00 - 15/05/2024",
    topic: "Comunicação Eficaz",
    couple: "Ana e Marcos Silva",
    status: "Sessão Agendada",
    avatar: "/placeholder.svg",
    progress: 85,
    nextSession: "15/05, 10:00",
  },
  {
    id: 2,
    time: "14:30 - 15:30 - 15/05/2024",
    topic: "Resolução de Conflitos",
    couple: "Beatriz e Rafael Costa",
    status: "Sessão Agendada",
    avatar: "/placeholder.svg",
    progress: 60,
    nextSession: "16/05, 09:00",
  },
];

const clients = [
  {
    id: 1,
    couple: "Ana e Marcos Silva",
    avatar: "/placeholder.svg",
    lastSession: "Ontem, 10:00",
    nextSession: "15/05, 10:00",
    progress: 85,
  },
  {
    id: 2,
    couple: "Beatriz e Rafael Costa",
    avatar: "/placeholder.svg",
    lastSession: "07/05, 09:00",
    nextSession: "16/05, 09:00",
    progress: 60,
  },
  {
    id: 3,
    couple: "Carolina e Pedro Santos",
    avatar: "/placeholder.svg",
    lastSession: "06/05, 11:00",
    nextSession: "17/05, 11:00",
    progress: 70,
  },
  {
    id: 4,
    couple: "Daniela e Lucas Oliveira",
    avatar: "/placeholder.svg",
    lastSession: "08/05, 14:30",
    nextSession: "15/05, 14:30",
    progress: 92,
  },
];

const TherapistDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        items={[
          { label: "Dashboard", href: "/therapist-dashboard" },
          { label: "Clientes", href: "/therapist-dashboard" },
          { label: "Agenda", href: "/therapist-dashboard" },
          { label: "Suporte", href: "/support" },
        ]}
        showAuth
      />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard do Terapeuta</h1>
          <p className="text-muted-foreground">
            Bem-vindo(a), Dra. Helena! Aqui está o resumo da sua prática para uma gestão
            eficiente.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clientes Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sessões Esta Semana
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Progresso Médio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas Sessões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {session.couple.split(" ")[0][0]}
                          {session.couple.split(" ")[2][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{session.time}</p>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                        <p className="text-sm font-medium mt-1">
                          Cliente: {session.couple}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Próxima Sessão:</span>
                      <span className="font-medium">{session.nextSession}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso Geral</span>
                        <span className="font-medium">{session.progress}%</span>
                      </div>
                      <Progress value={session.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Client Progress */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresso dos Clientes</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tendência geral de progresso ao longo do ano.
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Progresso"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Casos</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tópicos mais comuns na sua prática.
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topicsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {client.couple.split(" ")[0][0]}
                        {client.couple.split(" ")[2][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{client.couple}</p>
                      <p className="text-sm text-muted-foreground">
                        Última Sessão: {client.lastSession}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Próxima Sessão: {client.nextSession}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={client.progress} className="h-2 w-24" />
                        <span className="text-sm font-medium">{client.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline">
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TherapistDashboard;
