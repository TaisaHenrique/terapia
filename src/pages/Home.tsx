import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Heart, Target, MessageCircle, Award, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-couple.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in text-center lg:text-left">
              <div className="inline-block">
                <Heart className="h-16 w-16 text-white fill-white mb-4" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Amor&Equilíbrio
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                Bem-vindos ao Amor & Equilíbrio
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto lg:mx-0">
                Descubra uma nova forma de fortalecer seu relacionamento através de
                atividades lúdicas, metas compartilhadas e acompanhamento emocional.
                Comecem juntos essa jornada de conexão e harmonia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-primary hover:bg-white/90 text-lg h-14 px-8"
                >
                  <Link to="/couple-dashboard">Iniciar terapia</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white/10 text-lg h-14 px-8"
                >
                  <Link to="/couple-dashboard">Ver progresso</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Casal em harmonia"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como funciona a terapia gamificada?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combine o melhor da psicologia com tecnologia para fortalecer seu relacionamento
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Metas Personalizadas</h3>
                <p className="text-muted-foreground">
                  Defina objetivos terapêuticos customizados com acompanhamento profissional
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rastreador de Humor</h3>
                <p className="text-muted-foreground">
                  Acompanhe o estado emocional do casal e identifique padrões importantes
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sistema de Recompensas</h3>
                <p className="text-muted-foreground">
                  Conquiste emblemas e celebre cada conquista no caminho do crescimento
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                  <MessageCircle className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Chat Seguro</h3>
                <p className="text-muted-foreground">
                  Comunicação direta com seu terapeuta em um ambiente confidencial
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Acompanhamento Visual</h3>
                <p className="text-muted-foreground">
                  Visualize seu progresso através de gráficos e relatórios detalhados
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Desafios Juntos</h3>
                <p className="text-muted-foreground">
                  Atividades terapêuticas pensadas para fortalecer a conexão do casal
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar seu relacionamento?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a casais que já estão fortalecendo seus vínculos e construindo
              relacionamentos mais saudáveis
            </p>
            <Button
              size="lg"
              asChild
              className="bg-gradient-primary text-lg h-14 px-8"
            >
              <Link to="/couple-dashboard">Começar Agora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Amor & Equilíbrio. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
