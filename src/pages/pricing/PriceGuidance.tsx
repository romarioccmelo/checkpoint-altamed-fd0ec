import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, X, Eye, TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react'
import { SEGMENTS } from '@/constants/segments'

type PriceData = {
  id: string
  name: string
  lab: string
  category: string
  segmento: string
  cliente: string
  cidade: string
  estado: string
  highestPrice: number
  lowestPrice: number
  avgTicket: number
  variation: number
}

type VolumeSegment = {
  level: 'Alto' | 'Médio' | 'Baixo'
  averagePrice: number
  units: number
  segments: string[]
}

type ProductAnalysis = {
  id: string
  name: string
  volumeAnalysis: VolumeSegment[]
  metrics: {
    highestPrice: number
    lowestPrice: number
    avgTicket: number
    avgMargin: number
  }
  totalVolume: number
  previousVolume: number
  volumeChange: number
}

const mockData: PriceData[] = [
  {
    id: 'M001',
    name: 'Dipirona 500mg',
    lab: 'Medley',
    category: 'Analgésicos',
    segmento: 'farmácia/drogaria',
    cliente: 'Drogaria São Paulo',
    cidade: 'São Paulo',
    estado: 'SP',
    highestPrice: 15.5,
    lowestPrice: 12.0,
    avgTicket: 13.75,
    variation: 29.17,
  },
  {
    id: 'M002',
    name: 'Paracetamol 750mg',
    lab: 'EMS',
    category: 'Analgésicos',
    segmento: 'farmácia/drogaria',
    cliente: 'Farmácia Pague Menos',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    highestPrice: 10.0,
    lowestPrice: 8.5,
    avgTicket: 9.25,
    variation: 17.65,
  },
  {
    id: 'M003',
    name: 'Amoxicilina 500mg',
    lab: 'Neo Química',
    category: 'Antibióticos',
    segmento: 'hospital de grande porte',
    cliente: 'Hospital Central',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    highestPrice: 35.0,
    lowestPrice: 28.9,
    avgTicket: 31.95,
    variation: 21.11,
  },
  {
    id: 'M004',
    name: 'Losartana 50mg',
    lab: 'Aché',
    category: 'Anti-hipertensivos',
    segmento: 'clínica/consultório',
    cliente: 'Clínica Cardio',
    cidade: 'Salvador',
    estado: 'BA',
    highestPrice: 45.8,
    lowestPrice: 40.0,
    avgTicket: 42.9,
    variation: 14.5,
  },
  {
    id: 'M005',
    name: 'Sinvastatina 20mg',
    lab: 'Eurofarma',
    category: 'Hipolipemiantes',
    segmento: 'hospital pequeno e médio',
    cliente: 'Hospital Regional',
    cidade: 'Fortaleza',
    estado: 'CE',
    highestPrice: 60.0,
    lowestPrice: 52.5,
    avgTicket: 56.25,
    variation: 14.29,
  },
  {
    id: 'M006',
    name: 'Nexium 40mg',
    lab: 'AstraZeneca',
    category: 'Antiácidos',
    segmento: 'clínica gastro',
    cliente: 'Clínica Gastro Porto Alegre',
    cidade: 'Porto Alegre',
    estado: 'RS',
    highestPrice: 95.0,
    lowestPrice: 88.5,
    avgTicket: 91.75,
    variation: 7.34,
  },
  {
    id: 'M007',
    name: 'Crestor 20mg',
    lab: 'AstraZeneca',
    category: 'Hipolipemiantes',
    segmento: 'laboratório',
    cliente: 'Laboratório Fleury',
    cidade: 'Curitiba',
    estado: 'PR',
    highestPrice: 120.0,
    lowestPrice: 105.0,
    avgTicket: 112.5,
    variation: 14.29,
  },
  {
    id: 'M008',
    name: 'Januvia 100mg',
    lab: 'MSD',
    category: 'Antidiabéticos',
    segmento: 'clínica de nefrologia',
    cliente: 'Centro de Nefrologia',
    cidade: 'Recife',
    estado: 'PE',
    highestPrice: 180.0,
    lowestPrice: 165.0,
    avgTicket: 172.5,
    variation: 9.09,
  },
  {
    id: 'M009',
    name: 'Ibuprofeno 400mg',
    lab: 'Medley',
    category: 'Anti-inflamatórios',
    segmento: 'clínica de fisioterapia',
    cliente: 'Fisio Clínica',
    cidade: 'Brasília',
    estado: 'DF',
    highestPrice: 18.0,
    lowestPrice: 14.5,
    avgTicket: 16.25,
    variation: 24.14,
  },
  {
    id: 'M010',
    name: 'Omeprazol 20mg',
    lab: 'EMS',
    category: 'Antiácidos',
    segmento: 'distribuidora',
    cliente: 'Distribuidora Medicinal',
    cidade: 'Goiânia',
    estado: 'GO',
    highestPrice: 22.0,
    lowestPrice: 18.0,
    avgTicket: 20.0,
    variation: 22.22,
  },
  {
    id: 'M011',
    name: 'Atorvastatina 20mg',
    lab: 'Pfizer',
    category: 'Hipolipemiantes',
    segmento: 'home care',
    cliente: 'Care Plus Home',
    cidade: 'Manaus',
    estado: 'AM',
    highestPrice: 85.0,
    lowestPrice: 78.0,
    avgTicket: 81.5,
    variation: 8.97,
  },
  {
    id: 'M012',
    name: 'Metformina 850mg',
    lab: 'Neo Química',
    category: 'Antidiabéticos',
    segmento: 'unidade de ensino',
    cliente: 'Hospital Universitário',
    cidade: 'Belém',
    estado: 'PA',
    highestPrice: 28.0,
    lowestPrice: 22.0,
    avgTicket: 25.0,
    variation: 27.27,
  },
  {
    id: 'M013',
    name: 'Captopril 25mg',
    lab: 'Medley',
    category: 'Anti-hipertensivos',
    segmento: 'clinica de oftalmologia',
    cliente: 'Clínica Oftalmológica',
    cidade: 'Vitória',
    estado: 'ES',
    highestPrice: 16.0,
    lowestPrice: 12.5,
    avgTicket: 14.25,
    variation: 28.0,
  },
  {
    id: 'M014',
    name: 'Atenolol 50mg',
    lab: 'EMS',
    category: 'Beta-bloqueadores',
    segmento: 'clínica odontológica',
    cliente: 'OdontoClínica',
    cidade: 'Maceió',
    estado: 'AL',
    highestPrice: 20.0,
    lowestPrice: 16.0,
    avgTicket: 18.0,
    variation: 25.0,
  },
  {
    id: 'M015',
    name: 'Symbicort 160/4.5',
    lab: 'AstraZeneca',
    category: 'Broncodilatadores',
    segmento: 'clínica de estética',
    cliente: 'Clínica Estética Bella',
    cidade: 'Campo Grande',
    estado: 'MS',
    highestPrice: 220.0,
    lowestPrice: 195.0,
    avgTicket: 207.5,
    variation: 12.82,
  },
  {
    id: 'M016',
    name: 'Loratadina 10mg',
    lab: 'Medley',
    category: 'Anti-histamínicos',
    segmento: 'farmácia/drogaria',
    cliente: 'Drogaria Raia',
    cidade: 'Santos',
    estado: 'SP',
    highestPrice: 12.0,
    lowestPrice: 9.5,
    avgTicket: 10.75,
    variation: 26.32,
  },
  {
    id: 'M017',
    name: 'Cetirizina 10mg',
    lab: 'EMS',
    category: 'Anti-histamínicos',
    segmento: 'clínica veterinária',
    cliente: 'VetCare Clínica',
    cidade: 'Campinas',
    estado: 'SP',
    highestPrice: 14.5,
    lowestPrice: 11.0,
    avgTicket: 12.75,
    variation: 31.82,
  },
  {
    id: 'M018',
    name: 'Insulina NPH',
    lab: 'Novo Nordisk',
    category: 'Antidiabéticos',
    segmento: 'hospital de grande porte',
    cliente: 'Hospital Sírio-Libanês',
    cidade: 'São Paulo',
    estado: 'SP',
    highestPrice: 45.0,
    lowestPrice: 40.0,
    avgTicket: 42.5,
    variation: 12.5,
  },
  {
    id: 'M019',
    name: 'Fluoxetina 20mg',
    lab: 'Medley',
    category: 'Antidepressivos',
    segmento: 'clínica/consultório',
    cliente: 'Centro Psiquiátrico',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    highestPrice: 25.0,
    lowestPrice: 20.0,
    avgTicket: 22.5,
    variation: 25.0,
  },
  {
    id: 'M020',
    name: 'Sertralina 50mg',
    lab: 'EMS',
    category: 'Antidepressivos',
    segmento: 'home care',
    cliente: 'Home Health Services',
    cidade: 'Brasília',
    estado: 'DF',
    highestPrice: 35.0,
    lowestPrice: 28.0,
    avgTicket: 31.5,
    variation: 25.0,
  },
]

// Dados mock para análises detalhadas
const mockAnalysisData: ProductAnalysis[] = [
  {
    id: 'M001',
    name: 'Dipirona 500mg',
    volumeAnalysis: [
      {
        level: 'Alto',
        averagePrice: 14.2,
        units: 15000,
        segments: ['farmácia/drogaria', 'distribuidora']
      },
      {
        level: 'Médio',
        averagePrice: 13.1,
        units: 8500,
        segments: ['hospital pequeno e médio', 'clínica/consultório']
      },
      {
        level: 'Baixo',
        averagePrice: 12.8,
        units: 3200,
        segments: ['unidade de ensino']
      }
    ],
    metrics: {
      highestPrice: 15.5,
      lowestPrice: 12.0,
      avgTicket: 13.75,
      avgMargin: 23.4
    },
    totalVolume: 26700,
    previousVolume: 24100,
    volumeChange: 10.8
  },
  {
    id: 'M002',
    name: 'Paracetamol 750mg',
    volumeAnalysis: [
      {
        level: 'Alto',
        averagePrice: 9.8,
        units: 22000,
        segments: ['farmácia/drogaria', 'distribuidora']
      },
      {
        level: 'Médio',
        averagePrice: 9.0,
        units: 12000,
        segments: ['hospital de grande porte', 'clínica/consultório']
      },
      {
        level: 'Baixo',
        averagePrice: 8.2,
        units: 5500,
        segments: ['home care', 'clínica de fisioterapia']
      }
    ],
    metrics: {
      highestPrice: 10.0,
      lowestPrice: 8.5,
      avgTicket: 9.25,
      avgMargin: 18.7
    },
    totalVolume: 39500,
    previousVolume: 36800,
    volumeChange: 7.3
  },
  {
    id: 'M003',
    name: 'Amoxicilina 500mg',
    volumeAnalysis: [
      {
        level: 'Alto',
        averagePrice: 33.5,
        units: 8500,
        segments: ['hospital de grande porte', 'laboratório']
      },
      {
        level: 'Médio',
        averagePrice: 31.2,
        units: 5200,
        segments: ['hospital pequeno e médio', 'clínica/consultório']
      },
      {
        level: 'Baixo',
        averagePrice: 29.8,
        units: 2800,
        segments: ['farmácia/drogaria']
      }
    ],
    metrics: {
      highestPrice: 35.0,
      lowestPrice: 28.9,
      avgTicket: 31.95,
      avgMargin: 15.2
    },
    totalVolume: 16500,
    previousVolume: 18200,
    volumeChange: -9.3
  },
  {
    id: 'M004',
    name: 'Losartana 50mg',
    volumeAnalysis: [
      {
        level: 'Alto',
        averagePrice: 44.5,
        units: 6200,
        segments: ['clínica/consultório', 'home care']
      },
      {
        level: 'Médio',
        averagePrice: 42.1,
        units: 4800,
        segments: ['hospital de grande porte', 'farmácia/drogaria']
      },
      {
        level: 'Baixo',
        averagePrice: 40.8,
        units: 2100,
        segments: ['distribuidora']
      }
    ],
    metrics: {
      highestPrice: 45.8,
      lowestPrice: 40.0,
      avgTicket: 42.9,
      avgMargin: 21.6
    },
    totalVolume: 13100,
    previousVolume: 12400,
    volumeChange: 5.6
  },
  {
    id: 'M005',
    name: 'Sinvastatina 20mg',
    volumeAnalysis: [
      {
        level: 'Alto',
        averagePrice: 58.2,
        units: 4500,
        segments: ['hospital pequeno e médio', 'clínica/consultório']
      },
      {
        level: 'Médio',
        averagePrice: 55.8,
        units: 3200,
        segments: ['farmácia/drogaria', 'home care']
      },
      {
        level: 'Baixo',
        averagePrice: 53.1,
        units: 1800,
        segments: ['laboratório']
      }
    ],
    metrics: {
      highestPrice: 60.0,
      lowestPrice: 52.5,
      avgTicket: 56.25,
      avgMargin: 28.3
    },
    totalVolume: 9500,
    previousVolume: 9100,
    volumeChange: 4.4
  }
]

// Função para gerar análise padrão para produtos sem dados específicos
const generateDefaultAnalysis = (product: PriceData): ProductAnalysis => {
  return {
    id: product.id,
    name: product.name,
    volumeAnalysis: [
      {
        level: 'Alto',
        averagePrice: product.highestPrice * 0.95,
        units: Math.floor(Math.random() * 10000) + 15000,
        segments: [product.segmento, 'distribuidora']
      },
      {
        level: 'Médio',
        averagePrice: product.avgTicket,
        units: Math.floor(Math.random() * 8000) + 5000,
        segments: ['hospital pequeno e médio', 'clínica/consultório']
      },
      {
        level: 'Baixo',
        averagePrice: product.lowestPrice * 1.05,
        units: Math.floor(Math.random() * 5000) + 2000,
        segments: ['unidade de ensino']
      }
    ],
    metrics: {
      highestPrice: product.highestPrice,
      lowestPrice: product.lowestPrice,
      avgTicket: product.avgTicket,
      avgMargin: Math.random() * 20 + 15 // 15-35%
    },
    totalVolume: Math.floor(Math.random() * 30000) + 20000,
    previousVolume: Math.floor(Math.random() * 25000) + 18000,
    volumeChange: (Math.random() - 0.5) * 20 // -10% a +10%
  }
}

// Função para obter análise do produto
const getProductAnalysis = (productId: string): ProductAnalysis | null => {
  // Primeiro tenta encontrar nos dados específicos
  const specificAnalysis = mockAnalysisData.find(item => item.id === productId)
  if (specificAnalysis) return specificAnalysis
  
  // Se não encontrar, gera dados padrão
  const product = mockData.find(item => item.id === productId)
  if (product) return generateDefaultAnalysis(product)
  
  return null
}

// Função para filtrar dados
function filterData(
  data: PriceData[],
  filters: {
    searchTerm?: string
    segmento?: string
  }
): PriceData[] {
  return data.filter((item) => {
    // Filtro por termo de busca (nome do medicamento)
    if (filters.searchTerm && 
        !item.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false
    }
    
    // Filtro por segmento
    if (filters.segmento && filters.segmento !== 'todos' && 
        item.segmento !== filters.segmento) {
      return false
    }
    
    return true
  })
}

// Hook de paginação
function usePagination(data: PriceData[], pageSize: number) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(data.length / pageSize)
  const paginated = data.slice(page * pageSize, (page + 1) * pageSize)

  return {
    page,
    setPage,
    totalPages,
    paginated,
  }
}

const PriceGuidancePage = () => {
  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [segmento, setSegmento] = useState<string>('')
  
  // Estado para análise detalhada
  const [selectedProduct, setSelectedProduct] = useState<ProductAnalysis | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Aplicar filtros
  const filteredData = filterData(mockData, {
    searchTerm,
    segmento,
  })

  // Paginação
  const pageSize = 10
  const { page, setPage, totalPages, paginated } = usePagination(filteredData, pageSize)

  // Função para limpar filtros
  const clearFilters = () => {
    setSearchTerm('')
    setSegmento('')
    setPage(0) // Reset page when clearing filters
  }

  // Reset page when filters change
  const handleFilterChange = (filterSetter: (value: string) => void, value: string) => {
    filterSetter(value)
    setPage(0)
  }

  // Função para mostrar análise detalhada
  const showProductDetails = (productId: string) => {
    const analysis = getProductAnalysis(productId)
    if (analysis) {
      setSelectedProduct(analysis)
      setShowAnalysis(true)
      // Scroll para a seção de análise
      setTimeout(() => {
        const element = document.getElementById('product-analysis')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  // Função para fechar análise
  const closeAnalysis = () => {
    setShowAnalysis(false)
    setSelectedProduct(null)
  }

  // Verificar se há filtros ativos (excluindo a busca)
  const hasActiveFilters = segmento

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
        <CardContent className="space-y-4 pt-0">
          {/* Campo de busca sempre visível */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por medicamento..."
              className="pl-10 rounded-sm h-9 md:h-10"
              value={searchTerm}
              onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
            />
          </div>
          
          {/* Filtros expansíveis */}
          {showFilters && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <Select value={segmento} onValueChange={(value) => handleFilterChange(setSegmento, value)}>
                  <SelectTrigger className="w-full rounded-sm h-9 md:h-10">
                    <SelectValue placeholder="Segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {SEGMENTS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <Button className="rounded-sm h-9 md:h-10 text-sm">Aplicar</Button>
                {hasActiveFilters && (
                  <Button variant="outline" className="rounded-sm h-9 md:h-10 text-sm" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" /> Limpar
                  </Button>
                )}
              </div>
            </>
          )}
          
          {/* Indicador de resultados */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              {filteredData.length} de {mockData.length} medicamentos
            </span>
            {(searchTerm || hasActiveFilters) && (
              <span className="text-xs text-muted-foreground">
                {searchTerm ? 'Busca ativa' : ''} {searchTerm && hasActiveFilters ? ' • ' : ''} {hasActiveFilters ? 'Filtros aplicados' : ''}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Preços */}
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Direcionamento de Preços</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Versão Desktop da Tabela */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicamento</TableHead>
                  <TableHead>Laboratório</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Maior Preço</TableHead>
                  <TableHead>Menor Preço</TableHead>
                  <TableHead>Ticket Médio</TableHead>
                  <TableHead>Variação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length > 0 ? (
                  paginated.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.lab}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>R$ {item.highestPrice.toFixed(2)}</TableCell>
                      <TableCell>R$ {item.lowestPrice.toFixed(2)}</TableCell>
                      <TableCell>R$ {item.avgTicket.toFixed(2)}</TableCell>
                      <TableCell className={item.variation >= 0 ? 'text-success' : 'text-destructive'}>
                        {item.variation.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-sm"
                          onClick={() => showProductDetails(item.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum medicamento encontrado com os filtros aplicados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Versão Mobile - Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {paginated.length > 0 ? (
              paginated.map((item) => (
                <Card key={item.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.lab} • {item.category}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`rounded-sm text-xs ml-2 flex-shrink-0 ${
                          item.variation >= 0 ? 'text-success border-success' : 'text-destructive border-destructive'
                        }`}
                      >
                        {item.variation.toFixed(1)}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Maior Preço:</span>
                          <span className="font-medium">R$ {item.highestPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Menor Preço:</span>
                          <span className="font-medium">R$ {item.lowestPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Ticket Médio:</span>
                          <span className="font-medium">R$ {item.avgTicket.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Variação:</span>
                          <span className={`font-medium ${item.variation >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {item.variation.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full rounded-sm text-xs h-8"
                      onClick={() => showProductDetails(item.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-sm">Nenhum medicamento encontrado</div>
                <div className="text-xs mt-1">Tente ajustar os filtros de busca</div>
              </div>
            )}
          </div>
          
          {/* Controles de Paginação */}
          {filteredData.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
              <div className="text-sm text-muted-foreground text-center sm:text-left">
                Mostrando {page * pageSize + 1} a {Math.min((page + 1) * pageSize, filteredData.length)} de {filteredData.length} medicamentos
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={page === 0} 
                  onClick={() => setPage(page - 1)}
                  className="rounded-sm h-8 px-3 text-xs"
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
                  className="rounded-sm h-8 px-3 text-xs"
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seção de Análise Detalhada */}
      {showAnalysis && selectedProduct && (
        <Card id="product-analysis" className="shadow-md-1 rounded-lg">
          <CardHeader className="pb-3 md:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="truncate">Análise: {selectedProduct.name}</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={closeAnalysis} className="self-end sm:self-auto">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Métricas Principais */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm md:text-base flex items-center gap-2">
                  <PieChart className="h-4 w-4 flex-shrink-0" />
                  Métricas Principais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground">Maior Preço</div>
                    <div className="text-sm md:text-lg font-bold text-foreground">
                      R$ {selectedProduct.metrics.highestPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground">Menor Preço</div>
                    <div className="text-sm md:text-lg font-bold text-foreground">
                      R$ {selectedProduct.metrics.lowestPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground">Ticket Médio</div>
                    <div className="text-sm md:text-lg font-bold text-foreground">
                      R$ {selectedProduct.metrics.avgTicket.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground">Margem Média</div>
                    <div className="text-sm md:text-lg font-bold text-foreground">
                      {selectedProduct.metrics.avgMargin.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Volume Total e Tendência */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm md:text-base">Volume Total e Tendência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-2">Volume Total Atual</div>
                    <div className="text-lg md:text-2xl font-bold text-foreground">
                      {selectedProduct.totalVolume.toLocaleString()} unidades
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-2">Variação vs. Período Anterior</div>
                    <div className={`text-lg md:text-2xl font-bold flex items-center justify-center gap-2 ${
                      selectedProduct.volumeChange > 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {selectedProduct.volumeChange > 0 ? (
                        <TrendingUp className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                      ) : (
                        <TrendingDown className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                      )}
                      {Math.abs(selectedProduct.volumeChange).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedProduct.previousVolume.toLocaleString()} → {selectedProduct.totalVolume.toLocaleString()} unidades
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Análise por Volume */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm md:text-base">Análise por Segmento de Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {selectedProduct.volumeAnalysis.map((segment) => (
                    <div key={segment.level} className="border rounded-lg p-3 md:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={segment.level === 'Alto' ? 'default' : segment.level === 'Médio' ? 'secondary' : 'outline'}
                            className="rounded-sm text-xs"
                          >
                            Volume {segment.level}
                          </Badge>
                          <span className="text-xs md:text-sm text-muted-foreground">
                            {segment.units.toLocaleString()} unidades
                          </span>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="font-semibold text-sm md:text-base">R$ {segment.averagePrice.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">Preço médio</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {segment.segments.map((seg) => (
                          <Badge key={seg} variant="outline" className="text-xs rounded-sm">
                            {seg}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PriceGuidancePage
