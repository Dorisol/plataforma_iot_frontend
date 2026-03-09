import { useState, useEffect } from "react";
import { TenantService } from "../services/TenantService";
import type { Tenant } from "../types/TenantInterface";

export function useTenant(idTenant: string | undefined) {
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTenant = async () => {
            if (!idTenant) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await TenantService.getTenantById(idTenant);
                setTenant(data);
                setError(null);
            } catch (err) {
                setError("Error al cargar la información del tenant");
            } finally {
                setLoading(false);
            }
        };

        fetchTenant();
    }, [idTenant]);

    return { 
        tenant, 
        loading, 
        error 
    };
}
