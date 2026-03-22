import type { Tenant } from "../types/TenantInterface";

export const tenants: Tenant[] = [
  {
    idTenant: 'tenant-001',
    nombre: 'Proyecto Chetumal',
    ubicacion: 'Chetumal, Quintana Roo',
    created_at: new Date('2025-01-15'),
    isActivo: true,
  },

  {
    idTenant: 'tenant-002',
    nombre: 'Proyecto Veracruz',
    ubicacion: 'Veracruz',
    created_at: new Date('2025-01-15'),
    isActivo: true
  }

];