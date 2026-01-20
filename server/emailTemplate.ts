/**
 * Professional HTML Email Template for Quote Details
 * Sent to hudpaivasouza@gmail.com after client form submission
 */

export interface QuoteEmailData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany?: string;
  serviceType: string;
  serviceSpecification?: string;
  urgency: string;
  projectDescription?: string;
  submissionDate: Date;
}

export function generateQuoteEmailHTML(quote: QuoteEmailData): string {
  const formattedDate = new Date(quote.submissionDate).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const schedulingLink = `https://calendly.com/hudsonvbadv?utm_source=quote_email&utm_medium=email&utm_campaign=${encodeURIComponent(quote.clientName)}`;
  const whatsappLink = `https://wa.me/5532998114374?text=Olá%20Hudson!%20Recebi%20meu%20orçamento%20e%20gostaria%20de%20agendar%20uma%20consulta.`;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu Orçamento - Hudson Souza Advocacia</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #003366 0%, #1A2D40 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }
        
        .logo-subtitle {
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #1A2D40;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .intro-text {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
            line-height: 1.8;
        }
        
        .quote-details {
            background-color: #f9f9f9;
            border-left: 4px solid #B89C5B;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: #1A2D40;
            width: 45%;
        }
        
        .detail-value {
            color: #666;
            text-align: right;
            width: 55%;
            word-break: break-word;
        }
        
        .service-highlight {
            background-color: #fff3e0;
            border: 1px solid #FFB74D;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
            text-align: center;
        }
        
        .service-highlight h3 {
            color: #B89C5B;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .service-highlight p {
            color: #666;
            font-size: 13px;
            margin: 5px 0;
        }
        
        .cta-section {
            margin: 30px 0;
            text-align: center;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #B89C5B;
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            font-size: 14px;
            margin: 10px 5px;
            transition: background-color 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .cta-button:hover {
            background-color: #A68B4F;
        }
        
        .cta-button.secondary {
            background-color: #003366;
            color: white;
        }
        
        .cta-button.secondary:hover {
            background-color: #1A2D40;
        }
        
        .cta-button.whatsapp {
            background-color: #25D366;
        }
        
        .cta-button.whatsapp:hover {
            background-color: #20BA5A;
        }
        
        .next-steps {
            background-color: #f0f8ff;
            border-radius: 4px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .next-steps h4 {
            color: #003366;
            margin-bottom: 12px;
            font-size: 14px;
        }
        
        .next-steps ol {
            margin-left: 20px;
            color: #666;
            font-size: 13px;
            line-height: 1.8;
        }
        
        .next-steps li {
            margin-bottom: 8px;
        }
        
        .footer {
            background-color: #f5f5f5;
            padding: 30px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        
        .contact-info {
            margin: 15px 0;
            color: #666;
            font-size: 13px;
        }
        
        .contact-info strong {
            color: #1A2D40;
        }
        
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 20px 0;
        }
        
        .urgency-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 10px;
        }
        
        .urgency-low {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .urgency-normal {
            background-color: #e3f2fd;
            color: #1565c0;
        }
        
        .urgency-high {
            background-color: #fff3e0;
            color: #e65100;
        }
        
        .urgency-urgent {
            background-color: #ffebee;
            color: #c62828;
        }
        
        @media (max-width: 600px) {
            .container {
                border-radius: 0;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 20px;
            }
            
            .detail-row {
                flex-direction: column;
            }
            
            .detail-label, .detail-value {
                width: 100%;
                text-align: left;
            }
            
            .cta-button {
                display: block;
                width: 100%;
                margin: 8px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">HS</div>
            <div class="logo-subtitle">Hudson Souza Advocacia</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Olá ${quote.clientName},</div>
            
            <p class="intro-text">
                Obrigado por solicitar um orçamento! Recebemos sua solicitação com sucesso e preparamos uma proposta personalizada para seus serviços de propriedade intelectual. Confira os detalhes abaixo.
            </p>
            
            <!-- Quote Details -->
            <div class="quote-details">
                <div class="detail-row">
                    <span class="detail-label">Tipo de Serviço:</span>
                    <span class="detail-value">${quote.serviceType}</span>
                </div>
                
                ${quote.serviceSpecification ? `
                <div class="detail-row">
                    <span class="detail-label">Especificação:</span>
                    <span class="detail-value">${quote.serviceSpecification}</span>
                </div>
                ` : ''}
                
                <div class="detail-row">
                    <span class="detail-label">Nível de Urgência:</span>
                    <span class="detail-value">
                        ${quote.urgency}
                        <span class="urgency-badge urgency-${quote.urgency.toLowerCase()}">
                            ${quote.urgency.charAt(0).toUpperCase() + quote.urgency.slice(1)}
                        </span>
                    </span>
                </div>
                
                ${quote.clientCompany ? `
                <div class="detail-row">
                    <span class="detail-label">Empresa:</span>
                    <span class="detail-value">${quote.clientCompany}</span>
                </div>
                ` : ''}
                
                <div class="detail-row">
                    <span class="detail-label">Data da Solicitação:</span>
                    <span class="detail-value">${formattedDate}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Contato:</span>
                    <span class="detail-value">${quote.clientPhone}</span>
                </div>
            </div>
            
            ${quote.projectDescription ? `
            <div class="service-highlight">
                <h3>📝 Descrição do Projeto</h3>
                <p>${quote.projectDescription}</p>
            </div>
            ` : ''}
            
            <!-- Next Steps -->
            <div class="next-steps">
                <h4>⏱️ Próximos Passos</h4>
                <ol>
                    <li>Analisaremos sua solicitação em detalhes</li>
                    <li>Preparamos um orçamento personalizado com base em suas necessidades</li>
                    <li>Entraremos em contato para confirmar os detalhes e agendar a consulta</li>
                    <li>Iniciamos o processo de proteção de seus ativos intangíveis</li>
                </ol>
            </div>
            
            <!-- CTA Buttons -->
            <div class="cta-section">
                <p style="color: #666; margin-bottom: 15px; font-size: 14px;">
                    <strong>Deseja agendar uma consulta agora?</strong>
                </p>
                <a href="${schedulingLink}" class="cta-button">📅 Agendar Consulta</a>
                <a href="${whatsappLink}" class="cta-button whatsapp">💬 Conversar no WhatsApp</a>
            </div>
            
            <!-- Additional Info -->
            <div class="divider"></div>
            
            <p style="color: #666; font-size: 13px; line-height: 1.8; margin: 20px 0;">
                <strong>Informações Importantes:</strong><br>
                • Prazo de resposta: até 24 horas<br>
                • Consultoria inicial: sem custos adicionais<br>
                • Pagamento: à vista ou em até 12x no cartão de crédito<br>
                • Acompanhamento total do processo no INPI
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="contact-info">
                <strong>Hudson Souza Advocacia</strong><br>
                Especialista em Propriedade Intelectual
            </div>
            
            <div class="contact-info">
                📞 <strong>(32) 99811-4374</strong><br>
                📧 <strong>hudsonvbadv@gmail.com</strong><br>
                📍 Juiz de Fora, MG
            </div>
            
            <div class="divider"></div>
            
            <p>
                Este é um email automático gerado a partir de sua solicitação de orçamento.<br>
                Não responda este email. Para dúvidas, entre em contato através dos canais acima.
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

/**
 * Generate plain text version of the email for clients that don't support HTML
 */
export function generateQuoteEmailText(quote: QuoteEmailData): string {
  const formattedDate = new Date(quote.submissionDate).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
HUDSON SOUZA ADVOCACIA
Especialista em Propriedade Intelectual

Olá ${quote.clientName},

Obrigado por solicitar um orçamento! Recebemos sua solicitação com sucesso e preparamos uma proposta personalizada para seus serviços de propriedade intelectual.

DETALHES DA SOLICITAÇÃO
═══════════════════════════════════════

Tipo de Serviço: ${quote.serviceType}
${quote.serviceSpecification ? `Especificação: ${quote.serviceSpecification}\n` : ''}Nível de Urgência: ${quote.urgency}
${quote.clientCompany ? `Empresa: ${quote.clientCompany}\n` : ''}Data da Solicitação: ${formattedDate}
Contato: ${quote.clientPhone}

${quote.projectDescription ? `DESCRIÇÃO DO PROJETO\n═══════════════════════════════════════\n${quote.projectDescription}\n\n` : ''}

PRÓXIMOS PASSOS
═══════════════════════════════════════

1. Analisaremos sua solicitação em detalhes
2. Preparamos um orçamento personalizado com base em suas necessidades
3. Entraremos em contato para confirmar os detalhes e agendar a consulta
4. Iniciamos o processo de proteção de seus ativos intangíveis

AGENDAR CONSULTA
═══════════════════════════════════════

Deseja agendar uma consulta agora?

Calendário: https://calendly.com/hudsonvbadv
WhatsApp: https://wa.me/5532998114374

INFORMAÇÕES IMPORTANTES
═══════════════════════════════════════

• Prazo de resposta: até 24 horas
• Consultoria inicial: sem custos adicionais
• Pagamento: à vista ou em até 12x no cartão de crédito
• Acompanhamento total do processo no INPI

CONTATO
═══════════════════════════════════════

Hudson Souza Advocacia
Especialista em Propriedade Intelectual

📞 (32) 99811-4374
📧 hudsonvbadv@gmail.com
📍 Juiz de Fora, MG

---

Este é um email automático gerado a partir de sua solicitação de orçamento.
Não responda este email. Para dúvidas, entre em contato através dos canais acima.
  `;
}
