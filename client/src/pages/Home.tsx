import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Search, CheckCircle2, ArrowRight, FileCheck, Clock, Zap, Award } from 'lucide-react';

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Navy Gradient */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-navy-gradient pt-20 md:pt-0">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"
            animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-0">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-8 md:mb-10">
              <div className="inline-block">
                <span className="text-5xl md:text-7xl font-black text-amber-300 drop-shadow-lg">
                  HS
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight text-white"
            >
              Deixe a Sua Marca
              <br />
              <span className="text-amber-300">no Mundo</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
            >
              Serviços completos de registro de marcas e busca por anterioridade de patentes com garantia de proteção legal completa para seus ativos intangíveis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 px-2"
            >
              <Button className="btn-premium text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto w-full sm:w-auto">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button className="btn-premium-outline text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto w-full sm:w-auto">
                Saiba Mais
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-12 md:mt-16 px-2"
            >
              {[
                { icon: Shield, label: 'Proteção Legal', value: '100%' },
                { icon: Zap, label: 'Resposta Inicial', value: '24h' },
                { icon: Award, label: 'Experiência', value: '2+' },
                { icon: Award, label: 'Foco', value: 'B2B' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-effect-dark rounded-xl md:rounded-2xl p-4 md:p-6 text-white hover:bg-white/15 transition-all duration-300 backdrop-blur-md"
                >
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-amber-300 mx-auto mb-2 md:mb-3" />
                  <div className="text-xl md:text-2xl font-bold text-amber-300 mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - White Background */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-900">
              Nossos Serviços
            </h2>
            <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-amber-400 to-amber-300 mx-auto mb-6" />
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Soluções completas para proteção de propriedade intelectual, desde a pesquisa até o registro definitivo
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Trademark Registration */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect-white rounded-2xl md:rounded-3xl overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 md:h-64 bg-navy-gradient flex items-center justify-center overflow-hidden">
                  <motion.img
                    src="/trademark-card.png"
                    alt="Registro de Marca"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <Shield className="h-10 w-10 md:h-12 md:w-12 text-amber-400 mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-3">Registro de Marca</h3>
                  <p className="text-sm md:text-base text-gray-700 mb-6">
                    Proteja sua identidade visual e nome comercial com registro completo no INPI
                  </p>

                  <div className="space-y-3 md:space-y-4 mb-6">
                    {[
                      { title: 'Marca Nominativa', price: 'R$ 250,00', desc: 'Proteção do nome/texto' },
                      { title: 'Marca Figurativa', price: 'R$ 300,00', desc: 'Proteção do logotipo/símbolo' },
                      { title: 'Marca Mista', price: 'R$ 500,00', desc: 'Proteção completa' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-3 md:pb-4 border-b border-gray-200 last:border-0">
                        <CheckCircle2 className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm md:text-base text-blue-900">{item.title} - {item.price}</div>
                          <div className="text-xs md:text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-xs md:text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Inclui pesquisa de colidência como cortesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>+R$50,00 por classe adicional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>+R$200,00 por reformulação da marca</span>
                    </div>
                  </div>

                  <Button className="w-full btn-premium text-sm md:text-base py-2 md:py-3">
                    Solicitar Registro
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Prior Art Search */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect-white rounded-2xl md:rounded-3xl overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 md:h-64 bg-navy-gradient flex items-center justify-center overflow-hidden">
                  <motion.img
                    src="/search-card.png"
                    alt="Busca por Anterioridades"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <Search className="h-10 w-10 md:h-12 md:w-12 text-amber-400 mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-3">Busca por Anterioridades</h3>
                  <p className="text-sm md:text-base text-gray-700 mb-6">
                    Análise completa de patenteabilidade e mapeamento de anterioridades
                  </p>

                  <div className="space-y-3 md:space-y-4 mb-6">
                    {[
                      { title: 'Projeto Básico', price: 'R$ 500,00', desc: 'Relatório simples + Parecer' },
                      { title: 'Projeto Avançado', price: 'R$ 800,00 a R$ 1.000,00', desc: 'Análise completa' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-3 md:pb-4 border-b border-gray-200 last:border-0">
                        <CheckCircle2 className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm md:text-base text-blue-900">{item.title} - {item.price}</div>
                          <div className="text-xs md:text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-xs md:text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>+R$100,00 por reivindicação adicional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Pagamento à vista ou em até 12x</span>
                    </div>
                  </div>

                  <Button className="w-full btn-premium text-sm md:text-base py-2 md:py-3">
                    Solicitar Análise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Register Section - Navy Background */}
      <section className="py-16 md:py-24 bg-navy-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Por Que Registrar Sua Marca?
            </h2>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2">
              O registro no INPI oferece proteção legal completa e valoriza seu patrimônio intelectual
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Shield, title: 'Proteção Legal', desc: 'Direito exclusivo de uso em todo território nacional' },
              { icon: Award, title: 'Valorização', desc: 'Marca registrada aumenta o valor da empresa' },
              { icon: FileCheck, title: 'Prevenção de Disputas', desc: 'Evita conflitos legais com concorrentes' },
              { icon: Clock, title: 'Uso Indeterminado', desc: 'Válido por 10 anos, renovável indefinidamente' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-effect-dark rounded-xl md:rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
              >
                <item.icon className="h-10 w-10 md:h-12 md:w-12 text-amber-300 mx-auto mb-4" />
                <h4 className="text-lg md:text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-xs md:text-sm text-gray-200">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section - White Background */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-900">
                Sobre Hudson Paiva de Souza
              </h2>
              <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-amber-400 to-amber-300 mx-auto" />
            </div>

            <div className="glass-effect-white rounded-2xl md:rounded-3xl p-6 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                {/* Photo */}
                <motion.div
                  className="w-full md:w-64 flex-shrink-0"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/hudson-photo.jpg"
                      alt="Hudson Paiva de Souza"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  className="flex-1 space-y-6 text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-base md:text-lg">
                    Advogado especializado em <strong className="text-blue-900">propriedade intelectual</strong>, direito do consumidor, direito bancário e direito administrativo, com dois anos e meio de experiência em Juiz de Fora, MG.
                  </p>

                  <p className="text-base md:text-lg">
                    Atendo escritórios de advocacia, legaltechs, escritórios de contabilidade, fintechs e outras empresas que buscam consultoria e atuação na proteção de ativos intangíveis como registros de marca, registro de software e busca de anterioridades de patentes.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl md:rounded-2xl p-6 border border-blue-100">
                    <h4 className="text-lg md:text-xl font-bold text-blue-900 mb-3">Meu Diferencial</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      Responsabilidade com o patrimônio intangível das empresas e utilização de <strong>tecnologia para apoio na proteção dos ativos</strong>.
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      Minha missão é conscientizar empresas e escritórios sobre a importância de ter um patrimônio intangível protegido da concorrência e que se destaque no mercado.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - White Background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-900">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              {[
                { q: '⏱️ Quanto tempo demora o processo de registro de marca?', a: 'O processo de registro no INPI geralmente leva entre 6 a 12 meses, dependendo da complexidade e de possíveis oposições.' },
                { q: '🔍 O que está incluso na pesquisa de colidência?', a: 'A pesquisa inclui análise de marcas idênticas ou similares já registradas, garantindo que sua marca não conflite com outras existentes.' },
                { q: '🏷️ Qual a diferença entre marca nominativa, figurativa e mista?', a: 'Nominativa: apenas texto. Figurativa: apenas imagem/logo. Mista: combinação de texto e imagem.' },
                { q: '📋 O que é a busca por anterioridades em patentes?', a: 'É uma análise técnica que verifica se sua invenção já foi patenteada ou divulgada publicamente.' },
                { q: '🔄 Preciso renovar o registro da minha marca?', a: 'Sim, o registro é válido por 10 anos e deve ser renovado para manter a proteção.' },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="glass-effect-white rounded-xl md:rounded-2xl overflow-hidden"
                  whileHover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-sm md:text-base text-blue-900 pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ArrowRight className="h-5 w-5 text-amber-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: expandedFaq === idx ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base text-gray-600 border-t border-gray-200">
                      {faq.a}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Navy Background */}
      <section className="py-16 md:py-24 bg-navy-gradient text-white relative overflow-hidden">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Pronto Para Proteger Seu Patrimônio?
            </h2>
            <p className="text-base md:text-lg text-gray-200 mb-8 px-2">
              Entre em contato agora e receba uma consultoria personalizada sobre registro de marcas e busca por anterioridades
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-2">
              <Button className="btn-premium text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto w-full sm:w-auto">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <a
                href="https://wa.me/5532998114374"
                className="btn-premium-outline text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto inline-flex items-center justify-center w-full sm:w-auto"
              >
                WhatsApp
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-12 pt-12 border-t border-white/20">
              <div>
                <div className="text-xl md:text-2xl font-bold text-amber-300 mb-2">(32) 99811-4374</div>
                <div className="text-sm md:text-base text-gray-300">Telefone</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-amber-300 mb-2 break-all">hudsonvbadv@gmail.com</div>
                <div className="text-sm md:text-base text-gray-300">E-mail</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-amber-300 mb-2">Juiz de Fora, MG</div>
                <div className="text-sm md:text-base text-gray-300">Localização</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 md:py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-gray-300">© 2026 Hudson Paiva de Souza. Todos os direitos reservados.</p>
            </div>
            <a href="#" className="text-sm md:text-base text-gray-300 hover:text-amber-400 transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
