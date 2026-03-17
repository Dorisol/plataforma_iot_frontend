import {api} from "../boot/axios"

import type { Mediciones } from "../types/MedicionesInterface"

export const MedicionesService = {

    async getMediciones(idDispositivo: string, idTenant: string, rango: string): Promise<Mediciones[]> {
        try {
            //console.log("idDispositivo", idDispositivo)
            //console.log("idTenant", idTenant)
            const mediciones = await api.get<Mediciones[]>(`/mediciones/${idTenant}/${idDispositivo}`, {
                params: {rango}
            })
            //console.log("Mediciones", mediciones.data)
            return mediciones.data

        } catch (error) {
            console.log("Error al obtener mediciones", error);
            throw error;
        }
    }

}