import { useState } from "react";
import { Settings2, Plus, Wifi, WifiOff, PowerOff} from "lucide-react";
import type { Dispositivo } from "../../types/DispositivoInterface";
import { getDispositivosPorTenant } from "../../helpers/helpers";

interface GestionDispositivosProps {
    idTenant: string;
}

export function VistaGestionDispositivos({ idTenant }: GestionDispositivosProps) {
    
    const dispositivosIniciales = getDispositivosPorTenant(idTenant);

    //Definir estado de disposivos
    //inicializar con los dispositivos que tengo de este tenant
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>(dispositivosIniciales);

    //Modal
    const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
    const [nuevoDispositivo, setNuevoDispositivo] = useState({
        nombre: '',
        tipo: 'MQTT' as 'MQTT' | 'LORA',
    });

    //AQUI CONECTAR AL BACK
    const handleAgregarDispositivo = (e: React.FormEvent) => {
        e.preventDefault();
        if(nuevoDispositivo.nombre){
            const dispositivo: Dispositivo = {
                idDispositivo: '12',
                idTenant,
                nombre: nuevoDispositivo.nombre,
                tipo: nuevoDispositivo.tipo,
                status: 'ON',
                imagenesDisponibles: true,
            };
            setDispositivos([...dispositivos, dispositivo]);
            setNuevoDispositivo({
                nombre: '',
                tipo: 'MQTT'})
            setMostrarModalAgregar(false);
        }
    };

    const handleDesactivarDispositivo = (idDispositivo: string) => {
        if (confirm('¿Estás seguro de que deseas desactivar este dispositivo?')){
            const nuevosDispositivos: Dispositivo[] = dispositivos.map((dispositivo) => {
                if (dispositivo.idDispositivo === idDispositivo){
                    return {
                        ...dispositivo,
                        status: 'OFF' as const,
                    };
                }
                return dispositivo;
            });
            setDispositivos(nuevosDispositivos);
        }
    };


    return (
        <div className="bg-white border-gray-200 rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-6">
                    <Settings2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-2xl font-semibold text-gray-900">
                        Gestionar dispositivos
                    </h3>
                </div>

                {/* <button
                    onClick={() => setMostrarModalAgregar(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Agregar dispositivo
                </button> */}
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
                                   <h4 className="font-semibold text-gray-900">{dispositivo.nombre}</h4>
                                   <p className="text-xs text-gray-500">{dispositivo.tipo}</p> 
                                </div>
                            </div>
                            {dispositivo.status === 'ON' ? (
                                <Wifi className="w-5 h-5 text-green-500"/>
                            ) : (
                                <WifiOff className="w-5 h-5 text-gray-400"/>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <span className={`text-xs font-medium ${
                                dispositivo.status === 'ON' ? 'text-green-600' : 'text-gray-500'
                            }`}>
                                {dispositivo.status === 'ON' ? 'En línea' : 'Fuera de línea'}
                            </span>

                            <button
                            onClick={()=>handleDesactivarDispositivo(dispositivo.idDispositivo)}
                            className="text-red-600 hover:text-red-700 transition"
                            >
                                <PowerOff className="w-5 h-5"/>    
                            </button>
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
                <div className="fixed inset-0 z-3 bg-opacity-50 bg-black flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Nuevo dispositivo</h3>
                        <form onSubmit={handleAgregarDispositivo} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre del dispositivo
                                </label>
                                <input
                                    type="text"
                                    value={nuevoDispositivo.nombre}
                                    onChange={(e) => setNuevoDispositivo({...nuevoDispositivo, nombre: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de dispositivo
                                </label>
                                <select 
                                value={nuevoDispositivo.nombre} 
                                onChange={(e) => setNuevoDispositivo({...nuevoDispositivo, tipo:e.target.value as any})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none"
                                required
                                >
                                    <option value="MQTT">MQTT</option>
                                    <option value="LORA">Raspberry</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMostrarModalAgregar(false);
                                        setNuevoDispositivo({nombre: '', tipo: 'MQTT'});
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                                    >
                                        Cancelar
                                    </button>

                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                                >
                                    Agregar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    )
}