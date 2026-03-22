import { useEffect, useState } from "react";
import { TenantService } from "../services/TenantService";
import type { Tenant } from "../types/TenantInterface";

export function useTodoTenants() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTenants = async () => {
        try{
            setLoading(true);
            const data = await TenantService.getTenants();
            setTenants(data || []);
            setError(null);
        }catch{
            setError("Error al conectar con el servidor");
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    return {
        tenants,
        loading,
        error,
    };

}