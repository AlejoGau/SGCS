import React from 'react';
import { HelpCircle, X } from 'lucide-react';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Window Box */}
      <div className="w-[360px] bg-zinc-900 border border-zinc-750 rounded-xl shadow-2xl overflow-hidden select-none transform transition-all scale-100">
        
        {/* Header */}
        <div className="h-9 px-4 bg-zinc-850 border-b border-zinc-750 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-200 tracking-wide">Salir</span>
          <button 
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex items-center gap-4 bg-zinc-900">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200 leading-snug">
              ¿Está seguro que desea salir?
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">
              Se cerrará la sesión actual de Softguard CloudSecurity.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 bg-zinc-850/80 border-t border-zinc-750/60 flex justify-end gap-2.5">
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-600/20 active:scale-95 transition-all"
          >
            Sí, Salir
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-700 active:scale-95 transition-all"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
};
