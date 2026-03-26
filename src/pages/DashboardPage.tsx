import { Activity, LogOut, Cpu, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Dispositivo } from "../types/DispositivoInterface"
import { DispositivoCard } from "../components/dashboard/DispositivoCard"
import { VistaMetricas } from "../components/dashboard/VistaMetricas";
import { VistaImagenes } from "../components/dashboard/VistaImagenes";
import { VistaDetalles } from "../components/dashboard/VistaDetalles";
import { VistaGestionDispositivos } from "../components/dashboard/VistaGestionDispositivos";
import type { LoginUSuario } from "../types/UsuarioInterface"; 
import { useDispositivos } from "../hooks/useDispositivos";
import { useTenant } from "../hooks/useTenant";

interface DashboardProps {
    usuario: LoginUSuario;
    onLogout: () => void; 
}

export function DashboardPage({usuario, onLogout}: DashboardProps ){
    //console.log("Este es el usuario:", usuario)
    const { dispositivos, loading: loadingDispositivos, crearDispositivo } = useDispositivos(usuario.idTenant || "");
    const { tenant, loading: loadingTenant } = useTenant(usuario.idTenant);
    const [ dispositivoSeleccionado, setDispositivoSeleccionado ] = useState<Dispositivo|null>(null);
    const [ mostrarGestion, setMostrarGestion ] = useState(false);
    
    //MENU
    //Por default, selecciona métricas
    const [opcionMenu, setOpcionMenu] = useState<'metricas' | 'imagenes' | 'detalles'>('metricas');

    //seleccionar el primer dispositivo cuando dispositivo carga
    useEffect(() => {
        if(dispositivos.length > 0 && !dispositivoSeleccionado){
            setDispositivoSeleccionado(dispositivos[0])
        } 
    }, [dispositivos, dispositivoSeleccionado])

    

    //Mostrar un loading
    if (loadingTenant || loadingDispositivos) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                <span className="ml-2 text-gray-600">Cargando dashboard...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* header */}
            <header className="bg-white shadow-sm border-b border-gray-200 ">
                <div className="px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="mx-2 text-2xl font-bold text-gray-900">
                                {tenant?.nombre || "Cargando..."}
                            </h1>
                            <p className="mx-2 text-sm text-gray-500">{tenant?.ubicacion}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                        
                            <p className="text-sm font-medium text-gray-900">{usuario.username}</p>
                            <p className="text-xs text-green-600">{usuario.rol}</p>
                        </div>
                        <button 
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100  hover:bg-green-600 text-gray-700 rounded-2xl transition">
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
                        <div className="bg-white border-gray-200 rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Cpu className="w-5 h-5 text-green-600" />
                                <h2 className="font-semibold text-gray-900">Dispositivos</h2>
                            </div>

                            {/* Aqui poner las cards de los dispositivos */}
                            {dispositivos.length > 0 ? (
                                <div>
                                    <div className="space-y-2">
                                        {dispositivos.map((dispositivo) => (
                                            <DispositivoCard
                                                key={dispositivo.idDispositivo}
                                                dispositivo={dispositivo}
                                                isSeleccionado={!mostrarGestion && dispositivoSeleccionado?.idDispositivo === dispositivo.idDispositivo}
                                                onClick={() => {
                                                    setDispositivoSeleccionado(dispositivo);
                                                    setMostrarGestion(false);
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* estados */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {dispositivos.filter(disp => disp.isActivo === true).length}
                                                    <div className="text-xs text-gray-500">En línea</div>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-400">
                                                    {dispositivos.filter(disp => disp.isActivo === false).length}
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
                                    onClick={() => setMostrarGestion(true)}
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
                    {mostrarGestion || dispositivoSeleccionado === null ? (
                        <div className="col-span-3">
                            <VistaGestionDispositivos idTenant={usuario.idTenant || ""} dispositivos={dispositivos} crearDispositivo={crearDispositivo}/>
                        </div>
                    ) : (
                        <div className="col-span-3">
                            <div className="bg-white rounded-2xl mb-2 shadow-md">
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
                                <VistaDetalles dispositivo={dispositivoSeleccionado}/>
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
