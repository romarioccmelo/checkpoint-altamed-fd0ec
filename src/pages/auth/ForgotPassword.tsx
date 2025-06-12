import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary to-background p-4">
      <Card className="w-full max-w-md shadow-md-3 animate-fade-in rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Esqueceu sua senha?
          </CardTitle>
          <CardDescription>
            Sem problemas. Insira seu e-mail e enviaremos um link para redefinir
            sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu-email@altamed.com"
                  className="pl-10 input-material"
                />
              </div>
            </div>
            <Button type="submit" className="w-full rounded-sm">
              Enviar link de redefinição
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-primary hover:underline flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
