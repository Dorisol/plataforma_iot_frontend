import { dispositivos } from "../mock/DispositivosMockData";
import { usuarios } from "../mock/UsuarioMockData";
import type { Dispositivo } from "../types/DispositivoInterface";
import type { Usuario } from "../types/UsuarioInterface";
import type { Sensor } from "../types/SensorDatosInterface";


export const getDispositivosPorTenant = (idTenant: string): Dispositivo[] => {
    const misdispositivos = dispositivos.filter(dispositivo => dispositivo.idTenant === idTenant);
    return misdispositivos;
}

export const getUsuarioPorTenant = (tenantId: string): Usuario[] => {
    return usuarios.filter(usuario => usuario.idTenant === tenantId);
}

export const generarDatosSensores = (idDispositivo: string): Sensor[] => {
    const datosSensores: Sensor[] = [];
    const now = Date.now();
    const baseTemp = 22;
    const baseHumedad = 50;

    //Cada hora
    for (let i = 0; i < 24; i++) {
        const timestamp = new Date(now - i * 60 * 60 * 1000);   //cada hora
        const temperatura = baseTemp + Math.random() * 5;
        const humedad = baseHumedad + Math.random() * 10;


        datosSensores.push({
            timestamp,
            temperatura: parseFloat(temperatura.toFixed(2)),
            humedad: parseFloat(humedad.toFixed(2)),
        });
    }

    return datosSensores;
};
