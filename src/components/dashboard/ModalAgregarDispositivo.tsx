import { useState } from "react"

interface AgregarDispositivoProps {
    onClose: () => void,
    onAgregarDispositivo: (dispositivo: any) => Promise<void>,
    idTenant: string,
}

export function ModalAgregarDispositivo({onClose, onAgregarDispositivo, idTenant}: AgregarDispositivoProps) {

    //estado vacío para este dispositivo
    const [nuevoDispositivo, setNuevoDispositivo] = useState({
        username: '',
        protocolo: 'MQTT',
        rol: 'ESP_LOCAL',
        imagenesDisponibles: true,
        isActivo: false,
        idTenant: idTenant,
        apiKey: '',
       
    }); 

    const [isCargando, setIsCargando] = useState(false);

    //manejador del evento
    const handleAgregarDispositivo = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCargando(true);
        
        try {
            await onAgregarDispositivo(nuevoDispositivo);
            onClose();
        } catch (error) {
            console.log("Error al agregar dispositivo")
            //mostrar alerta
        } finally {
            setIsCargando(false);
        }
    };


    return (
        <div className="fixed inset-0 z-3  bg-gray-500/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nuevo dispositivo</h3>
                <form onSubmit={handleAgregarDispositivo} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre del dispositivo
                        </label>
                        <input
                            type="text"
                            value={nuevoDispositivo.username}
                            onChange={(e) => setNuevoDispositivo({ ...nuevoDispositivo, username: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Protocolo
                        </label>
                        <select
                            value={nuevoDispositivo.protocolo}
                            onChange={(e) => setNuevoDispositivo({ ...nuevoDispositivo, protocolo: e.target.value as any })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none"
                            required
                        >
                            <option value="MQTT">MQTT</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                        </label>
                        <input
                            type="text"
                            value={nuevoDispositivo.apiKey}
                            onChange={(e) => setNuevoDispositivo({ ...nuevoDispositivo, apiKey: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>


                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo dispositivo
                        </label>
                        <select
                            value={nuevoDispositivo.rol}
                            onChange={(e) => setNuevoDispositivo({ ...nuevoDispositivo,rol: e.target.value as any })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none"
                            required
                        >
                            <option value="ESP_LOCAL">ESP32</option>
                            <option value="RASP_LOCAL">RASPBERRY</option>

                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ¿Contiene imágenes?
                        </label>
                        <select
                            value={nuevoDispositivo.imagenesDisponibles ? "true" : "false"}
                            onChange={(e) => setNuevoDispositivo({ ...nuevoDispositivo, imagenesDisponibles: e.target.value === "false" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none"
                            required
                        >
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>

                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isCargando}
                            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isCargando}
                            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}