import { api } from "../boot/axios";
import type { Tenant } from "../types/TenantInterface";

export const TenantService = {
    async getTenantById(idTenant: string): Promise<Tenant> {
        try {
            const response = await api.get<Tenant>(`/tenants/${idTenant}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching tenant info:", error);
            throw error;
        }
    }
};