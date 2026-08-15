import { APIRequestContext } from '@playwright/test';

export type ExportTxtDataset = {
  orgId: number;
  orgName: string;
  periodo: string;
  url: string;
  fileName: string | null;
  text: string;
  lines: string[];
  detailCount: number;
};

export function decodeUtf8WithBom(buffer: Buffer): string {
  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    return buffer.subarray(3).toString('utf-8');
  }
  return buffer.toString('utf-8');
}

export function extractFileName(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;
  const match = contentDisposition.match(/filename="?([^";]+)"?/i);
  return match ? match[1] : null;
}

export async function findExportTxtDataset(
  request: APIRequestContext,
  token: string,
  organizations: Array<{ id: any; name: string }>,
  options?: {
    baseUrl?: string;
    monthsBack?: number;
  },
): Promise<ExportTxtDataset | null> {
  const baseUrl = options?.baseUrl || 'https://gcs.softguard.com';
  const monthsBack = options?.monthsBack ?? 18;
  let fallback: ExportTxtDataset | null = null;

  const now = new Date();
  for (let offset = 0; offset < monthsBack; offset += 1) {
    const probe = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const periodo = `${probe.getFullYear()}${String(probe.getMonth() + 1).padStart(2, '0')}`;

    for (const organization of organizations) {
      const orgId = parseInt(String(organization.id), 10);
      if (!Number.isFinite(orgId) || orgId <= 0) continue;

      const url = `${baseUrl}/handler/ExportTxtMG?orgId=${encodeURIComponent(orgId)}&periodo=${periodo}&oauth_token=${encodeURIComponent(token)}`;
      const response = await request.get(url, { timeout: 60_000 });
      if (!response.ok()) continue;

      const body = await response.body();
      const text = decodeUtf8WithBom(body);
      const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length < 2 || !lines[0].startsWith('H|') || !lines[lines.length - 1].startsWith('T|')) {
        continue;
      }

      const detailCount = lines.filter((line) => line.startsWith('D|')).length;
      const dataset: ExportTxtDataset = {
        orgId,
        orgName: organization.name,
        periodo,
        url,
        fileName: extractFileName(response.headers()['content-disposition'] || null),
        text,
        lines,
        detailCount,
      };

      if (detailCount > 0) {
        return dataset;
      }

      if (!fallback) {
        fallback = dataset;
      }
    }
  }

  return fallback;
}
