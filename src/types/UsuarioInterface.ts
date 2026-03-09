//export type Rol = "ADMIN_LOCAL" | "SUPER_ADMIN";

export interface Usuario {
    idUsuario: string;
    idTenant?: string;  //indefinido para superusuario, implementado para admin
    username: string;
    rol: string;
}