# Testing Patterns — Softguard Desktop

## ExtJS Tree Panel Click
- `Ext.tree.Panel` (`moduletreeview`) does NOT support `fireEvent('itemclick')` — it crashes with `TypeError: Cannot read properties of undefined (reading 'position')` because TreeView.onItemClick expects DOM position data
- **Solution**: Use Playwright DOM locator `page.locator('.x-tree-node-text')` and loop to find + click the matching node text
- First verify the node exists in the ExtJS store via `page.evaluate()`, then click via Playwright locator

## Button Visibility in Nested Panels
- When a form opens as a tab inside `organizationmgview` (not as a top-level center tab), global `clickExtButton('Guardar')` finds a hidden button from a different panel
- **Solution**: Use `page.evaluate()` to find the button within the specific component: `ext.ComponentQuery.query('comprobanteformview')[0].down('#save')` then `btn.fireEvent('click', btn)`
- Same applies to "Eliminar" and other toolbar buttons

## Comprobante Creation Flow Navigation
- **"Nuevo comprobante" button** is ONLY visible when navigating via: Organizaciones grid → dblclick org → `organizationmgview` → tree "Comprobantes" node → `comprobantegridview`
- Toolbar path (`WebMGController.openView('comprobantegridview')`) sets `hideNew: true` — no org context
- `ComprobanteFormController.initview` checks `cli_iOrganizacion == 0` → shows "Falta organizacion facturadora" → closes form
- Required field: "Tipo comprobante" (`#cbc_ctipocbte`) with `allowBlank: false` — must be filled before save

## _ncomprobante Computed Field
- `_ncomprobante` is a computed field (prefijo + numero formatted)
- After save, server may correct it from `0000-0000000000` to real value (e.g., `0001-0000000004`)
- Don't hard-assert on `_ncomprobante` equality before/after save — use soft logging
- Hard invariants for re-save: Id, cbc_inumerocbte, cbc_cprefijocbte, cbc_ctipocbte, cbc_icliente

## Test Suite State (June 2025)
- `comprobante-creation-flow.spec.ts`: 8 tests — 8 passed (nav, toolbar, full create flow + re-save, re-save existing, close/reopen, updateRecord debug, REST capture)
- `comprobante-crud.spec.ts`: Data-dependent — may fail if creation flow modifies the Pendiente record being tested
- `diagnostic.spec.ts`: Flaky — depends on remote GCS availability
- Full suite: 31 passed, 1 skipped, 2 known failures (diagnostic + data-dependent crud field test)
