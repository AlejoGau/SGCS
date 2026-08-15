<#
.SYNOPSIS
    Aplica uno o varios archivos .sql de stored procedures al SQL Server.

.DESCRIPTION
    Ejecuta archivos .sql de database/<Database>/StoredProcedures/ contra el server.
    Soporta aplicar un SP individual, una lista, o todos los de una base.

.PARAMETER Database
    Nombre de la base de datos destino. Default: _Desktop

.PARAMETER File
    Nombre del SP a aplicar (sin .sql) o ruta completa al archivo.
    Si no se especifica, aplica TODOS los SPs de la base.

.PARAMETER Server
    Instancia de SQL Server. Default: gcs.softguard.com,3341

.PARAMETER User
    Usuario SQL Server. Default: RodrigoR

.PARAMETER Password
    Password SQL Server.

.PARAMETER WhatIf
    Muestra que se aplicaria sin ejecutar nada.

.EXAMPLE
    # Aplicar un SP especifico
    .\push-sp.ps1 -Database _Desktop -File sp_GetComprobantes

    # Aplicar todos los SPs de una base
    .\push-sp.ps1 -Database _Desktop

    # Ver que se aplicaria sin ejecutar
    .\push-sp.ps1 -Database _Desktop -WhatIf

.NOTES
    Los archivos deben usar CREATE OR ALTER PROCEDURE para ser idempotentes.
    pull-db.ps1 ya genera los archivos en ese formato.
#>

param(
    [string]$Database  = "_Desktop",
    [string]$File      = "",
    [string]$Server    = "gcs.softguard.com,3341",
    [string]$User      = "RodrigoR",
    [string]$Password  = "",
    [switch]$WhatIf
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# --- Resolver rutas ---
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot  = Split-Path -Parent $ScriptDir
$SpDir     = Join-Path $RepoRoot "database\$Database\StoredProcedures"

if (-not (Test-Path $SpDir)) {
    Write-Error "No existe el directorio: $SpDir. Ejecutar pull-db.ps1 primero."
    exit 1
}

# --- Solicitar password si no se proveo ---
if (-not $Password) {
    $securePass = Read-Host "Password para $User en $Server" -AsSecureString
    $Password   = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
                      [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))
}

# --- Resolver archivos a aplicar ---
if ($File) {
    # Puede ser nombre de SP o ruta completa
    if (Test-Path $File) {
        $Files = @(Get-Item $File)
    } elseif (Test-Path (Join-Path $SpDir "$File.sql")) {
        $Files = @(Get-Item (Join-Path $SpDir "$File.sql"))
    } else {
        Write-Error "No se encontro el archivo: $File"
        exit 1
    }
} else {
    $Files = Get-ChildItem -Path $SpDir -Filter "*.sql" | Sort-Object Name
}

$Total  = $Files.Count
$Count  = 0
$Errors = 0

if ($WhatIf) {
    Write-Host "[WhatIf] Se aplicarian $Total archivos a $Server / ${Database}:" -ForegroundColor Yellow
    $Files | ForEach-Object { Write-Host "  - $($_.Name)" }
    exit 0
}

Write-Host "Aplicando $Total SP(s) a $Server / $Database ..." -ForegroundColor Cyan

foreach ($F in $Files) {
    $Count++
    $SpName = $F.BaseName
    Write-Progress -Activity "Aplicando SPs a $Database" `
                   -Status "$SpName ($Count/$Total)" `
                   -PercentComplete (($Count / $Total) * 100)

    $Result = sqlcmd -S $Server -U $User -P $Password -d $Database `
                     -i $F.FullName -b 2>&1

    if ($LASTEXITCODE -ne 0) {
        Write-Warning "ERROR aplicando $SpName`:`n$Result"
        $Errors++
    } else {
        Write-Verbose "OK: $SpName"
    }
}

Write-Progress -Activity "Aplicando SPs" -Completed
Write-Host ""
Write-Host "Listo: $($Count - $Errors)/$Total SPs aplicados." -ForegroundColor Green
if ($Errors -gt 0) {
    Write-Host "Errores: $Errors SPs fallaron (ver mensajes arriba)" -ForegroundColor Red
}
