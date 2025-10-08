import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Activities = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    "Caminhar juntos no parque.",
    "Preparar o jantar e conversar sobre o dia.",
    "Assistir a um filme ou série abraçados.",
    "Trocar massagens relaxantes.",
  ];

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
        <h1 className="text-3xl font-bold mb-8">Atividades Terapêuticas</h1>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">
              Qual é o seu ritual favorito para se reconectar após um dia agitado?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`p-6 rounded-lg border-2 transition-all text-left hover:border-primary ${
                    selectedOption === option
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <p className="text-base">{option}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="bg-gradient-primary px-8">
                Próxima Atividade
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Dica
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2 bg-success">Concluído</Badge>
              <CardTitle className="text-lg">Exercício de Comunicação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pratique a escuta ativa e compartilhe sentimentos sem julgamento.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2 bg-warning">Em Andamento</Badge>
              <CardTitle className="text-lg">Ritual de Reconexão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Identifique momentos especiais para se reconectar após dias agitados.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2 bg-muted">Pendente</Badge>
              <CardTitle className="text-lg">Planejamento de Sonhos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conversem sobre objetivos futuros e planejem juntos uma meta compartilhada.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Activities;
