import { LoginPage} from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage'; 
import { AuthProvider, useAuth } from './contexts/AuthContext';


function AppContent() {
  
  const { usuario, isLoading, logout} = useAuth();

  if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      );
  }

  //Si no hay usuarios autenticados, mostrar el login
  if (!usuario) {
    return <LoginPage/>;
  }

  //Si hay usuarios autenticados, mostrar el dashboard (admin local)
  return <DashboardPage/>;
}

export default function App(){
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}