import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Mic, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const conversations = [
  {
    id: 1,
    name: "Dr. Sofia Ribeiro",
    lastMessage: "Aguardando sua resposta.",
    time: "14:30",
    status: "Online",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Casal Silva",
    lastMessage: "Gostamos muito da sessão.",
    time: "Ontem",
    status: "Offline",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Sr. e Sra. Santos",
    lastMessage: "Ok, obrigado!",
    time: "18 Fev",
    status: "Offline",
    avatar: "/placeholder.svg",
  },
];

const messages = [
  {
    id: 1,
    sender: "Dr. Sofia Ribeiro",
    content: "Olá! Como vocês estão hoje? Espero que a semana tenha sido tranquila.",
    time: "15:00",
    isOwn: false,
  },
  {
    id: 2,
    sender: "Você",
    content:
      "Olá Dra. Sofia! Estamos bem, obrigado. A semana foi um pouco corrida, mas conseguimos conversar mais.",
    time: "15:05",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Dr. Sofia Ribeiro",
    content:
      "Que bom ouvir isso! Fico feliz em saber que estão praticando a comunicação. Tem algo específico que gostariam de compartilhar ou discutir?",
    time: "15:10",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Você",
    content:
      "Sim, na verdade, tivemos um pequeno desentendimento sobre as tarefas domésticas no meio da semana.",
    time: "15:12",
    isOwn: true,
  },
  {
    id: 5,
    sender: "Dr. Sofia Ribeiro",
    content:
      "Compreendo. Podemos explorar isso na nossa próxima sessão, ou vocês gostariam de algumas dicas rápidas agora sobre como abordar isso?",
    time: "15:20",
    isOwn: false,
  },
  {
    id: 6,
    sender: "Você",
    content: "Acho que algumas dicas rápidas seriam ótimas para hoje. Obrigado!",
    time: "15:22",
    isOwn: true,
  },
  {
    id: 7,
    sender: "Dr. Sofia Ribeiro",
    content:
      'Claro! Lembrem-se de usar a comunicação não violenta: expresse a observação, o sentimento, a necessidade e o pedido claro. Por exemplo: "Quando eu vejo as louças na pia (observação), eu me sinto sobrecarregado (sentimento), porque preciso de mais colaboração (necessidade). Você estaria disposto a ajudar a lavar a louça antes das 20h hoje? (pedido)." Tentem praticar isso.',
    time: "15:30",
    isOwn: false,
  },
];

const Chat = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        items={[
          { label: "Início", href: "/couple-dashboard" },
          { label: "Atividades", href: "/activities" },
          { label: "Perfil", href: "/couple-dashboard" },
          { label: "Humor", href: "/mood-tracker" },
        ]}
        showAuth
      />

      <div className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <Card className="lg:col-span-4 flex flex-col">
            <CardHeader>
              <CardTitle>Conversas</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
              <CardContent className="space-y-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      conversation.id === 1
                        ? "bg-primary/10 border-2 border-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-8 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild className="lg:hidden">
                  <Link to="/couple-dashboard">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    DS
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">Dr. Sofia Ribeiro</CardTitle>
                  <Badge variant="secondary" className="bg-success text-white">
                    Online
                  </Badge>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/couple-dashboard">Voltar ao Painel</Link>
                </Button>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        msg.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <CardContent className="border-t pt-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button size="icon" className="bg-gradient-primary">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
