# PowerShell script to run tests and open report
# Usage: .\run-and-report.ps1 [-Suite webmg] [-Headed] [-Tag comprobante]

param(
    [string]$Suite = "",
    [switch]$Headed,
    [string]$Tag = ""
)

$ErrorActionPreference = "Stop"
Push-Location $PSScriptRoot

Write-Host "=== Softguard QA Automation ===" -ForegroundColor Cyan

# Build command
$cmd = "npx playwright test"

if ($Suite) {
    $cmd += " tests/$Suite/"
    Write-Host "Suite: $Suite" -ForegroundColor Yellow
}

if ($Tag) {
    $cmd += " --grep @$Tag"
    Write-Host "Tag filter: @$Tag" -ForegroundColor Yellow
}

if ($Headed) {
    $cmd += " --headed"
    Write-Host "Mode: headed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Running: $cmd" -ForegroundColor Gray
Write-Host ""

# Run tests
Invoke-Expression $cmd
$exitCode = $LASTEXITCODE

# Show summary from agent report
$agentReport = "reports/agent-summary.json"
if (Test-Path $agentReport) {
    $report = Get-Content $agentReport | ConvertFrom-Json
    Write-Host ""
    Write-Host "=== Results ===" -ForegroundColor Cyan
    Write-Host "Total: $($report.summary.total) | Passed: $($report.summary.passed) | Failed: $($report.summary.failed) | Pass Rate: $($report.summary.passRate)" -ForegroundColor $(if ($report.summary.failed -gt 0) { "Red" } else { "Green" })

    if ($report.failures.Count -gt 0) {
        Write-Host ""
        Write-Host "Failures:" -ForegroundColor Red
        foreach ($f in $report.failures) {
            Write-Host "  - $($f.test)" -ForegroundColor Red
            Write-Host "    $($f.error)" -ForegroundColor DarkRed
        }
    }
}

# Open HTML report if there are failures
if ($exitCode -ne 0) {
    Write-Host ""
    Write-Host "Opening HTML report..." -ForegroundColor Yellow
    npx playwright show-report reports/html
}

Pop-Location
exit $exitCode
