import { useState } from 'react'
import { LoginPage} from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';


export default function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  //Si no hay usuarios autenticados, mostrar el login
  /*
  if (!user) {
    return <LoginPage/>;
  }*/

  //Si hay usuarios autenticados, mostrar el dashboard
  return <DashboardPage/>;

}
