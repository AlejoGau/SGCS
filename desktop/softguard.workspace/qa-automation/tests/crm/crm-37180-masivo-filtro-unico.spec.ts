import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';

/**
 * Ticket #37180-724-VSJ — CRM GCS/deploy validation.
 *
 * Same regression as local spec, executed inside the deployed CRM iframe.
 * Before deploying the fix this documents the bug; after deploy it must pass.
 */

test.describe('Ticket 37180 — Envío masivo filtro único GCS/deploy', () => {
  test('una única organización seleccionada usa Id:ININT aunque el header checkbox esté marcado', async ({ page }) => {
    const crm = new CrmPage(page);
    const { frame } = await crm.openCrmGcs();

    const result = await frame.evaluate(() => {
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

    console.log('[Ticket 37180 GCS] Query generado para selección única:', result.query);

    expect(result.query, 'Debe filtrar por el Id seleccionado, no por filtros vacíos/amplios').toContain('"property":"Id:ININT"');
    expect(result.query).toContain('"value":"12345"');
    expect(result.query, 'No debe caer en @Filter=[] porque enviaría a todos').not.toContain("@Filter='[]'");
  });
});
