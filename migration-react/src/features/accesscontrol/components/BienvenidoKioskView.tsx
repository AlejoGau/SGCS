import React, { useState } from 'react';
import { Search, QrCode, User, Building2, ShieldCheck } from 'lucide-react';
import { Persona, Proveedor, Vehiculo, UnidadFuncional } from '../../../mocks/accesscontrol';

interface BienvenidoKioskViewProps {
  personas: Persona[];
  proveedores: Proveedor[];
  vehiculos: Vehiculo[];
  unidades: UnidadFuncional[];
  onSelectPersona: (persona: Persona) => void;
  onSelectProveedor: (proveedor: Proveedor) => void;
}

export const BienvenidoKioskView: React.FC<BienvenidoKioskViewProps> = ({
  personas, proveedores, vehiculos, unidades, onSelectPersona, onSelectProveedor,
}) => {
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const matchesQuery = (value: string, query: string) => !query || value.toLowerCase().includes(query.toLowerCase());

  const matriculasPersona = new Set(vehiculos.filter((v) => v.ownerType === 'persona' && matchesQuery(v.matricula, matricula)).map((v) => v.ownerId));
  const matriculasProveedor = new Set(vehiculos.filter((v) => v.ownerType === 'proveedor' && matchesQuery(v.matricula, matricula)).map((v) => v.ownerId));

  const unidadNombres = unidades.filter((u) => matchesQuery(u.numero, cuenta) || matchesQuery(u.nombre, cuenta)).map((u) => u.id);

  const personasEncontradas = hasSearched
    ? personas.filter((p) =>
        matchesQuery(p.nombre, nombre) &&
        matchesQuery(p.identificacion, identificacion) &&
        (!matricula || matriculasPersona.has(p.id)) &&
        (!cuenta || unidadNombres.includes(p.unidadFuncionalId))
      )
    : [];

  const proveedoresEncontrados = hasSearched
    ? proveedores.filter((p) =>
        matchesQuery(p.nombre, nombre) &&
        matchesQuery(p.identificacion, identificacion) &&
        (!matricula || matriculasProveedor.has(p.id)) &&
        !cuenta
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleClear = () => {
    setNombre(''); setIdentificacion(''); setMatricula(''); setCuenta('');
    setHasSearched(false);
  };

  return (
    <div className="glass-panel border-zinc-800 rounded-xl h-[calc(100vh-170px)] flex flex-col overflow-hidden">
      <div className="p-6 border-b border-zinc-850 bg-gradient-to-br from-orange-500/5 to-transparent text-center shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-7 h-7 text-orange-500" />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Bienvenido</h3>
        <p className="text-xs text-zinc-400 mt-1">Verificación rápida de acceso — buscá una persona o proveedor autorizado</p>
      </div>

      <form onSubmit={handleSearch} className="p-4 border-b border-zinc-850 bg-zinc-900/30 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Identificación</label>
            <input value={identificacion} onChange={(e) => setIdentificacion(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Matrícula</label>
            <input value={matricula} onChange={(e) => setMatricula(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white font-mono focus:outline-none focus:border-orange-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Cuenta / Unidad Funcional</label>
            <input value={cuenta} onChange={(e) => setCuenta(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded text-white focus:outline-none focus:border-orange-500" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <button type="submit" className="btn-primary px-3.5 py-2 text-xs">
            <Search className="w-3.5 h-3.5" />
            <span>Buscar</span>
          </button>
          <button type="button" onClick={handleClear} className="btn-secondary px-3.5 py-2 text-xs">Limpiar</button>
          <button type="button" onClick={() => alert('Escaneo de QR (Simulado)...')} className="btn-secondary px-3.5 py-2 text-xs ml-auto">
            <QrCode className="w-3.5 h-3.5 text-orange-400" />
            <span>Escanear QR</span>
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="flex flex-col border border-zinc-850 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-zinc-900/50 border-b border-zinc-850 flex items-center gap-2 shrink-0">
            <User className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">Personas encontradas ({personasEncontradas.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-zinc-900/60">
            {!hasSearched ? (
              <div className="p-6 text-center text-zinc-500 text-[11px]">Ingresá un criterio y presioná Buscar.</div>
            ) : personasEncontradas.length === 0 ? (
              <div className="p-6 text-center text-zinc-500 text-[11px]">Sin resultados.</div>
            ) : (
              personasEncontradas.map((p) => (
                <button key={p.id} onClick={() => onSelectPersona(p)} className="w-full text-left px-3 py-2.5 hover:bg-zinc-900/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-200">{p.nombre}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border text-orange-400 bg-orange-500/10 border-orange-500/25">{p.tipo}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{p.identificacion} · {p.unidadFuncionalNombre}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col border border-zinc-850 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-zinc-900/50 border-b border-zinc-850 flex items-center gap-2 shrink-0">
            <Building2 className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">Proveedores encontrados ({proveedoresEncontrados.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-zinc-900/60">
            {!hasSearched ? (
              <div className="p-6 text-center text-zinc-500 text-[11px]">Ingresá un criterio y presioná Buscar.</div>
            ) : proveedoresEncontrados.length === 0 ? (
              <div className="p-6 text-center text-zinc-500 text-[11px]">Sin resultados.</div>
            ) : (
              proveedoresEncontrados.map((p) => (
                <button key={p.id} onClick={() => onSelectProveedor(p)} className="w-full text-left px-3 py-2.5 hover:bg-zinc-900/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-200">{p.nombre}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${p.operativo ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' : 'text-red-400 bg-red-500/10 border-red-500/25'}`}>
                      {p.operativo ? 'Operativo' : 'No operativo'}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{p.identificacion} · {p.categoria}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
