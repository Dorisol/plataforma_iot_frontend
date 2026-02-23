
export type Roles = "admin";

export interface Usuario {
    id: String;
    idTenant?: String;  //indefinido para superusuario, implementado para admin
    username: String;
    rol: Roles;
}