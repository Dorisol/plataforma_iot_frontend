export type Rol = "admin" | "superusuario";

export interface Usuario {
    idUsuario: string;
    idTenant?: string;  //indefinido para superusuario, implementado para admin
    username: string;
    rol: Rol;
    createdAt: Date;
}