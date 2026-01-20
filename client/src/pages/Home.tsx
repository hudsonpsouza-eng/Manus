/**
 * Hudson Souza Advocacia - Landing Page
 * Design: Swiss Modernism meets Legal Tech
 * - Diagonal flow architecture with asymmetric precision
 * - Navy (#1A2D40), Gold (#B89C5B), Light Gray (#E0E0E0)
 * - Outfit for headings, Work Sans for body
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Search, FileCheck, Award, Clock, Users, CheckCircle2, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(/background-blue.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2D40]/80 via-[#1A2D40]/70 to-[#1A2D40]/60" />
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="mb-8">
                <img src="/logo.png" alt="Hudson Souza Advocacia" className="h-24 sm:h-32 lg:h-40 w-auto" />
              </div>
              
              <div className="inline-block">
                <h1 className="text-white mb-4" style={{textAlign: 'left'}}>Deixe a Sua Marca no Mundo
                </h1>
                <div className="h-1 w-24 bg-[#B89C5B]" />
              </div>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-xl">
                Oferecemos serviços completos de registro de marcas e busca por anterioridade de patentes, que inclui relatórios e pareceres técnicos detalhados, pesquisa de colidência e acompanhamento total do processo no INPI. Garantimos a proteção legal completa para seus ativos intangíveis.
              </p>
              
              <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  className="bg-[#B89C5B] hover:bg-[#9B7A45] text-white font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-10 py-3 sm:py-7 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg w-full sm:w-auto"
                  onClick={() => {
                    setTimeout(() => {
                      const contactForm = document.getElementById('contact-form');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                >
                  Solicitar Orçamento
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white/20 font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-10 py-3 sm:py-7 rounded-lg transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
                  onClick={() => {
                    setTimeout(() => {
                      const servicesSection = document.getElementById('services-section');
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                >
                  Saiba Mais
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>
            
            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mt-8 lg:mt-0">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <Shield className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-[#B89C5B] mb-2 sm:mb-3 lg:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">100%</div>
                  <div className="text-xs sm:text-sm text-gray-200">Proteção Legal</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <Clock className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-[#B89C5B] mb-2 sm:mb-3 lg:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">24h</div>
                  <div className="text-xs sm:text-sm text-gray-200">Resposta Inicial</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <Award className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-[#B89C5B] mb-2 sm:mb-3 lg:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">2+</div>
                  <div className="text-xs sm:text-sm text-gray-200">Anos de Experiência</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <Users className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-[#B89C5B] mb-2 sm:mb-3 lg:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">B2B</div>
                  <div className="text-xs sm:text-sm text-gray-200">Foco Empresarial</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Diagonal divider removed - keeping uniform white */}
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-12 sm:py-16 lg:py-24 bg-[#000080] relative">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4">Nossos Serviços</h2>
            <div className="h-1 w-16 sm:w-20 lg:w-24 bg-[#B89C5B] mx-auto mb-4 sm:mb-6" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-2xl mx-auto">
              Soluções completas para proteção de propriedade intelectual, desde a pesquisa até o registro definitivo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Trademark Registration Service */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-[#B89C5B] transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden group cursor-pointer text-white">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                  <img 
                    src="/images/services-trademark.jpg" 
                    alt="Registro de Marca" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <Shield className="h-12 w-12 text-[#B89C5B] mb-4" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl text-white mb-2">Registro de Marca</h3>
                  <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6">
                    Proteja sua identidade visual e nome comercial com registro completo no INPI
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B89C5B] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-white">Marca Nominativa - R$ 700,00</div>
                      <div className="text-xs sm:text-sm text-gray-300">Proteção do nome/texto da marca</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B89C5B] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-white">Marca Figurativa - R$ 800,00</div>
                      <div className="text-xs sm:text-sm text-gray-300">Proteção do logotipo/símbolo</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B89C5B] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-white">Marca Mista - R$ 1.500,00</div>
                      <div className="text-xs sm:text-sm text-gray-300">Proteção completa: nome + logotipo</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-4 space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B89C5B]" />
                    <span>Inclui a pesquisa de colidência como cortesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B89C5B]" />
                    <span>+ R$ 300,00 por classe adicional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B89C5B]" />
                    <span>+ R$ 500,00 por reformulação da marca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B89C5B]" />
                    <span>Pagamento à vista ou em até 12x no cartão de crédito (com juros)</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-[#B89C5B] hover:bg-[#9B7A45] text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => {
                    sessionStorage.setItem('selectedService', 'trademark');
                    setTimeout(() => {
                      const contactForm = document.getElementById('contact-form');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                >
                  Solicitar Registro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Prior Art Search Service */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-[#B89C5B] transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden group cursor-pointer text-white">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                  <img 
                    src="/images/services-patent.jpg" 
                    alt="Busca por Anterioridades" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <Search className="h-12 w-12 text-[#B89C5B] mb-4" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl text-white mb-2">Busca por Anterioridades</h3>
                  <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6">
                    Análise completa de patenteabilidade e mapeamento de anterioridades
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B89C5B] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-white">Projeto Básico - R$ 1.100,00</div>
                      <div className="text-xs sm:text-sm text-gray-300">Relatório simples + Parecer simples</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B89C5B] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-white">Projeto Avançado - R$ 1.800,00 a R$ 2.000,00</div>
                      <div className="text-xs sm:text-sm text-gray-300">Relatório técnico + Análise de patenteabilidade + Mapa de anterioridades + Parecer detalhado</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-4 space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B89C5B]" />
                    <span>+ R$ 200,00 por reivindicação adicional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B89C5B]" />
                    <span>+ R$ 400,00 por análise internacional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B89C5B]" />
                    <span>Pagamento à vista ou em até 12x no cartão de crédito (com juros)</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-[#1A2D40] hover:bg-[#2A3D50] text-white"
                  onClick={() => {
                    sessionStorage.setItem('selectedService', 'priorArt');
                    setTimeout(() => {
                      const contactForm = document.getElementById('contact-form');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                >
                  Solicitar Análise
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Diagonal transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#E0E0E0]" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0 100%)' }} />
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#E0E0E0] relative">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-[#1A2D40] mb-4">Por Que Registrar Sua Marca?</h2>
            <div className="h-1 w-24 bg-[#B89C5B] mx-auto mb-6" />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              O registro no INPI oferece proteção legal completa e valoriza seu patrimônio intelectual
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#1A2D40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#B89C5B]" />
                </div>
                <h4 className="font-semibold text-[#1A2D40] mb-2">Proteção Legal</h4>
                <p className="text-sm text-gray-600">
                  Direito exclusivo de uso em todo território nacional
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#1A2D40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#B89C5B]" />
                </div>
                <h4 className="font-semibold text-[#1A2D40] mb-2">Valorização</h4>
                <p className="text-sm text-gray-600">
                  Marca registrada aumenta o valor da empresa
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#1A2D40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8 text-[#B89C5B]" />
                </div>
                <h4 className="font-semibold text-[#1A2D40] mb-2">Prevenção de Disputas</h4>
                <p className="text-sm text-gray-600">
                  Evita conflitos legais com concorrentes
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#1A2D40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-[#B89C5B]" />
                </div>
                <h4 className="font-semibold text-[#1A2D40] mb-2">Uso Indeterminado</h4>
                <p className="text-sm text-gray-600">
                  Válido por 10 anos, renovável indefinidamente
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Diagonal transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }} />
      </section>

      {/* About Section */}
      <section 
        className="py-24 bg-white relative"
        style={{
          backgroundImage: 'url(/images/about-technology.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/95" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#1A2D40] mb-4">Sobre Hudson Souza Advocacia</h2>
              <div className="h-1 w-24 bg-[#B89C5B] mx-auto mb-6" />
            </div>
            
            <Card className="border-2 border-gray-200 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <div className="relative w-full md:w-80 h-80 mb-8 rounded-lg overflow-hidden shadow-lg mx-auto">
                    <img src="/hudson-photo.jpg" alt="Hudson Souza" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg" style={{textAlign: 'justify'}}>
                      Advogado especializado em <strong className="text-[#1A2D40]">propriedade intelectual</strong>, direito do consumidor, direito bancário e direito administrativo, com dois anos e meio de experiência em Juiz de Fora, MG.
                    </p>
                    
                    <p style={{fontSize: '18px', textAlign: 'justify'}}>
                      Atendo escritórios de advocacia, legaltechs, escritórios de contabilidade, fintechs e outras empresas que buscam consultoria e atuação na proteção de ativos intangíveis como registros de marca, registro de software e busca de anterioridades de patentes.
                    </p>
                    
                    <div className="bg-[#E0E0E0] p-6 rounded-lg">
                      <h4 className="font-semibold text-[#1A2D40] mb-3">Meu Diferencial</h4>
                      <p style={{textAlign: 'justify'}}>
                        Responsabilidade com o patrimônio intangível das empresas e utilização de <strong className="text-[#1A2D40]">tecnologia para apoio na proteção dos ativos</strong>. Especializado no processo de registro de marcas, desde a criação da identidade visual da empresa até o registro no INPI, como também no processo de patenteabilidade, com estudo de anterioridade e registro da patente no INPI.
                      </p>
                    </div>
                    
                    <p className="text-lg font-semibold text-[#1A2D40] text-center">
                      Minha missão é conscientizar empresas e escritórios sobre a importância de ter um patrimônio intangível protegido da concorrência e que se destaque no mercado.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Diagonal transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#E0E0E0]" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0 100%)' }} />
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#E0E0E0]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-[#1A2D40] mb-4">Perguntas Frequentes</h2>
            <div className="h-1 w-24 bg-[#B89C5B] mx-auto mb-6" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-none">
                <AccordionTrigger className="text-[#1A2D40] font-semibold hover:text-[#B89C5B]">
                  ⏱️ Quanto tempo demora o processo de registro de marca?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  O processo completo no INPI pode levar de 12 a 24 meses, dependendo da complexidade e eventuais oposições. Acompanhamos todo o processo e mantemos você informado em cada etapa.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-none">
                <AccordionTrigger className="text-[#1A2D40] font-semibold hover:text-[#B89C5B]">
                  🔍 O que está incluso na pesquisa de colidência?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  A pesquisa de colidência verifica se já existem marcas registradas ou em processo de registro que sejam idênticas ou semelhantes à sua, evitando conflitos futuros e aumentando as chances de aprovação.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-none">
                <AccordionTrigger className="text-[#1A2D40] font-semibold hover:text-[#B89C5B]">
                  🏷️ Qual a diferença entre marca nominativa, figurativa e mista?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Marca nominativa protege apenas o nome/texto. Marca figurativa protege apenas o símbolo/logotipo. Marca mista protege a combinação de nome e logotipo juntos, oferecendo proteção mais completa.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-none">
                <AccordionTrigger className="text-[#1A2D40] font-semibold hover:text-[#B89C5B]">
                  📋 O que é a busca por anterioridades em patentes?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  É uma pesquisa detalhada em bases de dados nacionais e internacionais para verificar se sua invenção é realmente nova e possui requisitos de patenteabilidade, incluindo análise de documentos técnicos similares.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-none">
                <AccordionTrigger className="text-[#1A2D40] font-semibold hover:text-[#B89C5B]">
                  🔄 Preciso renovar o registro da minha marca?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Sim, o registro de marca tem validade de 10 anos e pode ser renovado indefinidamente. Recomendamos iniciar o processo de renovação com 6 meses de antecedência do vencimento.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* CTA Section */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/background-blue.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2D40]/80 to-[#1A2D40]/70" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-white mb-6">Pronto Para Proteger Seu Patrimônio?</h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Entre em contato agora e receba uma consultoria personalizada sobre registro de marcas e busca por anterioridades
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-[#B89C5B] hover:bg-[#A68B4F] text-white font-semibold text-lg px-8 py-6"
                onClick={() => {
                  setTimeout(() => {
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a 
                href="tel:+553299811-4374"
                className="inline-flex items-center justify-center gap-2 px-8 py-6 border-2 border-white text-white hover:bg-white/10 font-semibold text-lg rounded-md transition-all h-14"
              >
                <Phone className="h-5 w-5" />
                Ligar Agora
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-3">
                <Phone className="h-6 w-6 text-[#B89C5B]" />
                <div>
                  <div className="font-semibold mb-1">Telefone</div>
                  <div className="text-gray-300 text-sm">(32) 99811-4374</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <Mail className="h-6 w-6 text-[#B89C5B]" />
                <div>
                  <div className="font-semibold mb-1">E-mail</div>
                  <div className="text-gray-300 text-sm">hudsonvbadv@gmail.com</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <MapPin className="h-6 w-6 text-[#B89C5B]" />
                <div>
                  <div className="font-semibold mb-1">Localização</div>
                  <div className="text-gray-300 text-sm">Juiz de Fora, MG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2D40] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#B89C5B] mb-4">Hudson Souza Advocacia</h3>
              <p className="text-gray-300 text-sm">
                Especialista em Propriedade Intelectual
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Registro de Marca</li>
                <li>Busca por Anterioridades</li>
                <li>Consultoria em PI</li>
                <li>Contratos de Licenciamento</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>(32) 99811-4374</li>
                <li>hudsonvbadv@gmail.com</li>
                <li>Juiz de Fora, MG</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Hudson Souza Advocacia. Todos os direitos reservados.</p>
            <p className="mt-2">OAB/MG 224.238 - Propriedade Intelectual</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
