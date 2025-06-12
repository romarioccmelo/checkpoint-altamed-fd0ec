/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth, UserRole } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'

import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ForgotPassword from './pages/auth/ForgotPassword'
import Register from './pages/auth/Register'
import DashboardPage from './pages/dashboard/Dashboard'
import ProductPerformancePage from './pages/products/ProductPerformance'
import SellerComparisonPage from './pages/sellers/SellerComparison'
import PriceGuidancePage from './pages/pricing/PriceGuidance'
import AdminPanelPage from './pages/admin/AdminPanel'
import DataImportPage from './pages/admin/DataImport'

const queryClient = new QueryClient()

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: UserRole[] }) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Index />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/produtos/desempenho"
            element={<ProductPerformancePage />}
          />
          <Route
            path="/precos/direcionamento"
            element={<PriceGuidancePage />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={['Gerente', 'Administrador']} />
          }
        >
          <Route
            path="/vendedores/comparativo"
            element={<SellerComparisonPage />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/admin/importacao" element={<DataImportPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="altamed-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
