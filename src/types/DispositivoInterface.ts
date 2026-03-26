export interface Dispositivo {
    idDispositivo: string;
    idTenant: string;
    username: string; 
    protocolo: "MQTT" | "LORA"
    rol: "RASP_LOCAL" | "ESP_LOCAL" | "LORA_LOCAL"
    isActivo:  boolean;
    imagenesDisponibles: boolean
    created_at: Date;
} 