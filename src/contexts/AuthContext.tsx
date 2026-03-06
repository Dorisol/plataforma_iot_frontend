import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { AuthService, TokenManager } from "../services/AuthService";

interface Usuario {
    idUsuario: string;
    idTenant?: string;
    username: string;
    rol: string;
}

interface AuthContextInterface {
    usuario: Usuario | null;
    isLoading: boolean;
    login: (usuario: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (context == undefined) {
        throw new Error("useAuth debe ser usando dentro de un AuthProvider")
    }
    return context
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initializeAuth = async () => {
            if (TokenManager.isTokenValido()) {
                try {
                    const usuarioData = TokenManager.getUserFromToken()
                    setUsuario(usuarioData)
                } catch (error) {
                    console.log("Error al verificar sesion", error)
                }
            }
            setIsLoading(false);
        }
        initializeAuth();
    }, []);


    const login = async (username: string, password: string) => {
        try {
            const data = await AuthService.login(username, password);
            TokenManager.setToken(data.access_token);
            const user = TokenManager.getUserFromToken();
            console.log("AuthContext: Usuario decodificado del token:", user);
            setUsuario(user);
        } catch (error) {
             console.error("AuthContext: El login falló", error);
            throw error
        }
    };

    const logout = async() => {
        try {
            console.log("Sesión cerrada correctamente")
            TokenManager.removeToken();
            setUsuario(null);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return(
        <AuthContext.Provider value={{ usuario, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}