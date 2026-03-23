import { useState } from "react"
import { Plus, UserIcon, Shield, Trash2 } from "lucide-react"
import { useUsuarios } from "../../hooks/useUsuarios"
import { useTodoTenants } from "../../hooks/useTodoTenants"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ModalAgregarUsuario } from "./ModalAgregarUsuario"
import { ModalConfirmarEliminar } from "./ModalConfirmarEliminar";

export function VistaUsuarios() {
    //extraer a los usuarios
    const { usuarios, loading, error, crearUsuario, eliminarUsuario } = useUsuarios()

    //traer a los tenants
    const { tenants } = useTodoTenants()

    //estado para el modal de agregar
    const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false)

    //estado para modal de confirmacion a eliminar
    const [confirmacionEliminar, setConfirmacionEliminar] = useState<string | null>(null);

    //Manejo de estados
    if (loading) return <div className="p-6">Cargando usuarios...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return(
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de usuarios</h2>
                    <p className="text-sm text-gray-500 mt-1">Administra usuarios y sus permisos</p>
                </div>

                <button
                onClick={()=> setMostrarModalAgregar(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    <Plus className="w-4 h-4"/>
                    Nuevo usuario
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Proyecto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Creado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {usuarios.map((usuario) => (
                                <tr key={usuario.idUsuario} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <UserIcon className="w-6 h-6 text-green-600"/>
                                            </div>
                                            <div >
                                                <div className="font-medium text-gray-900">{usuario.username}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                            usuario.rol === "SUPER_ADMIN"
                                            ?'bg-green-100 text-green-700'
                                            :'bg-blue-100 text-blue-700'
                                            }`}>
                                                <Shield className="w-3 h-3"/>
                                                {usuario.rol === "SUPER_ADMIN" ? "SUPER USUARIO" : "ADMINISTRADOR LOCAL"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-900">
                                    {usuario.rol === "SUPER_ADMIN" ? "" : usuario.tenant?.nombre}
                                    
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {format(usuario.created_at, 'dd/MM/yyyy', {locale: es})}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        {usuario.rol !== 'SUPER_ADMIN' && (
                                        <button
                                            onClick={() => setConfirmacionEliminar(usuario.idUsuario)}
                                            className="text-red-600 hover:text-red-700 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> 

            {/* Modal para agregar un nuevo usuario */}
            {mostrarModalAgregar && (
                <ModalAgregarUsuario 
                onClose={() => setMostrarModalAgregar(false)} 
                onAgregarUsuario={crearUsuario} 
                tenants={tenants}/>
            )} 

            {confirmacionEliminar && (
                <ModalConfirmarEliminar
                onClose={() => setConfirmacionEliminar(null)}
                onConfirm={() => {
                    if (confirmacionEliminar) {
                        eliminarUsuario(confirmacionEliminar);
                        setConfirmacionEliminar(null); 
                    }
                }}
                />
            )}

        </div>
     )
}