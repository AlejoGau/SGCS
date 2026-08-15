$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$connStr = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop)
$razorPath = Join-Path $PSScriptRoot 'tasks\ComprobantePdfMG_8359.cshtml'

# Read the updated Razor content
$content = Get-Content -LiteralPath $razorPath -Raw -Encoding UTF8
Write-Host "Razor content length: $($content.Length) chars"

$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "UPDATE Razor SET Razor = @content, DateModified = GETDATE() WHERE Id = 8359"
$cmd.Parameters.Add("@content", [System.Data.SqlDbType]::Text).Value = $content
$rows = $cmd.ExecuteNonQuery()
Write-Host "Rows affected: $rows"

# Verify
$cmd2 = $conn.CreateCommand()
$cmd2.CommandText = "SELECT DATALENGTH(Razor) as Len, DateModified FROM Razor WHERE Id = 8359"
$reader = $cmd2.ExecuteReader()
while ($reader.Read()) {
    Write-Host "Verified: Len=$($reader['Len']) DateModified=$($reader['DateModified'])"
}
$reader.Close()

$conn.Close()
Write-Host "Deployment complete. Cache invalidation pending (app pool recycle)."
