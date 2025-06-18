import { useState } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { useAuth, UserRole } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  LayoutDashboard,
  BarChart2,
  Users,
  DollarSign,
  Settings,
  Upload,
  LogOut,
  Menu,
  ChevronLeft,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/ThemeToggle'

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
  allowedRoles: UserRole[]
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    allowedRoles: ['Vendedor', 'Gerente', 'Administrador'],
  },
  {
    href: '/produtos/desempenho',
    label: 'Desempenho',
    icon: BarChart2,
    allowedRoles: ['Vendedor', 'Gerente', 'Administrador'],
  },
  {
    href: '/vendedores/comparativo',
    label: 'Comparativo',
    icon: Users,
    allowedRoles: ['Gerente', 'Administrador'],
  },
  {
    href: '/precos/direcionamento',
    label: 'Preços',
    icon: DollarSign,
    allowedRoles: ['Vendedor', 'Gerente', 'Administrador'],
  },
  {
    href: '/admin',
    label: 'Administração',
    icon: Settings,
    allowedRoles: ['Administrador'],
  },
  {
    href: '/admin/importacao',
    label: 'Importação',
    icon: Upload,
    allowedRoles: ['Administrador'],
  },
]

const NavLink = ({
  item,
  isCollapsed,
}: {
  item: NavItem
  isCollapsed: boolean
}) => {
  const location = useLocation()
  const isActive = location.pathname.startsWith(item.href)
  const linkContent = (
    <>
      <item.icon
        className={cn(
          'h-5 w-5 shrink-0',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground group-hover:text-primary',
        )}
      />
      <span
        className={cn(
          'ml-4 text-sm font-medium transition-all duration-200',
          isCollapsed ? 'sr-only' : 'opacity-100',
        )}
      >
        {item.label}
      </span>
    </>
  )

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={item.href}
              className={cn(
                'flex items-center justify-center p-3 rounded-md transition-colors group',
                isActive ? 'bg-secondary' : 'hover:bg-secondary',
              )}
            >
              {linkContent}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  return (
    <Link
      to={item.href}
      className={cn(
        'flex items-center p-3 rounded-md transition-colors group',
        isActive
          ? 'bg-secondary text-primary font-semibold'
          : 'hover:bg-secondary',
      )}
    >
      {linkContent}
    </Link>
  )
}

const Sidebar = ({
  isCollapsed,
  toggleCollapse,
}: {
  isCollapsed: boolean
  toggleCollapse: () => void
}) => {
  const { user, logout } = useAuth()
  const filteredNavItems = navItems.filter(
    (item) => user && item.allowedRoles.includes(user.role),
  )

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-full bg-card border-r transition-all duration-300 ease-in-out z-40',
        isCollapsed ? 'w-[64px]' : 'w-[240px]',
      )}
    >
      <div
        className={cn(
          'flex items-center p-4 border-b h-16',
          isCollapsed ? 'justify-center' : 'justify-between',
        )}
      >
        {!isCollapsed && (
          <Link to="/dashboard">
            <img
              src="/static/logo.png"
              alt="Logo da Altamed"
              className="h-8 block dark:hidden"
            />
            <img
              src="/static/logo2.png"
              alt="Logo da Altamed (dark)"
              className="h-8 hidden dark:block"
            />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="hidden md:flex"
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform',
              isCollapsed && 'rotate-180',
            )}
          />
        </Button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} isCollapsed={isCollapsed} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 border-t">
        <button
          onClick={logout}
          className="flex items-center p-3 rounded-md transition-colors group w-full hover:bg-secondary"
        >
          <LogOut
            className={cn(
              'h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0',
              isCollapsed && 'mx-auto',
            )}
          />
          <span
            className={cn('ml-4 text-sm font-medium', isCollapsed && 'sr-only')}
          >
            Sair
          </span>
        </button>
      </div>
    </aside>
  )
}

const MobileSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const filteredNavItems = navItems.filter(
    (item) => user && item.allowedRoles.includes(user.role),
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[240px] flex flex-col bg-card">
        <div className="p-4 border-b h-16 flex items-center">
          <Link to="/dashboard">
            <img
              src="/static/logo.png"
              alt="Logo da Altamed"
              className="h-8 block dark:hidden"
            />
            <img
              src="/static/logo2.png"
              alt="Logo da Altamed (dark)"
              className="h-8 hidden dark:block"
            />
          </Link>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center p-3 rounded-md transition-colors',
                location.pathname.startsWith(item.href)
                  ? 'bg-secondary text-primary font-semibold'
                  : 'hover:bg-secondary',
              )}
            >
              <item.icon className="h-5 w-5 mr-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t">
          <button
            onClick={logout}
            className="flex items-center p-3 rounded-md transition-colors group w-full hover:bg-secondary"
          >
            <LogOut className="h-5 w-5 mr-4 text-muted-foreground group-hover:text-primary" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const Header = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard de Vendas',
    '/produtos/desempenho': 'Desempenho de Produtos',
    '/vendedores/comparativo': 'Comparativo por Vendedor',
    '/precos/direcionamento': 'Direcionamento de Preços',
    '/admin': 'Painel Administrativo',
    '/admin/importacao': 'Importação de Dados',
  }
  const pageTitle =
    Object.entries(pageTitles).find(([path]) =>
      location.pathname.startsWith(path),
    )?.[1] || 'Checkpoint Altamed'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between shadow-md-1 bg-background/95 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <h1 className="text-xl font-bold text-foreground">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-auto px-2">
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/medium?seed=${user?.email}`}
                    alt={user?.name}
                  />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <div className="flex h-screen bg-secondary/50">
      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
