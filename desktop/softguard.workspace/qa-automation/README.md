# QA Automation — Softguard Desktop

Playwright-based E2E test framework for the Softguard Desktop ExtJS applications.

## Quick Start

```bash
cd qa-automation
npm install
npx playwright install chromium
```

## Configuration

Copy `.env.example` to `.env` and fill in credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `TEST_MODE` | `production` (real GCS backend) or `local` (local dev with resource-override proxy) |
| `BASE_URL` | Base URL for the app under test |
| `LOGIN_URL` | GCS login page URL |
| `LOGIN_EMAIL` | Login email |
| `LOGIN_PASSWORD` | Login password |
| `OAUTH_TOKEN` | Pre-obtained OAuth token (skips UI login) |
| `LOCAL_PORT` | Port for local Sencha dev server (default 1841) |

## Running Tests

```bash
# Run all tests
npm test

# Run WebMG tests only
npm run test:webmg

# Run in headed mode (visible browser)
npm run test:headed

# Interactive UI mode
npm run test:ui

# Debug mode (step through)
npm run test:debug

# View last HTML report
npm run report
```

## Test Structure

```
qa-automation/
├── playwright.config.ts       # Playwright configuration
├── .env                       # Environment variables (gitignored)
├── src/
│   ├── helpers/
│   │   ├── extjs.ts           # ExtJS component interaction utilities
│   │   ├── auth.ts            # Authentication strategies
│   │   └── resource-override.ts # Resource Override extension emulation
│   ├── fixtures/
│   │   └── auth.fixture.ts    # Extended test fixture with auth + nav
│   ├── pages/
│   │   ├── BasePage.ts        # Common ExtJS page methods
│   │   ├── LoginPage.ts       # GCS login page
│   │   ├── DesktopPage.ts     # Desktop shell navigation
│   │   └── webmg/             # WebMG module page objects
│   │       ├── WebMGPage.ts
│   │       ├── ComprobanteGridPage.ts
│   │       ├── ComprobanteFormPage.ts
│   │       ├── ComprobanteItemPage.ts
│   │       ├── FacturacionWizardPage.ts
│   │       ├── PagoFormPage.ts
│   │       └── CuentaCorrientePage.ts
│   └── reporters/
│       └── agent-reporter.ts  # JSON reporter for AI agent consumption
├── tests/
│   ├── auth.setup.ts          # One-time auth setup (saves session)
│   └── webmg/
│       ├── comprobante-crud.spec.ts
│       ├── comprobante-items.spec.ts
│       ├── comprobante-pdf.spec.ts
│       ├── facturacion-automatica.spec.ts
│       └── pagos.spec.ts
└── reports/                   # Generated reports (gitignored)
    ├── html/                  # Human-readable HTML report
    ├── json/results.json      # Standard Playwright JSON report
    └── agent-summary.json     # AI-consumable structured summary
```

## Reports

After running tests, three reports are generated:

| Report | Path | Consumer |
|--------|------|----------|
| **HTML** | `reports/html/index.html` | Humans — open with `npm run report` |
| **JSON** | `reports/json/results.json` | Standard Playwright JSON format |
| **Agent Summary** | `reports/agent-summary.json` | AI agents — structured with tags, failures, pass rate |

### Agent Summary Format

```json
{
  "runId": "uuid",
  "timestamp": "ISO-8601",
  "durationMs": 45000,
  "summary": { "total": 20, "passed": 18, "failed": 2, "passRate": "90.0%" },
  "failures": [{ "test": "...", "error": "...", "tags": ["comprobante"] }],
  "tags": { "comprobante": { "total": 10, "passed": 9, "failed": 1 } }
}
```

## Auth Strategies

1. **UI Login** (`TEST_MODE=production`, no `OAUTH_TOKEN`): Playwright fills the login form at GCS
2. **Token Injection** (`OAUTH_TOKEN` set): Skips login, injects the cookie directly
3. **Local Dev** (`TEST_MODE=local`): Uses `page.route()` to proxy localhost requests to GCS (replicates the Resource Override browser extension)

## Adding New Tests

1. Create a new `.spec.ts` file under `tests/<module>/`
2. Use the `@tag` convention in describe blocks for categorization
3. Import the auth fixture: `import { test, expect } from '../../src/fixtures/auth.fixture'`
4. Create page objects in `src/pages/<module>/` following the POM pattern

## Tags

Tests use `@tag` annotations in describe blocks for filtering and reporting:

- `@comprobante` — Invoice operations
- `@crud` — Create/Read/Update/Delete flows
- `@items` — Line item operations
- `@facturacion` — Automatic billing wizard
- `@pagos` — Payment operations
- `@cuentacorriente` — Account balance
- `@pdf` — PDF generation

Filter by tag: `npx playwright test --grep @comprobante`
