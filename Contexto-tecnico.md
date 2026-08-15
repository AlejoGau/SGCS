# Contexto técnico — Migración GCS a React

Resumen de lo relevado sobre el sistema legacy (Sencha ExtJS) para usar como referencia al construir la versión en React. Pensado para pasar al proyecto nuevo, no vive código acá — es contexto y decisiones.

## 1. Panorama general del repo legacy

- **33 apps independientes** (`apps/*`), cada una con su propio `Ext.application`, compartiendo lógica de 3 paquetes: `common`, `cuenta`, `tablas` (`packages/local/*`).
- **3 versiones de ExtJS conviviendo hoy**, carpetas reales en el repo:
  - `ext420/` → 4.2.0 (apps viejas nunca migradas: Trackguard, TrackguardMonitoreo, Awcc)
  - `ext/` → 7.1.0
  - `ext731/` → 7.3.1 (apps más nuevas / paquete `common` migrado, `//MIGRADO2024`)
- Patrón REST general: `SearchObject` (`/Rest/search/<Entidad>`) para listar/filtrar, `/Rest/<Entidad>/{id}` para operaciones puntuales. Autenticación vía `OAuth_Token`, resuelto server-side a usuario real (`Token.GetUserIdForAccessToken`) — el frontend nunca decide quién es el usuario, solo manda el token.
- Endpoint genérico de **MetaData por usuario/módulo** ya existe (`SecurityRestService.cs`): `GET/PUT Modules/{ModuleId}/MetaData`, `GET/PUT UserData/{UserId}/MetaData`. Útil para guardar cualquier config/preferencia por cliente sin inventar backend nuevo (ver sección 5, Module Manager).

## 2. Patrones de bugs recurrentes encontrados (útiles para no repetirlos)

### a) `store.filters.clear()` roto en 26+ archivos (migración Ext4→Ext7 incompleta)
En Ext 4, `store.filters` existe de entrada. En Ext 7.3.1 es lazy — no existe hasta llamar `store.getFilters()` una vez. Código portado tal cual de Ext4 a Ext7 sin adaptar rompe con `TypeError: Cannot read properties of null (reading 'clear')`, de forma silenciosa (otro panel de la pantalla sigue actualizándose bien, así que parece "la búsqueda no hizo nada"). Confirmado en 26+ archivos del paquete `common`.
**Relevancia para React:** no aplica directamente (no hay stores de ExtJS), pero es la prueba de que "portar código tal cual entre versiones/frameworks sin auditar" genera bugs silenciosos — argumento para auditar comportamiento real (no solo el código) al migrar cada pantalla.

### b) Clases duplicadas por el registro global de `Ext.define`
`GMapPanel6.js` y `GmapPanel.js` definen ambos `Ext.ux.GMapPanel6` (mismo alias `widget.gmappanel6`). El `bootstrap.json` de cada app resuelve el nombre de clase a UN archivo específico — en `SgAppSerTec`, resuelve a `GmapPanel.js`, dejando `GMapPanel6.js` como código muerto. Un fix real (DSS-1537, decomisión de `libraries=visualization` por Google) se aplicó en junio solo en el archivo muerto y nunca llegó a producción hasta que se re-diagnosticó en agosto.
**Relevancia para React:** este bug **no puede pasar** en React/ESM — los imports son por path de archivo, no por string resuelto en un registro global. Es un argumento técnico real (no solo de gusto) a favor de la migración.

### c) Construcción eager de tabs/paneles pesados
`SerTecController.initview()` construye TODOS los tabs de una al arrancar la app (incluidos paneles de mapa), no solo el activo — `deferredRender` solo difiere el pintado DOM, no la construcción del objeto. Esto generó una carrera real cargando Google Maps dos veces en simultáneo, y además genera costos innecesarios en APIs que facturan por inicialización (ver sección 4).
**Relevancia para React:** usar montaje bajo demanda (lazy) de paneles/tabs pesados — solo instanciar cuando el usuario realmente los abre, no todos al arrancar.

### d) Dependencias de script no declaradas
`SgAppSerTec` nunca tuvo `MarkerClusterer.js` en su `app.json` (a diferencia de Trackguard/MapGuardWeb) — el controller de mapa lo necesitaba pero el `ReferenceError` nunca se había manifestado porque el evento `mapready` que dispara ese código estaba roto (ver punto b). Al arreglar (b), apareció (d).
**Relevancia:** los bugs legacy a veces se tapan entre sí — al migrar una pantalla, verificar el comportamiento real end-to-end, no asumir que "si no tira error hoy, funciona bien".

## 3. Hallazgo de seguridad — sin resolver, reportar aparte de la migración

`PUT Modules/{ModuleId}/Security/{Username}` (`SecurityRestService.cs` → `SecurityManager.SetModuleSecurityForUser` → SP `SoftGuard_SecurityManager_Module_SetSecurity`) **no valida en ninguna capa que quien llama tenga permiso de admin**. Cualquier usuario autenticado con un `OAuth_Token` válido puede modificar los permisos de cualquier otro usuario del sistema. El único control hoy es cosmético (la UI oculta el botón si no sos admin).

**No es un problema que la migración a React resuelva** — es un bug de autorización del backend, independiente del framework de frontend. Reportar aparte.

## 4. Concepto: pooling vs. lazy loading (no confundir)

- **Pooling** (lo que se arregló hoy en la carga de Google Maps con `window.__gmapsLoading`): evita que dos instancias que YA se van a crear peleen por el mismo recurso compartido (el script del mapa). No reduce cuánto se factura — Google Maps JS API cobra por **inicialización de mapa** (`new google.maps.Map()`), no por carga de script.
- **Lazy loading** (montar el componente solo cuando el usuario lo abre, punto 2c): esto sí reduce costo real, porque evita inicializar mapas/recursos que el usuario nunca llega a ver.
Al migrar pantallas con mapas u otros recursos facturados por uso, priorizar lazy mount sobre "cargar todo al arrancar".

## 5. Conceptos de arquitectura: MVC (Sencha) → Componentes + Hooks (React)

| Sencha (MVC) | React (componentes + hooks) |
|---|---|
| View, Controller y Store son 3 archivos separados, coordinados por eventos con nombre de string (`this.control({...})`) | Vista y lógica viven en la misma función-componente; los hooks (`useState`, `useEffect`) reemplazan al rol del Controller pero como piezas chicas y reutilizables, no una clase monolítica |
| "Compartir" = herencia de clases (`common`), cada app la rebuildea por separado — 33 builds independientes | "Compartir" = import directo por path; un paquete de componentes versionado, todas las apps que lo importan reciben el fix en su próximo build |
| Estado = objeto mutable del widget (`view.down('#combo').getValue()`) | Estado = variable (`useState`), inmutable, UI se recalcula sola cuando cambia |
| Singletons globales (`SecurityModulesStore`, variable colgada de `window`/scope global) | Context API + hook (`useModuleSecurity()`) — mismo patrón de "una sola fuente de verdad", pero con acceso explícito y trazable (no una variable global libre) |

**Atomic design** (para organizar los componentes de React): átomos (botón, input) → moléculas (combo + botón = filtro) → organismos (panel de filtro + grilla) → páginas. Un componente vive en un solo lugar, se importa donde haga falta — evita el patrón del punto 2a (mismo bug copiado a mano en 26 archivos).

## 6. Module Manager (WebManager) → React

Ver documento aparte: [`module-manager-react-plan.md`](./module-manager-react-plan.md) — plan completo (catálogo de widgets, ECharts, TanStack Query, `react-grid-layout` para drag/resize, reusar el endpoint `MetaData` existente para persistir el diseño por cliente, export/import como el JSON de layout).

## 7. Roadmap de migración (acordado en el pitch a la empresa)

1. **Fase 0** — Medir antes de mover una línea (confirmar cuello de botella real: frontend, backend, o los dos).
2. **Fase 1** — Elegir un módulo piloto acotado, el que menos dependa de paquetes compartidos.
3. **Fase 2** — Migrarlo contra la misma API REST de siempre (backend no se toca).
4. **Fase 3** — Correr viejo y nuevo en paralelo con usuarios reales antes de apagar el sistema viejo (mitiga perder reglas de negocio invisibles); medir resultado y recién ahí escalar al siguiente módulo.

Pitch completo con evidencia y comparativas: Artifact "SoftGuard 2.0" (link en la memoria de la sesión, no incluido acá por no ser parte del código).
