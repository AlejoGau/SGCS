# Dot-source from scripts in this folder: . (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Set-StrictMode -Version Latest

# Directory of this file (stable when functions run after dot-sourcing)
$script:GcsAutomationEnvDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }

function Import-GcsAutomationEnv {
    [CmdletBinding()]
    param(
        [string]$Path = (Join-Path $script:GcsAutomationEnvDir '.env')
    )
    if (-not (Test-Path -LiteralPath $Path)) {
        throw @"
Missing automation env file: $Path

Copy softguard.workspace/tools/gcs/.env.example to .env in the same folder and set SQL_USER and SQL_PASSWORD (optionally SQL_SERVER, SQL_DATABASE_DESKTOP, SQL_DATABASE_DATOS).

Variables already set in the process environment are not overwritten by .env.
"@
    }
    Get-Content -LiteralPath $Path -Encoding UTF8 | ForEach-Object {
        $line = $_.Trim()
        if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith('#')) { return }
        $eq = $line.IndexOf('=')
        if ($eq -lt 1) { return }
        $key = $line.Substring(0, $eq).Trim()
        $val = $line.Substring($eq + 1).Trim()
        if ($val.Length -ge 2 -and $val.StartsWith('"') -and $val.EndsWith('"')) {
            $val = $val.Substring(1, $val.Length - 2)
        }
        $existing = [Environment]::GetEnvironmentVariable($key, 'Process')
        if ([string]::IsNullOrEmpty($existing)) {
            Set-Item -Path "Env:$key" -Value $val
        }
    }
}

function Resolve-GcsSqlDatabase {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet('Desktop', 'Datos')]
        [string]$Kind
    )
    switch ($Kind) {
        'Desktop' {
            if (-not [string]::IsNullOrWhiteSpace($env:SQL_DATABASE_DESKTOP)) { return $env:SQL_DATABASE_DESKTOP }
            return '_Desktop'
        }
        'Datos' {
            if (-not [string]::IsNullOrWhiteSpace($env:SQL_DATABASE_DATOS)) { return $env:SQL_DATABASE_DATOS }
            return '_Datos'
        }
    }
}

function Get-GcsSqlConnectionString {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Database,
        [int]$ConnectTimeoutSeconds = 30
    )
    $server = $env:SQL_SERVER
    $user = $env:SQL_USER
    $pass = $env:SQL_PASSWORD
    if ([string]::IsNullOrWhiteSpace($server) -or [string]::IsNullOrWhiteSpace($user) -or [string]::IsNullOrWhiteSpace($pass)) {
        throw 'SQL_SERVER, SQL_USER, and SQL_PASSWORD must be set (tools/gcs/.env or environment).'
    }
    $extra = "TrustServerCertificate=True;Connect Timeout=$ConnectTimeoutSeconds"
    return "Server=$server;Database=$Database;User Id=$user;Password=$pass;$extra"
}
