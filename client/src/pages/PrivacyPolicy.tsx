import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function PrivacyPolicy() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1A2D40] text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Política de Privacidade</h1>
          <p className="text-gray-200">Última atualização: 19 de janeiro de 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">1. Introdução</h2>
            <p className="text-gray-700">
              Hudson Souza Advocacia ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços.
            </p>
            <p className="text-gray-700">
              Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e com o Regulamento Geral sobre a Proteção de Dados (GDPR - Regulamento UE 2016/679).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">2. Informações que Coletamos</h2>
            <p className="text-gray-700">Coletamos informações de várias formas:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Informações fornecidas por você:</strong> Nome, email, telefone, empresa, descrição do projeto ao preencher formulários de contato</li>
              <li><strong>Informações de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência</li>
              <li><strong>Cookies:</strong> Identificadores únicos armazenados em seu dispositivo para melhorar sua experiência</li>
              <li><strong>Dados de autenticação:</strong> Informações de login para acesso ao dashboard administrativo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">3. Base Legal para Processamento</h2>
            <p className="text-gray-700">Processamos seus dados com base nas seguintes bases legais:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Consentimento:</strong> Quando você preenche o formulário de contato e consente em receber comunicações</li>
              <li><strong>Interesse Legítimo:</strong> Para melhorar nossos serviços e segurança do site</li>
              <li><strong>Obrigação Legal:</strong> Para cumprir com requisitos legais e regulatórios</li>
              <li><strong>Execução de Contrato:</strong> Para fornecer os serviços solicitados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">4. Como Usamos Suas Informações</h2>
            <p className="text-gray-700">Usamos as informações coletadas para:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Responder a suas consultas e fornecer orçamentos de serviços</li>
              <li>Enviar comunicações relacionadas aos seus pedidos</li>
              <li>Melhorar nosso site e serviços</li>
              <li>Proteger contra fraude e atividades ilícitas</li>
              <li>Cumprir com obrigações legais</li>
              <li>Análise de dados para entender tendências de negócio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-gray-700">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Prestadores de serviço:</strong> Plataformas de email, hospedagem e análise que processam dados em nosso nome</li>
              <li><strong>Autoridades legais:</strong> Quando exigido por lei ou para proteger direitos legais</li>
              <li><strong>Notion:</strong> Para sincronização de dados de orçamentos (sujeito a Acordo de Processamento de Dados)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">6. Retenção de Dados</h2>
            <p className="text-gray-700">
              Retemos suas informações pessoais apenas pelo tempo necessário para cumprir os fins para os quais foram coletadas, ou conforme exigido por lei. Em geral:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Dados de contato: Retidos por 12 meses após a última interação</li>
              <li>Dados de orçamento: Retidos por 3 anos para fins contábeis e legais</li>
              <li>Logs de acesso: Retidos por 90 dias</li>
              <li>Cookies: Retidos conforme configuração (máximo 12 meses)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">7. Seus Direitos</h2>
            <p className="text-gray-700">
              Sob a LGPD e GDPR, você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Direito de Acesso:</strong> Solicitar cópia de seus dados pessoais</li>
              <li><strong>Direito de Retificação:</strong> Corrigir dados imprecisos</li>
              <li><strong>Direito de Exclusão:</strong> Solicitar exclusão de seus dados ("direito ao esquecimento")</li>
              <li><strong>Direito de Portabilidade:</strong> Receber dados em formato estruturado</li>
              <li><strong>Direito de Oposição:</strong> Opor-se ao processamento de dados</li>
              <li><strong>Direito de Retirada de Consentimento:</strong> Retirar consentimento a qualquer momento</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Para exercer qualquer desses direitos, entre em contato conosco através do email: <a href="mailto:hudpaivasouza@gmail.com" className="text-[#B89C5B] hover:underline">hudpaivasouza@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">8. Segurança de Dados</h2>
            <p className="text-gray-700">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Essas medidas incluem:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Autenticação OAuth para acesso administrativo</li>
              <li>Firewalls e proteção contra DDoS</li>
              <li>Monitoramento de segurança contínuo</li>
              <li>Controle de acesso baseado em funções</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">9. Cookies e Tecnologias Similares</h2>
            <p className="text-gray-700">
              Usamos cookies para melhorar sua experiência. Você pode controlar cookies através das configurações do seu navegador. Tipos de cookies usados:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Essenciais:</strong> Necessários para funcionamento do site</li>
              <li><strong>Analíticos:</strong> Para entender como você usa nosso site</li>
              <li><strong>Funcionais:</strong> Para lembrar suas preferências</li>
              <li><strong>Marketing:</strong> Para personalizar conteúdo (sujeito a consentimento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">10. Contato</h2>
            <p className="text-gray-700">
              Se você tiver dúvidas sobre esta Política de Privacidade ou nossas práticas de privacidade, entre em contato conosco:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mt-4">
              <p className="text-gray-700"><strong>Hudson Souza Advocacia</strong></p>
              <p className="text-gray-700">Email: <a href="mailto:hudpaivasouza@gmail.com" className="text-[#B89C5B] hover:underline">hudpaivasouza@gmail.com</a></p>
              <p className="text-gray-700">Localização: Juiz de Fora, MG - Brasil</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1A2D40] mb-4">11. Alterações a Esta Política</h2>
            <p className="text-gray-700">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas publicando a nova política neste site com uma data de atualização revisada.
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Button 
            onClick={() => navigate("/")}
            className="bg-[#1A2D40] hover:bg-[#2A3D50] text-white"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}
