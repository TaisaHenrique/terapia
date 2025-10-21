import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { data: messages = [], sendMessage } = useChatMessages();
  const { data: profile } = useProfile();

  const handleSend = () => {
    if (!message.trim()) return;

    // Para demonstração, usando um ID fixo de terapeuta
    sendMessage(
      { mensagem: message, destinatario_id: "00000000-0000-0000-0000-000000000000" },
      {
        onSuccess: () => {
          setMessage("");
          toast.success("Mensagem enviada!");
        },
      }
    );
  };

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
        <Card className="h-[calc(100vh-12rem)] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/couple-dashboard">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  T
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">Chat com Terapeuta</CardTitle>
              </div>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => {
                const isOwn = msg.remetente_id === profile?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.mensagem}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {new Date(msg.data_envio!).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
              {messages.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma mensagem ainda. Comece a conversa!
                </p>
              )}
            </div>
          </ScrollArea>

          <CardContent className="border-t pt-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" className="bg-gradient-primary" onClick={handleSend}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
