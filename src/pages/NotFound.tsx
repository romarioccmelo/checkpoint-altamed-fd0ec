/* 404 Page - Displays when a user attempts to access a non-existent route - translate to the language of the user */
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    )
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-foreground">
            Oops! Página não encontrada
          </h2>
          <p className="text-lg text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/">Voltar para o Início</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
