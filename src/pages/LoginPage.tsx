import { useState } from "react";
import { Leaf} from "lucide-react";
//import { Usuario } from '../types/UserInterface';

/*
interface LoginPageProps {
  onLogin: (usuario: Usuario) => void;
}
  */

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        //autenticar usuario
        const user = au

    }
        */

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-8">
        {/* Titulo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Leaf className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard IoT</h1>
          <p className="text-gray-500">Monitoreo de dispositivos</p>
        </div>

        {/* Formulario */}
        <form className="space-y-10">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Usuario</label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
            </div>
          </div>


          {/* mostrar error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}


          {/* boton */}
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
