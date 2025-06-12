import { useState } from 'react'
import { addDays } from 'date-fns'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
} from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const kpiData = {
  receitaGeral: { value: 125430.5, change: 12.5 },
  ticketMedio: { value: 450.2, change: -2.1 },
}

const evolutionData = [
  { name: 'Jan', receita: 4000, volume: 2400 },
  { name: 'Fev', receita: 3000, volume: 1398 },
  { name: 'Mar', receita: 5000, volume: 9800 },
  { name: 'Abr', receita: 4780, volume: 3908 },
  { name: 'Mai', receita: 5890, volume: 4800 },
  { name: 'Jun', receita: 4390, volume: 3800 },
]

const productShareData = [
  { name: 'Produto A', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Produto B', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Produto C', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Produto D', value: 200, fill: 'hsl(var(--chart-4))' },
]

const chartConfig = {
  receita: { label: 'Receita', color: 'hsl(var(--chart-1))' },
  volume: { label: 'Volume', color: 'hsl(var(--chart-2))' },
  'Produto A': { label: 'Produto A', color: 'hsl(var(--chart-1))' },
  'Produto B': { label: 'Produto B', color: 'hsl(var(--chart-2))' },
  'Produto C': { label: 'Produto C', color: 'hsl(var(--chart-3))' },
  'Produto D': { label: 'Produto D', color: 'hsl(var(--chart-4))' },
}

const DashboardPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 4, 1), 30),
  })

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <DateRangePicker date={date} onDateChange={setDate} />
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Vendedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2 ml-auto">
            <Button>Aplicar</Button>
            <Button variant="outline">Limpar</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Geral</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {kpiData.receitaGeral.value.toLocaleString('pt-BR')}
            </div>
            <p
              className={`text-xs flex items-center ${kpiData.receitaGeral.change > 0 ? 'text-success' : 'text-destructive'}`}
            >
              {kpiData.receitaGeral.change > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {kpiData.receitaGeral.change}% vs. período anterior
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {kpiData.ticketMedio.value.toLocaleString('pt-BR')}
            </div>
            <p
              className={`text-xs flex items-center ${kpiData.ticketMedio.change > 0 ? 'text-success' : 'text-destructive'}`}
            >
              {kpiData.ticketMedio.change > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {kpiData.ticketMedio.change}% vs. período anterior
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200 col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Share por Produto</CardTitle>
            <CardDescription>
              Distribuição da receita por produto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" hideLabel />}
                  />
                  <Pie
                    data={productShareData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={60}
                    strokeWidth={2}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200">
          <CardHeader>
            <CardTitle>Evolução de Receita e Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={evolutionData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="receita"
                    stroke="var(--color-receita)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="var(--color-volume)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200">
          <CardHeader>
            <CardTitle>Mix de Produtos (Top 5 Faturamento)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {productShareData.slice(0, 5).map((p) => (
                <li
                  key={p.name}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{p.name}</span>
                  <span className="font-semibold">
                    R$ {(p.value * 300).toLocaleString('pt-BR')}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
