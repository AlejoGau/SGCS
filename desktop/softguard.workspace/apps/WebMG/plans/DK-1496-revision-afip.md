# DK-1496 — Revisión Integral AFIP

## Épica
**DK-1496** — MGF - Revisión integral AFIP

## Tareas
- DK-1512 (BA) — Gap analysis de integración AFIP ✅
- DK-1513 (DEV) — Corregir gaps de integración AFIP
- DK-1514 (QA) — Validar AFIP en homologación

## Objetivo
Auditar la integración existente con AFIP, identificar gaps y corregirlos para alcanzar una integración confiable de factura electrónica.

## Estado Actual — Lo que YA EXISTE

### Tablas AFIP

**`_Datos.dbo.MG_Afip_Cae`** — Cola de solicitudes CAE:
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `mac_idkey` | int | PK |
| `mac_idcbte` | int | FK → m_comprobantes_cab_fc.cbc_icodigo_id |
| `mac_estado` | int | NULL=pendiente, valor numérico=procesado |
| `mac_fechamod` | datetime | Última modificación |

**`_Datos.dbo.MG_Afip_Cae_Ws`** — Log de comunicación con webservice:
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `mcw_macidkey` | int | FK → MG_Afip_Cae.mac_idkey |
| `mcw_estado` | int | Resultado |
| `mcw_fecha` | datetime | Fecha de la comunicación |
| `mcw_requesturl` | varchar(1024) | URL del WS |
| `mcw_requestxml` | varchar(MAX) | XML enviado |
| `mcw_responsexml` | varchar(MAX) | XML recibido |

### SPs existentes

**`AfipCaePendingSearch`** — Obtiene comprobantes pendientes de CAE:
```sql
SELECT * FROM MG_Afip_Cae
INNER JOIN m_comprobantes_cab_fc ON mac_idcbte = cbc_icodigo_id
INNER JOIN t_organizacion_fc ON cbc_iorganizacionfacturadora = org_icodigo_id
INNER JOIN Organization o ON Account = cbc_iCliente
INNER JOIN t_comprobantes_fc ON (cbt_ccodigo = cbc_ctipocbte 
    AND cbt_idOrganizacionFacturadora = org_icodigo_id)
WHERE mac_estado IS NULL
```

**`AfipCaeSetComprobante`** — Actualiza CAE en comprobante:
```sql
UPDATE m_comprobantes_cab_fc 
SET cbc_cCAE = @cbc_ccae, cbc_cvtocae = @cbc_cvtocae 
WHERE cbc_icodigo_id = @cbc_icodigo
```

**`AfipCaeResponseSearch`** — Guarda respuesta del WS + actualiza estado:
```sql
UPDATE MG_Afip_Cae SET mac_estado = @mcw_estado, mac_fechamod = GETDATE() 
    WHERE mac_idkey = @mcw_macidkey
INSERT INTO MG_Afip_Cae_Ws (mcw_macidkey, mcw_estado, mcw_fecha, 
    mcw_requesturl, mcw_requestxml, mcw_responsexml) VALUES (...)
```

**`AfipCaeComprobanteImpuestoSearch`** — Agrupa impuestos por código AFIP:
```sql
SELECT max(mci_cbcicodigoid), sum(mci_total), sum(mci_baseimponible), 
    max(mci_mgmidkey), imp_extcode  -- ← CÓDIGO AFIP
FROM MG_comprobante_impuesto
INNER JOIN t_impuestos_fc ON mci_impidkey = imp_idkey
WHERE mci_cbcicodigoid = @cbcicodigoid
GROUP BY imp_extcode
```

### Campos clave existentes

| Campo | Tabla | Significado |
|-------|-------|-------------|
| `imp_extcode` | t_impuestos_fc | **Código AFIP de alícuota IVA** (5=21%, 4=10.5%, 6=27%) |
| `cbt_nCbteCAE` | t_comprobantes_fc | **Código AFIP de tipo comprobante** (1=FA, 6=FB, etc.) |
| `org_factelect` | t_organizacion_fc | Flag factura electrónica habilitada |
| `cbc_ccae` | m_comprobantes_cab_fc | CAE asignado |
| `cbc_cvtocae` | m_comprobantes_cab_fc | Vencimiento del CAE |

### Flujo existente

```
1. Comprobante se activa (cbc_cestado = 1)
2. Se inserta registro en MG_Afip_Cae (mac_estado = NULL → pendiente)
3. Servicio backend .NET consume:
   a. WSAA → obtiene Token + Sign (certificado digital)
   b. WSFE.FECAESolicitar → envía datos del comprobante
4. AFIP responde con CAE + Vto CAE
5. AfipCaeSetComprobante → actualiza cbc_ccae y cbc_cvtocae
6. AfipCaeResponseSearch → loguea request/response XML
```

## Gap Analysis

### Gaps Críticos (resolver en DK-1513)

| # | Gap | Severidad | Estado actual | Acción |
|---|-----|-----------|---------------|--------|
| G1 | Mapeo tipos comprobante → código AFIP | **BAJO** | `cbt_nCbteCAE` YA EXISTE | Verificar que todos los tipos estén mapeados (especialmente NC y ND) |
| G2 | Mapeo alícuotas IVA → código AFIP | **BAJO** | `imp_extcode` YA EXISTE | Verificar que todas las alícuotas tengan extcode correcto |
| G3 | Certificado digital — vigencia | **MEDIO** | Desconocido | Auditar dónde se almacena, cuándo vence, agregar alerta |
| G4 | Reintentos si AFIP falla | **MEDIO** | No hay — queda mac_estado NULL forever | Implementar reprocesamiento periódico de pendientes |
| G5 | SELECT * en AfipCaePendingSearch | **BAJO** | Funciona pero no es óptimo | Especificar campos explícitos |

### Gaps Funcionales

| # | Gap | Acción |
|---|-----|--------|
| G6 | NC/ND electrónicas | Verificar si al crear NC/ND se insertan en MG_Afip_Cae |
| G7 | UI estado de CAE pendientes | No hay vista para monitorear — crear grilla de MG_Afip_Cae |
| G8 | Ambiente homologación vs producción | Verificar cómo se configura — flag en org_cmetadata o config del backend |
| G9 | Concepto de servicio (2) vs producto (1) | WSFE requiere CbteAsoc y concepto — verificar si se envía correctamente |

## Implementación (DK-1513)

### Fase 1 — Auditoría
1. Revisar el código .NET del servicio de AFIP (buscar referencias a WSAA, WSFE, FECAESolicitar)
2. Verificar certificado digital: ubicación, formato (.pfx/.p12), fecha de vencimiento
3. Verificar mapeo completo de `cbt_nCbteCAE` para todos los tipos de comprobante
4. Verificar mapeo de `imp_extcode` para todas las alícuotas
5. Verificar si NC/ND pasan por el flujo de MG_Afip_Cae

### Fase 2 — Correcciones
1. Completar mapeos faltantes (si los hay)
2. Implementar reprocesamiento de CAE pendientes (job/scheduler o botón manual)
3. Mejorar AfipCaePendingSearch (campos explícitos en vez de SELECT *)
4. Agregar alerta de vencimiento de certificado

### Fase 3 — UI
1. Crear grilla de estado AFIP en WebMG:
   - Listado de MG_Afip_Cae con estado, fecha, comprobante asociado
   - Botón "Reprocesar pendientes"
   - Detalle: ver request/response XML de MG_Afip_Cae_Ws

### Fase 4 — Homologación (DK-1514)
1. Configurar ambiente de homologación AFIP
2. Emitir facturas de test
3. Verificar respuestas de AFIP
4. Validar con datos de producción simulados

## Archivos impactados

| Archivo | Cambio |
|---------|--------|
| Backend .NET — servicio AFIP | Auditar y corregir |
| `AfipCaePendingSearch.sql` | Reemplazar SELECT * por campos explícitos |
| Nuevo SP `AfipCaeReprocesar` | Reprocesar pendientes |
| Nueva view `AfipCaeGridView.js` | Grilla de estado AFIP |
| Nuevo controller `AfipCaeGridController.js` | Lógica de la grilla |
| `MoneyGuardModuleStore.js` | Entrada de menú "Estado AFIP" |

## Criterios de Aceptación
1. Mapeos de tipos de comprobante y alícuotas verificados y completos
2. Estado del certificado digital documentado
3. Gaps corregidos o documentados con plan de acción
4. Grilla de estado AFIP funcional
5. Homologación exitosa con AFIP (DK-1514)
