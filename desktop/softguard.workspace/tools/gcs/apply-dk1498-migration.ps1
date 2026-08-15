$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv

$cnn = New-Object System.Data.SqlClient.SqlConnection
$cnn.ConnectionString = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Datos) -ConnectTimeoutSeconds 10
$cnn.Open()

# Step 1: Add column
$q = $cnn.CreateCommand()
$q.CommandText = @"
IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Product' AND COLUMN_NAME = 'pro_cantidad_auto'
)
BEGIN
    ALTER TABLE dbo.Product 
    ADD pro_cantidad_auto INT NOT NULL DEFAULT 0;
    SELECT 'ADDED' as result
END
ELSE
    SELECT 'ALREADY_EXISTS' as result
"@
$r = $q.ExecuteReader()
if ($r.Read()) { Write-Host "Column: $($r[0])" }
$r.Close()

$cnn.Close()

# Step 2: Alter SP (use _Desktop)
$cnn2 = New-Object System.Data.SqlClient.SqlConnection
$cnn2.ConnectionString = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop) -ConnectTimeoutSeconds 10
$cnn2.Open()

$migrationPath = Join-Path $PSScriptRoot 'migrations\DK-1498-update-MG_ContratoAFactura.sql'
$spSql = Get-Content -LiteralPath $migrationPath -Raw
# Remove USE _Desktop; GO lines since we're already connected
$spSql = $spSql -replace '(?m)^USE _Desktop;\s*$', '' -replace '(?m)^GO\s*$', ''

$q2 = $cnn2.CreateCommand()
$q2.CommandText = $spSql
$q2.CommandTimeout = 30
try {
    $q2.ExecuteNonQuery() | Out-Null
    Write-Host "SP: UPDATED successfully"
} catch {
    Write-Host "SP ERROR: $($_.Exception.Message)"
}
$cnn2.Close()
