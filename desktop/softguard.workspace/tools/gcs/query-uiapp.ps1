$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$connStr = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop)
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT Id, Name, RazorTemplateId FROM UIApplication WHERE Name LIKE '%ComprobantePdf%'"
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Host ("Id={0} Name={1} RazorTemplateId={2}" -f $reader['Id'], $reader['Name'], $reader['RazorTemplateId'])
}
$reader.Close()

# Also check if handler_ prefix is used
$cmd2 = $conn.CreateCommand()
$cmd2.CommandText = "SELECT Id, Name, RazorTemplateId FROM UIApplication WHERE Name LIKE '%handler_%Comprobante%'"
$reader2 = $cmd2.ExecuteReader()
while ($reader2.Read()) {
    Write-Host ("Handler: Id={0} Name={1} RazorTemplateId={2}" -f $reader2['Id'], $reader2['Name'], $reader2['RazorTemplateId'])
}
$reader2.Close()

$conn.Close()
