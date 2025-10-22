import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Chat = () => {
  const { destinatarioId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [destinatarioInfo, setDestinatarioInfo] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: messages = [], sendMessage } = useChatMessages(destinatarioId);
  const { data: profile } = useProfile();

  useEffect(() => {
    if (!destinatarioId) {
      navigate("/couple-dashboard");
      return;
    }

    // Buscar informações do destinatário
    const fetchDestinatario = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, nome, avatar_url, tipo_usuario, parceiro_id")
        .eq("id", destinatarioId)
        .single();
      
      setDestinatarioInfo(data);
    };

    fetchDestinatario();
  }, [destinatarioId, navigate]);

  useEffect(() => {
    // Auto-scroll para última mensagem
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !destinatarioId) return;

    sendMessage(
      { mensagem: message, destinatario_id: destinatarioId },
      {
        onSuccess: () => {
          setMessage("");
        },
        onError: () => {
          toast.error("Erro ao enviar mensagem");
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
                <AvatarImage src={destinatarioInfo?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {destinatarioInfo?.nome?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">
                  {destinatarioInfo?.nome || "Carregando..."}
                </CardTitle>
                {destinatarioInfo?.tipo_usuario === "casal" && destinatarioInfo?.parceiro_id && (
                  <p className="text-sm text-muted-foreground">Cliente</p>
                )}
              </div>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
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
                      {!isOwn && msg.remetente_nome && (
                        <p className="text-xs font-semibold mb-1 opacity-80">
                          {msg.remetente_nome}
                        </p>
                      )}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
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
