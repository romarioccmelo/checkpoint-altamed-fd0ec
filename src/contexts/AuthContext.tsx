import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'

export type UserRole = 'Vendedor' | 'Gerente' | 'Administrador'

export interface User {
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, pass: string) => Promise<void>
  logout: () => void
  mockLogin: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: Record<string, { password_hash: string; user: User }> = {
  'vendedor@altamed.com': {
    password_hash: 'vendedor123',
    user: {
      name: 'João Silva',
      email: 'vendedor@altamed.com',
      role: 'Vendedor',
    },
  },
  'gerente@altamed.com': {
    password_hash: 'gerente123',
    user: {
      name: 'Maria Oliveira',
      email: 'gerente@altamed.com',
      role: 'Gerente',
    },
  },
  'admin@altamed.com': {
    password_hash: 'admin123',
    user: {
      name: 'Carlos Souza',
      email: 'admin@altamed.com',
      role: 'Administrador',
    },
  },
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('altamed_user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error)
      localStorage.removeItem('altamed_user')
    }
  }, [])

  const login = async (email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const potentialUser = MOCK_USERS[email]
        if (potentialUser && potentialUser.password_hash === pass) {
          setUser(potentialUser.user)
          localStorage.setItem(
            'altamed_user',
            JSON.stringify(potentialUser.user),
          )
          navigate('/dashboard')
          resolve()
        } else {
          reject(new Error('Credenciais inválidas.'))
        }
      }, 1000)
    })
  }

  const mockLogin = async () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const adminUser = MOCK_USERS['admin@altamed.com']
        if (adminUser) {
          setUser(adminUser.user)
          localStorage.setItem('altamed_user', JSON.stringify(adminUser.user))
          navigate('/dashboard')
          resolve()
        } else {
          reject(new Error('Usuário de demonstração não encontrado.'))
        }
      }, 500)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('altamed_user')
    navigate('/')
  }

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login,
      logout,
      mockLogin,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
