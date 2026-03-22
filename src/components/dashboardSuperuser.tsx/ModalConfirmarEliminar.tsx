import { Trash2 } from "lucide-react"

interface ModalConfirmacionProps {
    onClose: () => void;
    onConfirm: () => void;
}

export function ModalConfirmarEliminar({onClose, onConfirm}: ModalConfirmacionProps) {
    return ( 
    <div className="fixed inset-0 z-50 bg-gray-500/75 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¿Eliminar usuario?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
                ¿Estás seguro de que deseas eliminar a este usuario? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => onClose()}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                    Cancelar
                </button>
                <button
                    onClick={() => onConfirm()}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                    Sí, eliminar
                </button>
            </div>
        </div>
    </div>
    )
}