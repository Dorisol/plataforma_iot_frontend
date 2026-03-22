import { Building2, MapPin, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTodoTenants } from "../../hooks/useTodoTenants";

export function VistaProyectos() {
    //usar hook para traer la información del back
    const { tenants, loading, error } = useTodoTenants();


    //Manejo de estados
    if (loading) return <div className="p-6">Cargando proyectos...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return(
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de proyectos</h2>
                    <p className="text-sm text-gray-500 mt-1">Administra todos los proyectos uwu</p>
                </div>
                {/* por si acaso aqui va el boton */}
            </div>


            <div className="grid grid-cols-3 gap-4">
                {tenants.map((tenant) => (
                    <div
                    key={tenant.idTenant}
                    className={`bg-white rounded-xl border-2 p-6 transition ${
                        tenant.isActivo === true 
                        ? 'border-green-200 hover:border-green-400'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                    tenant.isActivo === true 
                                    ? 'bg-green-200'
                                    : 'bg-gray-200'
                                }`}>
                                    <Building2 className={`w-6 y-6  ${
                                        tenant.isActivo === true 
                                        ? 'text-green-600'
                                        : 'text-gray-400'
                                    }`}/>
                                </div>
                            

                                <div>
                                    <h3 className="font-semibold text-gray-900">{tenant.nombre}</h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                        <MapPin className="w-3 h-3"/>
                                        <span>{tenant.ubicacion}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Dispositivos: </span>
                                <span className="font-semibold text-gray-900"></span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Creado:</span>
                                <span className="font-semibold text-gray-900">
                                    {format(tenant.created_at, 'dd/MM/yyyy', {locale: es})}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Estado:</span>
                                <span className={`flex items-center gap-1 font-medium ${
                                    tenant.isActivo === true 
                                    ? 'text-green-600'
                                    : 'text-gray-400'
                                }`}>
                                    {tenant.isActivo === true 
                                    ? (
                                        <>
                                        <CheckCircle className="w-3 h-3"/>
                                        Activo
                                        </>
                                    )
                                    : (
                                        <>
                                        <XCircle className="w-3 h-3"/>
                                        Inactivo
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* <div className="flex gap-2 pt-4 border-t border-gray-200">
                            <button
                            // onClick={() => handleToggleStatus(tenant.id)}
                            className={`flex-1 px-3 py-2 text-sm rounded-lg transition ${
                            tenant.isActivo === true
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                        >
                            {tenant.isActivo ===  true ? 'Desactivar' : 'Activar'}
                            </button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
     )
}