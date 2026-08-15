import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2,
  Monitor, CreditCard, Settings, Map, Shield, MousePointer, Layers, Activity,
  ImageOff, ZoomIn, Key, DoorOpen, CalendarClock, Users, Home
} from 'lucide-react';

export interface GuideStep {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  tips?: string[];
  /** Ruta a screenshot/GIF capturado con Playwright. Ejemplo: "/guide/desktop-step1-modules-grid.png" */
  media?: string;
  /** Texto alternativo para el media */
  mediaAlt?: string;
}

export type ModuleGuideKey = 'desktop' | 'billing' | 'admin' | 'trackguard' | 'accesscontrol';

const GUIDES_DATA: Record<ModuleGuideKey, { title: string; steps: GuideStep[] }> = {
  desktop: {
    title: 'Guía del Escritorio Principal (Softguard Web Desktop)',
    steps: [
      {
        title: '1. Rejilla de Módulos Operativos',
        subtitle: 'Acceso a los 33+ módulos del sistema',
        description: 'Visualiza la lista de módulos. Los íconos con insignias brillantes de color naranja indican módulos migrados a la nueva arquitectura en React (Cuentas, Configuración y TrackGuard).',
        icon: Monitor,
        media: '/guide/desktop-step1-modules-grid.png',
        mediaAlt: 'Vista de la rejilla de módulos del desktop',
        tips: [
          'Haz clic en cualquier módulo React para abrirlo como una ventana interactiva.',
          'Los módulos Legacy se mantienen identificados para la Fase 2 de migración.'
        ]
      },
      {
        title: '2. Gestor de Ventanas Multitarea',
        subtitle: 'Administración de pantallas activas',
        description: 'Puedes abrir múltiples módulos en paralelo. Cada ventana incluye controles para minimizar, maximizar o restaurar el espacio de trabajo.',
        icon: Layers,
        media: '/guide/desktop-step2-window-manager.png',
        mediaAlt: 'Múltiples ventanas abiertas simultáneamente',
        tips: [
          'Las ventanas abiertas se organizan en la barra de tareas inferior.',
          'Haz clic en cualquier pestaña de la barra de tareas para cambiar el foco activo.'
        ]
      },
      {
        title: '3. Menú Inicio y Opciones de Ajuste',
        subtitle: 'Configuración personalizada del operador',
        description: 'En el botón "Inicio" (inferior izquierdo) encontrarás el menú contextual para guardar posiciones de ventanas, ver reportes de usuario y alternar efectos 3D.',
        icon: Shield,
        media: '/guide/desktop-step3-start-menu.png',
        mediaAlt: 'Menú inicio abierto con opciones del sistema',
        tips: [
          'Puedes activar o desactivar la animación 3D del logo según la potencia de la PC.',
          'Incluye buscador rápido por nombre o categoría de módulo.'
        ]
      },
      {
        title: '4. Telemetría y Reloj de Sistema',
        subtitle: 'Control en tiempo real',
        description: 'En la esquina superior derecha dispones de la fecha y hora oficial del servidor en vivo, junto a los badges de estado "Sin Mensajes" y "Alertas".',
        icon: Sparkles,
        media: '/guide/desktop-step4-telemetry.png',
        mediaAlt: 'Panel de telemetría con reloj y badges de estado',
        tips: [
          'El reloj opera en formato continuo 24hs.',
          'Haz clic en el botón "Salir" de la barra de tareas cuando desees finalizar sesión.'
        ]
      }
    ]
  },
  billing: {
    title: 'Guía del Módulo Cuentas (Administrator)',
    steps: [
      {
        title: '1. Pestañas Dinámicas de Abonados',
        subtitle: 'Estructura workspace multitab',
        description: 'La pestaña "Cuentas" se mantiene fija. Al hacer clic en "Ver / Editar" sobre cualquier cuenta, se abrirá una nueva pestaña dinámica e independiente con los datos del abonado.',
        icon: CreditCard,
        media: '/guide/billing-step1-tabs.png',
        mediaAlt: 'Sistema de pestañas dinámicas del módulo de cuentas',
        tips: [
          'Puedes tener varias cuentas abiertas en pestañas simultáneas (ej. BOS-0001, BOS-0002).',
          'Cada pestaña se puede cerrar de forma independiente sin perder el contexto.'
        ]
      },
      {
        title: '2. Menú de 33 Opciones por Cuenta',
        subtitle: 'Navegación lateral de árbol colapsable',
        description: 'Dentro de cada cuenta abierta, dispones de un menú lateral colapsable (« / ») con 33 secciones: Datos, Situación, Usuarios, Contactos, Zonas, Notificaciones, SmartPanics, etc.',
        icon: Layers,
        media: '/guide/billing-step2-menu-lateral.png',
        mediaAlt: 'Menú lateral colapsable con 33 opciones',
        tips: [
          'Haz clic en "<<" para ocultar la barra y maximizar el área del formulario.',
          'Los badges indican la cantidad de ítems registrados (ej: Usuarios: 36, Zonas: 21).'
        ]
      },
      {
        title: '3. Grilla Principal Paginada y Filtros',
        subtitle: 'Búsqueda de alta densidad',
        description: 'En la grilla de cuentas cuentas con barra de búsqueda rápida por número o nombre, filtros de situación (Habilitadas, Fallo TST, No Habilitadas) y paginado.',
        icon: MousePointer,
        media: '/guide/billing-step3-grid.png',
        mediaAlt: 'Grilla de cuentas con filtros y paginación',
        tips: [
          'Usa los botones superiores para filtrar cuentas según su estado operativo.',
          'La paginación permite navegar entre miles de registros con rapidez.'
        ]
      },
      {
        title: '4. Formularios de Datos y Resolución Extendida',
        subtitle: 'Edición con permisos de seguridad',
        description: 'El formulario de cuenta se divide en sub-pestañas: "Datos" (Dirección, Clave, Permisos) y "Resolución Extendida" (hereda perfil de solo lectura o edición).',
        icon: Shield,
        media: '/guide/billing-step4-formulario.png',
        mediaAlt: 'Formulario de datos de una cuenta con sub-pestañas',
        tips: [
          'Los campos resaltados con indicador rojo corresponden a datos críticos.',
          'El botón "Cambiar Clave" dispara el diálogo seguro de modificación.'
        ]
      }
    ]
  },
  admin: {
    title: 'Guía del Módulo Configuración del Sistema (Admin)',
    steps: [
      {
        title: '1. Paneles de Parámetros Globales',
        subtitle: 'Administración de la Suite',
        description: 'Organizado en 4 secciones clave: Parámetros Generales, Permisos y Perfiles, Notificaciones del Sistema e Integraciones / Servidores.',
        icon: Settings,
        media: '/guide/admin-step1-params.png',
        mediaAlt: 'Paneles de parámetros globales del sistema',
        tips: [
          'Usa las pestañas superiores para alternar entre áreas de configuración.',
          'El botón "Guardar Cambios" consolida las modificaciones globales.'
        ]
      },
      {
        title: '2. Matriz de Permisos por Profile (Escala 0-4)',
        subtitle: 'Seguridad basada en roles',
        description: 'Configura el nivel de acceso por usuario y módulo según el estándar SecurityModulesStore (0/1: Read-Only, 2: Restringido, 3: Full, 4: Solicitar Cambio).',
        icon: Shield,
        media: '/guide/admin-step2-permisos.png',
        mediaAlt: 'Matriz de permisos configurada por perfil',
        tips: [
          'Define los flags de "Rights" para permisos finos (ej. ver claves, exportar).',
          'Los cambios de permisos aplican de forma inmediata tras refrescar el token.'
        ]
      },
      {
        title: '3. Diagnóstico de Infraestructura y Proxy',
        subtitle: 'Estado de servidores locales',
        description: 'Monitorea el estado de la conexión a SQL Server, Caddy Dev Proxy y el puerto de Vite HMR en tiempo real.',
        icon: Sparkles,
        media: '/guide/admin-step3-diagnostico.png',
        mediaAlt: 'Panel de diagnóstico de infraestructura en tiempo real',
        tips: [
          'Si un servicio pierde conexión, el indicador cambiará a color ámbar/rojo.',
          'Incluye registros de auditoría de cambios del sistema.'
        ]
      }
    ]
  },
  trackguard: {
    title: 'Guía del Módulo TrackGuard GPS (Monitoreo Geoespacial)',
    steps: [
      {
        title: '1. Mapa Vectorial WebGL (MapLibre GL)',
        subtitle: 'Motor de mapas de ultra rendimiento a 60 FPS',
        description: 'El mapa utiliza tecnología WebGL de aceleración por GPU. Permite visualizar la flota en tiempo real con cero costo de licencias API.',
        icon: Map,
        media: '/guide/trackguard-step1-map.png',
        mediaAlt: 'Mapa vectorial WebGL mostrando la flota de vehículos',
        tips: [
          'Usa el alternador superior derecho para cambiar entre estilos: Dark, Light o Voyager.',
          'El mapa soporta zoom fluido, inclinación 3D y paneo sin parpadeos.'
        ]
      },
      {
        title: '2. Streaming en Tiempo Real (WebSockets)',
        subtitle: 'Seguimiento en vivo de vehículos',
        description: 'Con el conmutador "Live Stream" activo, las posiciones de los vehículos se actualizan en tiempo real con animación de rumbo e indicador de velocidad.',
        icon: Activity,
        media: '/guide/trackguard-step2-streaming.png',
        mediaAlt: 'Streaming en vivo de posiciones vehiculares',
        tips: [
          'Los vehículos con alerta parpadean en color rojo de forma prioritaria.',
          'Puedes pausar o reanudar el streaming en tiempo real desde la barra inferior.'
        ]
      },
      {
        title: '3. Panel Lateral de Flota y Filtros',
        subtitle: 'Selección rápida de unidades',
        description: 'El panel izquierdo te permite filtrar unidades por estado (En movimiento, Detenidos, Con Alarma) y buscarlas por matrícula o nombre.',
        icon: Layers,
        media: '/guide/trackguard-step3-fleet-panel.png',
        mediaAlt: 'Panel lateral con lista de vehículos filtrable',
        tips: [
          'Haz clic sobre cualquier vehículo de la lista para centrar la cámara del mapa sobre él.',
          'El panel lateral se puede colapsar con el botón « de la barra superior.'
        ]
      },
      {
        title: '4. Modal de Telemetría Geoespacial',
        subtitle: 'Información técnica detallada',
        description: 'Al hacer clic sobre un marcador de vehículo en el mapa, se despliega la ficha flotante con dirección exacta, IMEI, velocidad, coordenadas e historial.',
        icon: HelpCircle,
        media: '/guide/trackguard-step4-telemetry-modal.png',
        mediaAlt: 'Ficha de telemetría de un vehículo',
        tips: [
          'Puedes cerrar la ficha haciendo clic en el botón X de la esquina.',
          'Permite copiar las coordenadas GPS directamente al portapapeles.'
        ]
      }
    ]
  },
  accesscontrol: {
    title: 'Guía del Módulo Control de Acceso (AccessControl)',
    steps: [
      {
        title: '1. Bienvenido: la puerta de entrada',
        subtitle: 'Buscar y confirmar un acceso en segundos',
        description: 'Es la pantalla que ve un portero o guardia. Buscás por nombre, documento, patente o unidad funcional, y el sistema te muestra quién es y si tiene autorización vigente. No hace falta saber nada más del módulo para empezar a usarla.',
        icon: Key,
        media: '/guide/accesscontrol-step1-bienvenido.png',
        mediaAlt: 'Pantalla de bienvenida con búsqueda rápida',
        tips: [
          'El botón "Escanear QR" queda preparado para integrarse con lectores físicos más adelante.',
          'Desde cada resultado podés saltar directo a la ficha completa de esa persona o proveedor.'
        ]
      },
      {
        title: '2. Personas y Proveedores: las fichas',
        subtitle: 'Toda la información de quien entra, en un solo lugar',
        description: 'Doble clic en una fila abre la ficha completa en una pestaña nueva. Adentro hay sub-solapas simples: Datos (quién es), Vehículos (qué auto tiene), Accesos (cuándo entró y salió) y Autorizaciones (cuándo puede entrar). Los proveedores además tienen una solapa de Documentos.',
        icon: Users,
        media: '/guide/accesscontrol-step2-personas.png',
        mediaAlt: 'Ficha de una persona con sub-solapas',
        tips: [
          'Podés tener varias fichas abiertas a la vez, cada una en su pestaña, sin perder el lugar.',
          'Las autorizaciones se cargan siempre desde acá adentro — no hay forma de crear una sin elegir antes a quién.'
        ]
      },
      {
        title: '3. Autorizaciones: el corazón del módulo',
        subtitle: 'Quién puede entrar, qué día y a qué hora',
        description: 'Una autorización es simple: elegís desde cuándo hasta cuándo es válida, en qué días de la semana (o todos) y en qué horario. El estado se calcula solo: Activa (hoy es su día y está vigente), Pendiente (es válida, pero hoy no le toca) o Vencida (ya pasó la fecha).',
        icon: CalendarClock,
        media: '/guide/accesscontrol-step3-autorizaciones.png',
        mediaAlt: 'Formulario de nueva autorización con días de la semana y horario',
        tips: [
          '"Todo el día" te ahorra cargar horario cuando no hay restricción horaria.',
          'Los íconos de Ingreso/Egreso se habilitan según el último movimiento registrado de esa persona.'
        ]
      },
      {
        title: '4. Ingresos, Egresos y Delivery',
        subtitle: 'Quién entró y cuándo, en tiempo real',
        description: 'Cada entrada o salida queda registrada con fecha, puerta y quién la autorizó. El filtro "Ingreso sin Egreso" muestra rápido quién quedó adentro sin marcar la salida. "Delivery" usa la misma idea para repartidores ocasionales, con nombre libre en vez de una ficha.',
        icon: DoorOpen,
        media: '/guide/accesscontrol-step4-ingresos-egresos.png',
        mediaAlt: 'Log de ingresos y egresos con filtros',
        tips: [
          'Este mismo listado aparece también embebido dentro de la ficha de cada persona, filtrado a sus movimientos.',
          '"Exportar" baja el listado filtrado a Excel.'
        ]
      },
      {
        title: '5. Unidades Funcionales y Vehículos',
        subtitle: 'La misma información, organizada por cuenta',
        description: 'Unidades Funcionales lista los departamentos o locales del edificio; doble clic en uno abre su propio árbol con Autorizaciones y Accesos filtrados solo a esa unidad. Vehículos centraliza todos los autos y motos registrados, sean de personas o de proveedores.',
        icon: Home,
        media: '/guide/accesscontrol-step5-unidades.png',
        mediaAlt: 'Árbol de una unidad funcional con sus secciones',
        tips: [
          'El árbol de una unidad funciona igual que en Cuentas: un clic para moverte entre secciones.',
          'En Vehículos podés buscar por marca, modelo o patente si no te acordás de quién es el dueño.'
        ]
      }
    ]
  }
};

// ─── Componente de Media con fallback ────────────────────────────────
const GuideMedia: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-96 rounded-xl bg-zinc-950/60 border border-zinc-800/60 border-dashed flex flex-col items-center justify-center gap-2 text-zinc-600">
        <ImageOff className="w-8 h-8 opacity-50" />
        <span className="text-[10px] font-mono uppercase tracking-wider">
          {hasError ? 'Error al cargar imagen' : 'Screenshot pendiente'}
        </span>
        <span className="text-[9px] text-zinc-700 max-w-[200px] text-center">
          Ejecuta <code className="text-orange-500/70 bg-zinc-900 px-1 rounded">node scripts/capture-guide-screenshots.mjs</code> para generar
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail in guide */}
      <div className="relative group/media cursor-pointer" onClick={() => setIsZoomed(true)}>
        <div className={`w-full rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-950/60 transition-all duration-300 ${
          isLoaded ? 'shadow-lg shadow-orange-500/5' : ''
        }`}>
          {!isLoaded && (
            <div className="w-full h-96 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
          )}
          <img
            src={src}
            alt={alt || 'Screenshot de la guía'}
            className={`w-full h-auto max-h-96 object-cover object-top transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0 h-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
          />
        </div>

        {/* Zoom overlay on hover */}
        <div className="absolute inset-0 rounded-xl bg-black/0 group-hover/media:bg-black/30 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover/media:opacity-100 transition-opacity bg-zinc-900/90 border border-orange-500/30 rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold text-orange-400 backdrop-blur-sm shadow-xl">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Ampliar</span>
          </div>
        </div>
      </div>

      {/* Fullscreen zoom modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={src}
              alt={alt || 'Screenshot ampliado'}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl border border-orange-500/20 shadow-2xl shadow-orange-500/10 object-contain"
            />
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-mono">ESC o clic para cerrar</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Props & Component ───────────────────────────────────────────────
interface ModuleHelpGuideProps {
  isOpen: boolean;
  onClose: () => void;
  moduleKey: ModuleGuideKey;
}

export const ModuleHelpGuide: React.FC<ModuleHelpGuideProps> = ({
  isOpen,
  onClose,
  moduleKey
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const guide = GUIDES_DATA[moduleKey] || GUIDES_DATA.desktop;
  const currentStep = guide.steps[currentStepIndex] || guide.steps[0];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (currentStepIndex < guide.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
      setCurrentStepIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Close on ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setCurrentStepIndex(0);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Keyboard navigation (arrows)
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  // Early return AFTER all hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 select-none animate-fadeIn font-sans">
      
      {/* Modal Container - Wider to accommodate media */}
      <div className="relative w-full max-w-6xl bg-zinc-900 border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-zinc-850/90 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">{guide.title}</h3>
              <span className="text-[10px] text-orange-400 font-mono font-semibold uppercase tracking-wider block mt-1">
                Guía Interactiva Paso a Paso
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              setCurrentStepIndex(0);
            }}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body with Framer Motion Step Animation */}
        <div className="p-6 max-h-[70vh] overflow-y-auto flex flex-col justify-between bg-zinc-900 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Step Header — ancho de lectura acotado aunque el modal sea ancho (para la imagen) */}
              <div className="flex items-start gap-4 max-w-2xl mx-auto w-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <StepIcon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white leading-tight">
                    {currentStep.title}
                  </h4>
                  <span className="text-xs text-orange-400 font-medium block mt-0.5">
                    {currentStep.subtitle}
                  </span>
                </div>
              </div>

              {/* 📸 Screenshot / GIF Media — ocupa todo el ancho del modal para que se vea nítida */}
              <GuideMedia src={currentStep.media} alt={currentStep.mediaAlt} />

              <div className="max-w-2xl mx-auto w-full space-y-4">
                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 border border-zinc-850 p-3.5 rounded-xl">
                  {currentStep.description}
                </p>

                {/* Tips Section */}
                {currentStep.tips && currentStep.tips.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      💡 Consejos clave:
                    </span>
                    <div className="space-y-1">
                      {currentStep.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators Bar */}
          <div className="flex items-center justify-center gap-1.5 pt-4">
            {guide.steps.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex 
                    ? 'w-8 bg-orange-500' 
                    : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-zinc-850/90 border-t border-zinc-800 flex items-center justify-between text-xs">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-[11px] text-zinc-400 font-mono font-semibold">
            Paso <strong className="text-white">{currentStepIndex + 1}</strong> de {guide.steps.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
          >
            <span>{currentStepIndex === guide.steps.length - 1 ? 'Entendido / Comenzar' : 'Siguiente'}</span>
            {currentStepIndex < guide.steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

      </div>

    </div>
  );
};
