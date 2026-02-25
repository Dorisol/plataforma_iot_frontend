import type { Tenant } from "../types/TenantInterface";

export const tenants: Tenant[] = [
  {
    idTenant: 'tenant-001',
    nombre: 'Proyecto Chetumal',
    localizacion: 'Chetumal, Quintana Roo',
    createdAt: new Date('2025-01-15'),
    status: 'activo',
  },

  {
    idTenant: 'tenant-002',
    nombre: 'Proyecto Veracruz',
    localizacion: 'Veracruz',
    createdAt: new Date('2025-01-15'),
    status: 'activo',
  }

];