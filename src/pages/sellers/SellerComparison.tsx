import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { Award, DollarSign, Receipt, Target, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Building2, ShoppingCart, Users } from 'lucide-react'
import { useState } from 'react'
import { addDays } from 'date-fns'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { SEGMENTS } from '@/constants/segments'

type SellerData = {
  id: string
  name: string
  avatarUrl: string
  revenue: number
  goal: number
  ticket: number
  previousRevenue: number
  previousTicket: number
  performance: { month: string; revenue: number }[]
  topProducts: { name: string; revenue: number; cliente: string }[]
  segmento: string
  totalClients: number
  totalProducts: number
  previousClients: number
  previousProducts: number
}

const mockSellers: SellerData[] = [
  {
    id: 'V01',
    name: 'Ana Pereira',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=1',
    revenue: 85000,
    goal: 100000,
    ticket: 1250.5,
    previousRevenue: 75000,
    previousTicket: 1180.0,
    segmento: 'farmácia/drogaria',
    totalClients: 8,
    totalProducts: 10,
    previousClients: 7,
    previousProducts: 9,
    performance: [
      { month: 'Jan', revenue: 65000 },
      { month: 'Fev', revenue: 72000 },
      { month: 'Mar', revenue: 85000 },
    ],
    topProducts: [
      { name: 'Amoxicilina 500mg', revenue: 25000, cliente: 'Drogaria São Paulo' },
      { name: 'Paracetamol 750mg', revenue: 20000, cliente: 'Farmácia Pague Menos' },
      { name: 'Ibuprofeno 400mg', revenue: 18000, cliente: 'Raia Drogasil' },
      { name: 'Dipirona 500mg', revenue: 15000, cliente: 'Ultrafarma' },
      { name: 'Omeprazol 20mg', revenue: 12000, cliente: 'Farmácia Popular' },
      { name: 'Losartana 50mg', revenue: 10000, cliente: 'Drogaria Onofre' },
      { name: 'Sinvastatina 20mg', revenue: 8500, cliente: 'Farmácia Araujo' },
      { name: 'Metformina 850mg', revenue: 7200, cliente: 'Droga Raia' },
      { name: 'Atenolol 50mg', revenue: 6800, cliente: 'Farmácia Nissei' },
      { name: 'Captopril 25mg', revenue: 5500, cliente: 'Drogasil' },
    ],
  },
  {
    id: 'V02',
    name: 'Bruno Costa',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=male&seed=2',
    revenue: 115000,
    goal: 110000,
    ticket: 1500.0,
    previousRevenue: 105000,
    previousTicket: 1420.0,
    segmento: 'hospital de grande porte',
    totalClients: 12,
    totalProducts: 10,
    previousClients: 10,
    previousProducts: 8,
    performance: [
      { month: 'Jan', revenue: 95000 },
      { month: 'Fev', revenue: 105000 },
      { month: 'Mar', revenue: 115000 },
    ],
    topProducts: [
      { name: 'Nexium 40mg', revenue: 40000, cliente: 'Hospital Central' },
      { name: 'Crestor 20mg', revenue: 35000, cliente: 'Hospital São Luiz' },
      { name: 'Januvia 100mg', revenue: 28000, cliente: 'Hospital Albert Einstein' },
      { name: 'Symbicort 160/4.5', revenue: 22000, cliente: 'Hospital Sírio-Libanês' },
      { name: 'Lyrica 75mg', revenue: 18000, cliente: 'Hospital das Clínicas' },
      { name: 'Seretide 25/250', revenue: 15000, cliente: 'Hospital Santa Catarina' },
      { name: 'Glifage XR 750mg', revenue: 12500, cliente: 'Hospital Israelita' },
      { name: 'Trulicity 1.5mg', revenue: 11000, cliente: 'Hospital Alemão Oswaldo Cruz' },
      { name: 'Benicar HCT 40/25', revenue: 9500, cliente: 'Hospital Moriah' },
      { name: 'Pradaxa 150mg', revenue: 8000, cliente: 'Hospital Santa Paula' },
    ],
  },
  {
    id: 'V03',
    name: 'Carla Dias',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=3',
    revenue: 78000,
    goal: 90000,
    ticket: 980.75,
    previousRevenue: 82000,
    previousTicket: 1020.0,
    segmento: 'clínica/consultório',
    totalClients: 6,
    totalProducts: 10,
    previousClients: 8,
    previousProducts: 12,
    performance: [
      { month: 'Jan', revenue: 70000 },
      { month: 'Fev', revenue: 68000 },
      { month: 'Mar', revenue: 78000 },
    ],
    topProducts: [
      { name: 'Atorvastatina 20mg', revenue: 30000, cliente: 'Clínica Cardio' },
      { name: 'Anlodipino 5mg', revenue: 15000, cliente: 'Clínica Médica Santos' },
      { name: 'Hidroclorotiazida 25mg', revenue: 12000, cliente: 'Centro Médico' },
      { name: 'Furosemida 40mg', revenue: 10000, cliente: 'Clínica Vida' },
      { name: 'Prednisona 20mg', revenue: 8500, cliente: 'Clínica São José' },
      { name: 'Dexametasona 4mg', revenue: 7200, cliente: 'Consultório Dr. Silva' },
      { name: 'Clonazepam 2mg', revenue: 6800, cliente: 'Clínica Neurológica' },
      { name: 'Fluoxetina 20mg', revenue: 5500, cliente: 'Centro Psiquiátrico' },
      { name: 'Sertralina 50mg', revenue: 4200, cliente: 'Clínica Mental' },
      { name: 'Risperidona 2mg', revenue: 3800, cliente: 'Instituto Médico' },
    ],
  },
  {
    id: 'V04',
    name: 'Diego Santos',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    revenue: 95000,
    goal: 120000,
    ticket: 1380.25,
    previousRevenue: 88000,
    previousTicket: 1290.0,
    segmento: 'laboratório',
    totalClients: 9,
    totalProducts: 10,
    previousClients: 8,
    previousProducts: 9,
    performance: [
      { month: 'Jan', revenue: 82000 },
      { month: 'Fev', revenue: 88000 },
      { month: 'Mar', revenue: 95000 },
    ],
    topProducts: [
      { name: 'Ozempic 1mg', revenue: 35000, cliente: 'Laboratório Fleury' },
      { name: 'Jardiance 25mg', revenue: 28000, cliente: 'Laboratório Delboni' },
      { name: 'Forxiga 10mg', revenue: 22000, cliente: 'Laboratório Hermes Pardini' },
      { name: 'Victoza 6mg/ml', revenue: 18000, cliente: 'Laboratório DASA' },
      { name: 'Xigduo XR 10/1000mg', revenue: 15000, cliente: 'Laboratório Sabin' },
      { name: 'Invokamet 150/1000mg', revenue: 12000, cliente: 'Laboratório Sírio-Libanês' },
      { name: 'Galvus Met 50/1000mg', revenue: 10000, cliente: 'Laboratório Einstein' },
      { name: 'Trajenta 5mg', revenue: 8500, cliente: 'Laboratório Dante Pazzanese' },
      { name: 'Onglyza 5mg', revenue: 7200, cliente: 'Laboratório Central' },
      { name: 'Byetta 10mcg', revenue: 6000, cliente: 'Laboratório Clínico' },
    ],
  },
  {
    id: 'V05',
    name: 'Elena Rodrigues',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=5',
    revenue: 125000,
    goal: 115000,
    ticket: 1680.90,
    previousRevenue: 118000,
    previousTicket: 1620.0,
    segmento: 'home care',
    totalClients: 15,
    totalProducts: 10,
    previousClients: 12,
    previousProducts: 8,
    performance: [
      { month: 'Jan', revenue: 110000 },
      { month: 'Fev', revenue: 118000 },
      { month: 'Mar', revenue: 125000 },
    ],
    topProducts: [
      { name: 'Humira 40mg', revenue: 45000, cliente: 'Home Care Premium' },
      { name: 'Enbrel 50mg', revenue: 38000, cliente: 'Care Plus Home' },
      { name: 'Remicade 100mg', revenue: 32000, cliente: 'Assistência Domiciliar' },
      { name: 'Stelara 90mg', revenue: 25000, cliente: 'Home Health Care' },
      { name: 'Cosentyx 150mg', revenue: 20000, cliente: 'Cuidado Domiciliar' },
      { name: 'Skyrizi 75mg', revenue: 18000, cliente: 'Enfermagem Domiciliar' },
      { name: 'Taltz 80mg', revenue: 15000, cliente: 'Home Care Solutions' },
      { name: 'Tremfya 100mg', revenue: 12000, cliente: 'Serviços Domiciliares' },
      { name: 'Ilumya 100mg', revenue: 9000, cliente: 'Atenção Domiciliar' },
      { name: 'Simponi 50mg', revenue: 7500, cliente: 'Care Home Services' },
    ],
  },
]

const chartConfig = {
  revenue: { label: 'Receita', color: 'hsl(var(--chart-1))' },
}

// Função para filtrar dados
function filterData(
  data: SellerData[],
  filters: {
    dateRange?: DateRange
    segmento?: string
  }
): SellerData[] {
  return data.filter((item) => {
    // Filtro por segmento
    if (filters.segmento && item.segmento !== filters.segmento) {
      return false
    }
    
    // O filtro de data pode ser implementado conforme necessário
    // Para este exemplo, assumimos que todos os dados estão no período filtrado
    
    return true
  })
}

const SellerComparisonPage = () => {
  // Estados dos filtros
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 4, 1), 30),
  })
  const [segmento, setSegmento] = useState<string | undefined>(undefined)
  
  // Estado para paginação de produtos por vendedor
  const [currentProductPage, setCurrentProductPage] = useState<{ [sellerId: string]: number }>({})
  const productsPerPage = 5

  // Aplicar filtros
  const filteredSellers = filterData(mockSellers, {
    dateRange: date,
    segmento,
  })

  // Função para limpar filtros
  const clearFilters = () => {
    setDate({
      from: new Date(2024, 4, 1),
      to: addDays(new Date(2024, 4, 1), 30),
    })
    setSegmento(undefined)
  }

  // Funções para paginação de produtos
  const getProductsForPage = (seller: SellerData) => {
    const page = currentProductPage[seller.id] || 0
    const start = page * productsPerPage
    const end = start + productsPerPage
    return seller.topProducts.slice(start, end)
  }

  const getTotalProductPages = (seller: SellerData) => {
    return Math.ceil(seller.topProducts.length / productsPerPage)
  }

  const goToProductPage = (sellerId: string, page: number) => {
    setCurrentProductPage(prev => ({
      ...prev,
      [sellerId]: page
    }))
  }

  const teamRevenue = filteredSellers.reduce((acc, s) => acc + s.revenue, 0)
  const teamGoal = filteredSellers.reduce((acc, s) => acc + s.goal, 0)
  const teamAverageTicket = filteredSellers.reduce((acc, s) => acc + s.ticket, 0) / filteredSellers.length
  const topPerformer = filteredSellers.reduce((prev, current) =>
    prev.revenue > current.revenue ? prev : current,
  )

  // Mock de dados de comparação com período anterior
  const teamRevenueChange = 12.5
  const teamGoalChange = 5.2
  const teamTicketChange = -2.1

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Filtros */}
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 flex-grow">
            <DateRangePicker date={date} onDateChange={setDate} />
            <Select value={segmento} onValueChange={setSegmento}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-sm">
                <SelectValue placeholder="Segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {SEGMENTS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full sm:w-auto rounded-sm">
            Aplicar
          </Button>
          <Button variant="outline" className="w-full sm:w-auto rounded-sm" onClick={clearFilters}>
            Limpar
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total da Equipe</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {teamRevenue.toLocaleString('pt-BR')}
            </div>
            <p
              className={`text-xs flex items-center ${teamRevenueChange > 0 ? 'text-success' : 'text-destructive'}`}
            >
              {teamRevenueChange > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {teamRevenueChange}% vs. período anterior
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta da Equipe</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {teamGoal.toLocaleString('pt-BR')}
            </div>
            <p
              className={`text-xs flex items-center ${teamGoalChange > 0 ? 'text-success' : 'text-destructive'}`}
            >
              {teamGoalChange > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {teamGoalChange}% vs. período anterior
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio da Equipe</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {teamAverageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p
              className={`text-xs flex items-center ${teamTicketChange > 0 ? 'text-success' : 'text-destructive'}`}
            >
              {teamTicketChange > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {teamTicketChange}% vs. período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Desempenho por Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredSellers.map((seller) => (
              <AccordionItem
                value={seller.id}
                key={seller.id}
                className="border-b"
              >
                <AccordionTrigger className="hover:no-underline p-6 rounded-sm">
                  <div className="flex items-start gap-4 w-full">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                      <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <p className="font-semibold text-base">{seller.name}</p>
                        {seller.id === topPerformer.id && (
                          <Badge variant="default" className="rounded-sm bg-warning/10 text-warning border-warning">
                            <Award className="h-3 w-3 mr-1" />
                            Top Performer
                          </Badge>
                        )}
                      </div>
                      
                      {/* Grid de métricas responsivo */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 min-w-0">
                          <DollarSign className="h-4 w-4 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-foreground text-sm">
                              {seller.revenue.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </div>
                            <div className={`text-xs flex items-center ${((seller.revenue - seller.previousRevenue) / seller.previousRevenue * 100) > 0 ? 'text-success' : 'text-destructive'}`}>
                              {((seller.revenue - seller.previousRevenue) / seller.previousRevenue * 100) > 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {Math.abs(((seller.revenue - seller.previousRevenue) / seller.previousRevenue * 100)).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 min-w-0">
                          <Receipt className="h-4 w-4 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-foreground text-sm">
                              {seller.ticket.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </div>
                            <div className={`text-xs flex items-center ${((seller.ticket - seller.previousTicket) / seller.previousTicket * 100) > 0 ? 'text-success' : 'text-destructive'}`}>
                              {((seller.ticket - seller.previousTicket) / seller.previousTicket * 100) > 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {Math.abs(((seller.ticket - seller.previousTicket) / seller.previousTicket * 100)).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 min-w-0">
                          <Building2 className="h-4 w-4 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-foreground text-sm">
                              {seller.totalClients} {seller.totalClients === 1 ? 'cliente' : 'clientes'}
                            </div>
                            <div className={`text-xs flex items-center ${seller.previousClients === 0 ? 'text-muted-foreground' : ((seller.totalClients - seller.previousClients) / seller.previousClients * 100) > 0 ? 'text-success' : 'text-destructive'}`}>
                              {seller.previousClients > 0 && (
                                <>
                                  {((seller.totalClients - seller.previousClients) / seller.previousClients * 100) > 0 ? (
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                  )}
                                  {Math.abs(((seller.totalClients - seller.previousClients) / seller.previousClients * 100)).toFixed(1)}%
                                </>
                              )}
                              {seller.previousClients === 0 && 'Novo'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 min-w-0">
                          <ShoppingCart className="h-4 w-4 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-foreground text-sm">
                              {seller.totalProducts} {seller.totalProducts === 1 ? 'produto' : 'produtos'}
                            </div>
                            <div className={`text-xs flex items-center ${seller.previousProducts === 0 ? 'text-muted-foreground' : ((seller.totalProducts - seller.previousProducts) / seller.previousProducts * 100) > 0 ? 'text-success' : 'text-destructive'}`}>
                              {seller.previousProducts > 0 && (
                                <>
                                  {((seller.totalProducts - seller.previousProducts) / seller.previousProducts * 100) > 0 ? (
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                  )}
                                  {Math.abs(((seller.totalProducts - seller.previousProducts) / seller.previousProducts * 100)).toFixed(1)}%
                                </>
                              )}
                              {seller.previousProducts === 0 && 'Novo'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Indicador de meta para mobile - aparece abaixo das métricas */}
                      <div className="lg:hidden mt-4 pt-3 border-t border-border/60">
                        <div className="flex items-center gap-3">
                          <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">Meta Atingida</p>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={(seller.revenue / seller.goal) * 100}
                                className="flex-1 h-2"
                              />
                              <span className="text-sm font-medium">
                                {((seller.revenue / seller.goal) * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Indicador de meta - escondido no mobile, visível no desktop */}
                    <div className="hidden lg:block w-48 flex-shrink-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        Meta Atingida
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(seller.revenue / seller.goal) * 100}
                          className="w-32"
                        />
                        <span className="text-sm font-medium">
                          {((seller.revenue / seller.goal) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-secondary/50 rounded-b-md">
                  <div className="grid md:grid-cols-2 gap-6 md:items-stretch">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          Performance por Produto
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {seller.topProducts.length} produtos
                        </span>
                      </div>
                      <div className="flex-1 min-h-[200px]">
                        <div className="space-y-3 h-full overflow-y-auto">
                          {getProductsForPage(seller).map((p) => (
                            <div
                              key={p.name}
                              className="border rounded-md p-3 bg-background/50"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm">{p.name}</span>
                                <span className="font-bold text-sm">
                                  {p.revenue.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Users className="h-3 w-3 mr-1" />
                                Cliente: {p.cliente}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {getTotalProductPages(seller) > 1 && (
                        <div className="flex items-center justify-between mt-4 pt-2 border-t">
                          <span className="text-xs text-muted-foreground">
                            Página {(currentProductPage[seller.id] || 0) + 1} de {getTotalProductPages(seller)}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => goToProductPage(seller.id, Math.max(0, (currentProductPage[seller.id] || 0) - 1))}
                              disabled={(currentProductPage[seller.id] || 0) === 0}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => goToProductPage(seller.id, Math.min(getTotalProductPages(seller) - 1, (currentProductPage[seller.id] || 0) + 1))}
                              disabled={(currentProductPage[seller.id] || 0) >= getTotalProductPages(seller) - 1}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          Evolução do Faturamento
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          Últimos 3 meses
                        </span>
                      </div>
                      <div className="flex-1 min-h-[200px]">
                        <ChartContainer
                          config={chartConfig}
                          className="h-full w-full"
                        >
                          <ResponsiveContainer>
                            <BarChart
                              data={seller.performance}
                              margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                fontSize={12}
                              />
                              <YAxis
                                tickFormatter={(value) =>
                                  `R$${(Number(value) / 1000).toFixed(0)}k`
                                }
                                fontSize={12}
                              />
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                              />
                              <Bar
                                dataKey="revenue"
                                fill="var(--color-revenue)"
                                radius={4}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="mt-4 pt-2 border-t">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {seller.performance.map((perf, index) => (
                            <div key={perf.month} className="text-center">
                              <div className="font-medium">{perf.month}</div>
                              <div className="text-muted-foreground">
                                {perf.revenue.toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}
                              </div>
                              {index > 0 && (
                                <div className={`flex items-center justify-center ${
                                  perf.revenue > seller.performance[index - 1].revenue 
                                    ? 'text-success' 
                                    : 'text-destructive'
                                }`}>
                                  {perf.revenue > seller.performance[index - 1].revenue ? (
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                  )}
                                  {Math.abs(((perf.revenue - seller.performance[index - 1].revenue) / seller.performance[index - 1].revenue * 100)).toFixed(1)}%
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

export default SellerComparisonPage
