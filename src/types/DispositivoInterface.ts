export interface Dispositivo {
    idDispositivo: string;
    idTenant: string;
    nombre: string; 
    tipo: "ESP32" | "RASPBERRY" | "NORDIC";
    status: "ON" | "OFF";
    imagenesDisponibles: boolean
}