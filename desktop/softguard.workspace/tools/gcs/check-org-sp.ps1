$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$connStr = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop)
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

# Check t_organizacion_fcSel SP parameters
$cmd = $conn.CreateCommand()
$cmd.CommandText = @"
SELECT p.name, t.name as type_name, p.max_length, p.is_output
FROM sys.parameters p
JOIN sys.types t ON p.user_type_id = t.user_type_id
WHERE p.object_id = OBJECT_ID('t_organizacion_fcSel')
ORDER BY p.parameter_id
"@
$reader = $cmd.ExecuteReader()
Write-Host "=== t_organizacion_fcSel parameters ==="
while ($reader.Read()) {
    Write-Host ("  {0} ({1}, len={2}, output={3})" -f $reader['name'], $reader['type_name'], $reader['max_length'], $reader['is_output'])
}
$reader.Close()

# Try to execute it to see the columns
$cmd2 = $conn.CreateCommand()
$cmd2.CommandText = "EXEC t_organizacion_fcSel @org_icodigo_id = 14"
$adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd2)
$dt = New-Object System.Data.DataTable
try {
    $adapter.Fill($dt) | Out-Null
    Write-Host ""
    Write-Host "=== Columns returned ==="
    foreach ($col in $dt.Columns) {
        Write-Host "  $($col.ColumnName) ($($col.DataType.Name))"
    }
    Write-Host ""
    Write-Host "Rows returned: $($dt.Rows.Count)"
    if ($dt.Rows.Count -gt 0) {
        $row = $dt.Rows[0]
        Write-Host "org_cnombre: $($row['org_cnombre'])"
        # Check if org_cmetadata exists
        if ($dt.Columns.Contains('org_cmetadata')) {
            Write-Host "org_cmetadata exists: YES (length=$($row['org_cmetadata'].ToString().Length))"
        } else {
            Write-Host "org_cmetadata exists: NO"
        }
    }
} catch {
    Write-Host "Error: $_"
}

$conn.Close()
