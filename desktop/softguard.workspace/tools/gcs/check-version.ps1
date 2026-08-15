$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$conn = New-Object System.Data.SqlClient.SqlConnection (Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop))
$conn.Open()
$cmd = $conn.CreateCommand()
$cmd.CommandTimeout = 60
$cmd.CommandText = "SELECT Id, Name, Version, RazorType, OutputMimeType, LEN(CAST(Razor AS VARCHAR(MAX))) AS Bytes, DateCreated, DateModified FROM Razor WHERE Id IN (3354, 3355, 3356, 3357, 3358, 3359, 8314, 8315) ORDER BY Id"
$r = $cmd.ExecuteReader()
while ($r.Read()) {
    Write-Output ("Id={0,5} Ver={1,-12} Type={2,-12} Mime={3,-22} Bytes={4,7} Mod={5} Name={6}" -f `
        $r['Id'], ([string]$r['Version']), $r['RazorType'], ([string]$r['OutputMimeType']), $r['Bytes'], $r['DateModified'], $r['Name'])
}
$r.Close()
$conn.Close()
