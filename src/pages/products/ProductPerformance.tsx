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
import { AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

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

const ProductPerformancePage = () => {
  const criticalProducts = mockData.filter((p) => p.status === 'Crítico')

  return (
    <div className="space-y-6 animate-fade-in-up">
      {criticalProducts.length > 0 && (
        <Card className="border-destructive bg-destructive/10 rounded-lg shadow-md-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="text-destructive">
                Produtos Críticos
              </CardTitle>
              <p className="text-sm text-destructive/80">
                {criticalProducts.length} produto(s) com perda de receita acima
                de 20%.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-destructive/90">
              {criticalProducts.map((p) => (
                <li key={p.id}>
                  {p.name} - Perda de Receita: R$ {p.lostRevenue.toFixed(2)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Relatório de Desempenho de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Var. Receita</TableHead>
                <TableHead>Var. Volume</TableHead>
                <TableHead>Receita Perdida</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Venda</TableHead>
                <TableHead>Preço Médio</TableHead>
                <TableHead>Principal Cliente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((product) => (
                <TableRow
                  key={product.id}
                  className={cn(
                    product.status === 'Crítico' && 'bg-destructive/5',
                  )}
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell
                    className={cn(
                      product.revenueChange > 0
                        ? 'text-success'
                        : 'text-destructive',
                    )}
                  >
                    <div className="flex items-center gap-1">
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
                      product.volumeChange > 0
                        ? 'text-success'
                        : 'text-destructive',
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {product.volumeChange > 0 ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {product.volumeChange.toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell>R$ {product.lostRevenue.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(product.status)}
                      className="rounded-sm"
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(product.lastSale).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>R$ {product.avgPrice.toFixed(2)}</TableCell>
                  <TableCell>{product.mainClient}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductPerformancePage
