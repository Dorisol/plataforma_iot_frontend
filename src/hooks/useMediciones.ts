import { useState, useEffect } from "react";
import { MedicionesService } from "../services/MedicionesService";
import type { Mediciones } from "../types/MedicionesInterface";

export function useMediciones(idDispositivo: string, idTenant: string) {
    const [mediciones, setMediciones] = useState<Mediciones[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMediciones = async () => {
        try {
            setLoading(true);
            const data = await MedicionesService.getTemperatura24hrs(idDispositivo, idTenant);
            setMediciones(data || []);
            setError(null);
        } catch (error) {
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idDispositivo && idTenant) {
            fetchMediciones();
        }
    }, [idDispositivo, idTenant]);

    return {
        mediciones,
        loading,
        error,
        refetch: fetchMediciones
    };
}
