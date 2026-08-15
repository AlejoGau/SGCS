import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';

/**
 * Ticket #37180-724-VSJ — CRM: Envío masivo con filtro que deja 1 organización.
 *
 * Regresión cubierta:
 * - ExtJS marca el checkbox del header como seleccionado cuando la única fila visible se selecciona.
 * - Antes del fix, OrganizationGridController interpretaba eso como "enviar a todo el filtro".
 * - Si el store no tenía filtros específicos, el Query quedaba con @Filter='[]' y enviaba a todos.
 *
 * Este test no envía mails reales: stubbea SmartMailProgram.save() y captura el Query armado.
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-token.txt');

test.describe('Ticket 37180 — Envío masivo filtro único local', () => {
  test('una única organización seleccionada usa Id:ININT aunque el header checkbox esté marcado', async ({ page }) => {
    const crm = new CrmPage(page);
    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);
    await crm.waitForCrmReadyLocal(120_000);

    const result = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const controller = ext.create('Common.controller.OrganizationGridController');
      controller.getSmartMailProgramModelModel = () => ext.ClassManager.get('Common.model.SmartMailProgramModel');

      const captured: any = { queries: [] };
      const ProgramModel = ext.ClassManager.get('Common.model.SmartMailProgramModel');
      const originalSave = ProgramModel.prototype.save;
      ProgramModel.prototype.save = function (options: any) {
        captured.queries.push(this.get('Query'));
        if (options && options.callback) {
          options.callback(this, { getError: () => null }, true);
        }
        return this;
      };

      try {
        const selectedRecord = ext.create('Common.model.OrganizationSearchModel', {
          Id: 12345,
          Name: 'SEGURIDAD UNIDA S.A.',
          Email: 'test@example.com',
        });

        const fakePanel = {
          down: () => null,
          add: () => undefined,
          setActiveTab: () => undefined,
        };
        const fakeStore = {
          getCount: () => 1,
          getTotalCount: () => 1,
          filters: {
            each: (_fn: Function) => undefined,
          },
        };
        const fakeView = {
          targetTab: fakePanel,
          getSelectionModel: () => ({
            getSelection: () => [selectedRecord],
          }),
          headerCt: {
            child: () => ({
              el: {
                // Reproduce el caso bug: una sola fila seleccionada enciende el checker del header.
                hasCls: () => true,
              },
            }),
          },
          getStore: () => fakeStore,
        };
        const fakeButton = {
          up: () => fakeView,
        };

        controller.onSmartMailClick(fakeButton);
        return { query: captured.queries[0] };
      } finally {
        ProgramModel.prototype.save = originalSave;
      }
    });

    console.log('[Ticket 37180] Query generado para selección única:', result.query);

    expect(result.query, 'Debe filtrar por el Id seleccionado, no por filtros vacíos/amplios').toContain('"property":"Id:ININT"');
    expect(result.query).toContain('"value":"12345"');
    expect(result.query, 'No debe caer en @Filter=[] porque enviaría a todos').not.toContain("@Filter='[]'");
  });

  test('seleccionar todo con más resultados remotos conserva el comportamiento de enviar al filtro', async ({ page }) => {
    const crm = new CrmPage(page);
    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);
    await crm.waitForCrmReadyLocal(120_000);

    const result = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const controller = ext.create('Common.controller.OrganizationGridController');
      controller.getSmartMailProgramModelModel = () => ext.ClassManager.get('Common.model.SmartMailProgramModel');

      const captured: any = { queries: [] };
      const ProgramModel = ext.ClassManager.get('Common.model.SmartMailProgramModel');
      const originalSave = ProgramModel.prototype.save;
      ProgramModel.prototype.save = function (options: any) {
        captured.queries.push(this.get('Query'));
        if (options && options.callback) {
          options.callback(this, { getError: () => null }, true);
        }
        return this;
      };

      try {
        const selectedRecords = Array.from({ length: 50 }, (_value, index) =>
          ext.create('Common.model.OrganizationSearchModel', { Id: index + 1 }),
        );
        const fakePanel = {
          down: () => null,
          add: () => undefined,
          setActiveTab: () => undefined,
        };
        const fakeStore = {
          getCount: () => 50,
          getTotalCount: () => 250,
          filters: {
            each: (fn: Function) => fn({ property: 'Status:ININT', value: '7,8,9' }, 0),
          },
        };
        const fakeView = {
          targetTab: fakePanel,
          getSelectionModel: () => ({
            getSelection: () => selectedRecords,
          }),
          headerCt: {
            child: () => ({
              el: { hasCls: () => true },
            }),
          },
          getStore: () => fakeStore,
        };
        const fakeButton = { up: () => fakeView };

        controller.onSmartMailClick(fakeButton);
        return { query: captured.queries[0] };
      } finally {
        ProgramModel.prototype.save = originalSave;
      }
    });

    console.log('[Ticket 37180] Query generado para selección remota total:', result.query);

    expect(result.query, 'Cuando hay más resultados remotos que filas cargadas, debe respetar el filtro remoto').toContain('"property":"Status:ININT"');
    expect(result.query).toContain('"value":"7,8,9"');
  });
});
