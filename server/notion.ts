import { ENV } from "./_core/env";

export interface NotionQuoteData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  serviceSpecification?: string;
  urgency: string;
  description?: string;
}

export async function syncQuoteToNotion(quote: NotionQuoteData) {
  if (!ENV.notionApiKey || !ENV.notionDatabaseId) {
    console.warn("Notion credentials not configured, skipping sync");
    return null;
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: {
          database_id: ENV.notionDatabaseId,
        },
        properties: {
          Nome: {
            title: [
              {
                text: {
                  content: quote.name,
                },
              },
            ],
          },
          "E-mail": {
            email: quote.email,
          },
          Telefone: {
            phone_number: quote.phone,
          },
          Empresa: {
            rich_text: [
              {
                text: {
                  content: quote.company || "N/A",
                },
              },
            ],
          },
          "Tipo de Serviço": {
            select: {
              name: quote.serviceType,
            },
          },
          "Urgência ": {
            select: {
              name: quote.urgency,
            },
          },
          "Descrição ": {
            rich_text: [
              {
                text: {
                  content: quote.description || "N/A",
                },
              },
            ],
          },
          "Data de Criação ": {
            date: {
              start: new Date().toISOString(),
            },
          },
          "Especificação do Serviço": {
            select: {
              name: quote.serviceSpecification || "Não especificado",
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Notion sync error:", error);
      return null;
    }

    const data = await response.json();
    console.log("Quote synced to Notion:", data.id);
    return data;
  } catch (error) {
    console.error("Failed to sync quote to Notion:", error);
    return null;
  }
}
