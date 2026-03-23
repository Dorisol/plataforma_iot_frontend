import { useState, useEffect } from "react";
import { DispositivoService } from "../services/DispositivoService";
import type { Dispositivo } from "../types/DispositivoInterface";

//Usuarios hooks
export function useTodosDispositivos(){
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //todos los dispositivos
    const fetchTodosDispositivos = async () => {
        try {
            setLoading(true);
            const data = await DispositivoService.getTodosDispositivos();
            setDispositivos(data || []);
            setError(null);
        } catch (err) {
            setError("Error al obtener todos los dispositivos");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchTodosDispositivos();
    }, []);


    return {
        dispositivos, 
        loading, 
        error, 
        refetch: fetchTodosDispositivos 
    };
}