import type { Dispositivo } from "../types/DispositivoInterface";

export const dispositivos: Dispositivo[] = [
    {
        idDispositivo: "esp32-001",
        idTenant: "tenant-001",
        nombre: "ESP32_Chetumal",
        tipo: "MQTT",
        status: "ON",
        imagenesDisponibles: false
    },

    {
        idDispositivo: "raspberry-001",
        idTenant: "tenant-001",
        nombre: "RASP_Chetumal",
        tipo: "MQTT",
        status: "ON",
        imagenesDisponibles: true
    },

    {
        idDispositivo: "nordic-001",
        idTenant: "tenant-001",
        nombre: "LORA_Chetumal",
        tipo: "LORA",
        status: "ON",
        imagenesDisponibles: true
    }
]