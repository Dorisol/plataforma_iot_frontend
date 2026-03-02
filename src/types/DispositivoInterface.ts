export interface Dispositivo {
    idDispositivo: string;
    idTenant: string;
    nombre: string; 
    tipo: "MQTT" | "LORA";
    status: "ON" | "OFF";
    imagenesDisponibles: boolean
} 