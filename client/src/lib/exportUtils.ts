import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";

export interface QuoteData {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  serviceType: string;
  urgency: string;
  projectDescription?: string | null;
  status: string;
  createdAt: string | Date;
  serviceLevel?: string | null;
  consentMarketing?: number | null;
  updatedAt?: Date;
}

export async function exportQuoteToPDF(quote: QuoteData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.text("Orçamento", pageWidth / 2, yPosition, { align: "center" });
  yPosition += 15;

  // Company info
  doc.setFontSize(10);
  doc.text("Hudson Souza Advocacia", 20, yPosition);
  doc.text("Especialista em Propriedade Intelectual", 20, yPosition + 5);
  doc.text("(32) 99811-4374 | hudsonvbadv@gmail.com", 20, yPosition + 10);
  yPosition += 25;

  // Quote details
  doc.setFontSize(12);
  doc.text("Detalhes do Orçamento", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  const details = [
    [`Nome: ${quote.name}`, `Email: ${quote.email}`],
    [`Telefone: ${quote.phone}`, `Empresa: ${quote.company || "N/A"}`],
    [`Serviço: ${quote.serviceType}`, `Urgência: ${quote.urgency}`],
    [`Status: ${quote.status}`, `Data: ${new Date(quote.createdAt).toLocaleDateString("pt-BR")}`],
  ];

  details.forEach((row) => {
    doc.text(row[0], 20, yPosition);
    doc.text(row[1], pageWidth / 2, yPosition);
    yPosition += 8;
  });

  yPosition += 10;
  if (quote.projectDescription) {
    doc.setFontSize(12);
    doc.text("Descrição do Projeto", 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(quote.projectDescription, pageWidth - 40);
    doc.text(splitText, 20, yPosition);
  }

  // Footer
  doc.setFontSize(8);
  doc.text(
    `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  doc.save(`orcamento-${quote.name}-${Date.now()}.pdf`);
}

export function exportQuotesToCSV(quotes: QuoteData[]) {
  const csvData = quotes.map((quote) => ({
    ID: quote.id,
    Nome: quote.name,
    Email: quote.email,
    Telefone: quote.phone,
    Empresa: quote.company || "N/A",
    Serviço: quote.serviceType,
    Urgência: quote.urgency,
    Status: quote.status,
    "Data de Criação": new Date(quote.createdAt).toLocaleDateString("pt-BR"),
    Descrição: quote.projectDescription || "N/A",
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `orcamentos-${Date.now()}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportSingleQuoteToCSV(quote: QuoteData) {
  exportQuotesToCSV([quote]);
}
