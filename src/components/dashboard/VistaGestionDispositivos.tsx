import { useState } from "react";
import { Settings2, Wifi, WifiOff, Plus} from "lucide-react";
import type { Dispositivo } from "../../types/DispositivoInterface";
import { ModalAgregarDispositivo } from "../../components/dashboard/ModalAgregarDispositivo";

interface GestionDispositivosProps {
    idTenant: string;
    dispositivos: Dispositivo[];
    crearDispositivo: (dispositivo: Dispositivo) => Promise<void>;
}

export function VistaGestionDispositivos({ idTenant, dispositivos, crearDispositivo}: GestionDispositivosProps) {
    
    //const { dispositivos, loading: loadingDispositivo, crearDispositivo } = useDispositivos(idTenant || "");

    //Definir estado de disposivos
    //inicializar con los dispositivos que tengo de este tenant
    const [thisDispositivos, setThisDispositivos] = useState<Dispositivo[]>(dispositivos);

    //Modal
    const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
   
    //Desactivar dispositivo
    // const handleDesactivarDispositivo = (idDispositivo: string) => {
    //     if (confirm('¿Estás seguro de que deseas desactivar este dispositivo?')){
    //         const nuevosDispositivos: Dispositivo[] = dispositivos.map((dispositivo) => {
    //             if (dispositivo.idDispositivo === idDispositivo){
    //                 return {
    //                     ...dispositivo,
    //                     isActivo: false,
    //                 };
    //             }
    //             return dispositivo;
    //         });
    //         setThisDispositivos(nuevosDispositivos);
    //     }
    // };


    return (
        <div className="bg-white border-gray-200 rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-6">
                    <Settings2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-2xl font-semibold text-gray-900">
                        Gestionar dispositivos
                    </h3>
                </div>

                <button
                    onClick={() => setMostrarModalAgregar(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Agregar dispositivo
                </button> 
            </div>

            <div className="grid grid-cols-3 gap-4 py-4">
                {/* Por cada dispositivo, crear una card */}
                {dispositivos.map((dispositivo) => (
                    <div
                    key={dispositivo.idDispositivo}
                    className="bg-white rounded-xl p-5 border border-gray-200 hover:border-indigo-400 transition"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-600 w-1 h-9 rounded-sm"><span /></div>
                                <div>
                                   <h4 className="font-semibold text-gray-900">{dispositivo.username}</h4>
                                   <p className="text-xs text-gray-500">{dispositivo.protocolo}</p> 
                                </div>
                            </div>
                            {dispositivo.isActivo === true ? (
                                <Wifi className="w-5 h-5 text-green-500"/>
                            ) : (
                                <WifiOff className="w-5 h-5 text-gray-400"/>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <span className={`text-xs font-medium ${
                                dispositivo.isActivo === true ? 'text-green-600' : 'text-gray-500'
                            }`}>
                                {dispositivo.isActivo === true ? 'En línea' : 'Fuera de línea'}
                            </span>

                            {/* <button
                            onClick={()=>handleDesactivarDispositivo(dispositivo.idDispositivo)}
                            className="text-red-600 hover:text-red-700 transition"
                            >
                                <PowerOff className="w-5 h-5"/>    
                            </button> */}
                        </div>
                    </div>
                ))}

                {dispositivos.length === 0 && (
                    <div className="col-span-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
                        <p className="text-gray-500">No hay dispositivos registrados</p>
                        <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar dispositivo" para comenzar</p>
                    </div>
                )}
            </div>

            {/* Modal para agregar dispositivo*/}
            {mostrarModalAgregar && (
                <ModalAgregarDispositivo
                onClose={()=>setMostrarModalAgregar(false)}
                onAgregarDispositivo={crearDispositivo}
                idTenant={idTenant}
                />
            )}


        </div>
    )
}