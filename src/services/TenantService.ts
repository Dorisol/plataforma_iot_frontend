import { api } from "../boot/axios";
import type { Tenant } from "../types/TenantInterface";

export const TenantService = {

    async getTenants(): Promise<Tenant[]> {
        try {
            const response = await api.get<Tenant[]>("/tenants/todosTenants");
            return response.data;
        } catch (error) {
            console.error("Error fetching tenants:", error);
            throw error;
        }
    },

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