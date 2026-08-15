import { Page } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

export type EvidenceStatus = 'pass' | 'warn' | 'fail';

export interface EvidenceEntry {
  check: string;
  status: EvidenceStatus;
  details: unknown;
  screenshot?: string;
  artifacts?: string[];
}

export interface EvidenceReportOptions {
  reportRoot: string;
  title: string;
  environment: string;
  appUrl?: string;
  generatedAt?: string;
  markdownFileName?: string;
  jsonFileName?: string;
  summaryLines?: string[];
  entries: EvidenceEntry[];
  extraMetadata?: Record<string, unknown>;
}

export function getEvidenceDirs(reportRoot: string): {
  reportRoot: string;
  screenshotDir: string;
  artifactDir: string;
} {
  return {
    reportRoot,
    screenshotDir: path.join(reportRoot, 'screenshots'),
    artifactDir: path.join(reportRoot, 'artifacts'),
  };
}

export async function ensureEvidenceDirs(reportRoot: string): Promise<{
  reportRoot: string;
  screenshotDir: string;
  artifactDir: string;
}> {
  const dirs = getEvidenceDirs(reportRoot);
  await fs.mkdir(dirs.reportRoot, { recursive: true });
  await fs.mkdir(dirs.screenshotDir, { recursive: true });
  await fs.mkdir(dirs.artifactDir, { recursive: true });
  return dirs;
}

export async function captureEvidenceScreenshot(
  page: Page,
  screenshotDir: string,
  fileName: string,
  fullPage = true,
): Promise<string> {
  await fs.mkdir(screenshotDir, { recursive: true });
  const absolutePath = path.join(screenshotDir, `${fileName}.png`);
  await page.screenshot({ path: absolutePath, fullPage });
  return absolutePath;
}

export async function writeTextArtifact(
  artifactDir: string,
  fileName: string,
  contents: string,
): Promise<string> {
  await fs.mkdir(artifactDir, { recursive: true });
  const absolutePath = path.join(artifactDir, fileName);
  await fs.writeFile(absolutePath, contents, 'utf-8');
  return absolutePath;
}

export async function writeJsonArtifact(
  artifactDir: string,
  fileName: string,
  data: unknown,
): Promise<string> {
  return writeTextArtifact(artifactDir, fileName, JSON.stringify(data, null, 2));
}

function summarize(details: unknown): string {
  return JSON.stringify(details, null, 2).slice(0, 5000);
}

function relativeToReport(reportRoot: string, absolutePath: string): string {
  return path.relative(reportRoot, absolutePath).replace(/\\/g, '/');
}

export async function writeEvidenceReport(options: EvidenceReportOptions): Promise<void> {
  const {
    reportRoot,
    title,
    environment,
    appUrl,
    generatedAt = new Date().toISOString(),
    markdownFileName = 'EVIDENCE.md',
    jsonFileName = 'evidence.json',
    summaryLines = [],
    entries,
    extraMetadata = {},
  } = options;

  await ensureEvidenceDirs(reportRoot);

  const jsonPath = path.join(reportRoot, jsonFileName);
  await fs.writeFile(
    jsonPath,
    JSON.stringify(
      {
        title,
        environment,
        appUrl,
        generatedAt,
        summaryLines,
        entries,
        ...extraMetadata,
      },
      null,
      2,
    ),
    'utf-8',
  );

  const lines: string[] = [];
  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`Generado: ${generatedAt}`);
  lines.push('');
  lines.push(`Ambiente: \`${environment}\``);
  if (appUrl) {
    lines.push(`URL/App: \`${appUrl}\``);
  }
  lines.push('');

  if (summaryLines.length > 0) {
    lines.push('## Resumen');
    lines.push('');
    for (const line of summaryLines) {
      lines.push(`- ${line}`);
    }
    lines.push('');
  }

  lines.push('## Resultado');
  lines.push('');
  for (const entry of entries) {
    const icon = entry.status === 'pass' ? '✅' : entry.status === 'warn' ? '⚠️' : '❌';
    lines.push(`- ${icon} **${entry.check}** — ${entry.status.toUpperCase()}`);
  }
  lines.push('');

  lines.push('## Artefactos');
  lines.push('');
  lines.push(`- \`${path.basename(jsonPath)}\``);
  for (const entry of entries) {
    for (const artifact of entry.artifacts || []) {
      lines.push(`- \`${relativeToReport(reportRoot, artifact)}\``);
    }
  }
  lines.push('');

  lines.push('## Evidencia visual');
  lines.push('');
  for (const entry of entries) {
    if (!entry.screenshot) {
      continue;
    }

    lines.push(`### ${entry.check}`);
    lines.push('');
    lines.push(`![${entry.check}](${relativeToReport(reportRoot, entry.screenshot)})`);
    lines.push('');
    lines.push('```json');
    lines.push(summarize(entry.details));
    lines.push('```');
    lines.push('');
  }

  await fs.writeFile(path.join(reportRoot, markdownFileName), lines.join('\n'), 'utf-8');
}
