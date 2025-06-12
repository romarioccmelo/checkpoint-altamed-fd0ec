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
import { Edit, Trash2, UserPlus } from 'lucide-react'

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

const AdminPanelPage = () => {
  return (
    <div className="animate-fade-in-up">
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Gestão de Usuários</TabsTrigger>
          <TabsTrigger value="products">Gestão de Produtos</TabsTrigger>
          <TabsTrigger value="clients">Gestão de Clientes</TabsTrigger>
          <TabsTrigger value="settings">Metas e Parâmetros</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Usuários</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-sm">
                    <UserPlus className="mr-2 h-4 w-4" /> Adicionar Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                    <DialogDescription>
                      Preencha os dados para criar um novo acesso.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome
                      </Label>
                      <Input id="name" className="col-span-3 input-material" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="col-span-3 input-material"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Senha
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="col-span-3 input-material"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Cargo
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3 rounded-sm">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vendedor">Vendedor</SelectItem>
                          <SelectItem value="Gerente">Gerente</SelectItem>
                          <SelectItem value="Administrador">
                            Administrador
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="rounded-sm">
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
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
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="rounded-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader>
              <CardTitle>Gestão de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Funcionalidade em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="clients">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader>
              <CardTitle>Gestão de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Funcionalidade em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card className="shadow-md-1 rounded-lg">
            <CardHeader>
              <CardTitle>Metas e Parâmetros</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Funcionalidade em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanelPage
