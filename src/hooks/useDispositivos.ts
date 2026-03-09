import { useState, useEffect } from "react";
import { DispositivoService } from "../services/DispositivoService";
import type { Dispositivo } from "../types/DispositivoInterface";

//Usuarios hooks
export function useDispositivos(idTenant: string){
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDispositivos = async () => {
        try {
            setLoading(true);
            const data = await DispositivoService.getDispositivos(idTenant);
            //validar que data exista
            setDispositivos(data || []);
            setError(null);
        } catch (err) {
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idTenant) {
            fetchDispositivos();
        }
    }, [idTenant]);

    return {
        dispositivos, 
        loading, 
        error, 
        refetch: fetchDispositivos 
    };
}