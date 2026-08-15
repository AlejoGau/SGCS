import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

interface AgentTestResult {
  id: string;
  title: string;
  fullTitle: string;
  file: string;
  tags: string[];
  status: 'passed' | 'failed' | 'timedOut' | 'skipped' | 'interrupted';
  duration: number;
  retries: number;
  error?: {
    message: string;
    stack?: string;
    snippet?: string;
  };
  screenshots: string[];
  annotations: Array<{ type: string; description?: string }>;
}

interface AgentSummary {
  runId: string;
  timestamp: string;
  durationMs: number;
  environment: {
    testMode: string;
    baseUrl: string;
    browser: string;
    viewport: string;
  };
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    timedOut: number;
    passRate: string;
  };
  failures: Array<{
    test: string;
    file: string;
    error: string;
    tags: string[];
  }>;
  tests: AgentTestResult[];
  tags: Record<string, { total: number; passed: number; failed: number }>;
}

class AgentReporter implements Reporter {
  private results: AgentTestResult[] = [];
  private startTime = 0;
  private outputFile: string;
  private config!: FullConfig;

  constructor(options: { outputFile?: string } = {}) {
    this.outputFile = options.outputFile || 'reports/agent-summary.json';
  }

  onBegin(config: FullConfig, _suite: Suite): void {
    this.config = config;
    this.startTime = Date.now();
    this.results = [];
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const tags = this.extractTags(test);
    const screenshots = result.attachments
      .filter((a) => a.contentType?.startsWith('image/'))
      .map((a) => a.path || '');

    const entry: AgentTestResult = {
      id: crypto.randomUUID(),
      title: test.title,
      fullTitle: test.titlePath().join(' > '),
      file: test.location.file,
      tags,
      status: result.status,
      duration: result.duration,
      retries: result.retry,
      screenshots: screenshots.filter(Boolean),
      annotations: test.annotations,
    };

    if (result.status === 'failed' || result.status === 'timedOut') {
      const error = result.errors[0];
      if (error) {
        entry.error = {
          message: error.message || 'Unknown error',
          stack: error.stack?.split('\n').slice(0, 10).join('\n'),
          snippet: error.snippet,
        };
      }
    }

    this.results.push(entry);
  }

  onEnd(result: FullResult): void {
    const durationMs = Date.now() - this.startTime;
    const passed = this.results.filter((r) => r.status === 'passed').length;
    const failed = this.results.filter((r) => r.status === 'failed').length;
    const skipped = this.results.filter((r) => r.status === 'skipped').length;
    const timedOut = this.results.filter((r) => r.status === 'timedOut').length;
    const total = this.results.length;

    const failures = this.results
      .filter((r) => r.status === 'failed' || r.status === 'timedOut')
      .map((r) => ({
        test: r.fullTitle,
        file: r.file,
        error: r.error?.message || 'Unknown',
        tags: r.tags,
      }));

    const tagMap: Record<string, { total: number; passed: number; failed: number }> = {};
    for (const r of this.results) {
      for (const tag of r.tags) {
        if (!tagMap[tag]) tagMap[tag] = { total: 0, passed: 0, failed: 0 };
        tagMap[tag].total++;
        if (r.status === 'passed') tagMap[tag].passed++;
        if (r.status === 'failed' || r.status === 'timedOut') tagMap[tag].failed++;
      }
    }

    const summary: AgentSummary = {
      runId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      durationMs,
      environment: {
        testMode: process.env.TEST_MODE || 'unknown',
        baseUrl: process.env.BASE_URL || 'unknown',
        browser: 'chromium',
        viewport: '1920x1080',
      },
      summary: {
        total,
        passed,
        failed,
        skipped,
        timedOut,
        passRate: total > 0 ? `${((passed / total) * 100).toFixed(1)}%` : '0%',
      },
      failures,
      tests: this.results,
      tags: tagMap,
    };

    const outputPath = path.resolve(this.outputFile);
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2), 'utf-8');
  }

  private extractTags(test: TestCase): string[] {
    const tags: string[] = [];
    // Extract @tag annotations from test title path
    for (const part of test.titlePath()) {
      const matches = part.match(/@(\w+)/g);
      if (matches) {
        tags.push(...matches.map((m) => m.slice(1)));
      }
    }
    // Also check annotations
    for (const ann of test.annotations) {
      if (ann.type === 'tag' && ann.description) {
        tags.push(ann.description);
      }
    }
    return [...new Set(tags)];
  }
}

export default AgentReporter;
