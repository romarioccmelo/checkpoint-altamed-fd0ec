import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Edit, 
  Trash2, 
  UserPlus, 
  Package, 
  Building2, 
  Target, 
  Plus,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import { SEGMENTS } from '@/constants/segments'
import { useState } from 'react'

const mockUsers = [
  {
    id: 'U01',
    name: 'João Silva',
    email: 'vendedor@altamed.com',
    role: 'Vendedor',
    status: 'Ativo',
  },
  {
    id: 'U02',
    name: 'Maria Oliveira',
    email: 'gerente@altamed.com',
    role: 'Gerente',
    status: 'Ativo',
  },
  {
    id: 'U03',
    name: 'Carlos Souza',
    email: 'admin@altamed.com',
    role: 'Administrador',
    status: 'Ativo',
  },
  {
    id: 'U04',
    name: 'Pedro Martins',
    email: 'pedro.m@altamed.com',
    role: 'Vendedor',
    status: 'Inativo',
  },
]

const mockProducts = [
  {
    id: 'P001',
    name: 'Amoxicilina 500mg',
    laboratory: 'EMS',
    category: 'Antibiótico',
    price: 25.90,
    cost: 18.50,
    margin: 28.6,
    stock: 150,
    minStock: 50,
    status: 'Ativo',
    description: 'Antibiótico de amplo espectro para tratamento de infecções bacterianas',
  },
  {
    id: 'P002',
    name: 'Paracetamol 750mg',
    laboratory: 'Medley',
    category: 'Analgésico',
    price: 12.50,
    cost: 8.20,
    margin: 34.4,
    stock: 200,
    minStock: 75,
    status: 'Ativo',
    description: 'Analgésico e antitérmico para dores leves a moderadas',
  },
  {
    id: 'P003',
    name: 'Omeprazol 20mg',
    laboratory: 'Eurofarma',
    category: 'Gastroprotetor',
    price: 35.80,
    cost: 22.10,
    margin: 38.3,
    stock: 80,
    minStock: 30,
    status: 'Ativo',
    description: 'Inibidor da bomba de prótons para tratamento de úlceras',
  },
  {
    id: 'P004',
    name: 'Losartana 50mg',
    laboratory: 'Sandoz',
    category: 'Anti-hipertensivo',
    price: 28.90,
    cost: 19.50,
    margin: 32.5,
    stock: 25,
    minStock: 40,
    status: 'Baixo Estoque',
    description: 'Antagonista do receptor de angiotensina II',
  },
  {
    id: 'P005',
    name: 'Metformina 850mg',
    laboratory: 'Merck',
    category: 'Antidiabético',
    price: 22.40,
    cost: 15.80,
    margin: 29.5,
    stock: 0,
    minStock: 60,
    status: 'Sem Estoque',
    description: 'Antidiabético oral para controle da glicemia',
  },
]

const mockClients = [
  {
    id: 'C001',
    name: 'Hospital Central',
    segment: 'hospital de grande porte',
    contact: 'Dr. Roberto Silva',
    email: 'compras@hospitalcentral.com.br',
    phone: '(11) 3456-7890',
    city: 'São Paulo',
    state: 'SP',
    status: 'Ativo',
    lastOrder: '2024-03-15',
    totalOrders: 45,
    totalValue: 125000,
  },
  {
    id: 'C002',
    name: 'Drogaria São Paulo',
    segment: 'farmácia/drogaria',
    contact: 'Ana Costa',
    email: 'gerencia@drogariasaopaulo.com.br',
    phone: '(11) 2345-6789',
    city: 'São Paulo',
    state: 'SP',
    status: 'Ativo',
    lastOrder: '2024-03-18',
    totalOrders: 78,
    totalValue: 89500,
  },
  {
    id: 'C003',
    name: 'Clínica Cardio',
    segment: 'clínica/consultório',
    contact: 'Dr. Carlos Mendes',
    email: 'admin@clinicacardio.com.br',
    phone: '(21) 3456-7890',
    city: 'Rio de Janeiro',
    state: 'RJ',
    status: 'Ativo',
    lastOrder: '2024-03-10',
    totalOrders: 32,
    totalValue: 67800,
  },
  {
    id: 'C004',
    name: 'Laboratório Fleury',
    segment: 'laboratório',
    contact: 'Maria Santos',
    email: 'suprimentos@fleury.com.br',
    phone: '(11) 4567-8901',
    city: 'São Paulo',
    state: 'SP',
    status: 'Ativo',
    lastOrder: '2024-03-12',
    totalOrders: 56,
    totalValue: 156700,
  },
  {
    id: 'C005',
    name: 'Home Care Premium',
    segment: 'home care',
    contact: 'João Oliveira',
    email: 'compras@homecarepremium.com.br',
    phone: '(11) 5678-9012',
    city: 'São Paulo',
    state: 'SP',
    status: 'Inativo',
    lastOrder: '2024-02-28',
    totalOrders: 23,
    totalValue: 45600,
  },
]

const mockGoals = [
  {
    id: 'G001',
    seller: 'Ana Pereira',
    segment: 'farmácia/drogaria',
    monthlyGoal: 100000,
    currentValue: 85000,
    achievement: 85,
    period: '2024-03',
  },
  {
    id: 'G002',
    seller: 'Bruno Costa',
    segment: 'hospital de grande porte',
    monthlyGoal: 110000,
    currentValue: 115000,
    achievement: 104.5,
    period: '2024-03',
  },
  {
    id: 'G003',
    seller: 'Carla Dias',
    segment: 'clínica/consultório',
    monthlyGoal: 90000,
    currentValue: 78000,
    achievement: 86.7,
    period: '2024-03',
  },
  {
    id: 'G004',
    seller: 'Diego Santos',
    segment: 'laboratório',
    monthlyGoal: 120000,
    currentValue: 95000,
    achievement: 79.2,
    period: '2024-03',
  },
  {
    id: 'G005',
    seller: 'Elena Rodrigues',
    segment: 'home care',
    monthlyGoal: 115000,
    currentValue: 125000,
    achievement: 108.7,
    period: '2024-03',
  },
]

const AdminPanelPage = () => {
  const [selectedTab, setSelectedTab] = useState('users')

  return (
    <div className="animate-fade-in-up p-4 md:p-0">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4 md:space-y-6">
        {/* Tabs Navigation - Mobile Optimized */}
        <div className="w-full">
          {/* Mobile: Scroll horizontal */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
              <button
                onClick={() => setSelectedTab('users')}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === 'users'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Usuários
              </button>
              <button
                onClick={() => setSelectedTab('products')}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === 'products'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Produtos
              </button>
              <button
                onClick={() => setSelectedTab('clients')}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === 'clients'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Clientes
              </button>
              <button
                onClick={() => setSelectedTab('settings')}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === 'settings'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Metas
              </button>
            </div>
          </div>

          {/* Desktop: TabsList normal */}
          <div className="hidden md:block">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users" className="text-sm">
                Gestão de Usuários
              </TabsTrigger>
              <TabsTrigger value="products" className="text-sm">
                Gestão de Produtos
              </TabsTrigger>
              <TabsTrigger value="clients" className="text-sm">
                Gestão de Clientes
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-sm">
                Metas e Parâmetros
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Gestão de Usuários */}
        <TabsContent value="users">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 md:pb-6">
              <CardTitle className="text-base md:text-lg">Usuários</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-sm text-sm h-9 md:h-10">
                    <UserPlus className="mr-2 h-4 w-4" /> Adicionar Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-lg mx-4 sm:mx-0">
                  <DialogHeader>
                    <DialogTitle className="text-base md:text-lg">Adicionar Novo Usuário</DialogTitle>
                    <DialogDescription className="text-sm">
                      Preencha os dados para criar um novo acesso.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm">Nome</Label>
                      <Input id="name" className="input-material h-9 md:h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">Email</Label>
                      <Input id="email" type="email" className="input-material h-9 md:h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm">Senha</Label>
                      <Input id="password" type="password" className="input-material h-9 md:h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm">Cargo</Label>
                      <Select>
                        <SelectTrigger className="rounded-sm h-9 md:h-10">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vendedor">Vendedor</SelectItem>
                          <SelectItem value="Gerente">Gerente</SelectItem>
                          <SelectItem value="Administrador">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="rounded-sm h-9 md:h-10 text-sm">
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" className="rounded-sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="rounded-sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3 p-4">
                {mockUsers.map((user) => (
                  <Card key={user.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'} className="rounded-sm text-xs ml-2 flex-shrink-0">
                          {user.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Cargo: <span className="font-medium text-foreground">{user.role}</span></span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-sm h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="destructive" size="sm" className="rounded-sm h-8 w-8 p-0">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestão de Produtos */}
        <TabsContent value="products">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Package className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                Gestão de Produtos
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-sm text-sm h-9 md:h-10">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-lg mx-4 sm:mx-0">
                  <DialogHeader>
                    <DialogTitle className="text-base md:text-lg">Adicionar Novo Produto</DialogTitle>
                    <DialogDescription className="text-sm">
                      Preencha os dados para cadastrar um novo produto.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name" className="text-sm">Nome do Produto</Label>
                        <Input id="product-name" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="laboratory" className="text-sm">Laboratório</Label>
                        <Input id="laboratory" className="rounded-sm h-9 md:h-10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm">Categoria</Label>
                        <Select>
                          <SelectTrigger className="rounded-sm h-9 md:h-10">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Antibiótico">Antibiótico</SelectItem>
                            <SelectItem value="Analgésico">Analgésico</SelectItem>
                            <SelectItem value="Anti-hipertensivo">Anti-hipertensivo</SelectItem>
                            <SelectItem value="Antidiabético">Antidiabético</SelectItem>
                            <SelectItem value="Gastroprotetor">Gastroprotetor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status" className="text-sm">Status</Label>
                        <Select>
                          <SelectTrigger className="rounded-sm h-9 md:h-10">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm">Preço (R$)</Label>
                        <Input id="price" type="number" step="0.01" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cost" className="text-sm">Custo (R$)</Label>
                        <Input id="cost" type="number" step="0.01" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="margin" className="text-sm">Margem (%)</Label>
                        <Input id="margin" type="number" step="0.1" className="rounded-sm h-9 md:h-10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stock" className="text-sm">Estoque Atual</Label>
                        <Input id="stock" type="number" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="min-stock" className="text-sm">Estoque Mínimo</Label>
                        <Input id="min-stock" type="number" className="rounded-sm h-9 md:h-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm">Descrição</Label>
                      <Textarea id="description" className="rounded-sm" rows={3} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="rounded-sm h-9 md:h-10 text-sm">
                      Salvar Produto
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Laboratório</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Margem</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.laboratory}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.margin.toFixed(1)}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{product.stock}</span>
                            {product.stock <= product.minStock && (
                              <Badge 
                                variant={product.stock === 0 ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {product.stock === 0 ? "Sem Estoque" : "Baixo"}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={product.status === 'Ativo' ? 'default' : 'secondary'}
                            className="rounded-sm"
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" className="rounded-sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="rounded-sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-3 p-4">
                {mockProducts.map((product) => (
                  <Card key={product.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">{product.laboratory} • {product.category}</p>
                        </div>
                        <div className="flex flex-col gap-1 ml-2 flex-shrink-0">
                          <Badge 
                            variant={product.status === 'Ativo' ? 'default' : 'secondary'}
                            className="rounded-sm text-xs"
                          >
                            {product.status}
                          </Badge>
                          {product.stock <= product.minStock && (
                            <Badge 
                              variant={product.stock === 0 ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {product.stock === 0 ? "Sem Estoque" : "Baixo"}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Preço:</span>
                            <span className="font-medium">R$ {product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Margem:</span>
                            <span className="font-medium">{product.margin.toFixed(1)}%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Estoque:</span>
                            <span className="font-medium">{product.stock}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Mín. Estoque:</span>
                            <span className="font-medium">{product.minStock}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 rounded-sm text-xs h-8">
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-sm h-8 w-8 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestão de Clientes */}
        <TabsContent value="clients">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Building2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                Gestão de Clientes
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-sm text-sm h-9 md:h-10">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Cliente
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-lg mx-4 sm:mx-0">
                  <DialogHeader>
                    <DialogTitle className="text-base md:text-lg">Adicionar Novo Cliente</DialogTitle>
                    <DialogDescription className="text-sm">
                      Preencha os dados para cadastrar um novo cliente.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-name" className="text-sm">Nome/Razão Social</Label>
                        <Input id="client-name" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="segment" className="text-sm">Segmento</Label>
                        <Select>
                          <SelectTrigger className="rounded-sm h-9 md:h-10">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {SEGMENTS.map((segment) => (
                              <SelectItem key={segment} value={segment}>
                                {segment}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact" className="text-sm">Pessoa de Contato</Label>
                        <Input id="contact" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-email" className="text-sm">Email</Label>
                        <Input id="client-email" type="email" className="rounded-sm h-9 md:h-10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm">Telefone</Label>
                        <Input id="phone" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-status" className="text-sm">Status</Label>
                        <Select>
                          <SelectTrigger className="rounded-sm h-9 md:h-10">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                            <SelectItem value="Prospecto">Prospecto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm">Cidade</Label>
                        <Input id="city" className="rounded-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm">Estado</Label>
                        <Select>
                          <SelectTrigger className="rounded-sm h-9 md:h-10">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="rounded-sm h-9 md:h-10 text-sm">
                      Salvar Cliente
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden xl:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Segmento</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Último Pedido</TableHead>
                      <TableHead>Total Pedidos</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-sm text-xs">
                            {client.segment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {client.contact}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {client.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" />
                            {client.city}, {client.state}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {new Date(client.lastOrder).toLocaleDateString('pt-BR')}
                          </div>
                        </TableCell>
                        <TableCell>{client.totalOrders}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <DollarSign className="h-3 w-3" />
                            {client.totalValue.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={client.status === 'Ativo' ? 'default' : 'secondary'}
                            className="rounded-sm"
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" className="rounded-sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="rounded-sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="xl:hidden space-y-3 p-4">
                {mockClients.map((client) => (
                  <Card key={client.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{client.name}</h3>
                          <Badge variant="outline" className="rounded-sm text-xs mt-1">
                            {client.segment}
                          </Badge>
                        </div>
                        <Badge 
                          variant={client.status === 'Ativo' ? 'default' : 'secondary'}
                          className="rounded-sm text-xs ml-2 flex-shrink-0"
                        >
                          {client.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-xs mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{client.contact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span>{client.city}, {client.state}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Último Pedido:</span>
                            <span className="font-medium">{new Date(client.lastOrder).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total Pedidos:</span>
                            <span className="font-medium">{client.totalOrders}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Valor Total:</span>
                            <span className="font-medium">
                              {client.totalValue.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 rounded-sm text-xs h-8">
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-sm h-8 w-8 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metas e Parâmetros */}
        <TabsContent value="settings">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Target className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                Metas por Vendedor
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-sm text-sm h-9 md:h-10">
                    <Plus className="mr-2 h-4 w-4" /> Definir Meta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] rounded-lg mx-4 sm:mx-0">
                  <DialogHeader>
                    <DialogTitle className="text-base md:text-lg">Definir Nova Meta</DialogTitle>
                    <DialogDescription className="text-sm">
                      Configure a meta mensal para um vendedor.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="seller" className="text-sm">Vendedor</Label>
                      <Select>
                        <SelectTrigger className="rounded-sm h-9 md:h-10">
                          <SelectValue placeholder="Selecione o vendedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ana Pereira">Ana Pereira</SelectItem>
                          <SelectItem value="Bruno Costa">Bruno Costa</SelectItem>
                          <SelectItem value="Carla Dias">Carla Dias</SelectItem>
                          <SelectItem value="Diego Santos">Diego Santos</SelectItem>
                          <SelectItem value="Elena Rodrigues">Elena Rodrigues</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal-segment" className="text-sm">Segmento</Label>
                      <Select>
                        <SelectTrigger className="rounded-sm h-9 md:h-10">
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          {SEGMENTS.map((segment) => (
                            <SelectItem key={segment} value={segment}>
                              {segment}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthly-goal" className="text-sm">Meta Mensal (R$)</Label>
                      <Input id="monthly-goal" type="number" className="rounded-sm h-9 md:h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period" className="text-sm">Período</Label>
                      <Input id="period" type="month" className="rounded-sm h-9 md:h-10" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="rounded-sm h-9 md:h-10 text-sm">
                      Salvar Meta
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendedor</TableHead>
                      <TableHead>Segmento</TableHead>
                      <TableHead>Meta Mensal</TableHead>
                      <TableHead>Valor Atual</TableHead>
                      <TableHead>Atingimento</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockGoals.map((goal) => (
                      <TableRow key={goal.id}>
                        <TableCell className="font-medium">{goal.seller}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-sm text-xs">
                            {goal.segment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {goal.monthlyGoal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>
                          {goal.currentValue.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={goal.achievement >= 100 ? 'default' : goal.achievement >= 80 ? 'secondary' : 'destructive'}
                              className="rounded-sm"
                            >
                              {goal.achievement.toFixed(1)}%
                            </Badge>
                            {goal.achievement >= 100 && (
                              <TrendingUp className="h-4 w-4 text-success" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{goal.period}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" className="rounded-sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" className="rounded-sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-3 p-4">
                {mockGoals.map((goal) => (
                  <Card key={goal.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{goal.seller}</h3>
                          <Badge variant="outline" className="rounded-sm text-xs mt-1">
                            {goal.segment}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <Badge 
                            variant={goal.achievement >= 100 ? 'default' : goal.achievement >= 80 ? 'secondary' : 'destructive'}
                            className="rounded-sm text-xs"
                          >
                            {goal.achievement.toFixed(1)}%
                          </Badge>
                          {goal.achievement >= 100 && (
                            <TrendingUp className="h-3 w-3 text-success" />
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2 text-xs mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Meta Mensal:</span>
                          <span className="font-medium">
                            {goal.monthlyGoal.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Valor Atual:</span>
                          <span className="font-medium">
                            {goal.currentValue.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Período:</span>
                          <span className="font-medium">{goal.period}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 rounded-sm text-xs h-8">
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-sm h-8 w-8 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanelPage
