import type { Tenant } from "../../types/TenantInterface"
import { useState } from "react"

interface ModalProps {
  onClose: () => void;
  onAgregarUsuario: (usuario: any) => Promise<void>;
  tenants: Tenant[];
}

export function ModalAgregarUsuario({onClose, onAgregarUsuario, tenants}: ModalProps){
  //Estado local para el formulario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    password: '',
    rol: 'ADMIN_LOCAL',
    idTenant: '',
    isActivo: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  //Manejador del envió de formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onAgregarUsuario(nuevoUsuario);
      onClose();
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      //mostrar una alerta
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-500/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Nuevo Usuario</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de usuario</label>
            <input
              type="text"
              value={nuevoUsuario.username}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={nuevoUsuario.password}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
            <select
              value={nuevoUsuario.rol}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value, idTenant: e.target.value === 'SUPER_ADMIN' ? '' : nuevoUsuario.idTenant })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="ADMIN_LOCAL">Administrador Local</option>
              <option value="SUPER_ADMIN">Superusuario</option>
            </select>
          </div>

          {nuevoUsuario.rol === 'ADMIN_LOCAL' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto (Tenant)</label>
              <select
                value={nuevoUsuario.idTenant}
                onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, idTenant: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              >
                <option value="">Seleccionar proyecto</option>
                {tenants.map((tenant) => (
                  <option key={tenant.idTenant} value={tenant.idTenant}>
                    {tenant.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Creando...' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}