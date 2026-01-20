import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Loader2, Eye, Trash2, CheckCircle, Clock, AlertCircle, Download, FileText, BarChart3 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { exportQuoteToPDF, exportQuotesToCSV } from "@/lib/exportUtils";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

export default function QuotesDashboard() {
  // All hooks must be called unconditionally at the top
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { data: quotes, isLoading, refetch } = trpc.contact.getRecent.useQuery();
  const lastQuoteCountRef = useRef<number>(0);
  const deleteQuoteMutation = trpc.contact.delete.useMutation({
    onSuccess: () => {
      refetch();
      setShowDetails(false);
      toast.success("Orçamento deletado com sucesso");
    },
  });

  useEffect(() => {
    if (!quotes || !user || user.role !== "admin") return;
    const currentCount = quotes.length;
    if (lastQuoteCountRef.current === 0) {
      lastQuoteCountRef.current = currentCount;
      return;
    }
    if (currentCount > lastQuoteCountRef.current) {
      const newQuote = quotes[0];
      toast.success(`Novo orçamento recebido! ${newQuote?.name || "Cliente"}`);
      lastQuoteCountRef.current = currentCount;
    }
  }, [quotes, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Now we can do early returns after all hooks are called
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#B89C5B]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
            <p className="text-gray-600 mb-6">Você não tem permissão para acessar esta página.</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Voltar para Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any; icon: any }> = {
      new: { label: "Novo", variant: "default", icon: <Clock className="h-3 w-3" /> },
      contacted: { label: "Contatado", variant: "secondary", icon: <CheckCircle className="h-3 w-3" /> },
      quoted: { label: "Orçado", variant: "outline", icon: <CheckCircle className="h-3 w-3" /> },
      closed: { label: "Fechado", variant: "secondary", icon: <CheckCircle className="h-3 w-3" /> },
    };
    const config = statusConfig[status] || statusConfig.new;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getUrgencyColor = (urgency: string) => {
    const colors: Record<string, string> = {
      low: "bg-blue-100 text-blue-800",
      normal: "bg-gray-100 text-gray-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return colors[urgency] || colors.normal;
  };

  const getServiceLabel = (serviceType: string) => {
    const labels: Record<string, string> = {
      trademark: "Registro de Marca",
      priorArt: "Busca por Anterioridades",
      both: "Ambos os Serviços",
    };
    return labels[serviceType] || serviceType;
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este orçamento?")) {
      await deleteQuoteMutation.mutateAsync({ id });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#1A2D40] mb-2">Dashboard de Orçamentos</h1>
              <p className="text-gray-600">Gerencie todas as solicitações de orçamento recebidas</p>
            </div>
            {quotes && quotes.length > 0 && (
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="flex items-center gap-2 bg-[#B89C5B] hover:bg-[#A68B4F]"
                >
                  <BarChart3 className="h-4 w-4" />
                  {showAnalytics ? "Ocultar" : "Mostrar"} Análises
                </Button>
                <Button
                  onClick={() => {
                    exportQuotesToCSV(quotes);
                    toast.success("Orçamentos exportados em CSV");
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exportar CSV
                </Button>
              </div>
            )}
          </div>
        </div>

        {showAnalytics && quotes && quotes.length > 0 && (
          <div className="mb-8">
            <AnalyticsDashboard quotes={quotes} />
          </div>
        )}

        {!quotes || quotes.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">Nenhum orçamento solicitado ainda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {quotes.map((quote: any) => (
              <Card key={quote.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[#1A2D40]">{quote.name}</h3>
                        {getStatusBadge(quote.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">E-mail</p>
                          <p className="font-medium text-gray-900">{quote.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Telefone</p>
                          <p className="font-medium text-gray-900">{quote.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Serviço</p>
                          <p className="font-medium text-gray-900">{getServiceLabel(quote.serviceType)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Urgência</p>
                          <p className={`font-medium px-2 py-1 rounded text-xs w-fit ${getUrgencyColor(quote.urgency)}`}>
                            {quote.urgency.charAt(0).toUpperCase() + quote.urgency.slice(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setShowDetails(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Detalhes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          exportQuoteToPDF(quote);
                          toast.success("Orçamento exportado em PDF");
                        }}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(quote.id)}
                        disabled={deleteQuoteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Orçamento</DialogTitle>
            <DialogDescription>Informações completas da solicitação</DialogDescription>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  <p className="font-medium text-gray-900">{selectedQuote.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium text-gray-900">{selectedQuote.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium text-gray-900">{selectedQuote.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Empresa</p>
                  <p className="font-medium text-gray-900">{selectedQuote.company || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Serviço</p>
                  <p className="font-medium text-gray-900">{getServiceLabel(selectedQuote.serviceType)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Urgência</p>
                  <p className={`font-medium px-2 py-1 rounded text-xs w-fit ${getUrgencyColor(selectedQuote.urgency)}`}>
                    {selectedQuote.urgency.charAt(0).toUpperCase() + selectedQuote.urgency.slice(1)}
                  </p>
                </div>
              </div>
              {selectedQuote.projectDescription && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Descrição do Projeto</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedQuote.projectDescription}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Fechar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedQuote.id)}
                  disabled={deleteQuoteMutation.isPending}
                >
                  {deleteQuoteMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deletando...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Deletar
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
