import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, MessageCircle } from "lucide-react";
import { useTherapistClients } from "@/hooks/useTherapistClients";
import { Link } from "react-router-dom";
import { CreateCoupleModal } from "@/components/CreateCoupleModal";

const TherapistDashboard = () => {
  const { data: clients = [], isLoading } = useTherapistClients();

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
          { label: "Dashboard", href: "/therapist-dashboard" },
          { label: "Clientes", href: "/therapist-dashboard" },
          { label: "Suporte", href: "/support" },
        ]}
        showAuth
      />

      <main className="container py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard do Terapeuta</h1>
            <p className="text-muted-foreground">
              Gerencie seus clientes e acompanhe o progresso deles
            </p>
          </div>
          <CreateCoupleModal />
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clientes Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{clients.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meus Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            {clients.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={client.profiles?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {client.profiles?.nome?.[0] || "C"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.profiles?.nome || "Cliente"}</p>
                        <p className="text-sm text-muted-foreground">
                          {client.profiles?.email}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress
                            value={((client.profiles?.pontos || 0) % 100)}
                            className="h-2 w-24"
                          />
                          <span className="text-sm font-medium">
                            Nível {client.profiles?.nivel || 1}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/chat/${client.casal_id}`}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhum cliente cadastrado ainda
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TherapistDashboard;
