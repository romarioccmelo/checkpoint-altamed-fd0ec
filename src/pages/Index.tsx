import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import { Mail, Lock, LogIn, Eye, EyeOff, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Index() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMockLoading, setIsMockLoading] = useState(false)
  const { login, mockLogin } = useAuth()
  const { toast } = useToast()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      toast({
        title: 'Login bem-sucedido!',
        description: 'Redirecionando para o dashboard...',
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.'
      toast({
        variant: 'destructive',
        title: 'Falha no login',
        description: errorMessage,
      })
      setIsLoading(false)
    }
  }

  const handleMockLogin = async () => {
    setIsMockLoading(true)
    try {
      await mockLogin()
      toast({
        title: 'Login de demonstração bem-sucedido!',
        description: 'Redirecionando para o dashboard...',
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.'
      toast({
        variant: 'destructive',
        title: 'Falha no login de demonstração',
        description: errorMessage,
      })
      setIsMockLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary to-background p-4">
      <Card className="w-full max-w-md shadow-md-3 animate-fade-in rounded-lg">
        <CardHeader className="text-center">
          <img
            src="/static/logo.png"
            alt="Altamed Logo"
            className="h-10 mx-auto mb-4 block dark:hidden"
          />
          <img
            src="/static/logo2.png"
            alt="Altamed Logo (dark)"
            className="h-10 mx-auto mb-4 hidden dark:block"
          />
          <CardTitle className="text-2xl font-bold text-foreground">
            Bem-vindo(a) de volta!
          </CardTitle>
          <CardDescription>Acesse sua conta para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu-email@altamed.com"
                  className="pl-10 input-material"
                  {...form.register('email')}
                  disabled={isLoading || isMockLoading}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  className="pl-10 pr-10 input-material"
                  {...form.register('password')}
                  disabled={isLoading || isMockLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  disabled={isLoading || isMockLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end text-sm">
              <Link
                to="/forgot-password"
                className={cn(
                  'text-primary hover:underline',
                  (isLoading || isMockLoading) &&
                    'pointer-events-none opacity-50',
                )}
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full rounded-sm"
              disabled={isLoading || isMockLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
              {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          {import.meta.env.MODE !== 'production' && (
            <>
              <div className="relative my-4 flex items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-xs uppercase text-muted-foreground">
                  Ou
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              <Button
                variant="secondary"
                className="w-full rounded-sm"
                onClick={handleMockLogin}
                disabled={isLoading || isMockLoading}
              >
                {isMockLoading ? 'Acessando...' : 'Acesso Rápido (Admin)'}
                {!isMockLoading && <Zap className="ml-2 h-4 w-4" />}
              </Button>
            </>
          )}

          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className={cn(
                'text-primary hover:underline font-semibold',
                (isLoading || isMockLoading) &&
                  'pointer-events-none opacity-50',
              )}
            >
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
