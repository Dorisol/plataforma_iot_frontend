import { useState } from "react";
import { Leaf, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
    } catch (error) {
      setError("Credenciales incorrectas");
    } finally {
      setIsLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* mostrar error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* boton */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
