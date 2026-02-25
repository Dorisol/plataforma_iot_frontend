import type { Usuario } from "../types/UsuarioInterface";

export const usuarios: Usuario[] = [
    {
        idUsuario: 'user-001',
        username: 'superadmin',
        rol: 'superusuario',
        createdAt: new Date('2024-01-01'),
    },
    {
        idUsuario: 'user-002',
        idTenant: 'tenant-001',
        username: 'admin_veracruz',
        rol: 'admin',
        createdAt: new Date('2024-01-01'),
    },
    {
        idUsuario: 'user-003',
        idTenant: 'tenant-001',
        username: 'admin_chetumal',
        rol: 'admin',
        createdAt: new Date('2024-01-01'),
    },
]