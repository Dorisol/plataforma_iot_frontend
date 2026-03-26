import {api} from "../boot/axios"
import type { Dispositivo } from "../types/DispositivoInterface"

export const DispositivoService = {

    async getTodosDispositivos(): Promise<Dispositivo[]> {
        try {
            const response = await api.get<Dispositivo[]>("/dispositivos/todosDispositivos");
            return response.data;
        } catch (error) {
            console.error("Error al obtener dispositivos")
            throw error;
        }        
    },

    async getDispositivos(idTenant: string){
        try {
            const dispositivos = await api.get(`/dispositivos/${idTenant}`)
            console.log(dispositivos.data)
            return dispositivos.data
        } catch (error) {
            console.log("Error al obtener dispositivos", error)
            throw error;
        }
    },

    async crearDispositivo(dispositivo: Dispositivo){
        console.log("Enviando: ", dispositivo)
        try {
            const response = await api.post("/dispositivos/crearDispositivo", dispositivo)
            console.log("Dispositivo creado correctamente")
            return response.data
        } catch (error) {
            console.log("Error al crear dispositivo", error)
            throw error;
        }
    },
}