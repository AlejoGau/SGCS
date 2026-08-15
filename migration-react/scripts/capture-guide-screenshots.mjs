/**
 * capture-guide-screenshots.mjs
 * 
 * Playwright script para capturar screenshots reales de la app
 * para usar en la guía interactiva (ModuleHelpGuide).
 * 
 * Uso:
 *   1. Asegúrate de que la app esté corriendo: npm run dev
 *   2. Ejecuta: npm run capture-guide
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const GUIDE_DIR = join(PROJECT_ROOT, 'public', 'guide');

const BASE_URL = process.env.APP_URL || 'http://localhost:5173';
const VIEWPORT = { width: 1440, height: 900 };

if (!existsSync(GUIDE_DIR)) mkdirSync(GUIDE_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function screenshot(page, filename, options = {}) {
  const filePath = join(GUIDE_DIR, filename);
  await page.screenshot({ path: filePath, fullPage: false, ...options });
  console.log(`  ✅ ${filename}`);
}

/** Cierra todas las ventanas abiertas via su botón X */
async function closeAllWindows(page) {
  const closeButtons = await page.locator('[title="Cerrar"]');
  const count = await closeButtons.count();
  for (let i = count - 1; i >= 0; i--) {
    try { await closeButtons.nth(i).click({ timeout: 2000 }); } catch { }
    await sleep(200);
  }
  await sleep(500);
}

/** Abre un módulo haciendo click forzado en su ícono del desktop */
async function openModule(page, moduleName) {
  // Utilizar el span exacto del ícono del grid de módulos
  const icon = page.locator(`span.truncate:has-text("${moduleName}")`).first();
  if (await icon.count() > 0) {
    await icon.click({ force: true });
    await sleep(1500);
    return true;
  }
  return false;
}

// ─── MAIN ────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Capturando screenshots reales para la Guía Interactiva');
  console.log(`   App: ${BASE_URL}  |  Output: ${GUIDE_DIR}\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    // ─── SPLASH + LOGIN ────────────────────────────────────────
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });
    console.log('⏳ Splash screen...');
    await sleep(5500);

    console.log('🔐 Login...');
    const loginBtn = page.locator('button:has-text("Ingresar")');
    if (await loginBtn.count() > 0) {
      await loginBtn.click();
      await sleep(2500);
    }
    console.log('  → En el dashboard\n');

    // ═══════════════════════════════════════════════════════════
    // DESKTOP CAPTURES
    // ═══════════════════════════════════════════════════════════
    console.log('📸 DESKTOP');

    // Step 1: Desktop limpio con grilla de módulos
    await closeAllWindows(page);
    await sleep(800);
    await screenshot(page, 'desktop-step1-modules-grid.png');

    // Step 2: Múltiples ventanas (abrimos 3 módulos)
    await openModule(page, 'Cuentas');
    await openModule(page, 'TrackGuard');
    await sleep(1000);
    await screenshot(page, 'desktop-step2-window-manager.png');

    // Step 3: Menú Inicio
    const inicioBtn = page.locator('button:has-text("Inicio"), div:has-text("Inicio")').first();
    if (await inicioBtn.count() > 0) {
      await inicioBtn.click({ force: true });
      await sleep(1200);
    }
    await screenshot(page, 'desktop-step3-start-menu.png');
    await page.keyboard.press('Escape');
    await sleep(300);

    // Step 4: Zona de telemetría (superior derecha)
    await closeAllWindows(page);
    await sleep(500);
    await screenshot(page, 'desktop-step4-telemetry.png', {
      clip: { x: 850, y: 0, width: 590, height: 320 }
    });

    // ═══════════════════════════════════════════════════════════
    // BILLING CAPTURES
    // ═══════════════════════════════════════════════════════════
    console.log('\n📸 CUENTAS Y FACTURACIÓN');

    await closeAllWindows(page);
    await openModule(page, 'Cuentas');
    await sleep(1000);

    // Step 1: Vista general con pestañas
    await screenshot(page, 'billing-step1-tabs.png');

    // Step 2: Buscar menú lateral (podría estar en la vista de cuenta)
    // Click en alguna cuenta si hay grid
    const verBtn = page.locator('button:has-text("Ver"), button:has-text("Editar")').first();
    if (await verBtn.count() > 0) {
      await verBtn.click({ force: true });
      await sleep(1200);
    }
    await screenshot(page, 'billing-step2-menu-lateral.png');

    // Step 3: Grid de cuentas
    await screenshot(page, 'billing-step3-grid.png');

    // Step 4: Formulario
    await screenshot(page, 'billing-step4-formulario.png');

    // ═══════════════════════════════════════════════════════════
    // TRACKGUARD CAPTURES
    // ═══════════════════════════════════════════════════════════
    console.log('\n📸 TRACKGUARD GPS');

    await closeAllWindows(page);
    await openModule(page, 'TrackGuard');
    await sleep(2500); // Extra time for WebGL map

    // Step 1: Mapa
    await screenshot(page, 'trackguard-step1-map.png');

    // Step 2: Live stream toggle
    const liveBtn = page.locator('text=Live').first();
    if (await liveBtn.count() > 0) {
      await liveBtn.click({ force: true });
      await sleep(2000);
    }
    await screenshot(page, 'trackguard-step2-streaming.png');

    // Step 3: Panel lateral
    await screenshot(page, 'trackguard-step3-fleet-panel.png');

    // Step 4: Click en vehículo (marker)
    const vehicleItem = page.locator('[class*="vehicle"], [class*="marker"], [data-vehicle]').first();
    if (await vehicleItem.count() > 0) {
      await vehicleItem.click({ force: true });
      await sleep(1200);
    }
    await screenshot(page, 'trackguard-step4-telemetry-modal.png');

    // ═══════════════════════════════════════════════════════════
    // ADMIN CAPTURES
    // ═══════════════════════════════════════════════════════════
    console.log('\n📸 CONFIGURACIÓN');

    await closeAllWindows(page);
    await openModule(page, 'Configuración');
    await sleep(1500);

    // Step 1: Parámetros
    await screenshot(page, 'admin-step1-params.png');

    // Step 2: Permisos
    const permTab = page.locator('button:has-text("Permisos"), [role="tab"]:has-text("Permisos")').first();
    if (await permTab.count() > 0) {
      await permTab.click({ force: true });
      await sleep(1000);
    }
    await screenshot(page, 'admin-step2-permisos.png');

    // Step 3: Diagnóstico / Infraestructura
    const diagTab = page.locator('button:has-text("Diagnóstico"), button:has-text("Servidores"), button:has-text("Infraestructura")').first();
    if (await diagTab.count() > 0) {
      await diagTab.click({ force: true });
      await sleep(1000);
    }
    await screenshot(page, 'admin-step3-diagnostico.png');

    // ═══════════════════════════════════════════════════════════
    // ACCESSCONTROL CAPTURES
    // ═══════════════════════════════════════════════════════════
    console.log('\n📸 CONTROL DE ACCESO');

    // Solapas de nivel superior son <div>, las sub-solapas dentro de una ficha son <button>
    // (misma etiqueta de texto en ambas, por eso se distinguen por tag).
    const clickTopTab = async (label) => {
      const tab = page.locator('div').filter({ hasText: new RegExp(`^${label}$`) }).first();
      if (await tab.count() > 0) { await tab.click({ force: true }); await sleep(900); }
    };
    const clickSubTab = async (label) => {
      const tab = page.locator(`button:has-text("${label}")`).first();
      if (await tab.count() > 0) { await tab.click({ force: true }); await sleep(600); }
    };

    // Step 1: Bienvenido — búsqueda rápida (pestaña inicial del módulo)
    await closeAllWindows(page);
    await openModule(page, 'Control de Acceso');
    await sleep(1200);
    await screenshot(page, 'accesscontrol-step1-bienvenido.png');

    // Step 2: Personas — ficha de detalle con sub-solapas
    await clickTopTab('Personas');
    const firstPersonaRow = page.locator('table tbody tr').first();
    if (await firstPersonaRow.count() > 0) {
      await firstPersonaRow.dblclick({ force: true });
      await sleep(700);
    }
    await screenshot(page, 'accesscontrol-step2-personas.png');

    // Step 3: Autorizaciones — se crean desde adentro de la ficha (sub-solapa), no desde la pestaña global
    await clickSubTab('Autorizaciones');
    await clickSubTab('Nueva Autorización');
    const lunes = page.locator('label:has-text("Lunes")').first();
    if (await lunes.count() > 0) await lunes.click({ force: true });
    const martes = page.locator('label:has-text("Martes")').first();
    if (await martes.count() > 0) await martes.click({ force: true });
    const todoElDiaLabel = page.locator('label:has-text("Todo el día")').first();
    if (await todoElDiaLabel.count() > 0) {
      await todoElDiaLabel.click({ force: true });
      await sleep(300);
    }
    await screenshot(page, 'accesscontrol-step3-autorizaciones.png');

    // Step 4: Ingresos/Egresos — log de marcaciones
    await closeAllWindows(page);
    await openModule(page, 'Control de Acceso');
    await sleep(1000);
    await clickTopTab('Ingresos/Egresos');
    await screenshot(page, 'accesscontrol-step4-ingresos-egresos.png');

    // Step 5: Unidades Funcionales — grilla, doble clic abre el árbol de la cuenta
    await closeAllWindows(page);
    await openModule(page, 'Control de Acceso');
    await sleep(1000);
    await clickTopTab('Unidades Funcionales');
    const firstUnidadRow = page.locator('table tbody tr').first();
    if (await firstUnidadRow.count() > 0) {
      await firstUnidadRow.dblclick({ force: true });
      await sleep(700);
    }
    await screenshot(page, 'accesscontrol-step5-unidades.png');

    // ═══════════════════════════════════════════════════════════
    console.log('\n✨ ¡Capturas completadas exitosamente!');
    console.log(`   ${GUIDE_DIR}`);

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    await page.screenshot({ path: join(GUIDE_DIR, 'error-state.png') });
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

main();
