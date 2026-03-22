import { useEffect, useState } from "react";
import { UsuariosService } from "../services/UsuariosServices";
import type { Usuario } from "../types/UsuarioInterface";


export function useTodoUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //trae todos los usuarios
    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const data = await UsuariosService.getTodosUsuarios();
            setUsuarios(data || []);
            setError(null);
        } catch (err) {
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    //crear otro usuario
    const crearUsuario = async (usuario: Usuario) => {
        try {
            const nuevoUsuario = await UsuariosService.crearNuevoUsuario(usuario);
            setUsuarios([...usuarios, nuevoUsuario]);
        } catch (error) {
            console.log("Error al crear usuario:", error);
        }
    };

    return {
        usuarios,
        loading,
        error,
        crearUsuario,
        refresh: fetchUsuarios,
    };

}