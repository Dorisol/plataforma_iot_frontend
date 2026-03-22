import { Activity, LogOut, Building2, User2} from "lucide-react"
import { useState } from "react"
import { VistaProyectos } from "../components/dashboardSuperuser.tsx/VistaProyectos"
import { VistaUsuarios } from "../components/dashboardSuperuser.tsx/VistaUsuarios"
import type { LoginUSuario } from "../types/UsuarioInterface"

interface DashboardSuperuser {
    usuario: LoginUSuario;
    onLogout: () => void;
}

export function DashboardSuperuser({usuario, onLogout}: DashboardSuperuser){

    const [menuSeleccionado, setMenuSeleccionado] = useState<"tenant"|"usuarios">("tenant")

    return(
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm border-b border-gray-200 ">
                <div className="px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="mx-2 text-2xl font-bold text-gray-900">
                                Panel del superusuario
                            </h1>
                            <p className="mx-2 text-sm text-gray-500">
                               Administración global del sistema
                            </p>
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

            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex gap-8 px-6">
                            <button
                            onClick={()=> setMenuSeleccionado("tenant")}
                            className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition ${
                                menuSeleccionado === "tenant"
                                ? 'border-green-600 text-green text-green-600'
                                :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            >
                                <Building2 className="w-4 h-4"/>
                                Proyectos
                            </button>

                            <button
                            onClick={()=>setMenuSeleccionado("usuarios")}
                            className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition ${
                                menuSeleccionado === "usuarios"
                                ? 'border-green-600 text-green text-green-600'
                                :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            >
                                <User2 className="w-4 h-4"/>
                                Usuarios
                            </button>
                        </nav>
                    </div>
                </div>

                { menuSeleccionado  === "tenant" ? (
                    <VistaProyectos/>
                ) : (
                    <VistaUsuarios/>
                ) }

            </div>
        </div>
    )
}