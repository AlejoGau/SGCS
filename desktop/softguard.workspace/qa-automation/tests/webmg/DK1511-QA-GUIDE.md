# DK-1511 — Guía QA (Restricción por Organización Facturadora)

## Objetivo

Validar que el usuario logueado **solo pueda operar con su organización facturadora asociada**.

Aplica a:
- Exportación TXT mensual (`ExportTxtMG`)
- Facturador de novedades (`MG_LoteFacturasByFilters`)
- Facturador de contratos (`MG_ContratosGenerarFacturas`)

---

## Regla funcional esperada

1. En los combos de **Empresa Facturadora** no deben aparecer organizaciones ajenas al usuario.
2. Si por algún motivo se intenta operar con una organización no permitida, la UI debe bloquear la acción y mostrar mensaje de permisos.
3. Si no se puede determinar organización del usuario, la UI no debe habilitar facturación/exportación.

---

## Casos manuales

### Caso A — Exportación TXT mensual

1. Ir a `Facturación > Exportación TXT mensual`.
2. Abrir combo `Empresa Facturadora`.

**Esperado**
- Solo aparecen organizaciones habilitadas del usuario.
- No se listan organizaciones de terceros.

3. Seleccionar período y exportar.

**Esperado**
- Exporta correctamente con la organización permitida.

### Caso B — Facturador de novedades

1. Ir a `Facturación > Novedades`.
2. Revisar combo `Empresa Facturadora`.

**Esperado**
- Solo org(s) permitida(s).

3. Ejecutar `Buscar`, `Generar Novedades` y `Facturar`.

**Esperado**
- Acciones funcionan para org permitida.
- No permite operar con org no permitida.

### Caso C — Facturador de contratos

1. Ir a `Facturación > Contratos`.
2. Revisar combo `Empresa Facturadora`.

**Esperado**
- Solo org(s) permitida(s).

3. Ejecutar `Facturar`.

**Esperado**
- Factura solo para org permitida.
- Si la org no corresponde, bloquea con mensaje de permisos.

### Caso D — Usuario sin org resoluble (edge)

Precondición: usuario sin `Company/OrganizationId` resoluble.

**Esperado**
- Controles de operación deshabilitados.
- Mensaje de permisos indicando que no se pudo determinar la organización del usuario.

---

## Checklist de aprobación

- [ ] Export TXT no muestra orgs ajenas.
- [ ] Facturador Novedades no muestra orgs ajenas.
- [ ] Facturador Contratos no muestra orgs ajenas.
- [ ] La UI bloquea intentos fuera de org permitida.
- [ ] No hay regresión en operación normal con org permitida.

---

## Nota importante

Este cambio refuerza la restricción en frontend. Si se requiere enforcement 100% anti-manipulación, se recomienda validar también en backend (handlers/SP) que el `orgId/idorganizacion` pertenezca al usuario autenticado.
