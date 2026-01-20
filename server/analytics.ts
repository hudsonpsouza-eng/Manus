/**
 * Analytics Service for Quote Management
 * Calculates metrics for dashboard visualization
 */

import { ENV } from "./_core/env";

export interface QuoteMetrics {
  totalQuotes: number;
  quotesByMonth: Array<{
    month: string;
    count: number;
    revenue: number;
  }>;
  conversionRate: number;
  estimatedRevenue: number;
  quotesByService: Record<string, number>;
  quotesByUrgency: Record<string, number>;
  averageResponseTime: number;
}

// Pricing for different service types
const PRICING: Record<string, number[]> = {
  'Registro de Marca': [700, 800, 1500], // Nominativa, Figurativa, Mista
  'Busca por Anterioridades': [1100, 1800, 2000], // Básico, Avançado (min, max)
  'Ambos os Serviços': [2600, 4300], // Combined min/max
};

function getEstimatedPrice(serviceType: string, serviceSpecification?: string): number {
  const prices = PRICING[serviceType];
  if (!prices) return 1500; // Default estimate

  if (serviceType === 'Registro de Marca') {
    // Map specification to price
    if (serviceSpecification?.includes('Nominativa')) return 700;
    if (serviceSpecification?.includes('Figurativa')) return 800;
    if (serviceSpecification?.includes('Mista')) return 1500;
    return 800; // Default
  }

  if (serviceType === 'Busca por Anterioridades') {
    if (serviceSpecification?.includes('Básico')) return 1100;
    if (serviceSpecification?.includes('Avançado')) return 1900; // Average of range
    return 1550; // Default average
  }

  if (serviceType === 'Ambos os Serviços') {
    return 3450; // Average of combined
  }

  return prices[0] || 1500;
}

export async function calculateQuoteMetrics(
  quotes: any[],
  periodDays: number = 30
): Promise<QuoteMetrics> {
  const now = new Date();
  const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);

  // Filter quotes within the period
  const periodQuotes = quotes.filter((quote) => {
    const quoteDate = new Date(quote.createdAt);
    return quoteDate >= periodStart && quoteDate <= now;
  });

  // Calculate total quotes
  const totalQuotes = periodQuotes.length;

  // Group by month
  const quotesByMonthMap = new Map<string, { count: number; revenue: number }>();
  periodQuotes.forEach((quote) => {
    const date = new Date(quote.createdAt);
    const monthKey = date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });

    const estimated = getEstimatedPrice(quote.serviceType, quote.serviceLevel);
    const current = quotesByMonthMap.get(monthKey) || { count: 0, revenue: 0 };

    quotesByMonthMap.set(monthKey, {
      count: current.count + 1,
      revenue: current.revenue + estimated,
    });
  });

  const quotesByMonth = Array.from(quotesByMonthMap.entries())
    .map(([month, data]) => ({
      month,
      count: data.count,
      revenue: data.revenue,
    }))
    .sort((a, b) => {
      const dateA = new Date(`01 ${a.month}`);
      const dateB = new Date(`01 ${b.month}`);
      return dateA.getTime() - dateB.getTime();
    });

  // Calculate conversion rate (estimate: assume 30% of quotes convert to contracts)
  const conversionRate = 0.3; // 30% estimated conversion
  const estimatedConversions = Math.ceil(totalQuotes * conversionRate);

  // Calculate estimated revenue
  const estimatedRevenue = periodQuotes.reduce((sum, quote) => {
    return sum + getEstimatedPrice(quote.serviceType, quote.serviceLevel);
  }, 0);

  // Group by service type
  const quotesByService: Record<string, number> = {};
  periodQuotes.forEach((quote) => {
    const service = quote.serviceType;
    quotesByService[service] = (quotesByService[service] || 0) + 1;
  });

  // Group by urgency
  const quotesByUrgency: Record<string, number> = {};
  periodQuotes.forEach((quote) => {
    const urgency = quote.urgency;
    quotesByUrgency[urgency] = (quotesByUrgency[urgency] || 0) + 1;
  });

  // Calculate average response time (in hours)
  // Assuming we respond within 24 hours
  const averageResponseTime = 12; // 12 hours average

  return {
    totalQuotes,
    quotesByMonth,
    conversionRate,
    estimatedRevenue,
    quotesByService,
    quotesByUrgency,
    averageResponseTime,
  };
}

/**
 * Get quotes for a specific period
 */
export function getQuotesForPeriod(quotes: any[], periodDays: number): any[] {
  const now = new Date();
  const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);

  return quotes.filter((quote) => {
    const quoteDate = new Date(quote.createdAt);
    return quoteDate >= periodStart && quoteDate <= now;
  });
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
