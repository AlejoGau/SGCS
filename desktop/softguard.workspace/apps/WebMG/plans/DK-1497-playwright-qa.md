# DK-1497 — Automatización QA Playwright para Facturación

## Épica
**DK-1497** — MGF - Automatización QA Playwright para facturación

## Tareas
- DK-1515 (BA) — Definir cobertura Playwright ✅
- DK-1516 (DEV) — Implementar escenarios Playwright
- DK-1517 (QA) — Ejecutar y consolidar suite

## Objetivo
Automatizar testing de regresión para el módulo de facturación WebMG usando Playwright, cubriendo flujos críticos de comprobantes, facturación automática y configuración.

## Desafío: Sencha ExtJS

ExtJS genera IDs dinámicos en el DOM (ej: `ext-comp-1234`). Los selectores deben usar anclas estables:

| Tipo | Selector Playwright | Ejemplo |
|------|---------------------|---------|
| Combo por itemId | `[id*="itemId"] input` | `[id*="cbc_ctipocbte"] input` |
| Botón por texto | `button:has-text("Guardar")` | `button:has-text("Facturar")` |
| Campo por label | `label:has-text("Fecha")` | — |
| Grid row | `.x-grid-row` con `nth()` | — |
| Tab | `.x-tab:has-text("MoneyGuard")` | — |
| Toolbar button | `[data-qtip="texto"]` o `[iconCls="clase"]` | — |

## Patrón SearchObject para datos de test

Ref: `ARCHITECTURE.md` — todos los endpoints son predecibles:

```
GET /Rest/Search/{Name}?filter=[...]&sort=[...]&page=1&limit=50
```

Endpoints reales (del diccionario de datos):

| Entidad | Endpoint | SP Backend |
|---------|----------|------------|
| Comprobantes | `/Rest/search/m_comprobantes_cab_fc` | m_comprobantes_cab_fcSearch |
| Items comprobante | `/Rest/search/m_comprobantes_item_fc` | m_comprobantes_item_fcSearch |
| Clientes | `/Rest/search/m_clientes_fc` | Searchm_clientes_fc |
| Contratos | `/Rest/search/crm_contrato` | crm_contratoSearch |
| Items contrato | `/Rest/search/crm_contrato_item` | crm_contrato_itemSearch |
| Org facturadora | `/Rest/t_organizacion_fc/` | CRUD directo |
| Cond. pago | `/Rest/search/t_condiciones_pago_fc` | t_condiciones_pago_fcSearch |
| Tipos comprobante | `/Rest/search/t_comprobantes_fc` | t_comprobantes_fcSearch |
| Cat. impositiva | `/Rest/search/t_categorias_impositivas_fc` | t_categorias_impositivas_fcSearch |

## Escenarios de Test

### Prioridad Alta — Flujos Críticos

| ID | Escenario | Módulo | Precondiciones |
|----|-----------|--------|---------------|
| TC-01 | Crear comprobante manual (Factura A) | ComprobanteForm | Cliente con org facturadora |
| TC-02 | Validar datos facturación incompletos | ComprobanteForm | Cliente sin categoría impositiva |
| TC-03 | Agregar items a comprobante | ComprobanteItemSearch | Comprobante de TC-01 |
| TC-04 | Activar comprobante (cuenta corriente) | ComprobanteForm | Comprobante con items |
| TC-05 | Wizard facturación automática completo | FacturacionAutomaticaWizard | Clientes con contratos activos |
| TC-06 | Filtros por org facturadora en wizard | FacturacionAutomaticaWizard | Múltiples orgs |
| TC-07 | Imprimir/generar PDF de factura | FacturaPrint | Comprobante activo |

### Prioridad Media — Configuración

| ID | Escenario | Módulo |
|----|-----------|--------|
| TC-08 | ABM Organización Facturadora | AdministratorSearch |
| TC-09 | Asignar categoría impositiva a cliente | ClienteForm |
| TC-10 | Cambio org facturadora filtra combos | ClienteForm |
| TC-11 | ABM Condiciones de Pago filtradas por org | AdministratorSearch |
| TC-12 | ABM Tipos de Comprobante filtrados por org | AdministratorSearch |
| TC-13 | Crear contrato con items | ContratoForm |
| TC-14 | Facturar contrato → generar comprobante | ContratosFactura |
| TC-15 | Condiciones pago en contrato filtradas | ContratoForm |

### Prioridad Baja — Post-Features

| ID | Escenario | Épica Asociada |
|----|-----------|----------------|
| TC-16 | Observaciones dinámicas en PDF | DK-1493 |
| TC-17 | Integraciones de pago en PDF | DK-1494 |
| TC-18 | Exportación TXT mensual | DK-1495 |
| TC-19 | Solicitud de CAE a AFIP | DK-1496 |
| TC-20 | Facturación dinámica por cantidad | DK-1498 |

## Estructura del Proyecto

```
playwright-tests/
├── playwright.config.ts        ← Config: baseURL = https://gcs.softguard.com
├── fixtures/
│   └── auth.setup.ts           ← Login en GCS (cookie de sesión)
├── pages/
│   ├── moneyguard.page.ts      ← Page object principal (navegar a WebMG)
│   ├── comprobante.page.ts     ← Page object comprobantes
│   ├── cliente.page.ts         ← Page object clientes
│   ├── facturacion.page.ts     ← Page object facturación automática
│   ├── contrato.page.ts        ← Page object contratos
│   └── admin.page.ts           ← Page object AdministratorSearch
├── tests/
│   ├── comprobante-manual.spec.ts    ← TC-01 a TC-04
│   ├── facturacion-auto.spec.ts      ← TC-05, TC-06
│   ├── configuracion.spec.ts         ← TC-08 a TC-12
│   ├── contratos.spec.ts             ← TC-13 a TC-15
│   └── pdf-render.spec.ts            ← TC-07, TC-16, TC-17
├── helpers/
│   └── sencha-helpers.ts       ← Utilidades selectores Sencha
└── test-data/
    └── seed.ts                 ← Datos de prueba via REST API
```

## Helpers para Sencha

```typescript
// sencha-helpers.ts
export async function getComboByItemId(page: Page, itemId: string) {
  return page.locator(`[id*="${itemId}"] input`);
}

export async function clickToolbarButton(page: Page, text: string) {
  return page.locator(`button:has-text("${text}")`).click();
}

export async function waitForGridLoad(page: Page) {
  await page.waitForSelector('.x-grid-row', { state: 'attached' });
}

export async function getFieldByLabel(page: Page, label: string) {
  return page.locator(`label:has-text("${label}")`).locator('..').locator('input');
}
```

## Criterios de Aceptación
1. 20 escenarios definidos y priorizados
2. Estrategia de selectores Sencha documentada
3. Estructura de proyecto con page objects
4. Al menos TC-01 a TC-07 (prioridad alta) implementados en DK-1516
