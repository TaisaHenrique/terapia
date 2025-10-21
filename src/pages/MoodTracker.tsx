import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Meh, Heart } from "lucide-react";
import { useState, useMemo } from "react";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
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

type MoodLevel = "feliz" | "muito_feliz" | "neutro" | "triste" | "muito_triste";

const moodOptions: { label: string; value: MoodLevel; icon: any; color: string }[] = [
  { label: "Muito Feliz", value: "muito_feliz", icon: Smile, color: "bg-success" },
  { label: "Feliz", value: "feliz", icon: Smile, color: "bg-primary" },
  { label: "Neutro", value: "neutro", icon: Meh, color: "bg-muted" },
  { label: "Triste", value: "triste", icon: Frown, color: "bg-warning" },
  { label: "Muito Triste", value: "muito_triste", icon: Frown, color: "bg-destructive" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const { data: moodEntries = [], isLoading, createMoodEntry } = useMoodEntries();
  const { data: profile } = useProfile();

  const weeklyMoodData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split("T")[0];
    });

    return last7Days.map((date, index) => {
      const dayEntries = moodEntries.filter(
        (entry) => entry.data_registro?.split("T")[0] === date
      );
      
      const moodToScore = (mood: string) => {
        const scores: Record<string, number> = {
          muito_feliz: 95,
          feliz: 80,
          neutro: 60,
          triste: 40,
          muito_triste: 20,
        };
        return scores[mood] || 60;
      };

      const avgScore = dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + moodToScore(e.nivel_humor), 0) / dayEntries.length
        : 60;

      return {
        day: `Dia ${index + 1}`,
        humor: Math.round(avgScore),
      };
    });
  }, [moodEntries]);

  const handleMoodSelect = async (mood: MoodLevel) => {
    setSelectedMood(mood);
    createMoodEntry(
      { nivel_humor: mood },
      {
        onSuccess: () => {
          toast.success("Humor registrado com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao registrar humor");
        },
      }
    );
  };

  const currentMood = moodEntries[0]?.nivel_humor;
  const currentMoodOption = moodOptions.find((opt) => opt.value === currentMood);

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
            <CardTitle>Como você se sente hoje?</CardTitle>
            <p className="text-sm text-muted-foreground">
              Registre seu humor diário para acompanhar seu bem-estar emocional.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {profile?.nome?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{profile?.nome || "Usuário"}</h3>
                {currentMoodOption && (
                  <Badge className="bg-primary">{currentMoodOption.label}</Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {moodOptions.map((mood, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:border-primary animate-fade-in ${
                    selectedMood === mood.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => handleMoodSelect(mood.value)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-3 rounded-full ${mood.color} transition-transform hover:scale-110`}>
                    <mood.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tendências de Humor Semanal</CardTitle>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas emoções ao longo da última semana
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyMoodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="humor"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="Nível de Humor"
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Current Mood Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodEntries.slice(0, 5).map((entry) => {
                const moodOption = moodOptions.find((opt) => opt.value === entry.nivel_humor);
                const Icon = moodOption?.icon || Meh;
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-3 rounded-full ${moodOption?.color || "bg-muted"}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{moodOption?.label || entry.nivel_humor}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.data_registro!).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {entry.nota && (
                        <p className="text-sm text-muted-foreground mt-1">{entry.nota}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {moodEntries.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum registro de humor ainda. Comece registrando como você se sente!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MoodTracker;
