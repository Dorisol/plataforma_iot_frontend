export interface Tenant {
    idTenant: string;
    nombre: string;
    localizacion: string;
    createdAt: Date;
    status: 'activo' | 'inactivo';
}