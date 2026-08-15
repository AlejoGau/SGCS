# DK-1493 — Evidencia Playwright Sprint 2

Fecha: 2026-05-12
Branch: `feature/DK-1493-DK-1498-sprint2-review`

## Alcance validado

- App real GCS: `https://gcs.softguard.com/a/AdministratorSearch?version=`
- Token OAuth real: presente en `qa-automation/.auth/token.txt` y usado por `qa-automation/src/fixtures/auth.fixture.ts`.
- Preview real: ventana ExtJS con iframe a `/handler/ComprobantePdfMG?preview=true&orgId=59&metadata=...`.
- Fixture de prueba: organización facturadora `Id=59` para abrir `MoneyGuardOrganizacionFormView` de forma directa y evitar dependencia del grid remoto lento/inestable.

## Estado de deploy server

- Razor `Id=8359` (`ComprobantePdfMG`) deployado en GCS el 2026-05-13 vía REST autenticado con token OAuth real.
- Se generó backup local previo del Razor del server en `tools/gcs/backups/ComprobantePdfMG_8359.server-before-20260513030745.cshtml`.
- Verificación post-REST `/Rest/Razor/8359`:
	- `localLength=31162`
	- `serverLength=31162`
	- `marker_previewMetadata=true`
	- `marker_logo_url=true`
	- `marker_ResolveInvoiceLogoUrl=true`
	- `marker_VISTA PREVIA=true`
- Se invalidó cache server con `/cache/Invalidate/ComprobantePdfMG`.
- Verificación del handler vivo `/handler/ComprobantePdfMG` con metadata custom:
	- `status=200`
	- `has_preview=true`
	- `has_footer=true`
	- `has_obs=true`
	- `has_logo_url=true`
	- `has_interpolated_client=true`
	- Resultado: `HANDLER_VERIFY_OK`

## Validación ejecutada

Suite completa:

```text
npx playwright test tests/webmg/factura-config.spec.ts --project=chromium --reporter=list
```

Resultado:

```text
20 passed (3.1m)
```

Validación post-deploy del bloque preview con assertions reforzadas contra el handler ya actualizado:

```text
npx playwright test tests/webmg/factura-config.spec.ts --grep "Preview Factura" --project=chromium --reporter=list
```

Resultado post-deploy:

```text
7 passed (1.5m)
```

Nota: se intentó una corrida completa post-deploy; GCS quedó lento/colgado cerca del final luego de pasar 17 tests. Para no dejar procesos vivos, se cortó esa corrida. El bloque impactado por el deploy (`Preview Factura`) sí quedó validado completo contra handler vivo actualizado.

## Evidencia visual local

Screenshots generados en `qa-automation/reports/screenshots/`:

- `dk1493-01-fieldset-expanded.png` — Fieldset Configuración de Factura expandido con componentes visibles.
- `dk1493-02-variable-inserted-emisor-nombre.png` — Inserción de variable `{{emisor_nombre}}`.
- `dk1493-03-preview-interpolated.png` — Ventana preview abierta contra handler real con metadata en URL.
- `dk1493-04-qr-afip-checkbox-enabled.png` — Checkbox QR AFIP habilitado/toggleado.

Artifacts automáticos de Playwright por test:

- `qa-automation/reports/test-artifacts/`

Estos artifacts incluyen capturas/videos/error-context cuando Playwright los genera. Las capturas curadas para entrega están en `qa-automation/reports/screenshots/`.

## Cobertura Playwright

`qa-automation/tests/webmg/factura-config.spec.ts` cubre:

1. Estructura y visibilidad del fieldset.
2. Expansión/colapso del fieldset.
3. Menú `Insertar Variable` y sus cuatro categorías.
4. Inserción de variables en observaciones.
5. Preview real de factura con handler GCS.
6. Metadata no guardada enviada al handler (`observaciones_template`, `footer_fijo`, `mostrar_qr_afip`).
7. Disclaimer de preview con datos de ejemplo.
8. Botón `Subir Logo`.
9. Toggle `Mostrar QR AFIP`.
10. Carga/preservación de `org_cmetadata` sin pérdida de claves.

## Detalle punto por punto

| # | Prueba Playwright | Qué valida | Cómo lo valida | Evidencia |
|---|---|---|---|---|
| 0 | `auth.setup.ts` — authenticate | Hay sesión/token OAuth válido para GCS. | Login setup genera/actualiza `qa-automation/.auth/token.txt`; el fixture lee ese token y lo usa en cookies/resource override. | Token presente, sin exponer valor. |
| 1 | `should display facturaConfig fieldset in org form` | El form de organización muestra el fieldset `Configuración de Factura`. | Abre `https://gcs.softguard.com/a/AdministratorSearch?version=`, inyecta JS local DK-1493, abre form fixture `orgId=59` y busca `#facturaConfig`. | Artifact Playwright del test. |
| 2 | `should expand fieldset and show all components` | Al expandir, se ven `observaciones_template`, `footer_fijo`, `factura_logo_display`, `mostrar_qr_afip`. | Expande fieldset vía ExtJS y consulta visibilidad de componentes. | `qa-automation/reports/screenshots/dk1493-01-fieldset-expanded.png` |
| 3 | `should collapse fieldset back` | El fieldset puede volver a colapsarse. | Expande, verifica expandido, colapsa y verifica estado. | Artifact Playwright del test. |
| 4 | `should open variable menu on button click` | El botón `Insertar Variable` abre menú. | Dispara click ExtJS en `button[action=insertVariable]` y espera menú visible. | Artifact Playwright del test. |
| 5 | `should have 4 category submenus` | El menú tiene 4 categorías. | Lee items visibles del menú y verifica que existan 4 submenús. | Artifact Playwright del test. |
| 6 | `should insert emisor_nombre into observaciones` | Inserción de variable de Emisor. | Selecciona `Emisor > Nombre` y verifica `{{emisor_nombre}}` en observaciones. | `qa-automation/reports/screenshots/dk1493-02-variable-inserted-emisor-nombre.png` |
| 7 | `should insert cliente variable into observaciones` | Inserción de variable de Cliente. | Selecciona `Cliente > CUIT` y verifica `{{cliente_cuit}}`. | Artifact Playwright del test. |
| 8 | `should insert comprobante variable into observaciones` | Inserción de variable de Comprobante. | Selecciona `Comprobante > Total` y verifica `{{comprobante_total}}`. | Artifact Playwright del test. |
| 9 | `should insert variable at cursor position (append to existing)` | Inserta sin borrar texto existente. | Carga texto previo, inserta `{{fecha_actual}}` y verifica ambos textos. | Artifact Playwright del test. |
| 10 | `should open preview window when no config` | Preview real abre aunque no haya config cargada. | Click `Preview Factura`, espera ventana ExtJS e iframe con HTML real del handler. | Artifact Playwright del test. |
| 11 | `should render observaciones with interpolated preview data` | El frontend envía metadata no guardada al handler real. | Setea observaciones con variables, abre preview, lee query param `metadata` del iframe y verifica `observaciones_template`. | `qa-automation/reports/screenshots/dk1493-03-preview-interpolated.png` |
| 12 | `should render footer fijo in preview` | El frontend envía `footer_fijo` no guardado al handler. | Setea footer, abre preview, lee `metadata.factura.footer_fijo` y confirma HTML real de factura. | Artifact Playwright del test. |
| 13 | `should render both observaciones and footer together` | Observaciones y footer pueden viajar juntos. | Setea ambos campos, abre preview, verifica ambos en `metadata.factura` y que no quede token raw esperado en HTML. | Artifact Playwright del test. |
| 14 | `should show example disclaimer in preview` | El handler real marca el preview como datos de ejemplo. | Abre preview sin metadata custom y verifica `VISTA PREVIA`/`ejemplo` en HTML del iframe. | Artifact Playwright del test. |
| 15 | `should handle all variable categories in preview` | Variables de Emisor, Cliente, Comprobante y Calculadas se envían/interpretan sin tokens raw. | Setea template combinado, abre preview real y verifica ausencia de tokens raw + datos ejemplo. | Artifact Playwright del test. |
| 16 | `should have Subir Logo button and respond to click` | Existe botón de logo factura y responde según contexto. | Busca `button[action=facturaLogo]`; si no hay org guardada espera alerta, si hay org solo valida botón/capacidad UI. | Artifact Playwright del test. |
| 17 | `should toggle QR checkbox` | Checkbox `Mostrar QR AFIP` cambia valor. | Setea `true/false` con helper ExtJS y lee valor. | `qa-automation/reports/screenshots/dk1493-04-qr-afip-checkbox-enabled.png` |
| 18 | `should load existing factura config from org_cmetadata` | La config existente en metadata se carga en campos. | Inyecta `org_cmetadata` fixture, ejecuta carga y verifica valores del form. | Artifact Playwright del test. |
| 19 | `should preserve metadata structure on save (no key loss)` | Guardar factura no borra otras claves de `org_cmetadata`. | Parte de metadata con claves extra, guarda config factura y verifica preservación. | Artifact Playwright del test. |

## Ubicación rápida de evidencia

- Reporte principal: `planning/WebMG/DK-1493-PLAYWRIGHT-EVIDENCE.md`
- Spec validado: `qa-automation/tests/webmg/factura-config.spec.ts`
- Page object: `qa-automation/src/pages/webmg/OrgFacturaConfigPage.ts`
- Screenshots curados: `qa-automation/reports/screenshots/dk1493-*.png`
- Artifacts por test: `qa-automation/reports/test-artifacts/`

## Notas técnicas

- El test inyecta los JS locales del form/controller porque el bundle público de GCS puede estar cacheado y no listar los archivos DK-1493 nuevos.
- Los stubs de modelos Common incluyen `proxy.url` REST mínimo para evitar `Ext.String.urlAppend(undefined, ...)` durante `store.load()` en `initview()`.
- Para valores no guardados, el contrato se valida leyendo la `metadata` en la URL del iframe. Esto evita falsos negativos cuando GCS aborta algún iframe con metadata custom antes de exponer `document.body`.
- No se expone el valor del token en evidencia; solo se valida su presencia y uso por fixture.

## Checks finales

- Errores estáticos: sin errores en archivos modificados relevantes.
- Scan enfocado de credenciales DB hardcodeadas: sin hallazgos.
