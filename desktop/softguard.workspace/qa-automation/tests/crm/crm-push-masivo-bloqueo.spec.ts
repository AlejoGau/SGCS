import { test, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * DSS-1521 — CRM deployado en GCS: bloqueo del botón Enviar durante push masivo.
 *
 * Valida el build publicado en:
 *   https://gcs.softguard.com/apps/SgWebCrm/DSS-1521-bloquear-boton-accion-envio-generar-mensajes-masivos/
 *
 * No envía pushes reales: stubbea Ext.Ajax.request y captura solo el request a
 * SmartpanicSendMessage para verificar anti-doble-click, loading visual y recuperación.
 */

const deployUrl = process.env.CRM_PUSH_DEPLOY_URL ||
  'https://gcs.softguard.com/apps/SgWebCrm/DSS-1521-bloquear-boton-accion-envio-generar-mensajes-masivos/';
const screenshotsDir = path.resolve(__dirname, '..', '..', 'reports', 'crm-push-masivo-bloqueo-gcs');

test.beforeAll(() => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

async function gotoDeployedCrm(page: Page): Promise<void> {
  await page.goto(deployUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    if (!ext || !ext.isReady || !ext.ComponentQuery) {
      return false;
    }
    const vp = ext.ComponentQuery.query('viewport')[0];
    return !!(vp && vp.rendered);
  }, { timeout: 120_000, polling: 500 });
}

async function waitForSmartpanicsClasses(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    return !!(
      ext &&
      ext.ClassManager &&
      ext.ClassManager.get('Common.controller.SmartpanicsCrmGridController') &&
      ext.ClassManager.get('Common.view.SmartpanicsCrmGridView')
    );
  }, { timeout: 30_000, polling: 300 });
}

async function openPushWindowAndDoubleClick(page: Page) {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const winAny = window as any;

    if (winAny.__pushBlockTest && winAny.__pushBlockTest.restore) {
      winAny.__pushBlockTest.restore();
    }

    ext.WindowManager.each((win: any) => {
      const title = win && win.title ? String(win.title).toLowerCase() : '';
      if (title === 'enviar mensaje') {
        win.close();
      }
    });

    const originalAjaxRequest = ext.Ajax.request;
    const originalNotify = winAny.notify;
    const capturedSendRequests: any[] = [];
    const notifications: string[] = [];

    winAny._UserData = winAny._UserData || { udw_idKey: 999999 };
    winAny.notify = (message: string) => notifications.push(message);

    winAny.__pushBlockTest = {
      pendingSuccess: null as null | Function,
      pendingFailure: null as null | Function,
      capturedSendRequests,
      notifications,
      restore: () => {
        ext.Ajax.request = originalAjaxRequest;
        winAny.notify = originalNotify;
        ext.WindowManager.each((win: any) => {
          const title = win && win.title ? String(win.title).toLowerCase() : '';
          if (title === 'enviar mensaje') {
            win.close();
          }
        });
        winAny.__pushBlockTest = null;
      },
    };

    ext.Ajax.request = (options: any) => {
      const isPushSend = options && options.url && options.url.indexOf('SmartpanicSendMessage') >= 0;

      if (isPushSend) {
        capturedSendRequests.push({
          url: options.url,
          method: options.method,
          params: options.params,
        });
        winAny.__pushBlockTest.pendingSuccess = options.success;
        winAny.__pushBlockTest.pendingFailure = options.failure;
        return { abort: () => undefined };
      }

      const response = { responseText: '{"rows":[],"total":0}' };
      if (options && options.success) {
        options.success(response, {});
      }
      if (options && options.callback) {
        options.callback(options, true, response);
      }
      return { abort: () => undefined };
    };

    const controller = ext.create('Common.controller.SmartpanicsCrmGridController');
    controller.getSmartpanicsCrmSoundsStoreStore = () => ext.create('Ext.data.Store', {
      fields: ['codigo', 'nombre', 'soundpath'],
      data: [{ codigo: '0', nombre: 'Sonido default', soundpath: '/sounds/notification_push.wav' }],
    });

    const fakeView = {
      store: {
        filters: {
          items: [{ property: 'cue_ncuenta:NOT', value: '' }],
        },
      },
      getSelectionModel: () => ({
        getSelection: () => [],
      }),
    };

    controller.onSendEmailClick({
      itemId: 'sendmailall',
      up: () => fakeView,
    });

    let win: any = null;
    ext.WindowManager.each((candidate: any) => {
      const title = candidate && candidate.title ? String(candidate.title).toLowerCase() : '';
      if (candidate && title === 'enviar mensaje' && !candidate.destroyed) {
        win = candidate;
      }
    });
    if (!win) {
      const titles: string[] = [];
      ext.WindowManager.each((candidate: any) => {
        titles.push(candidate ? String(candidate.title || candidate.xtype || candidate.id || '(sin titulo)') : '(null)');
      });
      throw new Error('No se abrió la ventana de Enviar mensaje. Ventanas: ' + titles.join(' | '));
    }

    win.down('#asunto').setValue('Prueba bloqueo push masivo GCS');
    win.down('#mensaje').setValue('Mensaje de prueba GCS — no se envía realmente');

    const sendButton = win.down('#sendPush');
    if (!sendButton) {
      throw new Error('No se encontró el botón Enviar (#sendPush)');
    }

    sendButton.fireEvent('click', sendButton);
    sendButton.fireEvent('click', sendButton);

    return {
      requestCount: capturedSendRequests.length,
      disabled: sendButton.isDisabled(),
      text: sendButton.getText(),
      sendingFlag: !!win.sendingPushMessages,
      loadingVisible: !!(win.loadMask && win.loadMask.isVisible && win.loadMask.isVisible()),
      params: capturedSendRequests[0] ? capturedSendRequests[0].params : null,
      currentUrl: winAny.location.href,
    };
  });
}

async function finishSuccessfulSend(page: Page) {
  return page.evaluate(() => {
    const winAny = window as any;
    const ext = winAny.Ext;
    const state = winAny.__pushBlockTest;
    if (!state || !state.pendingSuccess) {
      throw new Error('No hay request de envío pendiente para finalizar');
    }

    state.pendingSuccess({ responseText: '{}' }, {});

    const openPushWindows = ext.ComponentQuery.query('window').filter((win: any) => {
      const title = win && win.title ? String(win.title).toLowerCase() : '';
      return title === 'enviar mensaje' && win.isVisible();
    });
    const result = {
      openPushWindowCount: openPushWindows.length,
      notifications: state.notifications.slice(),
      requestCount: state.capturedSendRequests.length,
    };

    state.restore();
    return result;
  });
}

async function runFailureRecovery(page: Page) {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const winAny = window as any;

    if (winAny.__pushBlockTest && winAny.__pushBlockTest.restore) {
      winAny.__pushBlockTest.restore();
    }

    const originalAjaxRequest = ext.Ajax.request;
    const originalNotify = winAny.notify;
    const capturedSendRequests: any[] = [];
    const notifications: string[] = [];

    winAny._UserData = winAny._UserData || { udw_idKey: 999999 };
    winAny.notify = (message: string) => notifications.push(message);

    winAny.__pushBlockTest = {
      restore: () => {
        ext.Ajax.request = originalAjaxRequest;
        winAny.notify = originalNotify;
        ext.WindowManager.each((win: any) => {
          const title = win && win.title ? String(win.title).toLowerCase() : '';
          if (title === 'enviar mensaje') {
            win.close();
          }
        });
        winAny.__pushBlockTest = null;
      },
    };

    ext.Ajax.request = (options: any) => {
      const isPushSend = options && options.url && options.url.indexOf('SmartpanicSendMessage') >= 0;
      if (isPushSend) {
        capturedSendRequests.push({ url: options.url, method: options.method, params: options.params });
        if (options.failure) {
          options.failure({ status: 500, responseText: 'forced failure' }, {});
        }
        return { abort: () => undefined };
      }

      const response = { responseText: '{"rows":[],"total":0}' };
      if (options && options.success) {
        options.success(response, {});
      }
      if (options && options.callback) {
        options.callback(options, true, response);
      }
      return { abort: () => undefined };
    };

    const controller = ext.create('Common.controller.SmartpanicsCrmGridController');
    controller.getSmartpanicsCrmSoundsStoreStore = () => ext.create('Ext.data.Store', {
      fields: ['codigo', 'nombre', 'soundpath'],
      data: [{ codigo: '0', nombre: 'Sonido default', soundpath: '/sounds/notification_push.wav' }],
    });

    const fakeView = {
      store: { filters: { items: [{ property: 'cue_ncuenta:NOT', value: '' }] } },
      getSelectionModel: () => ({ getSelection: () => [] }),
    };

    controller.onSendEmailClick({ itemId: 'sendmailall', up: () => fakeView });

    let win: any = null;
    ext.WindowManager.each((candidate: any) => {
      const title = candidate && candidate.title ? String(candidate.title).toLowerCase() : '';
      if (candidate && title === 'enviar mensaje' && !candidate.destroyed) {
        win = candidate;
      }
    });
    if (!win) {
      throw new Error('No se abrió la ventana de Enviar mensaje para el escenario de failure');
    }

    win.down('#asunto').setValue('Prueba failure bloqueo push masivo GCS');
    win.down('#mensaje').setValue('Mensaje de prueba GCS — failure controlado');

    const sendButton = win.down('#sendPush');
    sendButton.fireEvent('click', sendButton);

    const result = {
      requestCount: capturedSendRequests.length,
      disabledAfterFailure: sendButton.isDisabled(),
      textAfterFailure: sendButton.getText(),
      sendingFlagAfterFailure: !!win.sendingPushMessages,
      loadingVisibleAfterFailure: !!(win.loadMask && win.loadMask.isVisible && win.loadMask.isVisible()),
      notifications,
      currentUrl: winAny.location.href,
    };

    winAny.__pushBlockTest.restore();
    return result;
  });
}

test.describe('DSS-1521 — CRM push masivo deployado en GCS', () => {
  test('el build deployado bloquea el botón Enviar y evita doble request', async ({ page }) => {
    await gotoDeployedCrm(page);
    await waitForSmartpanicsClasses(page);

    const stateDuring = await openPushWindowAndDoubleClick(page);
    console.log('[Push masivo GCS] Estado durante envío:', JSON.stringify(stateDuring, null, 2));

    await page.screenshot({ path: path.join(screenshotsDir, 'gcs-A-boton-bloqueado-loading.png') });
    await page.screenshot({
      path: path.join(screenshotsDir, 'gcs-A-boton-bloqueado-closeup.png'),
      clip: { x: 680, y: 220, width: 560, height: 470 },
    });

    expect(stateDuring.requestCount, 'El doble click en el build deployado debe generar un único request').toBe(1);
    expect(stateDuring.disabled, 'El botón Enviar debe quedar deshabilitado en el deploy').toBe(true);
    expect(stateDuring.text, 'El deploy debe mostrar estado de envío').toBe('Enviando mensajes...');
    expect(stateDuring.sendingFlag, 'La ventana deployada debe marcar envío en progreso').toBe(true);
    expect(stateDuring.loadingVisible, 'El deploy debe mostrar máscara/loading visual').toBe(true);
    expect(stateDuring.params?.filter, 'Enviar mensaje a lista debe seguir enviando el filtro actual').toBeTruthy();

    const stateAfter = await finishSuccessfulSend(page);
    console.log('[Push masivo GCS] Estado luego de success:', JSON.stringify(stateAfter, null, 2));

    expect(stateAfter.requestCount).toBe(1);
    expect(stateAfter.openPushWindowCount, 'La ventana deployada debe cerrarse al finalizar correctamente').toBe(0);
    expect(stateAfter.notifications).toContain('El mensaje fue enviado');
  });

  test('si falla el request en el deploy, el botón se rehabilita', async ({ page }) => {
    await gotoDeployedCrm(page);
    await waitForSmartpanicsClasses(page);

    const stateAfterFailure = await runFailureRecovery(page);
    console.log('[Push masivo GCS] Estado luego de failure:', JSON.stringify(stateAfterFailure, null, 2));

    expect(stateAfterFailure.requestCount).toBe(1);
    expect(stateAfterFailure.disabledAfterFailure, 'El botón deployado debe rehabilitarse si falla el envío').toBe(false);
    expect(stateAfterFailure.textAfterFailure).toBe('Enviar');
    expect(stateAfterFailure.sendingFlagAfterFailure).toBe(false);
    expect(stateAfterFailure.loadingVisibleAfterFailure).toBe(false);
    expect(stateAfterFailure.notifications).toContain('No se pudo enviar el mensaje');
  });
});
