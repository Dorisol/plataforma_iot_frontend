import type { Dispositivo } from '../types/DispositivoInterface';
import { Wifi, WifiOff } from "lucide-react"

interface DispositivoCardProps {
    dispositivo: Dispositivo;
    isSeleccionado: boolean;
    onClick: () => void;
}

export function DispositivoCard({ dispositivo, isSeleccionado, onClick }: DispositivoCardProps) {

    return (
        <button
            onClick={onClick}
            className={`w-full p-3 rounded-lg text-left transition ${isSeleccionado
                ? 'bg-indigo-50 border-2 border-indigo-600'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
        >
            <div className="flex justify-between gap-3">
                <h3 className='font-medium text-gray-900 text-sm'>{dispositivo.nombre}</h3>
                {dispositivo.status === 'ON' ? (
                    <Wifi className="w-4 h-4 text-green-500 flex" />
                ) : (
                    <WifiOff className="w-4 h-4 text-gray-400" />
                )}
            </div>

            <p className="text-sm text-gray-500">{dispositivo.tipo}</p>
            <p className="text-sm text-gray-400">{dispositivo.idDispositivo}</p>
        </button>
    )
}
