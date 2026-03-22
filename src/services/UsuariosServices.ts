import { api } from "../boot/axios";
import type { Usuario } from "../types/UsuarioInterface";


export const UsuariosService = {
    async getTodosUsuarios(): Promise<Usuario[]> {
            try {
                const response = await api.get<Usuario[]>("/usuarios/todosUsuarios");
                //console.log("Usuarios:", response.data);
                return response.data;
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                throw error;
            }
    },

    async crearNuevoUsuario(usuario: Usuario): Promise<Usuario> {
        try {
            console.log("Creando usuario:", usuario);
            const response = await api.post<Usuario>("/usuarios/crearUsuario", usuario);
            //console.log("Usuario creado")
            return response.data;   //retornar para que el hook inserte el valor. 
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw error;
        }
    },

};