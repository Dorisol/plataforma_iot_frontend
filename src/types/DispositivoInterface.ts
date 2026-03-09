export interface Dispositivo {
    idDispositivo: string;
    idTenant: string;
    username: string; 
    protocolo: "MQTT" | "LORA"
    isActivo:  boolean;
    imagenesDisponibles: boolean
} 