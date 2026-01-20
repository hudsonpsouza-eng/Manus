import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, DollarSign, Target, Users } from "lucide-react";
import { useState, useMemo } from "react";

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  serviceType: string;
  serviceLevel?: string | null;
  urgency: string;
  description?: string | null;
  createdAt: string | Date;
  status: string;
}

interface AnalyticsProps {
  quotes: Quote[];
}

const COLORS = {
  primary: "#B89C5B",
  secondary: "#003366",
  success: "#4CAF50",
  warning: "#FF9800",
  danger: "#F44336",
  info: "#2196F3",
};

const PRICING: Record<string, number[]> = {
  "Registro de Marca": [700, 800, 1500],
  "Busca por Anterioridades": [1100, 1800, 2000],
  "Ambos os Serviços": [2600, 4300],
};

function getEstimatedPrice(serviceType: string, serviceLevel?: string | null): number {
  const prices = PRICING[serviceType];
  if (!prices) return 1500;

  if (serviceType === "Registro de Marca") {
    if (serviceLevel && serviceLevel.includes("Nominativa")) return 700;
    if (serviceLevel && serviceLevel.includes("Figurativa")) return 800;
    if (serviceLevel && serviceLevel.includes("Mista")) return 1500;
    return 800;
  }

  if (serviceType === "Busca por Anterioridades") {
    if (serviceLevel && serviceLevel.includes("Básico")) return 1100;
    if (serviceLevel && serviceLevel.includes("Avançado")) return 1900;
    return 1550;
  }

  if (serviceType === "Ambos os Serviços") {
    return 3450;
  }

  return prices[0] || 1500;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function AnalyticsDashboard({ quotes }: AnalyticsProps) {
  const [period, setPeriod] = useState<"7" | "30">("30");

  // Filter quotes by period
  const filteredQuotes = useMemo(() => {
    const now = new Date();
    const periodStart = new Date(now.getTime() - parseInt(period) * 24 * 60 * 60 * 1000);

    return quotes.filter((quote) => {
      const quoteDate = new Date(quote.createdAt);
      return quoteDate >= periodStart && quoteDate <= now;
    });
  }, [quotes, period]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalQuotes = filteredQuotes.length;

    // Group by month
    const quotesByMonthMap = new Map<string, { count: number; revenue: number }>();
    filteredQuotes.forEach((quote) => {
      const date = new Date(quote.createdAt);
      const monthKey = date.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });

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

    // Calculate estimated revenue
    const estimatedRevenue = filteredQuotes.reduce((sum, quote) => {
      return sum + getEstimatedPrice(quote.serviceType, quote.serviceLevel);
    }, 0);

    // Group by service type
    const quotesByService: Record<string, number> = {};
    filteredQuotes.forEach((quote) => {
      const service = quote.serviceType;
      quotesByService[service] = (quotesByService[service] || 0) + 1;
    });

    // Group by urgency
    const quotesByUrgency: Record<string, number> = {};
    filteredQuotes.forEach((quote) => {
      const urgency = quote.urgency;
      quotesByUrgency[urgency] = (quotesByUrgency[urgency] || 0) + 1;
    });

    // Calculate conversion rate (estimated 30%)
    const conversionRate = 0.3;
    const estimatedConversions = Math.ceil(totalQuotes * conversionRate);

    return {
      totalQuotes,
      estimatedRevenue,
      estimatedConversions,
      conversionRate,
      quotesByMonth,
      quotesByService,
      quotesByUrgency,
    };
  }, [filteredQuotes]);

  // Prepare data for service type pie chart
  const serviceData = Object.entries(metrics.quotesByService).map(([name, value]) => ({
    name,
    value,
  }));

  // Prepare data for urgency bar chart
  const urgencyData = Object.entries(metrics.quotesByUrgency).map(([urgency, count]) => ({
    name: urgency.charAt(0).toUpperCase() + urgency.slice(1),
    count,
  }));

  const serviceColors = [COLORS.primary, COLORS.secondary, COLORS.info];

  return (
    <div className="space-y-6">
      {/* Period Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1A2D40]">📊 Análise de Orçamentos</h2>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-600" />
          <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Quotes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Orçamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-[#1A2D40]">{metrics.totalQuotes}</div>
              <Users className="h-8 w-8 text-[#B89C5B] opacity-50" />
            </div>
            <p className="text-xs text-gray-500 mt-2">nos últimos {period} dias</p>
          </CardContent>
        </Card>

        {/* Estimated Revenue */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Receita Estimada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-[#1A2D40]">{formatCurrency(metrics.estimatedRevenue)}</div>
              <DollarSign className="h-8 w-8 text-green-500 opacity-50" />
            </div>
            <p className="text-xs text-gray-500 mt-2">baseado em preços médios</p>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-[#1A2D40]">{(metrics.conversionRate * 100).toFixed(0)}%</div>
              <Target className="h-8 w-8 text-blue-500 opacity-50" />
            </div>
            <p className="text-xs text-gray-500 mt-2">estimativa de fechamento</p>
          </CardContent>
        </Card>

        {/* Estimated Conversions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Conversões Estimadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-[#1A2D40]">{metrics.estimatedConversions}</div>
              <TrendingUp className="h-8 w-8 text-orange-500 opacity-50" />
            </div>
            <p className="text-xs text-gray-500 mt-2">baseado em {metrics.totalQuotes} orçamentos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quotes by Month */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Orçamentos por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.quotesByMonth.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.quotesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: `1px solid ${COLORS.primary}`,
                      borderRadius: "4px",
                    }}
                  />
                  <Bar dataKey="count" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Sem dados para este período
              </div>
            )}
          </CardContent>
        </Card>

        {/* Revenue by Month */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Receita Estimada por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.quotesByMonth.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics.quotesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: `1px solid ${COLORS.secondary}`,
                      borderRadius: "4px",
                    }}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={COLORS.secondary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.secondary, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Sem dados para este período
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Tipo de Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            {serviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={serviceColors[index % serviceColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Sem dados para este período
              </div>
            )}
          </CardContent>
        </Card>

        {/* Urgency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Urgência</CardTitle>
          </CardHeader>
          <CardContent>
            {urgencyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={urgencyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill={COLORS.warning} radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Sem dados para este período
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumo de Métricas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-[#B89C5B] pl-4">
              <p className="text-sm text-gray-600">Ticket Médio</p>
              <p className="text-2xl font-bold text-[#1A2D40]">
                {metrics.totalQuotes > 0
                  ? formatCurrency(metrics.estimatedRevenue / metrics.totalQuotes)
                  : "R$ 0,00"}
              </p>
            </div>
            <div className="border-l-4 border-[#003366] pl-4">
              <p className="text-sm text-gray-600">Receita Potencial (com conversão)</p>
              <p className="text-2xl font-bold text-[#1A2D40]">
                {formatCurrency(metrics.estimatedRevenue * metrics.conversionRate)}
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600">Taxa de Resposta</p>
              <p className="text-2xl font-bold text-[#1A2D40]">24h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
