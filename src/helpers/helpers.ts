import { dispositivos } from "../mock/DispositivosMockData";
import { usuarios } from "../mock/UsuarioMockData";
import type { Dispositivo } from "../types/DispositivoInterface";
import type { Usuario } from "../types/UsuarioInterface";


export const getDispositivosPorTenant = (idTenant: string): Dispositivo[] => {
    const misdispositivos = dispositivos.filter(dispositivo => dispositivo.idTenant === idTenant);
    return misdispositivos;
}

export const getUsuarioPorTenant = (tenantId: string): Usuario[] => {
    return usuarios.filter(usuario => usuario.idTenant === tenantId);
}


