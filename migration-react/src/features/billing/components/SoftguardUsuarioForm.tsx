import React, { useState, useEffect } from 'react';
import { SoftguardUser } from '../../../mocks/accounts';
import { Save, RefreshCw, Key } from 'lucide-react';

interface SoftguardUsuarioFormProps {
  user: SoftguardUser | null;
  existingUsers: SoftguardUser[];
  onSave: (savedUser: SoftguardUser) => void;
  onCancel: () => void;
}

export const SoftguardUsuarioForm: React.FC<SoftguardUsuarioFormProps> = ({
  user,
  existingUsers,
  onSave,
  onCancel
}) => {
  const [code, setCode] = useState<number>(101);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [observation, setObservation] = useState('');
  const [type, setType] = useState<number>(2);
  const [extendedId, setExtendedId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setCode(user.usu_icodigo);
      setName(user.usu_cnombre);
      setPassword(user.usu_cclave);
      setObservation(user.usu_mobservacion);
      setType(user.usu_ntipo);
      setExtendedId(user.usu_cidextendido);
    } else {
      const maxCode = existingUsers.length > 0 
        ? Math.max(...existingUsers.map(u => u.usu_icodigo)) 
        : 100;
      setCode(maxCode + 1);
      setName('');
      setPassword(Math.random().toString(36).substring(2, 8));
      setObservation('');
      setType(2);
      setExtendedId('');
    }
    setErrors({});
  }, [user, existingUsers]);

  const generatePassword = () => {
    setPassword(Math.random().toString(36).substring(2, 8));
  };

  const handleValidate = () => {
    const newErrors: Record<string, string> = {};

    if (!code || code <= 0) {
      newErrors.code = 'Código requerido.';
    } else {
      const exists = existingUsers.some(u => u.usu_icodigo === code && (!user || u.id !== user.id));
      if (exists) {
        newErrors.code = 'Código duplicado.';
      }
    }

    if (!name.trim()) {
      newErrors.name = 'Nombre requerido.';
    }

    if (!password.trim()) {
      newErrors.password = 'Clave requerida.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    const savedUser: SoftguardUser = {
      id: user ? user.id : 'u_new_' + Math.random().toString(36).substr(2, 9),
      usu_icodigo: code,
      usu_cnombre: name,
      usu_cclave: password,
      usu_mobservacion: observation,
      usu_ntipo: type,
      usu_cidextendido: extendedId || `EXT-ID-${code}`
    };

    onSave(savedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel border-zinc-800 rounded-xl p-5 flex flex-col h-[395px] justify-between animate-fade-in select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-850">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            {user ? 'Ficha de Usuario' : 'Nuevo Usuario'}
          </h4>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary px-3 py-1.5 text-xs"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary px-3 py-1.5 text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-3 text-xs flex-1 overflow-y-auto pt-3.5 pr-1">
        
        {/* Code & User Type */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Código</label>
            <input
              type="number"
              min="1"
              value={code}
              onChange={(e) => setCode(parseInt(e.target.value) || 0)}
              className={`w-full bg-zinc-900 border ${
                errors.code ? 'border-red-500/60 focus:border-red-500' : 'border-zinc-850 focus:border-orange-500'
              } px-2.5 py-1.5 rounded-lg text-white font-mono focus:outline-none`}
              required
            />
            {errors.code && <p className="text-[9px] text-red-400 font-semibold">{errors.code}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Tipo de Usuario</label>
            <select
              value={type}
              onChange={(e) => setType(parseInt(e.target.value) || 2)}
              className="w-full bg-zinc-900 border border-zinc-850 px-2 py-1.5 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Operador</option>
              <option value={3}>Técnico</option>
            </select>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Nombre Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full bg-zinc-900 border ${
              errors.name ? 'border-red-500/60 focus:border-red-500' : 'border-zinc-850 focus:border-orange-500'
            } px-2.5 py-1.5 rounded-lg text-white focus:outline-none`}
            placeholder="Ej. Roberto Gómez"
            required
          />
          {errors.name && <p className="text-[9px] text-red-400 font-semibold">{errors.name}</p>}
        </div>

        {/* Password Credential */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Clave de Operación</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-500">
                <Key className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-zinc-900 border ${
                  errors.password ? 'border-red-500/60 focus:border-red-500' : 'border-zinc-850 focus:border-orange-500'
                } pl-8 pr-3 py-1.5 rounded-lg text-white font-mono focus:outline-none`}
                placeholder="clave123"
                required
              />
            </div>
            <button
              type="button"
              onClick={generatePassword}
              className="btn-secondary p-2"
              title="Generar nueva clave"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
          {errors.password && <p className="text-[9px] text-red-400 font-semibold">{errors.password}</p>}
        </div>

        {/* Id Extendido */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Id Extendido (Controlador)</label>
          <input
            type="text"
            value={extendedId}
            onChange={(e) => setExtendedId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-orange-500"
            placeholder="EXT-ID-101"
          />
        </div>

        {/* Observations */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Observación</label>
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors h-14 resize-none"
            placeholder="Detalles del usuario..."
          />
        </div>
      </div>
    </form>
  );
};
