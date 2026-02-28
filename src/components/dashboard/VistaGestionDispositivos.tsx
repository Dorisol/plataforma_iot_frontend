import { useState } from "react";
import { Settings2, Plus } from "lucide-react";

interface GestionDispositivosProps {
    idTenant: string;
}

export function VistaGestionDispositivos({ idTenant }: GestionDispositivosProps) {

    return (
        <div className="bg-white border-gray-200 rounded-2xl p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-6">
                    <Settings2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-2xl font-semibold text-gray-900">
                        Gestionar dispositivos
                    </h3>
                </div>

                <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Agregar dispositivo
                </button>

            </div>

            {/*  */}
        </div>
    )
}