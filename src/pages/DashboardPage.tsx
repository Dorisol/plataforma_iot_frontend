import { Activity, LogOut, Cpu } from "lucide-react";
import { useState } from "react";
import { getDispositivosPorTenant } from "../helpers/helpers";
import type { Dispositivo } from "../types/DispositivoInterface"
import { DispositivoCard } from "../components/dashboard/DispositivoCard"
import { VistaMetricas } from "../components/dashboard/VistaMetricas";
import { VistaImagenes } from "../components/dashboard/VistaImagenes";
import { VistaGestionDispositivos } from "../components/dashboard/VistaGestionDispositivos";
 

export function DashboardPage() {
    const tenant = "tenant-001";
    const nombreTenant = "Proyecto Chetumal";
    const location = "Chetumal";
    const usuario = "Dorisol";
    const rol = "admin"

    const todosDispostivos = getDispositivosPorTenant(tenant)

    //SELECCIONAR DISPOSITIVOS. 
    //Por default, selecciona al primero de la lista
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<Dispositivo | null>(
        todosDispostivos.length > 0 ? todosDispostivos[0] : null
    );




    //MENU
    //Por default, selecciona métricas
    const [opcionMenu, setOpcionMenu] = useState<'metricas' | 'imagenes' | 'detalles'>('metricas');


    return (
        <div className="min-h-screen bg-gray-100">
            {/* header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="mx-2 text-2xl font-bold text-gray-900">
                                {nombreTenant}
                            </h1>
                            <p className="mx-2 text-sm text-gray-500">{location}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{usuario}</p>
                            <p className="text-xs text-green-600">{rol}</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100  hover:bg-green-600 text-gray-700 rounded-2xl transition">
                            <LogOut className="w-4 h-4" />
                            <span>Salir</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-full px-4 py-4">
                <div className="grid grid-cols-4 gap-6">
                    {/* Lista de dispositivos */}
                    <div className="col-span-1">
                        <div className="bg-white border-gray-200 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Cpu className="w-5 h-5 text-green-600" />
                                <h2 className="font-semibold text-gray-900">Dispositivos</h2>
                            </div>

                            {/* Aqui poner las cards de los dispositivos */}
                            {todosDispostivos.length > 0 ? (
                                <div>
                                    <div className="space-y-2">
                                        {todosDispostivos.map((dispositivo) => (
                                            <DispositivoCard
                                                key={dispositivo.idDispositivo}
                                                dispositivo={dispositivo}
                                                isSeleccionado={dispositivoSeleccionado?.idDispositivo === dispositivo.idDispositivo}
                                                onClick={() => setDispositivoSeleccionado(dispositivo)}
                                            />
                                        ))}
                                    </div>

                                    {/* estados */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {todosDispostivos.filter(disp => disp.status === 'ON').length}
                                                    <div className="text-xs text-gray-500">En línea</div>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-400">
                                                    {todosDispostivos.filter(disp => disp.status === 'OFF').length}
                                                    <div className="text-xs text-gray-500">Fuera de línea</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    No hay dispositivos registrados
                                </div>
                            )
                            }

                            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center">
                                <button
                                    onClick={() => setDispositivoSeleccionado(null)}
                                    className="bg-green-600 py-2 px-4 text-white rounded-lg transition hover:bg-green-700"
                                >Gestionar Dispositivos
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* contenido principal 
                    Si voy a gestionar dispositivos, voy a abrir vista de gestion
                    Si voy a ver un dispositivo, muestro el menú
                    */}
                    {dispositivoSeleccionado === null ? (
                        <div className="col-span-3">
                            <VistaGestionDispositivos idTenant={tenant} />
                        </div>
                    ) : (
                        <div className="col-span-3">
                            <div className="bg-white rounded-2xl mb-2">
                                <div className="border-b border-gray-200">
                                    <nav className="flex gap-10 px-6">
                                        <button onClick={() => setOpcionMenu("metricas")} className={`py-4 font-medium text-sm transition ${opcionMenu === "metricas" ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}>Métricas</button>

                                        <button onClick={() => setOpcionMenu("imagenes")} className={`py-4 font-medium text-sm transition ${opcionMenu === "imagenes" ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}>Imagenes</button>

                                        <button onClick={() => setOpcionMenu("detalles")} className={`py-4 font-medium text-sm transition ${opcionMenu === "detalles" ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}>Detalles</button>

                                    </nav>
                                </div>
                            </div>

                            {/* Contenido por menú */}
                            {/* {opcionMenu === "metricas" ? (
                                <VistaMetricas dispositivo={dispositivoSeleccionado} />
                            ): (
                                <VistaImagenes dispositivo={dispositivoSeleccionado} />
                            )
                            } */}

                            {/* Contenido por menu */}
                            {opcionMenu === "detalles" ? (
                                <h1>Estos son los dispositovos</h1>
                            ) : dispositivoSeleccionado ? (
                                opcionMenu === "metricas" ? (
                                    <VistaMetricas dispositivo={dispositivoSeleccionado} />
                                ) : (
                                   <VistaImagenes dispositivo={dispositivoSeleccionado} />
                                )
                            ) : (
                                <div className="bg-white rounded-2xl py-6">
                                    <div className="text-center text-gray-500">
                                        <p>No hay dispositivos</p>
                                        <p className="text-sm">Agrega un dispositivo en la pestaña "Gestionar Dispositivo"</p>
                                    </div>
                                </div>
                            )} 
                        </div>
                    )
                    }

                </div>
            </div>
        </div>
    );
}
