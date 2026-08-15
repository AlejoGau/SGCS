$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$connStr = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop)
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

# Check if t_organizacion_fcSearch SP exists
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT name, type_desc FROM sys.objects WHERE name LIKE '%t_organizacion_fc%' ORDER BY name"
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Host ("Name={0} Type={1}" -f $reader['name'], $reader['type_desc'])
}
$reader.Close()

Write-Host "---"

# Check if m_comprobantes_cab_fc SearchObject exists
$cmd2 = $conn.CreateCommand()
$cmd2.CommandText = "SELECT Id, Name, SearchType FROM SearchObject WHERE Name = 'm_comprobantes_cab_fc'"
$reader2 = $cmd2.ExecuteReader()
while ($reader2.Read()) {
    Write-Host ("SearchObject: Id={0} Name={1} SearchType={2}" -f $reader2['Id'], $reader2['Name'], $reader2['SearchType'])
}
$reader2.Close()

# Check SearchObject columns
$cmd3 = $conn.CreateCommand()
$cmd3.CommandText = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='SearchObject' ORDER BY ORDINAL_POSITION"
$reader3 = $cmd3.ExecuteReader()
$cols = @()
while ($reader3.Read()) { $cols += $reader3['COLUMN_NAME'] }
Write-Host "SearchObject columns: $($cols -join ', ')"
$reader3.Close()

$conn.Close()
