$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$connStr = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop)
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

# Check t_organizacion_fc search object
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT Id, Name, Content, IdProperty FROM SearchObject WHERE Name = 't_organizacion_fc'"
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Host "Id: $($reader['Id'])"
    Write-Host "Name: $($reader['Name'])"
    Write-Host "IdProperty: $($reader['IdProperty'])"
    Write-Host "Content (first 500):"
    $content = $reader['Content'].ToString()
    Write-Host $content.Substring(0, [Math]::Min(500, $content.Length))
    Write-Host "..."
    Write-Host "Content length: $($content.Length)"
}
$reader.Close()

$conn.Close()
