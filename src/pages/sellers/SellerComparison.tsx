import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Award, DollarSign } from 'lucide-react'
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

type SellerData = {
  id: string
  name: string
  avatarUrl: string
  revenue: number
  goal: number
  ticket: number
  performance: { month: string; revenue: number }[]
  topProducts: { name: string; revenue: number }[]
}

const mockSellers: SellerData[] = [
  {
    id: 'V01',
    name: 'Ana Pereira',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=1',
    revenue: 85000,
    goal: 100000,
    ticket: 1250.5,
    performance: [
      { month: 'Jan', revenue: 65000 },
      { month: 'Fev', revenue: 72000 },
      { month: 'Mar', revenue: 85000 },
    ],
    topProducts: [
      { name: 'Produto A', revenue: 25000 },
      { name: 'Produto B', revenue: 20000 },
    ],
  },
  {
    id: 'V02',
    name: 'Bruno Costa',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=male&seed=2',
    revenue: 115000,
    goal: 110000,
    ticket: 1500.0,
    performance: [
      { month: 'Jan', revenue: 95000 },
      { month: 'Fev', revenue: 105000 },
      { month: 'Mar', revenue: 115000 },
    ],
    topProducts: [
      { name: 'Produto C', revenue: 40000 },
      { name: 'Produto D', revenue: 35000 },
    ],
  },
  {
    id: 'V03',
    name: 'Carla Dias',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=3',
    revenue: 78000,
    goal: 90000,
    ticket: 980.75,
    performance: [
      { month: 'Jan', revenue: 70000 },
      { month: 'Fev', revenue: 68000 },
      { month: 'Mar', revenue: 78000 },
    ],
    topProducts: [
      { name: 'Produto A', revenue: 30000 },
      { name: 'Produto E', revenue: 15000 },
    ],
  },
]

const chartConfig = {
  revenue: { label: 'Receita', color: 'hsl(var(--chart-1))' },
}

const SellerComparisonPage = () => {
  const teamRevenue = mockSellers.reduce((acc, s) => acc + s.revenue, 0)
  const teamGoal = mockSellers.reduce((acc, s) => acc + s.goal, 0)
  const topPerformer = mockSellers.reduce((prev, current) =>
    prev.revenue > current.revenue ? prev : current,
  )

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md-1 rounded-lg">
          <CardHeader>
            <CardTitle>Receita Total da Equipe</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            R$ {teamRevenue.toLocaleString('pt-BR')}
          </CardContent>
        </Card>
        <Card className="shadow-md-1 rounded-lg">
          <CardHeader>
            <CardTitle>Meta da Equipe</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            R$ {teamGoal.toLocaleString('pt-BR')}
          </CardContent>
        </Card>
        <Card className="shadow-md-1 rounded-lg">
          <CardHeader>
            <CardTitle>Meta Atingida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((teamRevenue / teamGoal) * 100).toFixed(1)}%
            </div>
            <Progress value={(teamRevenue / teamGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card className="shadow-md-1 rounded-lg">
          <CardHeader>
            <CardTitle>Top Performer</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Award className="h-6 w-6 text-warning" />
            <span className="text-lg font-semibold">{topPerformer.name}</span>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md-1 rounded-lg">
        <CardHeader>
          <CardTitle>Desempenho por Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mockSellers.map((seller) => (
              <AccordionItem
                value={seller.id}
                key={seller.id}
                className="border-b"
              >
                <AccordionTrigger className="hover:no-underline p-4 rounded-sm">
                  <div className="flex items-center gap-4 w-full">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                      <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{seller.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>
                          {seller.revenue.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="w-48 hidden md:block">
                      <p className="text-sm text-muted-foreground">
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Performance por Produto
                      </h4>
                      <div className="space-y-2">
                        {seller.topProducts.map((p) => (
                          <div
                            key={p.name}
                            className="flex justify-between text-sm"
                          >
                            <span>{p.name}</span>
                            <span className="font-medium">
                              {p.revenue.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Evolução do Faturamento
                      </h4>
                      <ChartContainer
                        config={chartConfig}
                        className="h-[150px] w-full"
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
