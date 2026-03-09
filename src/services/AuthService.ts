
import { api } from "../boot/axios"

//---------------------------------------Type para API RESPONSES---------------------------------------
interface Usuario {
    idUsuario: string;
    idTenant?: string;
    username: string;
    rol: string;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    usuario: Usuario;
};

//--------------------------------------------MANEJO DEL TOKEN ----------------------------------------
export const TokenManager = {
    getToken(): string | null {
        return localStorage.getItem("access_token")
    },
    setToken(token: string): void {
        localStorage.setItem("access_token", token)
    },
    removeToken(): void {
        localStorage.removeItem("access_token")
    },

    // Extrae los datos del usuario que el back mete en el token: {"user": ..., "id": ..., "tenant": ...}
    getUserFromToken(): Usuario | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return {
                idUsuario: payload.idUsuario,
                idTenant: payload.idTenant === "None" ? undefined : payload.idTenant,
                username: payload.usuario,
                rol: payload.rol 
            };
        } catch {
            return null;
        }
    },

    isTokenValido(): boolean{
        const token = this.getToken()
        if(!token){
            return false
        }
        //decodificar la carga del JWT
        try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            const tiempoExpiracion = payload.exp * 1000
            return tiempoExpiracion > Date.now()
        } catch{
            return false;
        }
    }
};

export const AuthService = {
    async login(username: string, password: string): Promise<LoginResponse> {
        //Autenticacion
        try {
            //console.log("AuthService: Intentando POST a", `${API_URL}/auth/login`, { username });
            const response = await api.post<LoginResponse>("/auth/login", { username, password });
            //console.log("AuthService: Respuesta recibida", response.data);
            return response.data;
        } catch (error) {
            console.error("AuthService: Error en la petición", error);
            throw error;
        }
    },
    async logout(): Promise<void> {
        TokenManager.removeToken();
    },

};