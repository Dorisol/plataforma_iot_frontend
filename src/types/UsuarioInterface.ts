import type { Tenant } from "./TenantInterface";

//export type Rol = "ADMIN_LOCAL" | "SUPER_ADMIN";

//este para login
export interface LoginUSuario {
    idUsuario: string;
    idTenant?: string;  //indefinido para superusuario, implementado para admin
    username: string;
    rol: string;
}

export interface Usuario {
    tenant: Tenant;
    idUsuario: string;
    username: string;
    rol: string;
    isActivo: boolean;
    created_at: Date;
}