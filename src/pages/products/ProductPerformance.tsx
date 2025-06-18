import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { AlertTriangle, ArrowDown, ArrowUp, TrendingDown, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { addDays } from 'date-fns'
import { SEGMENTS } from '@/constants/segments'

type ProductStatus = 'Ótimo' | 'Bom' | 'Neutro' | 'Ruim' | 'Crítico'

type ProductPerformanceData = {
  id: string
  name: string
  revenueChange: number
  volumeChange: number
  lostRevenue: number
  status: ProductStatus
  lastSale: string
  avgPrice: number
  mainClient: string
  grupo: string
  subgrupo: string
  quantidadeDemandada: number
  segmento: string
}

const mockData: ProductPerformanceData[] = [
  {
    id: 'P001',
    name: 'Medicamento A',
    revenueChange: 15.2,
    volumeChange: 12.0,
    lostRevenue: 0,
    status: 'Ótimo',
    lastSale: '2024-05-28',
    avgPrice: 55.0,
    mainClient: 'Hospital Central',
    grupo: 'Analgésicos',
    subgrupo: 'Analgésicos',
    quantidadeDemandada: 1200,
    segmento: 'hospital de grande porte',
  },
  {
    id: 'P002',
    name: 'Medicamento B',
    revenueChange: 5.1,
    volumeChange: 2.5,
    lostRevenue: 250.0,
    status: 'Bom',
    lastSale: '2024-05-27',
    avgPrice: 120.5,
    mainClient: 'Clínica Saúde',
    grupo: 'Antibióticos',
    subgrupo: 'Antibióticos',
    quantidadeDemandada: 800,
    segmento: 'clínica/consultório',
  },
  {
    id: 'P003',
    name: 'Medicamento C',
    revenueChange: -2.5,
    volumeChange: -1.0,
    lostRevenue: 800.0,
    status: 'Ruim',
    lastSale: '2024-05-20',
    avgPrice: 30.2,
    mainClient: 'Hospital Central',
    grupo: 'Antibióticos',
    subgrupo: 'Antibióticos',
    quantidadeDemandada: 500,
    segmento: 'hospital pequeno e médio',
  },
  {
    id: 'P004',
    name: 'Medicamento D',
    revenueChange: -22.0,
    volumeChange: -18.5,
    lostRevenue: 3500.0,
    status: 'Crítico',
    lastSale: '2024-04-15',
    avgPrice: 250.0,
    mainClient: 'Drogaria Popular',
    grupo: 'Anti-hipertensivos',
    subgrupo: 'Anti-hipertensivos',
    quantidadeDemandada: 200,
    segmento: 'farmácia/drogaria',
  },
  {
    id: 'P005',
    name: 'Suplemento X',
    revenueChange: 0.5,
    volumeChange: 0.0,
    lostRevenue: 50.0,
    status: 'Neutro',
    lastSale: '2024-05-29',
    avgPrice: 89.9,
    mainClient: 'Clínica Bem Estar',
    grupo: 'Suplementos',
    subgrupo: 'Vitaminas',
    quantidadeDemandada: 300,
    segmento: 'clínica de estética',
  },
  {
    id: 'P006',
    name: 'Dipirona 500mg',
    revenueChange: 8.3,
    volumeChange: 6.2,
    lostRevenue: 120.0,
    status: 'Bom',
    lastSale: '2024-05-30',
    avgPrice: 12.5,
    mainClient: 'Farmácia Central',
    grupo: 'Analgésicos',
    subgrupo: 'Analgésicos',
    quantidadeDemandada: 2500,
    segmento: 'distribuidora',
  },
  {
    id: 'P007',
    name: 'Paracetamol 750mg',
    revenueChange: 18.7,
    volumeChange: 15.3,
    lostRevenue: 0,
    status: 'Ótimo',
    lastSale: '2024-05-30',
    avgPrice: 8.9,
    mainClient: 'Drogaria Popular',
    grupo: 'Analgésicos',
    subgrupo: 'Analgésicos',
    quantidadeDemandada: 3200,
    segmento: 'farmácia/drogaria',
  },
  {
    id: 'P008',
    name: 'Amoxicilina 500mg',
    revenueChange: -5.2,
    volumeChange: -3.8,
    lostRevenue: 450.0,
    status: 'Ruim',
    lastSale: '2024-05-25',
    avgPrice: 25.8,
    mainClient: 'Hospital São José',
    grupo: 'Antibióticos',
    subgrupo: 'Antibióticos',
    quantidadeDemandada: 1800,
    segmento: 'hospital pequeno e médio',
  },
  {
    id: 'P009',
    name: 'Losartana 50mg',
    revenueChange: 3.1,
    volumeChange: 1.9,
    lostRevenue: 80.0,
    status: 'Bom',
    lastSale: '2024-05-29',
    avgPrice: 18.7,
    mainClient: 'Clínica Cardio',
    grupo: 'Anti-hipertensivos',
    subgrupo: 'Anti-hipertensivos',
    quantidadeDemandada: 1500,
    segmento: 'clínica/consultório',
  },
  {
    id: 'P010',
    name: 'Sinvastatina 20mg',
    revenueChange: -1.8,
    volumeChange: -0.5,
    lostRevenue: 200.0,
    status: 'Neutro',
    lastSale: '2024-05-26',
    avgPrice: 32.4,
    mainClient: 'Hospital Central',
    grupo: 'Estatinas',
    subgrupo: 'Estatinas',
    quantidadeDemandada: 900,
    segmento: 'laboratório',
  },
  {
    id: 'P011',
    name: 'Omeprazol 20mg',
    revenueChange: 12.4,
    volumeChange: 9.8,
    lostRevenue: 0,
    status: 'Ótimo',
    lastSale: '2024-05-30',
    avgPrice: 15.6,
    mainClient: 'Farmácia Saúde',
    grupo: 'Antiácidos',
    subgrupo: 'Antiácidos',
    quantidadeDemandada: 2100,
    segmento: 'home care',
  },
  {
    id: 'P012',
    name: 'Metformina 850mg',
    revenueChange: -8.9,
    volumeChange: -6.7,
    lostRevenue: 680.0,
    status: 'Ruim',
    lastSale: '2024-05-22',
    avgPrice: 22.3,
    mainClient: 'Clínica Diabetes',
    grupo: 'Antidiabéticos',
    subgrupo: 'Antidiabéticos',
    quantidadeDemandada: 1300,
    segmento: 'clínica de nefrologia',
  },
  {
    id: 'P013',
    name: 'Atenolol 25mg',
    revenueChange: 6.7,
    volumeChange: 4.2,
    lostRevenue: 90.0,
    status: 'Bom',
    lastSale: '2024-05-28',
    avgPrice: 14.8,
    mainClient: 'Hospital Cardio',
    grupo: 'Beta-bloqueadores',
    subgrupo: 'Beta-bloqueadores',
    quantidadeDemandada: 1100,
    segmento: 'clinica de oftalmologia',
  },
  {
    id: 'P014',
    name: 'Captopril 25mg',
    revenueChange: -15.3,
    volumeChange: -12.1,
    lostRevenue: 920.0,
    status: 'Ruim',
    lastSale: '2024-05-18',
    avgPrice: 19.5,
    mainClient: 'Clínica Popular',
    grupo: 'IECA',
    subgrupo: 'IECA',
    quantidadeDemandada: 750,
    segmento: 'clínica odontológica',
  },
  {
    id: 'P015',
    name: 'Vitamina D3 1000UI',
    revenueChange: 22.8,
    volumeChange: 18.9,
    lostRevenue: 0,
    status: 'Ótimo',
    lastSale: '2024-05-30',
    avgPrice: 45.9,
    mainClient: 'Farmácia Vida',
    grupo: 'Suplementos',
    subgrupo: 'Vitaminas',
    quantidadeDemandada: 850,
    segmento: 'unidade de ensino',
  },
]

const getStatusBadgeVariant = (
  status: ProductStatus,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Ótimo':
      return 'default'
    case 'Bom':
      return 'secondary'
    case 'Crítico':
    case 'Ruim':
      return 'destructive'
    default:
      return 'outline'
  }
}

// Hook de paginação
function usePagination(data: any[], pageSize: number) {
  const [page, setPage] = useState(0)
  const paginated = data.slice(page * pageSize, (page + 1) * pageSize)
  const totalPages = Math.ceil(data.length / pageSize)
  return { paginated, page, setPage, totalPages }
}

// Função para filtrar dados
function filterData(
  data: ProductPerformanceData[],
  filters: {
    dateRange?: DateRange
    vendedor?: string
    cliente?: string
    segmento?: string
    estado?: string
    cidade?: string
    produto?: string
  }
): ProductPerformanceData[] {
  return data.filter((item) => {
    // Filtro por segmento
    if (filters.segmento && item.segmento !== filters.segmento) {
      return false
    }
    
    // Filtro por cliente
    if (filters.cliente && item.mainClient !== filters.cliente) {
      return false
    }
    
    // Filtro por produto
    if (filters.produto && !item.name.toLowerCase().includes(filters.produto.toLowerCase())) {
      return false
    }
    
    // O filtro de data pode ser implementado conforme necessário
    // Para este exemplo, assumimos que todos os dados estão no período filtrado
    
    return true
  })
}

const ProductPerformancePage = () => {
  // Estados dos filtros
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

  // Aplicar filtros
  const filteredData = filterData(mockData, {
    dateRange: date,
    vendedor,
    cliente,
    segmento,
    estado,
    cidade,
    produto,
  })

  // Função para limpar filtros
  const clearFilters = () => {
    setDate({
      from: new Date(2024, 4, 1),
      to: addDays(new Date(2024, 4, 1), 30),
    })
    setVendedor(undefined)
    setCliente(undefined)
    setSegmento(undefined)
    setEstado(undefined)
    setCidade(undefined)
    setProduto(undefined)
  }

  const criticalProducts = filteredData.filter((p) => p.status === 'Crítico')
  
  // Paginação
  const pageSize = 10
  const { paginated: paginatedProducts, page, setPage, totalPages } = usePagination(filteredData, pageSize)
  
  // Cálculos para KPIs usando dados filtrados
  const produtosEmDeclinio = filteredData.filter((p) => p.revenueChange < 0).length
  const receitaPerdidaTotal = filteredData.reduce((total, p) => total + p.lostRevenue, 0)
  const produtosCriticos = criticalProducts.length

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in-up p-4 md:p-0">
      {/* Filtros */}
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Filtros</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters((v) => !v)}
            aria-label={showFilters ? 'Fechar filtros' : 'Abrir filtros'}
            className="h-8 w-8 md:h-10 md:w-10"
          >
            {showFilters ? (
              <span className="text-lg">−</span>
            ) : (
              <span className="text-lg">+</span>
            )}
          </Button>
        </CardHeader>
        {showFilters && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <DateRangePicker date={date} onDateChange={setDate} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                <Select value={vendedor} onValueChange={setVendedor}>
                  <SelectTrigger className="w-full rounded-sm h-9 md:h-10">
                    <SelectValue placeholder="Vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Ana', 'Bruno', 'Carla'].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={cliente} onValueChange={setCliente}>
                  <SelectTrigger className="w-full rounded-sm h-9 md:h-10">
                    <SelectValue placeholder="Cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(new Set(mockData.map(item => item.mainClient))).map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={segmento} onValueChange={setSegmento}>
                  <SelectTrigger className="w-full rounded-sm h-9 md:h-10">
                    <SelectValue placeholder="Segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEGMENTS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger className="w-full rounded-sm h-9 md:h-10">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE'].map((e) => (
                      <SelectItem key={e} value={e}>{e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={cidade} onValueChange={setCidade}>
                  <SelectTrigger className="w-full rounded-sm h-9 md:h-10">
                    <SelectValue placeholder="Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba', 'Florianópolis', 'Salvador', 'Recife'].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={produto} onValueChange={setProduto}>
                  <SelectTrigger className="w-full rounded-sm h-9 md:h-10">
                    <SelectValue placeholder="Produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.map((p) => (
                      <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <Button className="rounded-sm h-9 md:h-10 text-sm">Aplicar</Button>
                <Button variant="outline" className="rounded-sm h-9 md:h-10 text-sm" onClick={clearFilters}>Limpar</Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos em Declínio</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-destructive">
              {produtosEmDeclinio}
            </div>
            <p className="text-xs text-muted-foreground">
              produtos com receita negativa
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Perdida</CardTitle>
            <DollarSign className="h-4 w-4 text-destructive flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-destructive">
              R$ {receitaPerdidaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              total de receita perdida
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md-1 hover:shadow-md-2 transition-shadow duration-200 rounded-lg sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-destructive">
              {produtosCriticos}
            </div>
            <p className="text-xs text-muted-foreground">
              produtos com status crítico
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de Produtos Críticos */}
      {criticalProducts.length > 0 && (
        <Card className="border-destructive bg-destructive/10 rounded-lg shadow-md-1">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pb-3 md:pb-6">
            <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-destructive flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-destructive text-base md:text-lg">
                Produtos Críticos
              </CardTitle>
              <p className="text-sm text-destructive/80 mt-1">
                {criticalProducts.length} produto(s) com perda de receita acima de 20%.
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {criticalProducts.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/50 rounded-md">
                  <span className="text-sm font-medium text-destructive/90">{p.name}</span>
                  <span className="text-sm text-destructive/80 mt-1 sm:mt-0">
                    Perda: R$ {p.lostRevenue.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabela de Produtos */}
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Relatório de Desempenho de Produtos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Versão Desktop da Tabela */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Produto</TableHead>
                  <TableHead className="text-left">Grupo</TableHead>
                  <TableHead className="text-left">Subgrupo</TableHead>
                  <TableHead className="text-center">Var. Receita</TableHead>
                  <TableHead className="text-center">Var. Volume</TableHead>
                  <TableHead className="text-center">Receita Perdida</TableHead>
                  <TableHead className="text-center">Qtd. Demandada</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Última Venda</TableHead>
                  <TableHead className="text-center">Preço Médio</TableHead>
                  <TableHead className="text-left">Principal Cliente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className={cn(
                      product.status === 'Crítico' && 'bg-destructive/5',
                    )}
                  >
                    <TableCell className="font-medium text-left">{product.name}</TableCell>
                    <TableCell className="text-left">{product.grupo}</TableCell>
                    <TableCell className="text-left">{product.subgrupo}</TableCell>
                    <TableCell
                      className={cn(
                        'text-center',
                        product.revenueChange > 0
                          ? 'text-success'
                          : 'text-destructive',
                      )}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {product.revenueChange > 0 ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {product.revenueChange.toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell
                      className={cn(
                        'text-center',
                        product.volumeChange > 0
                          ? 'text-success'
                          : 'text-destructive',
                      )}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {product.volumeChange > 0 ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {product.volumeChange.toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell className="text-center">R$ {product.lostRevenue.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{product.quantidadeDemandada}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={getStatusBadgeVariant(product.status)}
                        className="rounded-sm"
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(product.lastSale).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-center">R$ {product.avgPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-left">{product.mainClient}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Versão Mobile - Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {paginatedProducts.map((product) => (
              <Card 
                key={product.id} 
                className={cn(
                  "shadow-sm",
                  product.status === 'Crítico' && 'bg-destructive/5'
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.grupo} • {product.subgrupo}</p>
                    </div>
                    <Badge
                      variant={getStatusBadgeVariant(product.status)}
                      className="rounded-sm text-xs ml-2 flex-shrink-0"
                    >
                      {product.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Var. Receita:</span>
                        <span className={cn(
                          "flex items-center gap-1 font-medium",
                          product.revenueChange > 0 ? 'text-success' : 'text-destructive'
                        )}>
                          {product.revenueChange > 0 ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {product.revenueChange.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Var. Volume:</span>
                        <span className={cn(
                          "flex items-center gap-1 font-medium",
                          product.volumeChange > 0 ? 'text-success' : 'text-destructive'
                        )}>
                          {product.volumeChange > 0 ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {product.volumeChange.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Receita Perdida:</span>
                        <span className="font-medium text-destructive">R$ {product.lostRevenue.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Qtd. Demandada:</span>
                        <span className="font-medium">{product.quantidadeDemandada}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Preço Médio:</span>
                        <span className="font-medium">R$ {product.avgPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Última Venda:</span>
                        <span className="font-medium">{new Date(product.lastSale).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Principal Cliente:</span>
                      <span className="font-medium truncate ml-2">{product.mainClient}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Controles de Paginação */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              Mostrando {page * pageSize + 1} a {Math.min((page + 1) * pageSize, filteredData.length)} de {filteredData.length} produtos
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                disabled={page === 0} 
                onClick={() => setPage(page - 1)}
                className="h-8 px-3 text-xs"
              >
                Anterior
              </Button>
              <span className="text-xs flex items-center px-2">
                Página {page + 1} de {totalPages}
              </span>
              <Button 
                size="sm" 
                variant="outline" 
                disabled={page === totalPages - 1} 
                onClick={() => setPage(page + 1)}
                className="h-8 px-3 text-xs"
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductPerformancePage
