import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, MessageCircle, Lock, Zap, Lightbulb } from "lucide-react";
import { Logo } from "@/components/Logo";

const popularTopics = [
  {
    icon: Lock,
    title: "Como redefinir sua senha?",
    description: "Recupere o acesso à sua conta",
  },
  {
    icon: Lightbulb,
    title: "Guia de início rápido",
    description: "Primeiros passos na plataforma",
  },
  {
    icon: MessageCircle,
    title: "Faturamento e pagamentos",
    description: "Informações sobre planos e cobranças",
  },
  {
    icon: Zap,
    title: "Solução de problemas de login",
    description: "Dificuldades para acessar sua conta",
  },
  {
    icon: Lock,
    title: "Privacidade e segurança de dados",
    description: "Como protegemos suas informações",
  },
  {
    icon: Lightbulb,
    title: "Melhores práticas de uso",
    description: "Aproveite ao máximo a plataforma",
  },
];

const faqs = [
  {
    question: "Como posso redefinir minha senha?",
    answer:
      'Para redefinir sua senha, vá para a página de login e clique em "Esqueceu a senha?". Digite seu e-mail cadastrado e você receberá um link para criar uma nova senha.',
  },
  {
    question: "Como funcionam as sessões agendadas?",
    answer:
      "As sessões podem ser agendadas através do seu dashboard. Você receberá notificações por e-mail e no sistema antes de cada sessão. As sessões podem ser presenciais ou online, dependendo da sua preferência.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim, todos os seus dados são criptografados e armazenados em servidores seguros. Seguimos as melhores práticas de segurança e estamos em conformidade com a LGPD (Lei Geral de Proteção de Dados).",
  },
  {
    question: "Como funciona o sistema de metas?",
    answer:
      "Você e seu terapeuta podem criar metas personalizadas juntos. Cada meta pode ter prazos e marcos de progresso. Você acompanha o progresso através do dashboard e recebe emblemas ao completar objetivos.",
  },
  {
    question: "Posso mudar de terapeuta?",
    answer:
      "Sim, você pode solicitar uma mudança de terapeuta a qualquer momento. Entre em contato com nosso suporte através do chat para que possamos ajudá-lo nesse processo.",
  },
];

const Support = () => {
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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-4">
            <Logo className="scale-150" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Como podemos ajudar você?</h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Buscar por artigos, FAQs, tutoriais..."
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Tópicos Populares</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:border-primary transition-all group hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Perguntas Frequentes</h2>
            <p className="text-muted-foreground">
              Respostas para as dúvidas mais comuns dos nossos usuários
            </p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          <div className="text-center mt-6">
            <Button variant="outline" size="lg">
              Ver Todos os Artigos
            </Button>
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">Não encontrou o que procurava?</CardTitle>
              <p className="text-muted-foreground">
                Nossa equipe de suporte está pronta para ajudar você
              </p>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary" asChild>
                <a href="/chat">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Enviar Mensagem
                </a>
              </Button>
              <Button size="lg" variant="outline">
                <HelpCircle className="mr-2 h-5 w-5" />
                Perguntas Frequentes
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Amor & Equilíbrio. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Support;
