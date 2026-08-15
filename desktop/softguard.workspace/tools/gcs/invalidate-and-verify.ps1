<#
.SYNOPSIS
    Invalidates the server-side cache for one or more Razor-backed JS files
    on a SoftGuard GCS instance, and verifies the served files.

.DESCRIPTION
    SoftGuard serves dynamic JS/Razor templates under /js/<App>/<type>/<Name>.js
    backed by rows in the [Razor] table. When you PUT /Rest/Razor/{Id} the
    DB row updates immediately, but the served files stay cached until you
    explicitly invalidate them.

    Endpoint discovered (verified 2026-04-30):
        GET /cache/Invalidate/<RazorName>?_dc=<ms>
        Cookie: OAuth_Token=<token>

    The uiapplication2 UI calls this same endpoint after every save.

.EXAMPLE
    .\invalidate-and-verify.ps1 `
        -Token 9AE3C67F-B4C6-40A3-BFE6-D3C2AFF04306 `
        -App AdministratorSearch `
        -Files @(
            @{ Name='MoneyGuardOrganizacionFormView';      Type='view';       Markers=@('mostrar_qr_afip','footer_fijo') },
            @{ Name='MoneyGuardOrganizacionFormController'; Type='controller'; Markers=@('insertVariable','facturaConfig') }
        )

.NOTES
    - Auth must be via cookie OAuth_Token (querystring oauth_token causes 500
      on Razor templates 247/223 — not a server bug, but a known quirk).
    - Always verify with cache-buster `?z=<GUID>` (not `?_dc=<ms>` reused),
      because IIS may keep its own output cache for a few seconds.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [string] $Token,

    [Parameter(Mandatory)]
    [string] $App,

    # Array of hashtables: @{ Name='X'; Type='view|controller|model|store'; Markers=@('foo','bar') }
    [Parameter(Mandatory)]
    [array] $Files,

    [string] $TargetHost = 'gcs.softguard.com',

    [switch] $SkipVerify
)

$ErrorActionPreference = 'Stop'

$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$cookie  = New-Object System.Net.Cookie('OAuth_Token', $Token, '/', $TargetHost)
$session.Cookies.Add($cookie)

Write-Host ""
Write-Host "=== Invalidating cache on $TargetHost ===" -ForegroundColor Cyan

foreach ($f in $Files) {
    $name = $f.Name
    $dc   = [DateTimeOffset]::Now.ToUnixTimeMilliseconds()
    try {
        $r = Invoke-WebRequest -Uri "https://$TargetHost/cache/Invalidate/$name`?_dc=$dc" `
                               -WebSession $session -UseBasicParsing -TimeoutSec 30
        Write-Host ("  [{0}] invalidated  ({1} bytes resp)" -f $name, $r.Content.Length) -ForegroundColor Green
    }
    catch {
        $code = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 'ERR' }
        Write-Host ("  [{0}] FAILED ({1})" -f $name, $code) -ForegroundColor Red
    }
}

if ($SkipVerify) { return }

Write-Host ""
Write-Host "=== Verifying served files (cache-buster GUID) ===" -ForegroundColor Cyan

foreach ($f in $Files) {
    $name = $f.Name
    $type = $f.Type
    $markers = if ($f.Markers) { $f.Markers } else { @() }
    $url = "/js/$App/$type/$name.js"
    $bust = [guid]::NewGuid()

    try {
        $r = Invoke-WebRequest -Uri "https://$TargetHost$url`?z=$bust" `
                               -WebSession $session -UseBasicParsing -TimeoutSec 30
        $size = $r.Content.Length
        $report = ""
        $ok = $true
        foreach ($m in $markers) {
            $hit = $r.Content -match [regex]::Escape($m)
            $report += " $m=$hit"
            if (-not $hit) { $ok = $false }
        }
        $color = if ($ok) { 'Green' } else { 'Yellow' }
        Write-Host ("  {0,7}b  {1}{2}" -f $size, $url, $report) -ForegroundColor $color
    }
    catch {
        Write-Host ("  ERR  {0}" -f $url) -ForegroundColor Red
    }
}

Write-Host ""
