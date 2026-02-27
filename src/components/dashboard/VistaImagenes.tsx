import { useState } from "react";
import type { Dispositivo } from "../../types/DispositivoInterface";
import { Ban, Camera, ImageIcon, Calendar, X } from 'lucide-react';
import { getImagenesPorDispositivo } from "../../helpers/helpers";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ImagenRespaldo } from "./ImagenRespaldo";

interface GaleriaImagenesProps {
    dispositivo: Dispositivo;
}

export function VistaImagenes({ dispositivo }: GaleriaImagenesProps) {
    const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

    const imagenes = getImagenesPorDispositivo(dispositivo.idDispositivo, dispositivo.idTenant)

    if (dispositivo.imagenesDisponibles === false) {
        return (
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ban className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2">
                        Imagenes no disponibles
                    </h3>
                    <p className="text-sm">
                        Este dispositivo no contiene imágenes
                    </p>
                </div>
            </div>
        );
    }

    if (dispositivo.imagenesDisponibles === true && imagenes.length === 0) {
        return (
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2">
                        Sin imágenes
                    </h3>
                    <p className="text-sm">
                        Este dispositivo no ha capturado imagenes aún
                    </p>
                </div>
            </div>
        );
    };


    return (
        <div>
            <div className="bg-white border-gray-200 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                    <h3 className="text-2xl font-semibold text-gray-900">
                        Imagenes capturadas ({imagenes.length})
                    </h3>
                </div>


                {/* imagen */}
                <div className="grid grid-cols-3 gap-4">
                    {imagenes.map((imagen) => (
                        <div
                            key={imagen.idImagen}
                            className="group relative cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:border-green-400 transition"
                            onClick={() => setImagenSeleccionada(imagen.url)}
                        >
                            <div className="aspect-video relative overflow-hidden bg-gray-200">
                                <ImagenRespaldo
                                    src={imagen.url}
                                    alt={imagen.idImagen}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />    
                            </div>
                            <div className="p-3 bg-white">
                                <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                                    {imagen.idImagen}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    <span>
                                        {format(imagen.capturedAt, "d 'de' MMMM, HH:mm", { locale: es })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* modal para ver la imagen completa */}
            {imagenSeleccionada && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                    onClick={() => setImagenSeleccionada(null)}
                >
                    <button
                        onClick={() => setImagenSeleccionada(null)}
                        className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <ImagenRespaldo
                        src={imagenSeleccionada}
                        alt="Vista completa"
                        className="max-w-full max-h-full object-contain rounded-lg"
                    />
                </div>
            )}
        </div>
    )


}