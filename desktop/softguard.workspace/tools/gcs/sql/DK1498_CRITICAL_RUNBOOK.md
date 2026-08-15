# DK-1498 / DK-1520 — Critical Findings Runbook

> Objetivo: dejar contexto operativo para futuros agentes/equipo sobre los bugs críticos detectados en `crm_contrato` y cómo validarlos rápido.

## 1) Resumen ejecutivo

Se detectaron **dos causas raíz distintas** en cadena:

1. **SQL desactualizado en `_Datos`**
   - `crm_contratoIns`, `crm_contratoUpd`, `crm_contratoSel` sin `cnt_cantidad_auto`
   - trigger `TG_INS_Contrato` sin copiar `cnt_cantidad_auto`
   - Efecto: `POST /Rest/crm_contrato/` persistía `cnt_cantidad_auto=0`.

2. **Semántica de PUT parcial en backend REST**
   - En `Update`, el merge por reflexión copiaba defaults de tipos valor (`int=0`) aunque el campo no viniera en JSON.
   - Efecto: `PUT` parcial (ej. `{ Id, cnt_estado }`) podía resetear enteros a `0`.

---

## 2) Fixes aplicados en esta sesión

### 2.1 SQL hotfix aplicado en GCS

Archivo:
- `tools/gcs/sql/dk1498_fix_crm_contrato_cnt_cantidad_auto.sql`

Estado:
- ✅ aplicado con éxito
- ✅ sanity checks OK en `_Desktop` y `_Datos`
- ✅ trigger `TG_INS_Contrato` presente en `_Datos`

Resultado validado:
- `POST/GET /Rest/crm_contrato/` persiste `cnt_cantidad_auto=1` y `cnt_dinamico=1`.

### 2.2 writeAllFields en frontend/modelos

Verificación:
- `Common.model.crm_contratoModel` ya tenía `writer.writeAllFields: true`.

Hardening adicional:
- `slbf.generator/Slbf.Generator/v1.0.4/JSModel.xsl` actualizado para emitir:
  - `writer: { type: 'json', writeAllFields: true }`

### 2.3 Safety net en tests

Archivo:
- `qa-automation/tests/webmg/dk1498-ui-real.spec.ts`

Cambio:
- cleanup de contrato pasó de `PUT` parcial a `GET + PUT` con payload completo.

Resultado:
- ✅ `Caso G` sigue pasando (`webmg-local`).

---

## 3) Hardening backend REST (pendiente de deploy)

Fuentes actualizadas:
- `softguard.businessobjects/SoftGuard.BusinessObjects/Slbf.Services.Rest/crm_contratoRestService.cs`
- `slbf.generator/Slbf.Generator/v1.0.4/CSRestService.xsl`

Enfoque:
- `PUT` presencia-aware: leer JSON raw y aplicar solo propiedades presentes (evita reset por defaults de deserialización).

⚠️ Estado:
- **Código preparado**, pero el proyecto `Slbf.Services.Rest` no compila en este entorno local por dependencias legacy (`MSB3822/MSB3823`, `System.Web.*`, `Common.Logging`, `SoftGuard.VuPoint`).
- Requiere build/deploy en ambiente completo para quedar efectivo en runtime.

---

## 4) Validación rápida recomendada (post-deploy)

1. Crear contrato con:
   - `cnt_dinamico=1`
   - `cnt_cantidad_auto=1`
2. Confirmar por `GET` que ambos queden en `1`.
3. Ejecutar `PUT` parcial `{ Id, cnt_estado: 2 }`.
4. Confirmar que **no** se reseteen los demás enteros.
5. Ejecutar Playwright:
   - `webmg/dk1498-ui-real.spec.ts` (`Caso G`, `webmg-local`).

---

## 5) Archivos clave tocados

- `tools/gcs/sql/dk1498_fix_crm_contrato_cnt_cantidad_auto.sql`
- `tools/gcs/sql/DK1498_CRITICAL_RUNBOOK.md` (este documento)
- `slbf.generator/Slbf.Generator/v1.0.4/JSModel.xsl`
- `slbf.generator/Slbf.Generator/v1.0.4/CSRestService.xsl`
- `softguard.businessobjects/SoftGuard.BusinessObjects/Slbf.Services.Rest/crm_contratoRestService.cs`
- `qa-automation/tests/webmg/dk1498-ui-real.spec.ts`
