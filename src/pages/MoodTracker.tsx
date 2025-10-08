import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Meh } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const weeklyMoodData = [
  { day: "Dia 1", parceiro1: 85, parceiro2: 70 },
  { day: "Dia 2", parceiro1: 75, parceiro2: 80 },
  { day: "Dia 3", parceiro1: 65, parceiro2: 60 },
  { day: "Dia 4", parceiro1: 90, parceiro2: 85 },
  { day: "Dia 5", parceiro1: 80, parceiro2: 75 },
  { day: "Dia 6", parceiro1: 95, parceiro2: 90 },
  { day: "Dia 7", parceiro1: 70, parceiro2: 70 },
];

const moodOptions = [
  { label: "Feliz", icon: Smile, color: "bg-success", selected: false },
  { label: "Calmo", icon: Smile, color: "bg-primary", selected: false },
  { label: "Neutro", icon: Meh, color: "bg-muted", selected: true },
  { label: "Triste", icon: Frown, color: "bg-warning", selected: false },
  { label: "Irritado", icon: Frown, color: "bg-destructive", selected: false },
  { label: "Rindo", icon: Smile, color: "bg-secondary", selected: false },
];

const MoodTracker = () => {
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
        <h1 className="text-3xl font-bold mb-8">Rastreador de Humor</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Como vocês se sentem hoje?</CardTitle>
            <p className="text-sm text-muted-foreground">
              Compartilhem seus humores diários para nos conectarmos melhor.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Partner 1 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Parceiro 1</h3>
                    <Badge className="bg-primary">Neutro</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {moodOptions.map((mood, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:border-primary animate-fade-in ${
                        mood.selected ? "border-primary bg-primary/5" : "border-border"
                      }`}
                      onClick={() => {}}
                    >
                      <div className={`p-3 rounded-full ${mood.color} transition-transform hover:scale-110`}>
                        <mood.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner 2 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                      B
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Parceiro 2</h3>
                    <Badge className="bg-secondary">Neutro</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {moodOptions.map((mood, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:border-secondary animate-fade-in ${
                        mood.selected ? "border-secondary bg-secondary/5" : "border-border"
                      }`}
                      onClick={() => {}}
                    >
                      <div className={`p-3 rounded-full ${mood.color} transition-transform hover:scale-110`}>
                        <mood.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tendências de Humor Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyMoodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="parceiro1"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="parceiro1"
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="parceiro2"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  name="parceiro2"
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Current Mood Summary */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Humor Atual do Casal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-full bg-muted">
                      <Meh className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Parceiro 1</p>
                      <p className="text-sm text-muted-foreground">Neutro</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-full bg-muted">
                      <Meh className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Parceiro 2</p>
                      <p className="text-sm text-muted-foreground">Neutro</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Humor Comum (P1)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-flex p-6 rounded-full bg-success/10 mb-4">
                    <Smile className="h-16 w-16 text-success" />
                  </div>
                  <p className="text-2xl font-bold">Feliz</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Humor Comum (P2)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-flex p-6 rounded-full bg-primary/10 mb-4">
                    <Smile className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">Calmo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MoodTracker;
