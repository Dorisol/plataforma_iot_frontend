import { dispositivos } from "../../mock/DispositivosMockData";
import type { Dispositivo } from "../../types/DispositivoInterface";
import { Info, Fingerprint, Cpu, Share2, Network } from "lucide-react";

interface DetallesProps{
    dispositivo: Dispositivo
}

export function VistaDetalles({dispositivo}: DetallesProps){
    return (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                    <Info className="w-5 h-5 text-green-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">Información del Dispositivo</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Fingerprint className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase">ID Único</span>
                        </div>
                        <p className="text-gray-900  bg-gray-50 p-2 rounded-l">
                            {dispositivo.idDispositivo}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Cpu className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase ">Nombre del Equipo</span>
                        </div>
                        <p className="text-gray-900 font-medium text-lg">
                            {dispositivo.nombre}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Network className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase  ">Protocolo</span>
                        </div>
                        <div className="flex">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                dispositivo.tipo === 'MQTT' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                                {dispositivo.tipo}
                            </span>
                        </div>
                    </div>

                    <div className="col-span-full space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase  ">Tópico de Suscripción</span>
                        </div>
                        <p className="text-sm text-gray-700 font-bold p-2 rounded-lg shadow-inner overflow-x-auto">
                            {dispositivo.tipo === 'MQTT' 
                                ? `v1/${dispositivo.idTenant}/${dispositivo.idDispositivo}/data` 
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        );
}