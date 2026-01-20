import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Search, CheckCircle2, ArrowRight, FileCheck, Clock, Zap, Award, Users } from 'lucide-react';

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-30"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-100 to-transparent rounded-full blur-3xl opacity-30"
            animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo/Brand */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-block">
                <span className="text-6xl font-black bg-gradient-to-r from-blue-900 via-amber-600 to-blue-900 bg-clip-text text-transparent">
                  HS
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Deixe a Sua Marca
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                no Mundo
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Serviços completos de registro de marcas e busca por anterioridade de patentes com garantia de proteção legal completa para seus ativos intangíveis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button className="btn-premium text-lg px-8 py-4 h-auto">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="btn-premium-outline text-lg px-8 py-4 h-auto">
                Saiba Mais
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {[
                { icon: Shield, label: 'Proteção Legal', value: '100%' },
                { icon: Zap, label: 'Resposta Inicial', value: '24h' },
                { icon: Award, label: 'Experiência', value: '2+' },
                { icon: Users, label: 'Foco', value: 'B2B' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-effect-dark rounded-2xl p-6 text-white hover:bg-white/10 transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-amber-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent relative overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Nossos Serviços
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-gold mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluções completas para proteção de propriedade intelectual, desde a pesquisa até o registro definitivo
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Trademark Registration */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-3xl overflow-hidden h-full hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src="/trademark-card.png"
                    alt="Registro de Marca"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-8">
                  <Shield className="h-12 w-12 text-amber-400 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">Registro de Marca</h3>
                  <p className="text-gray-600 mb-6">
                    Proteja sua identidade visual e nome comercial com registro completo no INPI
                  </p>

                  <div className="space-y-4 mb-6">
                    {[
                      { title: 'Marca Nominativa', price: 'R$ 250,00', desc: 'Proteção do nome/texto' },
                      { title: 'Marca Figurativa', price: 'R$ 300,00', desc: 'Proteção do logotipo/símbolo' },
                      { title: 'Marca Mista', price: 'R$ 500,00', desc: 'Proteção completa' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0">
                        <CheckCircle2 className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-blue-900">{item.title} - {item.price}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>Inclui pesquisa de colidência como cortesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>+R$50,00 por classe adicional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>+R$200,00 por reformulação da marca para registro</span>
                    </div>
                  </div>

                  <Button className="w-full btn-premium">
                    Solicitar Registro
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Prior Art Search */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-3xl overflow-hidden h-full hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src="/search-card.png"
                    alt="Busca por Anterioridades"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-8">
                  <Search className="h-12 w-12 text-amber-400 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">Busca por Anterioridades</h3>
                  <p className="text-gray-600 mb-6">
                    Análise completa de patenteabilidade e mapeamento de anterioridades
                  </p>

                  <div className="space-y-4 mb-6">
                    {[
                      { title: 'Projeto Básico', price: 'R$ 500,00', desc: 'Relatório simples + Parecer' },
                      { title: 'Projeto Avançado', price: 'R$ 800,00 a R$ 1.000,00', desc: 'Análise completa + Parecer detalhado' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0">
                        <CheckCircle2 className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-blue-900">{item.title} - {item.price}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>+R$100,00 por reivindicação adicional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>Pagamento à vista ou em até 12x</span>
                    </div>
                  </div>

                  <Button className="w-full btn-premium">
                    Solicitar Análise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Register Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por Que Registrar Sua Marca?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              O registro no INPI oferece proteção legal completa e valoriza seu patrimônio intelectual
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                className="glass-effect-dark rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
              >
                <item.icon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-blue-100">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  Sobre Hudson Paiva de Souza
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-gold mx-auto" />
            </div>

            <div className="glass-effect rounded-3xl p-8 md:p-12">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Advogado especializado em <strong className="text-blue-900">propriedade intelectual</strong>, direito do consumidor, direito bancário e direito administrativo, com dois anos e meio de experiência em Juiz de Fora, MG.
                </p>

                <p className="text-lg">
                  Atendo escritórios de advocacia, legaltechs, escritórios de contabilidade, fintechs e outras empresas que buscam consultoria e atuação na proteção de ativos intangíveis como registros de marca, registro de software e busca de anterioridades de patentes.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="text-xl font-bold text-blue-900 mb-3">Meu Diferencial</h4>
                  <p className="text-gray-700">
                    Responsabilidade com o patrimônio intangível das empresas e utilização de <strong>tecnologia para apoio na proteção dos ativos</strong>. Especializado no processo de registro de marcas, desde a criação da identidade visual da empresa até o registro no INPI, como também no processo de patenteabilidade, com estudo de anterioridade e registro da patente no INPI.
                  </p>
                  <p className="text-gray-700 mt-4">
                    Minha missão é conscientizar empresas e escritórios sobre a importância de ter um patrimônio intangível protegido da concorrência e que se destaque no mercado.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  Perguntas Frequentes
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { q: '⏱️ Quanto tempo demora o processo de registro de marca?', a: 'O processo de registro no INPI geralmente leva entre 6 a 12 meses, dependendo da complexidade e de possíveis oposições.' },
                { q: '🔍 O que está incluso na pesquisa de colidência?', a: 'A pesquisa inclui análise de marcas idênticas ou similares já registradas, garantindo que sua marca não conflite com outras existentes.' },
                { q: '🏷️ Qual a diferença entre marca nominativa, figurativa e mista?', a: 'Nominativa: apenas texto. Figurativa: apenas imagem/logo. Mista: combinação de texto e imagem.' },
                { q: '📋 O que é a busca por anterioridades em patentes?', a: 'É uma análise técnica que verifica se sua invenção já foi patenteada ou divulgada publicamente.' },
                { q: '🔄 Preciso renovar o registro da minha marca?', a: 'Sim, o registro é válido por 10 anos e deve ser renovado para manter a proteção.' },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="glass-effect rounded-2xl overflow-hidden"
                  whileHover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                  >
                    <span className="font-semibold text-blue-900">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
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
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-200">
                      {faq.a}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto Para Proteger Seu Patrimônio?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Entre em contato agora e receba uma consultoria personalizada sobre registro de marcas e busca por anterioridades
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="btn-premium text-lg px-8 py-4 h-auto">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="https://wa.me/5532998114374" className="btn-premium-outline text-lg px-8 py-4 h-auto inline-flex items-center justify-center">
                WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-2">(32) 99811-4374</div>
                <div className="text-blue-100">Telefone</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-2">hudsonvbadv@gmail.com</div>
                <div className="text-blue-100">E-mail</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-2">Juiz de Fora, MG</div>
                <div className="text-blue-100">Localização</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-blue-100">© 2026 Hudson Paiva de Souza. Todos os direitos reservados.</p>
            </div>
            <a href="#" className="text-blue-100 hover:text-amber-400 transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
