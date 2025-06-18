import { useState, useEffect } from 'react'
import { addDays } from 'date-fns'
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  TooltipProps,
  Bar,
  BarChart,
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
  ShoppingBag,
  User2,
} from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { SEGMENTS } from '@/constants/segments'

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
  { name: 'Produto A', value: 400, fill: '#4F8EF7' },
  { name: 'Produto B', value: 300, fill: '#F76C5E' },
  { name: 'Produto C', value: 300, fill: '#43D19E' },
  { name: 'Produto D', value: 200, fill: '#FFD166' },
]

const clientShareData = [
  { name: 'Hospital Central', value: 45000, fill: '#4F8EF7', segmento: 'hospital de grande porte', pedidos: 25 },
  { name: 'Clínica Saúde', value: 32000, fill: '#43D19E', segmento: 'clínica/consultório', pedidos: 18 },
  { name: 'Drogaria Popular', value: 28000, fill: '#FFD166', segmento: 'farmácia/drogaria', pedidos: 35 },
  { name: 'Laboratório Fleury', value: 18000, fill: '#F76C5E', segmento: 'laboratório', pedidos: 12 },
  { name: 'Home Care Premium', value: 15000, fill: '#9B59B6', segmento: 'home care', pedidos: 8 },
  { name: 'Hospital Regional', value: 12000, fill: '#E67E22', segmento: 'hospital pequeno e médio', pedidos: 14 },
]

const segmentSalesData = [
  { name: 'farmácia/drogaria', value: 1200 },
  { name: 'hospital de grande porte', value: 900 },
  { name: 'clínica/consultório', value: 700 },
  { name: 'laboratório', value: 500 },
  { name: 'home care', value: 400 },
  { name: 'distribuidora', value: 350 },
]

const chartConfig = {
  receita: { label: 'Receita', color: 'hsl(var(--chart-1))' },
  volume: { label: 'Volume', color: 'hsl(var(--chart-2))' },
  'Produto A': { label: 'Produto A', color: 'hsl(var(--chart-1))' },
  'Produto B': { label: 'Produto B', color: 'hsl(var(--chart-2))' },
  'Produto C': { label: 'Produto C', color: 'hsl(var(--chart-3))' },
  'Produto D': { label: 'Produto D', color: 'hsl(var(--chart-4))' },
  'Hospital Central': { label: 'Hospital Central', color: 'hsl(var(--chart-1))' },
  'Clínica Saúde': { label: 'Clínica Saúde', color: 'hsl(var(--chart-3))' },
  'Drogaria Popular': { label: 'Drogaria Popular', color: 'hsl(var(--chart-4))' },
  'Laboratório Fleury': { label: 'Laboratório Fleury', color: 'hsl(var(--chart-2))' },
  'Home Care Premium': { label: 'Home Care Premium', color: 'hsl(var(--chart-5))' },
  'Hospital Regional': { label: 'Hospital Regional', color: 'hsl(var(--chart-6))' },
}

const CustomPieTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload
    const total = productShareData.reduce((acc, cur) => acc + cur.value, 0)
    const percent = ((value / total) * 100).toFixed(1)
    return (
      <div
        className={`rounded-lg px-4 py-2 shadow-xl border text-xs min-w-[8rem] ${isDark ? 'bg-zinc-900 text-zinc-100 border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'}`}
      >
        <div className="font-semibold">{name}</div>
        <div>Valor: <b>{value}</b></div>
        <div>Share: <b>{percent}%</b></div>
      </div>
    )
  }
  return null
}

const CustomClientTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])
  if (active && payload && payload.length) {
    const { name, value, segmento, pedidos } = payload[0].payload
    const total = clientShareData.reduce((acc, cur) => acc + cur.value, 0)
    const percent = ((value / total) * 100).toFixed(1)
    return (
      <div
        className={`rounded-lg px-4 py-2 shadow-xl border text-xs min-w-[12rem] ${isDark ? 'bg-zinc-900 text-zinc-100 border-zinc-700' : 'bg-white text-zinc-900 border-zinc-200'}`}
      >
        <div className="font-semibold">{name}</div>
        <div>Receita: <b>R$ {value.toLocaleString('pt-BR')}</b></div>
        <div>Share: <b>{percent}%</b></div>
        <div>Pedidos: <b>{pedidos}</b></div>
        <div className="text-muted-foreground mt-1">{segmento}</div>
      </div>
    )
  }
  return null
}

// Mock de dados para listas paginadas
const mixMaisVendidosFaturamento = Array.from({ length: 30 }, (_, i) => ({ name: `Produto ${i+1}`, value: 1000 - i * 20 }))
const mixMenosVendidosFaturamento = Array.from({ length: 30 }, (_, i) => ({ name: `Produto ${i+31}`, value: 20 + i * 5 }))
const mixMaisVendidosUnidade = Array.from({ length: 30 }, (_, i) => ({ name: `Produto ${i+1}`, value: 500 - i * 10 }))
const mixMenosVendidosUnidade = Array.from({ length: 30 }, (_, i) => ({ name: `Produto ${i+31}`, value: 10 + i * 2 }))

// Mock de dados para gráfico de calor por hora comercial (8h às 18h)
const heatmapHours = Array.from({ length: 11 }, (_, i) => `${8 + i}h`)
const heatmapData = [
  { dia: 'Seg', cotacoes: [2, 4, 6, 8, 10, 12, 14, 8, 6, 4, 2] },
  { dia: 'Ter', cotacoes: [1, 3, 5, 7, 9, 11, 13, 7, 5, 3, 1] },
  { dia: 'Qua', cotacoes: [2, 2, 4, 8, 6, 10, 12, 8, 4, 2, 2] },
  { dia: 'Qui', cotacoes: [3, 5, 7, 9, 11, 13, 15, 9, 7, 5, 3] },
  { dia: 'Sex', cotacoes: [4, 6, 8, 10, 12, 14, 16, 10, 8, 6, 4] },
  { dia: 'Sáb', cotacoes: [2, 3, 4, 5, 6, 7, 8, 5, 4, 3, 2] },
  { dia: 'Dom', cotacoes: [1, 2, 3, 4, 5, 6, 7, 4, 3, 2, 1] },
]

// Paginação
function usePagination(data: any[], pageSize: number) {
  const [page, setPage] = useState(0)
  const paginated = data.slice(page * pageSize, (page + 1) * pageSize)
  const totalPages = Math.ceil(data.length / pageSize)
  return { paginated, page, setPage, totalPages }
}

const mixOptions = [
  { label: 'Mais Vendidos (Faturamento)', value: 'maisFat' },
  { label: 'Menos Vendidos (Faturamento)', value: 'menosFat' },
  { label: 'Mais Vendidos (Unidade)', value: 'maisUn' },
  { label: 'Menos Vendidos (Unidade)', value: 'menosUn' },
]

const DashboardPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 4, 1), 30),
  })
  const [showFilters, setShowFilters] = useState(false)
  const [vendedor, setVendedor] = useState<string | undefined>(undefined)
  const [cliente, setCliente] = useState<string | undefined>(undefined)
  const [segmento, setSegmento] = useState<string | undefined>(undefined)
  const [estado, setEstado] = useState<string | undefined>(undefined)
  const [cidade, setCidade] = useState<string | undefined>(undefined)
  const [produto, setProduto] = useState<string | undefined>(undefined)
  const [mixType, setMixType] = useState('maisFat')

  // Paginação para listas
  const pageSize = 10
  const maisVendidosFat = usePagination(mixMaisVendidosFaturamento, pageSize)
  const menosVendidosFat = usePagination(mixMenosVendidosFaturamento, pageSize)
  const maisVendidosUn = usePagination(mixMaisVendidosUnidade, pageSize)
  const menosVendidosUn = usePagination(mixMenosVendidosUnidade, pageSize)

  let mixData, mixSetPage, mixPage, mixTotalPages, mixSuffix
  if (mixType === 'maisFat') {
    mixData = maisVendidosFat.paginated
    mixSetPage = maisVendidosFat.setPage
    mixPage = maisVendidosFat.page
    mixTotalPages = maisVendidosFat.totalPages
    mixSuffix = 'R$'
  } else if (mixType === 'menosFat') {
    mixData = menosVendidosFat.paginated
    mixSetPage = menosVendidosFat.setPage
    mixPage = menosVendidosFat.page
    mixTotalPages = menosVendidosFat.totalPages
    mixSuffix = 'R$'
  } else if (mixType === 'maisUn') {
    mixData = maisVendidosUn.paginated
    mixSetPage = maisVendidosUn.setPage
    mixPage = maisVendidosUn.page
    mixTotalPages = maisVendidosUn.totalPages
    mixSuffix = 'un.'
  } else {
    mixData = menosVendidosUn.paginated
    mixSetPage = menosVendidosUn.setPage
    mixPage = menosVendidosUn.page
    mixTotalPages = menosVendidosUn.totalPages
    mixSuffix = 'un.'
  }

  // Mock para produtos vendidos e pedidos
  const produtosVendidos = { quantidade: 1250, change: 8.3 }
  const pedidos = { quantidade: 342, change: -3.7 }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in-up px-2 sm:px-0">
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Filtros</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters((v) => !v)}
            aria-label={showFilters ? 'Fechar filtros' : 'Abrir filtros'}
          >
            {showFilters ? (
              <span className="text-lg">−</span>
            ) : (
              <span className="text-lg">+</span>
            )}
          </Button>
        </CardHeader>
        {showFilters && (
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <DateRangePicker date={date} onDateChange={setDate} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Select value={vendedor} onValueChange={setVendedor}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Ana', 'Bruno', 'Carla'].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={cliente} onValueChange={setCliente}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Hospital Central', 'Clínica Saúde', 'Drogaria Popular'].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={segmento} onValueChange={setSegmento}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEGMENTS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {['SP', 'RJ', 'MG'].map((e) => (
                      <SelectItem key={e} value={e}>{e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={cidade} onValueChange={setCidade}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={produto} onValueChange={setProduto}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Dipirona', 'Paracetamol', 'Amoxicilina', 'Losartana', 'Sinvastatina'].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                <Button className="rounded-sm w-full sm:w-auto">Aplicar</Button>
                <Button variant="outline" className="rounded-sm w-full sm:w-auto">Limpar</Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Geral</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
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
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
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
        {/* Produtos Vendidos */}
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{produtosVendidos.quantidade.toLocaleString('pt-BR')}</div>
            <p
              className={`text-xs flex items-center ${produtosVendidos.change > 0 ? 'text-success' : 'text-destructive'}`}
            >
              {produtosVendidos.change > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {produtosVendidos.change}% vs. período anterior
            </p>
          </CardContent>
        </Card>
        {/* Pedidos */}
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{pedidos.quantidade.toLocaleString('pt-BR')}</div>
            <p
              className={`text-xs flex items-center ${pedidos.change > 0 ? 'text-success' : 'text-destructive'}`}
            >
              {pedidos.change > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {pedidos.change}% vs. período anterior
            </p>
          </CardContent>
        </Card>
        
        {/* Share por Produto - Mobile First */}
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg col-span-1 sm:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Share por Produto</CardTitle>
            <CardDescription className="text-sm">
              Distribuição da receita por produto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productShareData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={30}
                    outerRadius={60}
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <ChartTooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Share por Cliente - Mobile First */}
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg col-span-1 sm:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Share por Cliente</CardTitle>
            <CardDescription className="text-sm">
              Percentual de participação do cliente na receita.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientShareData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={30}
                    outerRadius={60}
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <ChartTooltip content={<CustomClientTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Evolução de Receita e Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={evolutionData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                  />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
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
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Vendas por Segmento</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={segmentSalesData}>
                  <CartesianGrid vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={8}
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#4F8EF7" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="shadow-md-1 rounded-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Gráfico de Calor por Demanda/Cotação da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr>
                    <th className="p-1 sm:p-2 text-left font-medium">Dia</th>
                    {heatmapHours.map((h) => (
                      <th key={h} className="p-1 sm:p-2 text-center font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row) => (
                    <tr key={row.dia}>
                      <td className="p-1 sm:p-2 font-medium">{row.dia}</td>
                      {row.cotacoes.map((val, i) => (
                        <td
                          key={i}
                          className="p-1 sm:p-2 text-center text-xs"
                          style={{ background: `rgba(79, 142, 247, ${val/16})`, color: val > 8 ? '#fff' : '#222' }}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md-1 rounded-lg">
          <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 gap-2">
            <CardTitle className="text-base sm:text-lg">Mix de Produtos</CardTitle>
            <Select value={mixType} onValueChange={setMixType}>
              <SelectTrigger className="w-full sm:w-[260px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mixOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 sm:space-y-2">
              {mixData.map((p, idx) => (
                <li
                  key={p.name}
                  className={`flex justify-between items-center text-xs sm:text-sm rounded px-2 py-1
                    ${idx % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-[#eaf1fb] dark:bg-[#22304a]'}`}
                >
                  <span className="truncate mr-2">{p.name}</span>
                  <span className="font-semibold whitespace-nowrap">
                    {mixSuffix === 'R$'
                      ? `R$ ${p.value.toLocaleString('pt-BR')}`
                      : `${p.value.toLocaleString('pt-BR')} un.`}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-2 mt-3 items-center">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={mixPage === 0} onClick={() => mixSetPage(mixPage - 1)}>Anterior</Button>
                <Button size="sm" variant="outline" disabled={mixPage === mixTotalPages - 1} onClick={() => mixSetPage(mixPage + 1)}>Próxima</Button>
              </div>
              <span className="text-xs flex items-center">Página {mixPage + 1} de {mixTotalPages}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
