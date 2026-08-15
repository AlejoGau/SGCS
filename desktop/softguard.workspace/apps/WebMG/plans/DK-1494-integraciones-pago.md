# DK-1494 — Integraciones de Pago en Factura

## Épica
**DK-1494** — MGF - Integraciones de pago en factura

## Tareas
- DK-1505 (BA) — Relevar integraciones de pago ✅
- DK-1506 (DEV) — Implementar Mercado Pago fijo y Pago Fácil configurable
- DK-1507 (DEV) — Corregir visibilidad de integraciones en org facturadora
- DK-1508 (QA) — Validar integraciones de pago

## Dependencia
**DK-1493 debe estar implementado primero** — define la estructura base de `org_cmetadata`.

## Objetivo
Mostrar medios de pago configurables en el PDF de factura, permitiendo que cada org facturadora habilite/deshabilite integraciones y configure sus datos.

## Contexto: tabla MG_informacion_pago

Ya existe `_Datos.dbo.MG_informacion_pago` para métodos de pago del CLIENTE (tarjeta, débito):

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `mip_idcliente` | int | FK → Organization.Id |
| `mip_fpgidkey` | int | FK → t_formas_pago_fc |
| `mip_codigo` | varchar | Número de tarjeta / código |
| `mip_nombreusuario` | varchar | Nombre en la tarjeta |
| `mip_emisor` | int | FK → MG_MaestroCuentas |
| `mip_fechadesde/hasta` | datetime | Vigencia |

**Decisión:** Las integraciones de pago en la factura son a nivel ORGANIZACIÓN FACTURADORA (cómo la empresa recibe pagos), no a nivel cliente. Se configuran en `org_cmetadata`, no en `MG_informacion_pago`.

## Almacenamiento

En `org_cmetadata.factura.integraciones_pago`:

```json
{
  "factura": {
    "observaciones_template": "...",
    "footer_fijo": "...",
    "integraciones_pago": {
      "transferencia": {
        "habilitado": true,
        "banco": "Banco Nación",
        "cbu": "0000000000000000000000",
        "alias": "SOFTGUARD-PAGOS",
        "titular": "Softguard SRL",
        "cuit_titular": "30-12345678-9"
      },
      "mercadopago": {
        "habilitado": true,
        "tipo": "link_fijo",
        "url": "https://mpago.la/softguard",
        "mostrar_qr": true
      },
      "pagofacil": {
        "habilitado": false,
        "codigo_entidad": "4523",
        "template_codigo": "{{codigo_entidad}}{{cliente_numero}}"
      },
      "rapipago": {
        "habilitado": false,
        "codigo_entidad": "3891",
        "template_codigo": "{{codigo_entidad}}{{cliente_numero}}"
      },
      "debito_automatico": {
        "habilitado": false,
        "texto": "El importe será debitado automáticamente de su cuenta."
      }
    }
  }
}
```

## Implementación

### DK-1506 — Mercado Pago fijo y Pago Fácil

**Backend (ComprobantePdfMG):**
1. Después de renderizar observaciones y footer fijo (DK-1493), agregar bloque "MEDIOS DE PAGO"
2. Iterar las integraciones habilitadas y renderizar cada una:
   - **Transferencia:** CBU, Alias, Banco, Titular + CUIT
   - **Mercado Pago:** Link de pago, opcionalmente QR estático (generar imagen QR del URL server-side)
   - **Pago Fácil/Rapipago:** Código de pago (interpolar `{{cliente_numero}}` con cli_inumero)
   - **Débito automático:** Texto informativo

**QR de Mercado Pago:**
- Fase 1: QR estático generado del URL fijo (librería .NET de generación QR, ej: QRCoder)
- Fase 2 (futuro): QR dinámico con monto via API MP OAuth — fuera de alcance

### DK-1507 — UI de configuración

**Archivos:**
- `AdministratorSearch/app/view/t_organizacion_fcFormView.js` — fieldset "Integraciones de Pago":
  - Por cada integración: checkbox "Habilitado" + campos específicos (deshabilitados si checkbox off)
  - Transferencia: textfields para banco, CBU, alias, titular, CUIT
  - Mercado Pago: textfield URL, checkbox mostrar QR
  - Pago Fácil: textfield código entidad
  - Rapipago: textfield código entidad
  - Débito automático: textarea texto

- `AdministratorSearch/app/controller/t_organizacion_fcFormController.js`:
  - Al guardar: leer campos → construir JSON de integraciones → mergear en org_cmetadata
  - Al cargar: parsear org_cmetadata → popular campos

## Orden de render en PDF

```
TOTALES
├── Observaciones dinámicas (DK-1493)
├── MEDIOS DE PAGO (DK-1494)   ← NUEVO
│   ├── 🏦 Transferencia Bancaria
│   ├── 💳 Mercado Pago + QR
│   ├── 📋 Pago Fácil
│   ├── 📋 Rapipago
│   └── 🔄 Débito Automático
└── Footer legal fijo (DK-1493)
```

## Riesgos
- **Pago Fácil/Rapipago:** Requiere convenio previo con la entidad recaudadora
- **Código de barras:** Si se necesita barcode en PDF, requiere librería server-side
- **QR dinámico MP:** Requiere OAuth + API MP — fuera de alcance fase 1

## Criterios de Aceptación
1. Las integraciones habilitadas se muestran en el PDF de factura
2. Las integraciones deshabilitadas no aparecen
3. QR de MP se genera correctamente si está habilitado
4. La UI permite habilitar/deshabilitar y configurar cada integración
5. Los datos de transferencia se muestran legibles
