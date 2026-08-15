# Backlog JIRA-ready - MoneyGuard Facturación

## Epics

| Epic | Nombre | Fases | Objetivo |
|------|--------|-------|----------|
| EPIC 1 | Bonificación por contrato | 1 | Reemplazar producto negativo por bonificación contractual operativa |
| EPIC 2 | Configuración fija y dinámica de factura | 2 | Habilitar pie de factura con markdown, adjuntos y observaciones dinámicas |
| EPIC 3 | Integraciones de pago en factura | 3 | Incorporar Mercado Pago fijo, Pago Fácil configurable y restaurar integraciones visibles |
| EPIC 4 | Exportación TXT mensual | 4 | Generar TXT mensual desde un reporte/handler |
| EPIC 5 | Revisión integral AFIP | 5 | Recuperar, medir y validar el flujo AFIP existente |
| EPIC 6 | Automatización QA Playwright | 6 | Cubrir con Playwright los flujos críticos de facturación |
| EPIC 7 | Facturador dinámico por cantidad automática | 7 | Resolver cantidades automáticas por fuente con v1 para `Cuentas` |

## Tasks

### EPIC 1 - Bonificación por contrato

#### MGF-BA-01
- **Fase / Plan**: Phase 1 / 01-01
- **Título**: BA - Definir reglas de bonificación por contrato
- **Descripción**: Relevar tipo, vigencia, límites, visualización y casos borde para la bonificación contractual.
- **Subtasks**:
  - Confirmar `monto` vs `porcentaje`.
  - Confirmar alcance del límite `hasta 90`.
  - Definir vigencia y permanencia.
  - Definir representación en UI y factura.
- **Criterios de aceptación**:
  - Existe especificación funcional aprobada.
  - Quedan resueltos los casos borde de vigencia y vencimiento.

#### MGF-DEV-01
- **Fase / Plan**: Phase 1 / 01-02
- **Título**: DEV - Implementar bonificación en contrato y facturación
- **Descripción**: Incorporar campos de bonificación en contrato y aplicarlos en el cálculo del comprobante.
- **Subtasks**:
  - Agregar datos en contrato.
  - Ajustar UI de contrato.
  - Modificar cálculo de facturación.
  - Reflejar descuento en comprobante.
- **Criterios de aceptación**:
  - La bonificación vigente se guarda y se aplica correctamente.

#### MGF-QA-01
- **Fase / Plan**: Phase 1 / 01-03
- **Título**: QA - Validar bonificación por contrato
- **Descripción**: Probar monto, porcentaje, vigencia, vencimiento y permanencia en factura.
- **Subtasks**:
  - Probar monto fijo.
  - Probar porcentaje.
  - Probar bonificación vencida.
  - Probar bonificación permanente.
- **Criterios de aceptación**:
  - Los escenarios definidos pasan sin regresiones.

### EPIC 2 - Configuración fija y dinámica de factura

#### MGF-BA-02
- **Fase / Plan**: Phase 2 / 02-01
- **Título**: BA - Definir contenido fijo y dinámico de factura
- **Descripción**: Documentar bloques de footer, variables disponibles y orden de render.
- **Subtasks**:
  - Definir markdown y adjuntos.
  - Definir variables dinámicas.
  - Definir orden del footer.
  - Reunir ejemplos aprobados por negocio.
- **Criterios de aceptación**:
  - Catálogo funcional de bloques y variables aprobado.

#### MGF-DEV-02
- **Fase / Plan**: Phase 2 / 02-02
- **Título**: DEV - Implementar configuración fija y observaciones dinámicas
- **Descripción**: Extender organización facturadora y render de factura para contenido fijo y variables reemplazables.
- **Subtasks**:
  - Ampliar metadata.
  - Soportar markdown y adjuntos embebidos.
  - Agregar template de observaciones.
  - Integrar en PDF/mail.
- **Criterios de aceptación**:
  - El pie de factura muestra contenido fijo y observaciones dinámicas.

#### MGF-QA-02
- **Fase / Plan**: Phase 2 / 02-03
- **Título**: QA - Validar contenido fijo y dinámico
- **Descripción**: Validar markdown, imágenes embebidas y variables en PDF y mail.
- **Subtasks**:
  - Validar markdown simple.
  - Validar adjuntos.
  - Validar variables.
  - Validar render final.
- **Criterios de aceptación**:
  - El render final no rompe la impresión existente.

### EPIC 3 - Integraciones de pago en factura

#### MGF-BA-03
- **Fase / Plan**: Phase 3 / 03-01
- **Título**: BA - Relevar integraciones de pago
- **Descripción**: Confirmar alcance v1 de Mercado Pago y Pago Fácil, y relevar metadata fija/dinámica.
- **Subtasks**:
  - Confirmar bloque fijo de Mercado Pago.
  - Relevar datos fijos de Pago Fácil.
  - Relevar datos dinámicos por cliente/comprobante.
  - Revisar integraciones ocultas.
- **Criterios de aceptación**:
  - Alcance funcional de integraciones aprobado.

#### MGF-DEV-03
- **Fase / Plan**: Phase 3 / 03-02
- **Título**: DEV - Implementar Mercado Pago fijo y Pago Fácil configurable
- **Descripción**: Agregar ambos medios de pago a organización facturadora y al render de factura.
- **Subtasks**:
  - Configurar bloque fijo de Mercado Pago.
  - Crear nueva integración Pago Fácil.
  - Generar código de barras.
  - Renderizar en factura.
- **Criterios de aceptación**:
  - La factura muestra los medios de pago correctamente.

#### MGF-DEV-04
- **Fase / Plan**: Phase 3 / 03-03
- **Título**: DEV - Corregir visibilidad de integraciones
- **Descripción**: Restaurar visibilidad de AFIP y otras integraciones en organización facturadora.
- **Subtasks**:
  - Revisar alta nueva.
  - Revisar edición existente.
  - Corregir ocultamiento condicional.
  - Validar regresión de pantalla.
- **Criterios de aceptación**:
  - AFIP e integraciones relevantes vuelven a verse.

#### MGF-QA-03
- **Fase / Plan**: Phase 3 / 03-03
- **Título**: QA - Validar integraciones de pago
- **Descripción**: Verificar configuración y render de Mercado Pago, Pago Fácil y pantalla de integraciones.
- **Subtasks**:
  - Alta/edición Pago Fácil.
  - Factura con integración activa.
  - Factura sin integración.
  - Visibilidad de organización facturadora.
- **Criterios de aceptación**:
  - Las integraciones funcionan y se visualizan correctamente.

### EPIC 4 - Exportación TXT mensual

#### MGF-BA-04
- **Fase / Plan**: Phase 4 / 04-01
- **Título**: BA - Definir layout del TXT
- **Descripción**: Documentar formato, filtros, naming y ejemplo esperado del TXT.
- **Subtasks**:
  - Relevar layout exacto.
  - Confirmar mes facturado.
  - Confirmar nombre de archivo.
  - Armar ejemplo aprobado.
- **Criterios de aceptación**:
  - Especificación del TXT cerrada.

#### MGF-DEV-05
- **Fase / Plan**: Phase 4 / 04-02
- **Título**: DEV - Implementar reporte TXT mensual
- **Descripción**: Construir el reporte/handler y generar el archivo por mes facturado.
- **Subtasks**:
  - Crear reporte.
  - Crear handler.
  - Pedir mes facturado.
  - Generar TXT final.
- **Criterios de aceptación**:
  - El archivo cumple el layout acordado.

#### MGF-QA-04
- **Fase / Plan**: Phase 4 / 04-02
- **Título**: QA - Validar exportación TXT
- **Descripción**: Verificar salida con y sin datos.
- **Subtasks**:
  - Mes con datos.
  - Mes sin datos.
  - Validación de formato.
- **Criterios de aceptación**:
  - La exportación es consistente en todos los escenarios definidos.

### EPIC 5 - Revisión integral AFIP

#### MGF-BA-05
- **Fase / Plan**: Phase 5 / 05-01
- **Título**: BA - Gap analysis AFIP
- **Descripción**: Documentar flujo actual AFIP, puntos visibles, comportamiento esperado y gaps detectados.
- **Subtasks**:
  - Relevar configuración.
  - Relevar emisión pendiente.
  - Relevar numeración/CAE.
  - Relevar impresión.
- **Criterios de aceptación**:
  - Existe documento de gap analysis validado.

#### MGF-DEV-06
- **Fase / Plan**: Phase 5 / 05-02, 05-03
- **Título**: DEV - Corregir gaps de integración AFIP
- **Descripción**: Ajustar visibilidad, configuración y comportamientos del flujo AFIP actual.
- **Subtasks**:
  - Corregir UI/configuración.
  - Ajustar homologación si corresponde.
  - Revisar emisión pendiente.
  - Revisar impresión final.
- **Criterios de aceptación**:
  - AFIP puede configurarse y validarse en homologación.

#### MGF-QA-05
- **Fase / Plan**: Phase 5 / 05-03, 05-04
- **Título**: QA - Validar AFIP homologación
- **Descripción**: Ejecutar flujo manual asistido y consolidar evidencia y gaps remanentes.
- **Subtasks**:
  - Configurar organización.
  - Emitir comprobante.
  - Validar CAE.
  - Emitir informe final.
- **Criterios de aceptación**:
  - Existe evidencia homologable y reporte final de gaps.

### EPIC 6 - Automatización QA Playwright

#### MGF-BA-06
- **Fase / Plan**: Phase 6 / 06-01
- **Título**: BA - Definir cobertura Playwright
- **Descripción**: Priorizar smoke, happy paths y regresiones críticas de facturación.
- **Subtasks**:
  - Definir matriz de escenarios.
  - Definir datos de prueba.
  - Definir evidencia esperada.
- **Criterios de aceptación**:
  - La matriz de cobertura queda aprobada.

#### MGF-DEV-07
- **Fase / Plan**: Phase 6 / 06-02
- **Título**: DEV - Implementar escenarios Playwright
- **Descripción**: Construir automatizaciones para organización facturadora, wizard de facturación, comprobante e impresiones.
- **Subtasks**:
  - Organización facturadora.
  - Facturación.
  - Comprobante.
  - AFIP condicionada a entorno.
- **Criterios de aceptación**:
  - Los escenarios corren en `qa-automation`.

#### MGF-QA-06
- **Fase / Plan**: Phase 6 / 06-03
- **Título**: QA - Ejecutar y consolidar suite
- **Descripción**: Ejecutar la suite, documentar resultados y dejar evidencia reproducible.
- **Subtasks**:
  - Correr suite.
  - Revisar fallas.
  - Consolidar reporte.
- **Criterios de aceptación**:
  - Existe reporte final de cobertura y pendientes.

### EPIC 7 - Facturador dinámico por cantidad automática

#### MGF-BA-07
- **Fase / Plan**: Phase 7 / 07-01
- **Título**: BA - Definir reglas de cantidad automática
- **Descripción**: Cerrar reglas funcionales de fuente, UX, cantidad cero y alcance v1.
- **Subtasks**:
  - Confirmar `Cuentas` como fuente inicial.
  - Definir fuentes futuras.
  - Definir comportamiento UX.
  - Definir comportamiento con 0 asociaciones.
- **Criterios de aceptación**:
  - Reglas funcionales aprobadas.

#### MGF-DEV-08
- **Fase / Plan**: Phase 7 / 07-02
- **Título**: DEV - Agregar configuración de cantidad automática en producto
- **Descripción**: Incorporar en producto/servicio los campos necesarios para cantidad automática.
- **Subtasks**:
  - Agregar campos.
  - Ajustar formulario.
  - Persistir configuración.
- **Criterios de aceptación**:
  - El producto puede declararse con cantidad automática y fuente.

#### MGF-DEV-09
- **Fase / Plan**: Phase 7 / 07-03
- **Título**: DEV - Implementar cálculo dinámico por cuentas
- **Descripción**: Resolver la cantidad desde las cuentas asociadas al contrato y bloquear cantidad manual cuando corresponde.
- **Subtasks**:
  - Bloquear cantidad manual.
  - Resolver cantidad desde contrato.
  - Ajustar facturación.
  - Mantener compatibilidad con precios actuales.
- **Criterios de aceptación**:
  - La cantidad facturada coincide con las cuentas asociadas al contrato.

#### MGF-QA-07
- **Fase / Plan**: Phase 7 / 07-04
- **Título**: QA - Validar facturador dinámico
- **Descripción**: Verificar cálculo automático, cambio posterior de cuentas y regresión de contratos actuales.
- **Subtasks**:
  - Caso estándar.
  - Caso automático por cuentas.
  - Caso 0 cuentas.
  - Cambio posterior de cuentas.
- **Criterios de aceptación**:
  - El cálculo es correcto y no rompe contratos existentes.

## Labels sugeridos

`moneyguard`, `facturacion`, `webmg`, `contratos`, `afip`, `integraciones`, `qa`, `playwright`
