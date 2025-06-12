import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

type PriceData = {
  id: string
  name: string
  lab: string
  category: string
  highestPrice: number
  lowestPrice: number
  avgTicket: number
  variation: number
}

const mockData: PriceData[] = [
  {
    id: 'M001',
    name: 'Dipirona 500mg',
    lab: 'Medley',
    category: 'Analgésicos',
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
    highestPrice: 60.0,
    lowestPrice: 52.5,
    avgTicket: 56.25,
    variation: 14.29,
  },
]

const PriceGuidancePage = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Busca e Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do medicamento..."
              className="pl-10 input-material"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] rounded-sm">
              <SelectValue placeholder="Segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] rounded-sm">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full sm:w-auto rounded-sm">
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Direcionamento de Preços</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Laboratório</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Maior Preço</TableHead>
                <TableHead>Menor Preço</TableHead>
                <TableHead>Ticket Médio</TableHead>
                <TableHead>Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.lab}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>R$ {item.highestPrice.toFixed(2)}</TableCell>
                  <TableCell>R$ {item.lowestPrice.toFixed(2)}</TableCell>
                  <TableCell>R$ {item.avgTicket.toFixed(2)}</TableCell>
                  <TableCell>{item.variation.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PriceGuidancePage
