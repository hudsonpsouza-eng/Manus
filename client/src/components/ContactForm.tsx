'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, MessageCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

// Service specifications with pricing
const serviceSpecifications = {
  trademark: [
    { label: "Marca Nominativa - R$ 700,00", value: "nominativa" },
    { label: "Marca Figurativa - R$ 800,00", value: "figurativa" },
    { label: "Marca Mista - R$ 1.500,00", value: "mista" },
  ],
  priorArt: [
    { label: "Projeto Básico - R$ 1.100,00", value: "basic" },
    { label: "Projeto Avançado - R$ 1.800,00 a R$ 2.000,00", value: "advanced" },
  ],
  both: [
    { label: "Pacote Completo - Registro + Busca por Anterioridades", value: "complete" },
  ],
};

const WHATSAPP_PHONE = "5532998114374"; // WhatsApp Business number

// Phone mask function for Brazilian format (XX) XXXXX-XXXX
const formatPhoneBrazil = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export function ContactForm() {
  const [formData, setFormData] = useState(() => {
    const selectedService = typeof window !== 'undefined' ? sessionStorage.getItem('selectedService') : null;
    // Clear the sessionStorage immediately after reading it
    if (typeof window !== 'undefined' && selectedService) {
      sessionStorage.removeItem('selectedService');
    }
    return {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceType: (selectedService || "trademark") as "trademark" | "priorArt" | "both",
      serviceLevel: "",
      urgency: "normal" as "low" | "normal" | "high" | "urgent",
      projectDescription: "",
      consentMarketing: false,
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  // Poll for sessionStorage changes
  useEffect(() => {
    const checkForServiceChange = () => {
      const selectedService = sessionStorage.getItem('selectedService') as "trademark" | "priorArt" | "both" | null;
      if (selectedService) {
        setFormData((prev) => ({
          ...prev,
          serviceType: selectedService,
          serviceLevel: "",
        }));
        sessionStorage.removeItem('selectedService');
      }
    };

    const interval = setInterval(checkForServiceChange, 50);
    return () => clearInterval(interval);
  }, []);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: (data) => {
      setSubmittedData(formData);
      setShowConfirmation(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: "trademark",
        serviceLevel: "",
        urgency: "normal",
        projectDescription: "",
        consentMarketing: false,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao enviar formulário");
    },
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value as any,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || undefined,
        serviceType: formData.serviceType,
        serviceSpecification: formData.serviceLevel || undefined,
        urgency: formData.urgency,
        projectDescription: formData.projectDescription || undefined,
        consentMarketing: formData.consentMarketing,
      });
    } catch (error) {
      console.error("Erro ao enviar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de solicitar um orçamento para ${formData.serviceType === 'trademark' ? 'Registro de Marca' : formData.serviceType === 'priorArt' ? 'Busca por Anterioridades' : 'Ambos os Serviços'}. Meu nome é ${formData.name || 'não informado'} e meu email é ${formData.email || 'não informado'}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`, '_blank');
  };

  const currentSpecifications = serviceSpecifications[formData.serviceType] || [];

  const getServiceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      trademark: "Registro de Marca",
      priorArt: "Busca por Anterioridades",
      both: "Ambos os Serviços",
    };
    return labels[type] || type;
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels: Record<string, string> = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      urgent: "Urgente",
    };
    return labels[urgency] || urgency;
  };

  return (
    <>
      <div id="contact-form">
        <Card className="border-2 border-gray-200 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A2D40] mb-2">Solicite Seu Orçamento</h3>
              <p className="text-gray-600">Preencha o formulário abaixo e receberá uma consultoria personalizada</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1A2D40]">Informações Pessoais</h3>
                
                <div>
                  <Label htmlFor="name" className="text-[#1A2D40] font-semibold">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="mt-2 border-gray-300"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-[#1A2D40] font-semibold">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="mt-2 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[#1A2D40] font-semibold">Telefone/WhatsApp *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(32) 99811-4374"
                      value={formData.phone}
                      onChange={(e) => {
                        const formatted = formatPhoneBrazil(e.target.value);
                        handleChange('phone', formatted);
                      }}
                      maxLength={15}
                      required
                      className="mt-2 border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-[#1A2D40] font-semibold">Empresa/Razão Social</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Sua empresa"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="mt-2 border-gray-300"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1A2D40]">Seleção de Serviço</h3>
                
                <div>
                  <Label htmlFor="serviceType" className="text-[#1A2D40] font-semibold">Tipo de Serviço *</Label>
                  <Select value={formData.serviceType} onValueChange={(value: any) => handleChange('serviceType', value)}>
                    <SelectTrigger id="serviceType" className="mt-2 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trademark">Registro de Marca</SelectItem>
                      <SelectItem value="priorArt">Busca por Anterioridades</SelectItem>
                      <SelectItem value="both">Ambos os Serviços</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {currentSpecifications.length > 0 && (
                  <div>
                    <Label htmlFor="serviceLevel" className="text-[#1A2D40] font-semibold">Especificação do Serviço</Label>
                    <Select value={formData.serviceLevel} onValueChange={(value: any) => handleChange('serviceLevel', value)}>
                      <SelectTrigger id="serviceLevel" className="mt-2 border-gray-300">
                        <SelectValue placeholder="Selecione a especificação" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentSpecifications.map((spec) => (
                          <SelectItem key={spec.value} value={spec.value}>
                            {spec.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="urgency" className="text-[#1A2D40] font-semibold">Nível de Urgência *</Label>
                  <Select value={formData.urgency} onValueChange={(value: any) => handleChange('urgency', value)}>
                    <SelectTrigger id="urgency" className="mt-2 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1A2D40]">Detalhes do Projeto</h3>
                
                <div>
                  <Label htmlFor="description" className="text-[#1A2D40] font-semibold">Descrição do Projeto *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva brevemente seu projeto, marca ou invenção..."
                    value={formData.projectDescription}
                    onChange={(e) => handleChange('projectDescription', e.target.value)}
                    className="mt-2 border-gray-300 min-h-32"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consentMarketing}
                    onCheckedChange={(checked) => handleChange('consentMarketing', checked)}
                  />
                  <Label htmlFor="consent" className="text-gray-600 cursor-pointer">
                    Concordo em receber comunicações sobre meus serviços
                  </Label>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                * Campos obrigatórios. Seus dados serão usados apenas para contato sobre seu orçamento.
              </p>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                  className="flex-1 bg-[#1A2D40] hover:bg-[#2A3D50] text-white font-semibold py-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Solicitar Orçamento'
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Orçamento Solicitado com Sucesso!</DialogTitle>
            <DialogDescription className="text-center pt-4">
              Recebemos sua solicitação de orçamento e entraremos em contato em breve.
            </DialogDescription>
          </DialogHeader>
          
          {submittedData && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Nome</p>
                <p className="font-semibold text-gray-900">{submittedData.name}</p>
              </div>
              <div>
                <p className="text-gray-600">E-mail</p>
                <p className="font-semibold text-gray-900">{submittedData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Serviço Solicitado</p>
                <p className="font-semibold text-gray-900">{getServiceTypeLabel(submittedData.serviceType)}</p>
              </div>
              <div>
                <p className="text-gray-600">Urgência</p>
                <p className="font-semibold text-gray-900">{getUrgencyLabel(submittedData.urgency)}</p>
              </div>
            </div>
          )}

          <div className="space-y-2 pt-4">
            <p className="text-sm text-gray-600">
              Você também pode entrar em contato conosco diretamente:
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Telefone/WhatsApp:</strong> (32) 99811-4374</p>
              <p><strong>E-mail:</strong> hudsonvbadv@gmail.com</p>
            </div>
          </div>

          <Button
            onClick={() => setShowConfirmation(false)}
            className="w-full bg-[#1A2D40] hover:bg-[#2A3D50] text-white mt-4"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
