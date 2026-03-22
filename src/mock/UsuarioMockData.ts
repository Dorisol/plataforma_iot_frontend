import type { Usuario } from "../types/UsuarioInterface";

export const usuarios: Usuario[] = [
    {
        idUsuario: 'user-001',
        username: 'superadmin',
        rol: 'SUPER_ADMIN',
    },
    {
        idUsuario: 'user-002',
        idTenant: 'tenant-001',
        username: 'admin_veracruz',
        rol: 'ADMIN_LOCAL',
    },
    {
        idUsuario: 'user-003',
        idTenant: 'tenant-001',
        username: 'admin_chetumal',
        rol: 'ADMIN_LOCAL',
    },
]