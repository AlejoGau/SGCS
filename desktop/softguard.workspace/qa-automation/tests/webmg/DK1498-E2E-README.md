# DK-1498: Flujo E2E Real — Cantidad por Cuentas Activas

Este test valida el feature **end-to-end contra el backend real de GCS**.
A diferencia de los tests sintéticos (`cantidad-dinamica.spec.ts`,
`dk1498-cantidad-dinamica.spec.ts`) que renderizan los forms con mocks,
este spec ejecuta el circuito completo y valida los datos persistidos
en la base de datos.

## Qué valida

| Paso | Validación | Evidencia |
|------|------------|-----------|
| 1 | `pro_cantidad_auto = 1` se persiste en `Product` | JSON request/response |
| 2 | SP `MG_CuentasActivasCliente` devuelve N para el cliente | JSON con N |
| 3 | Contrato se crea correctamente para el cliente | ID contrato |
| 4 | Item se asocia al contrato con producto auto | ID item |
| 5 | UI bloquea Cantidad y muestra cartel en `ContratoItemFormView` | screenshot |
| 6 | Novedades generadas | JSON response |
| 7 | **Factura generada con `cbi_icantidad = N`** (clave del feature) | JSON + assertion |
| 8 | PDF de factura renderiza correctamente | screenshot |
| 9 | Cleanup: contrato cancelado y producto eliminado | — |

## Pre-requisitos

El test necesita un **cliente de prueba completamente configurado** en el
entorno destino. Configurar via `qa-automation/.env`:

```env
# OAuth (de auth.setup.ts)
LOGIN_EMAIL=...
LOGIN_PASSWORD=...

# DK-1498 — IDs del entorno destino
DK1498_CLIENTE_ID=4              # m_clientes_fc.cli_icodigo_ID
DK1498_ORG_FC=70729              # t_organizacion_fc.Id
DK1498_LISTA_PRECIOS=6           # mg_listas_precios.mglp_idkey (opcional)
DK1498_TIPO_COMPROBANTE=FCB      # t_comprobantes_fc.cbt_ccodigo (3 chars)
GCS_BASE=https://gcs.softguard.com
```

El cliente referenciado debe tener:
- Categoría impositiva configurada (`cli_ccategoriaimpositiva`)
- Categoría con `cat_orgicodigoid` igual a `DK1498_ORG_FC`
- Al menos **1 cuenta activa** en `m_relacion_cliente_cuentas_fc` con `cue_nEfectiva = 1`
- Tipo de comprobante `DK1498_TIPO_COMPROBANTE` existente para esa org

## Cómo correrlo

```powershell
cd qa-automation
npm install
npx playwright install chromium

# Login + token refresh
npx playwright test tests/auth.setup.ts

# Correr E2E DK-1498
npx playwright test tests/webmg/dk1498-flujo-real.spec.ts --headed --reporter=html
npm run report
```

## Evidencia generada

Después de correr el test, encontrás:

- `qa-automation/reports/screenshots/dk1498-e2e/*.png` — capturas UI/PDF
- `qa-automation/reports/dk1498-e2e/EVIDENCE.md` — reporte con datos REALES
  (IDs, valores, request/response capturados durante la corrida)
- `qa-automation/reports/dk1498-e2e/payloads/*.json` — request/response de cada paso
- `qa-automation/playwright-report/index.html` — reporte HTML con screenshots inline

## Cómo validar manualmente

Si el test falla en algún paso, ejecutalo con `--debug` y revisá:

1. **Pre-flight (paso 0):** los IDs de `.env` deben existir en la BD del entorno
2. **Paso 2:** `SELECT COUNT(*) FROM _Datos..m_relacion_cliente_cuentas_fc rel
    INNER JOIN _Datos..m_cuentas cue ON cue.cue_iid = rel.rel_icuenta
    WHERE rel.rel_icliente = <CLIENTE_ID> AND cue.cue_nEfectiva = 1`
3. **Paso 7:** `SELECT * FROM _Datos..m_comprobantes_item_fc WHERE cbi_icodigocab = <facturaId>` —
   `cbi_icantidad` debe ser igual a N (cuentas activas)
4. **SP debugging:** habilitar `print` en `MG_ContratoAFactura` (ya tiene varios)
   y revisar el SQL log
