import {api} from "../boot/axios"

export const MedicionesService = {

    async getTemperatura24hrs(idDispositivo: string, idTenant: string){
        try {
            console.log("idDispositivo", idDispositivo)
            console.log("idTenant", idTenant)
            const mediciones = await api.get(`/mediciones/temperatura/semana/${idTenant}/${idDispositivo}`)
            console.log("Mediciones", mediciones.data)
            return mediciones.data

        } catch (error) {
            console.log("Error al obtener mediciones", error);
            throw error;
        }
    }

}