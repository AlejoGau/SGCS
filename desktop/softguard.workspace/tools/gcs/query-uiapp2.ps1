$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$connStr = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop)
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

# All handler-prefixed UIApplications
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT TOP 20 Id, Name, RazorTemplateId FROM UIApplication WHERE Name LIKE 'handler_%' ORDER BY Name"
$reader = $cmd.ExecuteReader()
$count = 0
while ($reader.Read()) {
    Write-Host ("Id={0} Name={1} RazorTpl={2}" -f $reader['Id'], $reader['Name'], $reader['RazorTemplateId'])
    $count++
}
if ($count -eq 0) { Write-Host "No handler_ UIApplications found" }
$reader.Close()

# Check total UIApplications
$cmd2 = $conn.CreateCommand()
$cmd2.CommandText = "SELECT COUNT(*) FROM UIApplication"
$total = $cmd2.ExecuteScalar()
Write-Host "Total UIApplications: $total"

# Check if column exists
$cmd3 = $conn.CreateCommand()
$cmd3.CommandText = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='UIApplication' ORDER BY ORDINAL_POSITION"
$reader3 = $cmd3.ExecuteReader()
$cols = @()
while ($reader3.Read()) { $cols += $reader3['COLUMN_NAME'] }
Write-Host "Columns: $($cols -join ', ')"
$reader3.Close()

$conn.Close()
