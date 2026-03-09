import {api} from "../boot/axios"

export const DispositivoService = {

    async getDispositivos(idTenant: string){
        try {
            const dispositivos = await api.get(`/dispositivos/${idTenant}`)
            console.log(dispositivos.data)
            return dispositivos.data
        } catch (error) {
            console.log("Error al obtener dispositivos", error)
        }
    }
}