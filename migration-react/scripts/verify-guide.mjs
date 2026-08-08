/**
 * verify-guide.mjs
 * 
 * Abre la app con Playwright, pasa el splash, hace login, abre la guía
 * y toma screenshots de cada paso para verificar que las imágenes cargan.
 */

import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const VERIFY_DIR = join(PROJECT_ROOT, 'public', 'guide', 'verify');

if (!existsSync(VERIFY_DIR)) mkdirSync(VERIFY_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('🔍 Verificando la Guía Interactiva con Playwright...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    // 1. Navegar a la app
    console.log('📱 Navegando a http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
    
    // 2. Esperar que el splash screen (4 segundos) termine
    console.log('⏳ Esperando splash screen (5s)...');
    await sleep(5500);

    // 3. Ahora debería estar en el login
    await page.screenshot({ path: join(VERIFY_DIR, '00-login.png') });
    console.log('  ✅ 00-login.png');

    // 4. Hacer submit del formulario de login (click en "Ingresar")
    console.log('🔐 Haciendo login...');
    const loginBtn = await page.locator('button:has-text("Ingresar")');
    if (await loginBtn.count() > 0) {
      await loginBtn.click();
      console.log('  → Click en Ingresar');
    } else {
      // Intentar submit del form
      await page.locator('form').first().evaluate(form => form.submit());
      console.log('  → Form submit directo');
    }
    await sleep(3000);

    // 5. Verificar que estamos en el desktop
    await page.screenshot({ path: join(VERIFY_DIR, '01-desktop.png') });
    console.log('  ✅ 01-desktop.png (Desktop cargado)');

    // 6. Buscar el botón de GUÍA INTERACTIVA
    console.log('\n📖 Buscando botón GUÍA INTERACTIVA...');
    
    // El botón tiene texto "GUÍA INTERACTIVA" dentro de un div con title "Abrir Guía..."
    const guiaBtn = await page.locator('[title*="Guía"]').first();
    if (await guiaBtn.count() > 0) {
      console.log('  → Encontrado [title*="Guía"]');
      await guiaBtn.click();
    } else {
      // Fallback: buscar por texto
      const textBtn = await page.locator('text=GUÍA INTERACTIVA').first();
      if (await textBtn.count() > 0) {
        console.log('  → Encontrado por texto');
        await textBtn.click();
      } else {
        console.log('  ❌ No se encontró el botón de guía');
        // Último intento: buscar cualquier elemento con HelpCircle
        const allText = await page.textContent('body');
        console.log('  Texto visible (primeros 500 chars):', allText?.slice(0, 500));
        return;
      }
    }
    await sleep(2000);

    // 7. Capturar cada paso de la guía
    console.log('\n📸 Capturando pasos de la guía...');
    
    // Step 1
    await page.screenshot({ path: join(VERIFY_DIR, '02-guide-step1.png') });
    console.log('  ✅ 02-guide-step1.png (Paso 1: Rejilla de Módulos)');

    // Step 2
    await page.locator('button:has-text("Siguiente")').click();
    await sleep(1500);
    await page.screenshot({ path: join(VERIFY_DIR, '03-guide-step2.png') });
    console.log('  ✅ 03-guide-step2.png (Paso 2: Gestor de Ventanas)');

    // Step 3
    await page.locator('button:has-text("Siguiente")').click();
    await sleep(1500);
    await page.screenshot({ path: join(VERIFY_DIR, '04-guide-step3.png') });
    console.log('  ✅ 04-guide-step3.png (Paso 3: Menú Inicio)');

    // Step 4
    await page.locator('button:has-text("Siguiente")').click();
    await sleep(1500);
    await page.screenshot({ path: join(VERIFY_DIR, '05-guide-step4.png') });
    console.log('  ✅ 05-guide-step4.png (Paso 4: Telemetría)');

    // 8. Test zoom: clic en la imagen del screenshot
    console.log('\n🔍 Probando zoom clic en imagen...');
    const mediaContainer = await page.locator('.group\\/media').first();
    if (await mediaContainer.count() > 0) {
      await mediaContainer.click();
      await sleep(1500);
      await page.screenshot({ path: join(VERIFY_DIR, '06-zoom-fullscreen.png') });
      console.log('  ✅ 06-zoom-fullscreen.png (Zoom imagen ampliada)');
      // Cerrar zoom con ESC
      await page.keyboard.press('Escape');
      await sleep(500);
    }

    // 9. Cerrar guía con "Entendido"
    const entendidoBtn = await page.locator('button:has-text("Entendido")');
    if (await entendidoBtn.count() > 0) {
      await entendidoBtn.click();
      await sleep(1000);
    }

    await page.screenshot({ path: join(VERIFY_DIR, '07-guide-closed.png') });
    console.log('  ✅ 07-guide-closed.png (Guía cerrada, desktop visible)');

    console.log('\n✨ ¡Verificación completada exitosamente!');
    console.log(`   Screenshots en: ${VERIFY_DIR}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: join(VERIFY_DIR, 'error-state.png') });
    console.log('  📸 error-state.png guardado para diagnóstico');
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

main();
