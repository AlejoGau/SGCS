$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Import-GcsAutomationEnv.ps1')
Import-GcsAutomationEnv
$connStr = Get-GcsSqlConnectionString -Database (Resolve-GcsSqlDatabase -Kind Desktop)
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

# Execute with correct param
$cmd = $conn.CreateCommand()
$cmd.CommandText = "EXEC t_organizacion_fcSel @Id = 14"
$adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
$dt = New-Object System.Data.DataTable
try {
    $adapter.Fill($dt) | Out-Null
    Write-Host "=== Columns returned ($($dt.Columns.Count) columns) ==="
    foreach ($col in $dt.Columns) {
        Write-Host "  $($col.ColumnName)"
    }
    Write-Host ""
    Write-Host "Rows: $($dt.Rows.Count)"
    if ($dt.Rows.Count -gt 0) {
        $row = $dt.Rows[0]
        Write-Host "org_cnombre: $($row['org_cnombre'])"
        Write-Host "org_cidentificacion: $($row['org_cidentificacion'])"
        if ($dt.Columns.Contains('org_cmetadata')) {
            $meta = $row['org_cmetadata'].ToString()
            Write-Host "org_cmetadata: (length=$($meta.Length))"
            if ($meta.Length -gt 0) {
                Write-Host "  First 200: $($meta.Substring(0, [Math]::Min(200, $meta.Length)))"
            }
        } else {
            Write-Host "org_cmetadata column: NOT FOUND"
        }
    }
} catch {
    Write-Host "Error: $_"
}

# Also check t_organizacion_fcByFilter to see if it has what we need
Write-Host ""
Write-Host "=== t_organizacion_fcByFilter parameters ==="
$cmd2 = $conn.CreateCommand()
$cmd2.CommandText = @"
SELECT p.name, t.name as type_name
FROM sys.parameters p
JOIN sys.types t ON p.user_type_id = t.user_type_id
WHERE p.object_id = OBJECT_ID('t_organizacion_fcByFilter')
ORDER BY p.parameter_id
"@
$reader = $cmd2.ExecuteReader()
while ($reader.Read()) {
    Write-Host ("  {0} ({1})" -f $reader['name'], $reader['type_name'])
}
$reader.Close()

$conn.Close()
