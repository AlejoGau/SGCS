import { test, expect, Page, Frame } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';
import * as fs from 'fs';

/**
 * CRM — Push masivo: el botón Enviar debe bloquearse durante la generación.
 *
 * Este test NO envía pushes reales: stubbea Ext.Ajax.request y captura únicamente
 * el request a SmartpanicSendMessage. Valida el comportamiento local con el fix.
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-token.txt');
const screenshotsDir = path.resolve(__dirname, '..', '..', 'reports', 'crm-push-masivo-bloqueo');

type ExtTarget = Page | Frame;

test.beforeAll(() => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

async function waitForSmartpanicsClasses(target: ExtTarget): Promise<void> {
  await target.waitForFunction(() => {
    const ext = (window as any).Ext;
    return !!(
      ext &&
      ext.ClassManager &&
      ext.ClassManager.get('Common.controller.SmartpanicsCrmGridController') &&
      ext.ClassManager.get('Common.view.SmartpanicsCrmGridView')
    );
  }, { timeout: 30_000, polling: 300 });
}

async function openPushWindowAndDoubleClick(target: ExtTarget) {
  return target.evaluate(() => {
    const ext = (window as any).Ext;
    const winAny = window as any;

    if (winAny.__pushBlockTest && winAny.__pushBlockTest.restore) {
      winAny.__pushBlockTest.restore();
    }

    ext.WindowManager.each((win: any) => {
      if (win && win.title === 'Enviar mensaje') {
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
          if (win && win.title === 'Enviar mensaje') {
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

    win.down('#asunto').setValue('Prueba bloqueo push masivo');
    win.down('#mensaje').setValue('Mensaje de prueba — no se envía realmente');

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
    };
  });
}

async function finishSuccessfulSend(target: ExtTarget) {
  return target.evaluate(() => {
    const winAny = window as any;
    const ext = winAny.Ext;
    const state = winAny.__pushBlockTest;
    if (!state || !state.pendingSuccess) {
      throw new Error('No hay request de envío pendiente para finalizar');
    }

    state.pendingSuccess({ responseText: '{}' }, {});

    const openPushWindows = ext.ComponentQuery.query('window').filter((win: any) => win.title === 'Enviar mensaje' && win.isVisible());
    const result = {
      openPushWindowCount: openPushWindows.length,
      notifications: state.notifications.slice(),
      requestCount: state.capturedSendRequests.length,
    };

    state.restore();
    return result;
  });
}

async function runFailureRecovery(target: ExtTarget) {
  return target.evaluate(() => {
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
          if (win && win.title === 'Enviar mensaje') {
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

    const win = ext.WindowManager.getActive();
    win.down('#asunto').setValue('Prueba failure bloqueo push masivo');
    win.down('#mensaje').setValue('Mensaje de prueba — failure controlado');

    const sendButton = win.down('#sendPush');
    sendButton.fireEvent('click', sendButton);

    const result = {
      requestCount: capturedSendRequests.length,
      disabledAfterFailure: sendButton.isDisabled(),
      textAfterFailure: sendButton.getText(),
      sendingFlagAfterFailure: !!win.sendingPushMessages,
      loadingVisibleAfterFailure: !!(win.loadMask && win.loadMask.isVisible && win.loadMask.isVisible()),
      notifications,
    };

    winAny.__pushBlockTest.restore();
    return result;
  });
}

test.describe('CRM push masivo — bloqueo del botón Enviar local', () => {
  test('doble click durante generación produce un solo request y muestra loading', async ({ page }) => {
    const crm = new CrmPage(page);
    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);
    await crm.waitForCrmReadyLocal(120_000);
    await waitForSmartpanicsClasses(page);

    const stateDuring = await openPushWindowAndDoubleClick(page);
    console.log('[Push masivo local] Estado durante envío:', JSON.stringify(stateDuring, null, 2));

    await page.screenshot({ path: path.join(screenshotsDir, 'local-A-boton-bloqueado-loading.png') });
    await page.screenshot({
      path: path.join(screenshotsDir, 'local-A-boton-bloqueado-closeup.png'),
      clip: { x: 680, y: 220, width: 560, height: 470 },
    });

    expect(stateDuring.requestCount, 'El doble click debe generar un único request').toBe(1);
    expect(stateDuring.disabled, 'El botón Enviar debe quedar deshabilitado durante el procesamiento').toBe(true);
    expect(stateDuring.text, 'El botón debe mostrar estado de envío').toBe('Enviando mensajes...');
    expect(stateDuring.sendingFlag, 'La ventana debe marcar que el envío está en proceso').toBe(true);
    expect(stateDuring.loadingVisible, 'La ventana debe mostrar máscara/loading visual').toBe(true);
    expect(stateDuring.params?.filter, 'Enviar mensaje a lista debe enviar el filtro actual').toBeTruthy();

    const stateAfter = await finishSuccessfulSend(page);
    console.log('[Push masivo local] Estado luego de success:', JSON.stringify(stateAfter, null, 2));

    expect(stateAfter.requestCount).toBe(1);
    expect(stateAfter.openPushWindowCount, 'La ventana debe cerrarse al finalizar correctamente').toBe(0);
    expect(stateAfter.notifications).toContain('El mensaje fue enviado');
  });

  test('si falla el request, el botón se rehabilita y conserva el guard anti-duplicados', async ({ page }) => {
    const crm = new CrmPage(page);
    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);
    await crm.waitForCrmReadyLocal(120_000);
    await waitForSmartpanicsClasses(page);

    const stateAfterFailure = await runFailureRecovery(page);
    console.log('[Push masivo local] Estado luego de failure:', JSON.stringify(stateAfterFailure, null, 2));

    expect(stateAfterFailure.requestCount).toBe(1);
    expect(stateAfterFailure.disabledAfterFailure, 'El botón debe rehabilitarse si falla el envío').toBe(false);
    expect(stateAfterFailure.textAfterFailure).toBe('Enviar');
    expect(stateAfterFailure.sendingFlagAfterFailure).toBe(false);
    expect(stateAfterFailure.loadingVisibleAfterFailure).toBe(false);
    expect(stateAfterFailure.notifications).toContain('No se pudo enviar el mensaje');
  });
});
