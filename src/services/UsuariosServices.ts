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
            const response = await api.post<Usuario>("/usuarios/crearUsuario", usuario);
            return response.data;   //retornar para que el hook inserte el valor. 
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw error;
        }
    },

    async eliminarUsuario(idUsuario: string): Promise<void> {
        try {
            await api.delete(`/usuarios/eliminarUsuario/${idUsuario}`);
            console.log("Usuario eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw error;
        }
    }


};