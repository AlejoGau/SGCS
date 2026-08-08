import React, { useState } from 'react';
import { 
  AdminUser, ADMIN_MODULES_LIST 
} from '../../../mocks/admin';
import { 
  Save, Trash2, LogOut, Mail, ShieldAlert, Key, Plus, Minus, AlertOctagon
} from 'lucide-react';

interface UserFormProps {
  user: AdminUser;
  onSave: (updatedUser: AdminUser) => void;
  onDelete: (userId: string) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSave, onDelete }) => {
  const [formData, setFormData] = useState<AdminUser>({ ...user });
  const [password, setPassword] = useState('••••••••');
  
  // Tab states
  const [activeBottomTab, setActiveBottomTab] = useState<'modulos' | 'rangos'>('modulos');
  
  // Module selection states
  const [selectedModuleInList, setSelectedModuleInList] = useState<string>('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleToggleModule = (moduleName: string) => {
    setFormData(prev => {
      const allowed = prev.allowedModules.includes(moduleName)
        ? prev.allowedModules.filter(m => m !== moduleName)
        : [...prev.allowedModules, moduleName];
      return { ...prev, allowedModules: allowed };
    });
  };

  const handleAddAllModules = () => {
    setFormData(prev => ({ ...prev, allowedModules: [...ADMIN_MODULES_LIST] }));
  };

  const handleRemoveAllModules = () => {
    setFormData(prev => ({ ...prev, allowedModules: [] }));
  };

  return (
    <form onSubmit={handleSave} className="glass-panel border-zinc-800 rounded-xl p-6 h-[calc(100vh-170px)] flex flex-col overflow-hidden">
      
      {/* Sub-toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900/30 border border-zinc-850 rounded-xl select-none text-xs shrink-0 mb-4">
        <div className="flex items-center gap-1.5">
          <button 
            type="submit"
            className="btn-primary px-3 py-1.5 text-xs font-bold gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar</span>
          </button>
          
          <button 
            type="button" 
            onClick={() => onDelete(formData.id)}
            className="btn-danger px-3 py-1.5 text-xs font-bold gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Eliminar</span>
          </button>
          
          <button 
            type="button"
            onClick={() => alert('Cerrar sesión de este usuario de forma remota.')}
            className="btn-secondary px-3 py-1.5 text-xs font-semibold gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar sesión</span>
          </button>

          <button 
            type="button"
            onClick={() => alert('Datos de credenciales enviados al correo del usuario.')}
            className="btn-secondary px-3 py-1.5 text-xs font-semibold gap-1.5 hidden md:flex"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Enviar datos al mail</span>
          </button>
        </div>

        <button 
          type="button"
          onClick={() => alert(`Permisos de auditoría asignados a: ${formData.username}`)}
          className="btn-secondary px-3 py-1.5 text-xs font-semibold gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Ver permisos</span>
        </button>
      </div>

      {/* Main Form Fields scrollable */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4 min-h-0 mb-4 text-xs">
        
        {/* Core fields cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-zinc-950/20 p-3 rounded-lg border border-zinc-850/60">
          
          {/* User code/username */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Usuario:</label>
            <input
              type="email"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 font-medium"
              required
            />
          </div>

          {/* Password textfield with Cambiar Clave button */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Clave:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  setPassword('sg-' + Math.floor(Math.random() * 89999 + 10000));
                  alert('Clave temporal generada de forma segura.');
                }}
                className="btn-secondary px-3 py-1.5 font-semibold text-xs whitespace-nowrap"
              >
                Cambiar Clave
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Last name */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Apellido:</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Type combobox */}
          <div className="md:col-span-4 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Tipo:</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 font-medium"
            >
              <option value="Central">Central</option>
              <option value="Dealer">Dealer</option>
              <option value="Usuario final">Usuario final</option>
            </select>
          </div>

          {/* Province */}
          <div className="md:col-span-4 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Provincia-Estado:</label>
            <select
              value={formData.province}
              onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 font-medium"
            >
              <option value="">Seleccione provincia...</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Mendoza">Mendoza</option>
              <option value="Tucumán">Tucumán</option>
              <option value="Chaco">Chaco</option>
              <option value="Salta">Salta</option>
            </select>
          </div>

          {/* Language combo */}
          <div className="md:col-span-4 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Idioma:</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 font-medium"
            >
              <option value="Español (Argentina)">Español (Argentina)</option>
              <option value="English">English</option>
              <option value="Português">Português</option>
            </select>
          </div>

          {/* Client select dropdown */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Organización (central):</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                className="flex-1 bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const newOrg = prompt('Nombre de la organización central:');
                  if (newOrg) setFormData(prev => ({ ...prev, client: newOrg }));
                }}
                className="btn-secondary px-3 py-1.5 font-semibold text-xs whitespace-nowrap"
              >
                Seleccionar organización
              </button>
            </div>
          </div>

          {/* Controla Tp */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Controla Tp:</label>
            <select
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none"
              defaultValue="No"
            >
              <option value="No">No</option>
              <option value="Si">Si</option>
            </select>
          </div>

          {/* Status combo */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-zinc-500 font-bold uppercase tracking-wider block">Estado:</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500 font-medium"
            >
              <option value="Habilitado">Habilitado</option>
              <option value="Bloqueado">Bloqueado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>

          {/* Select profile fieldset */}
          <div className="md:col-span-12 border border-zinc-850 bg-zinc-950/20 p-3 rounded-lg flex flex-wrap items-center justify-between gap-4 mt-2">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">Perfil asignado</span>
              <p className="text-xs font-bold text-white mt-0.5">{formData.profile}</p>
            </div>
            
            <button
              type="button"
              onClick={() => {
                const profile = prompt('Ingrese perfil para el usuario (e.g. Administrador, Operador, Supervisor):');
                if (profile) setFormData(prev => ({ ...prev, profile }));
              }}
              className="btn-secondary px-3.5 py-1.5 font-bold text-xs"
            >
              Seleccione un perfil
            </button>
          </div>

        </div>

        {/* Bottom tab panel: Módulos & Rangos */}
        <div className="space-y-3">
          
          <div className="flex border-b border-zinc-850 bg-zinc-950/30 p-0.5 rounded-lg w-fit shrink-0">
            <button
              type="button"
              onClick={() => setActiveBottomTab('modulos')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeBottomTab === 'modulos' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Módulos
            </button>
            <button
              type="button"
              onClick={() => setActiveBottomTab('rangos')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeBottomTab === 'rangos' ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Rangos
            </button>
          </div>

          {activeBottomTab === 'modulos' ? (
            <div className="space-y-3 border border-zinc-850 p-4 rounded-xl bg-zinc-900/10">
              
              {/* Modules tools */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedModuleInList}
                    onChange={(e) => setSelectedModuleInList(e.target.value)}
                    className="bg-zinc-950 border border-zinc-850 px-2 py-1.5 rounded text-white focus:outline-none"
                  >
                    <option value="">Seleccione módulo para añadir...</option>
                    {ADMIN_MODULES_LIST.filter(m => !formData.allowedModules.includes(m)).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (selectedModuleInList) {
                        handleToggleModule(selectedModuleInList);
                        setSelectedModuleInList('');
                      }
                    }}
                    disabled={!selectedModuleInList}
                    className="btn-secondary px-3 py-1.5 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar módulo</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={handleAddAllModules}
                    className="btn-secondary px-2.5 py-1.5"
                  >
                    Añadir todos
                  </button>
                  <button 
                    type="button"
                    onClick={handleRemoveAllModules}
                    className="btn-danger-outline px-2.5 py-1.5"
                  >
                    Quitar todos
                  </button>
                </div>
              </div>

              {/* Modules list with yellow keys */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {formData.allowedModules.map(mod => (
                  <div 
                    key={mod}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-orange-500/20 bg-orange-500/5 text-orange-400 font-bold select-none"
                  >
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-orange-500" />
                      <span>{mod}</span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleToggleModule(mod)}
                      className="text-orange-400 hover:text-red-400 transition-colors p-0.5 rounded"
                      title="Quitar módulo"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {formData.allowedModules.length === 0 && (
                  <div className="col-span-full text-center p-6 text-zinc-500 border border-dashed border-zinc-850 rounded-xl bg-zinc-950/20">
                    No hay módulos asignados a este usuario.
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="border border-dashed border-zinc-850 p-6 rounded-xl flex flex-col justify-center items-center text-zinc-500 bg-zinc-950/20">
              <AlertOctagon className="w-8 h-8 text-zinc-700 mb-1.5" />
              <h5 className="font-bold text-zinc-400 uppercase tracking-wider">Gestión de Rangos Horarios</h5>
              <p className="text-[10px] text-zinc-500 mt-0.5">Rangos de acceso en desarrollo. Próximamente disponible.</p>
            </div>
          )}

        </div>

      </div>

    </form>
  );
};
