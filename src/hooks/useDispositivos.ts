import { useState, useEffect } from "react";
import { DispositivoService } from "../services/DispositivoService";
import type { Dispositivo } from "../types/DispositivoInterface";

//Usuarios hooks
export function useDispositivos(idTenant: string){
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //dispositivos por tenant
    const fetchDispositivos = async () => {
        try {
            setLoading(true);
            const data = await DispositivoService.getDispositivos(idTenant);
            //validar que data exista
            setDispositivos(data || []);
            setError(null);
        } catch (err) {
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idTenant) {
            fetchDispositivos();
        }
    }, [idTenant]);



    const crearDispositivo = async (dispositivo: Dispositivo) => {
        try {
            const nuevoDispositivo = await DispositivoService.crearDispositivo(dispositivo);
            setDispositivos([...dispositivos, nuevoDispositivo]);
        } catch (error) {
            console.log("Error al crear dispositivo:", error);
        }
    }


    //Efecto para escuchar los cambios en tiempo real con websocket
    // useEffect(() => {
    //     if (!idTenant)  return;

    //     const ws = new WebSocket(`ws://localhost:8000/ws/dashboard`);

    //     ws.onopen = () => {
    //         console.log("Conectando al websocket (estado del dispositivo)")
    //     }

    //     ws.onmessage = (event) => {
    //         const mensaje = JSON.parse(event.data);
            
    //         if(mensaje.tipo === "cambio_estado"){
    //             //actualizar la lista buscando el dispositivo modificado
    //             setDispositivos((dispositivosPrevios) =>
    //             dispositivosPrevios.map((disp) => 
    //                 disp.idDispositivo === mensaje.idDispositivo
    //                 ? {...disp, estado: mensaje.estado}
    //                 : disp
    //                 )
    //             );
    //         }
    //     };

    //     ws.onerror = (error) => {
    //         console.error("Error en WebSocket:", error);
    //     };

    //     ws.onclose = () => {
    //         console.log("WebSocket desconectado");
    //     };

    //     return () => {
    //         ws.close();
    //     };
    // },  [idTenant]);

    return {
        dispositivos, 
        loading, 
        error, 
        crearDispositivo,
        refetch: fetchDispositivos 
    };
}