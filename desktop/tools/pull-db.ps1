<#
.SYNOPSIS
    Extrae objetos de SQL Server a archivos .sql individuales.

.DESCRIPTION
    Exporta stored procedures, schemas de tablas y triggers de una base de datos a database/<Database>/.
    Por compatibilidad, si no se especifica ningun switch solo exporta StoredProcedures.
    Excluye los SPs autogenerados por el code generator (sufijos: ByFilter, ByName, Del, Ins, Sel, Upd).
    Los SPs y triggers usan CREATE OR ALTER para ser idempotentes.
    Usa SqlClient .NET para manejar definiciones largas sin truncado.

.PARAMETER Database
    Nombre de la base de datos a exportar. Default: _Desktop

.PARAMETER Server
    Instancia de SQL Server. Default: gcs.softguard.com,3341

.PARAMETER User
    Usuario SQL Server. Default: RodrigoR

.PARAMETER Password
    Password SQL Server.

.PARAMETER OutputBase
    Carpeta base de salida. Default: directorio database/ relativo al script.

.PARAMETER StoredProcedures
    Exporta stored procedures.

.PARAMETER Tables
    Exporta schemas de tablas: columnas, PK/UQ, FK, checks e indices no constraint soportados.

.PARAMETER Triggers
    Exporta triggers DML de tablas.

.PARAMETER All
    Exporta stored procedures, schemas de tablas, triggers y jobs.

.PARAMETER Jobs
    Exporta SQL Agent Jobs como scripts CREATE/ALTER idempotentes.

.EXAMPLE
    .\pull-db.ps1 -Database _Desktop -Password mipass
    .\pull-db.ps1 -Database _Desktop -Tables -Triggers -Password mipass
    .\pull-db.ps1 -Database _Desktop -All -Password mipass
    .\pull-db.ps1 -Jobs -Password mipass
    .\pull-db.ps1 -Database _Monitor -Password mipass

.NOTES
    Sufijos autogenerados excluidos (code generator):
        ByFilter, ByName, Del, Ins, Sel, Upd
    Si en el futuro se identifican mas sufijos, agregar a $AutoGenSuffixes.
    Jobs: se exportan desde msdb, independiente del valor de -Database.
#>

param(
    [string]$Database         = "_Desktop",
    [string]$Server           = "gcs.softguard.com,3341",
    [string]$User             = "RodrigoR",
    [string]$Password         = "",
    [string]$OutputBase       = "",
    [switch]$StoredProcedures,
    [switch]$Tables,
    [switch]$Triggers,
    [switch]$Jobs,
    [switch]$All
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Quote-SqlName {
    param([string]$Name)
    return "[$($Name.Replace(']', ']]'))]"
}

function Quote-SqlLiteral {
    param([string]$Value)
    return "N'$($Value.Replace('''', ''''''))'"
}

function Get-SafeFileName {
    param([string]$Name)
    $invalid = [System.IO.Path]::GetInvalidFileNameChars()
    foreach ($char in $invalid) {
        $Name = $Name.Replace($char, "_")
    }
    return $Name
}

function Ensure-Directory {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Invoke-SqlRows {
    param(
        [System.Data.SqlClient.SqlConnection]$Connection,
        [string]$Query
    )

    $cmd = $Connection.CreateCommand()
    $cmd.CommandText = $Query
    $cmd.CommandTimeout = 120

    $reader = $cmd.ExecuteReader()
    $rows = [System.Collections.Generic.List[hashtable]]::new()

    try {
        while ($reader.Read()) {
            $row = @{}
            for ($i = 0; $i -lt $reader.FieldCount; $i++) {
                $value = $reader.GetValue($i)
                $row[$reader.GetName($i)] = if ($value -eq [System.DBNull]::Value) { $null } else { $value }
            }
            $rows.Add($row)
        }
    } finally {
        $reader.Close()
    }

    return ,$rows
}

function ConvertTo-SqlType {
    param([hashtable]$Column)

    $type = $Column.type_name
    $schema = $Column.type_schema
    $isAliasType = ($Column.user_type_id -ne $Column.system_type_id)

    if ($isAliasType) {
        return "$(Quote-SqlName $schema).$(Quote-SqlName $type)"
    }

    switch ($type.ToLowerInvariant()) {
        { $_ -in @("varchar", "char", "varbinary", "binary") } {
            $length = if ($Column.max_length -eq -1) { "max" } else { [string]$Column.max_length }
            return "$type($length)"
        }
        { $_ -in @("nvarchar", "nchar") } {
            $length = if ($Column.max_length -eq -1) { "max" } else { [string]([int]$Column.max_length / 2) }
            return "$type($length)"
        }
        { $_ -in @("decimal", "numeric") } {
            return "$type($($Column.precision),$($Column.scale))"
        }
        { $_ -in @("datetime2", "datetimeoffset", "time") } {
            return "$type($($Column.scale))"
        }
        default {
            return $type
        }
    }
}

function Export-StoredProcedures {
    param(
        [System.Data.SqlClient.SqlConnection]$Connection,
        [string]$OutputBase,
        [string]$Database
    )

    $AutoGenSuffixes = @("ByFilter", "ByName", "Del", "Ins", "Sel", "Upd")
    $ExcludeClauses  = ($AutoGenSuffixes | ForEach-Object { "o.name NOT LIKE '%$_'" }) -join " AND "

    $query = @"
SELECT
    o.name,
    m.definition
FROM sys.sql_modules m
INNER JOIN sys.objects o ON o.object_id = m.object_id
WHERE o.type = 'P'
  AND o.is_ms_shipped = 0
  AND $ExcludeClauses
ORDER BY o.name
"@

    $outDir = Join-Path $OutputBase "$Database\StoredProcedures"
    Ensure-Directory $outDir

    $sps = Invoke-SqlRows $Connection $query
    $count = 0
    $errors = 0
    $total = $sps.Count
    Write-Host "Exportando $total stored procedures a: $outDir" -ForegroundColor Cyan

    foreach ($sp in $sps) {
        $count++
        Write-Progress -Activity "Exportando SPs de $Database" `
                       -Status "$($sp.name) ($count/$total)" `
                       -PercentComplete (($count / $total) * 100)

        $definition = $sp.definition
        if (-not $definition -or $definition.Trim() -eq "") {
            Write-Warning "Definicion vacia para: $($sp.name)"
            $errors++
            continue
        }

        $definition = $definition -replace '(?i)\bCREATE\s+PROCEDURE\b', 'CREATE OR ALTER PROCEDURE'
        $definition = $definition -replace '(?i)\bCREATE\s+PROC\b',      'CREATE OR ALTER PROC'

        $filePath = Join-Path $outDir "$(Get-SafeFileName $sp.name).sql"
        [System.IO.File]::WriteAllText($filePath, $definition.Trim(), [System.Text.Encoding]::UTF8)
    }

    Write-Progress -Activity "Exportando SPs" -Completed
    Write-Host "Listo SPs: $($count - $errors)/$total exportados." -ForegroundColor Green
    if ($errors -gt 0) {
        Write-Host "Advertencias SPs: $errors con errores (ver mensajes arriba)" -ForegroundColor Yellow
    }
}

function Export-Triggers {
    param(
        [System.Data.SqlClient.SqlConnection]$Connection,
        [string]$OutputBase,
        [string]$Database
    )

    $query = @"
SELECT
    s.name AS schema_name,
    parent.name AS table_name,
    tr.name AS trigger_name,
    m.definition
FROM sys.triggers tr
INNER JOIN sys.objects parent ON parent.object_id = tr.parent_id
INNER JOIN sys.schemas s ON s.schema_id = parent.schema_id
INNER JOIN sys.sql_modules m ON m.object_id = tr.object_id
WHERE tr.parent_class = 1
  AND tr.is_ms_shipped = 0
ORDER BY s.name, parent.name, tr.name
"@

    $outDir = Join-Path $OutputBase "$Database\Triggers"
    Ensure-Directory $outDir

    $triggers = Invoke-SqlRows $Connection $query
    $count = 0
    $errors = 0
    $total = $triggers.Count
    Write-Host "Exportando $total triggers a: $outDir" -ForegroundColor Cyan

    foreach ($trigger in $triggers) {
        $count++
        $name = "$($trigger.schema_name).$($trigger.table_name).$($trigger.trigger_name)"
        Write-Progress -Activity "Exportando triggers de $Database" `
                       -Status "$name ($count/$total)" `
                       -PercentComplete (($count / $total) * 100)

        $definition = $trigger.definition
        if (-not $definition -or $definition.Trim() -eq "") {
            Write-Warning "Definicion vacia para trigger: $name"
            $errors++
            continue
        }

        $definition = $definition -replace '(?i)\bCREATE\s+TRIGGER\b', 'CREATE OR ALTER TRIGGER'
        $filePath = Join-Path $outDir "$(Get-SafeFileName $name).sql"
        [System.IO.File]::WriteAllText($filePath, $definition.Trim(), [System.Text.Encoding]::UTF8)
    }

    Write-Progress -Activity "Exportando triggers" -Completed
    Write-Host "Listo triggers: $($count - $errors)/$total exportados." -ForegroundColor Green
    if ($errors -gt 0) {
        Write-Host "Advertencias triggers: $errors con errores (ver mensajes arriba)" -ForegroundColor Yellow
    }
}

function Export-Tables {
    param(
        [System.Data.SqlClient.SqlConnection]$Connection,
        [string]$OutputBase,
        [string]$Database
    )

    $tablesQuery = @"
SELECT
    t.object_id,
    s.name AS schema_name,
    t.name AS table_name
FROM sys.tables t
INNER JOIN sys.schemas s ON s.schema_id = t.schema_id
WHERE t.is_ms_shipped = 0
ORDER BY s.name, t.name
"@

    $outDir = Join-Path $OutputBase "$Database\Tables"
    Ensure-Directory $outDir

    $tables = Invoke-SqlRows $Connection $tablesQuery
    $count = 0
    $errors = 0
    $total = $tables.Count
    Write-Host "Exportando $total schemas de tablas a: $outDir" -ForegroundColor Cyan

    foreach ($table in $tables) {
        $count++
        $schemaName = $table.schema_name
        $tableName = $table.table_name
        $objectId = [int]$table.object_id
        $fullName = "$schemaName.$tableName"

        Write-Progress -Activity "Exportando tablas de $Database" `
                       -Status "$fullName ($count/$total)" `
                       -PercentComplete (($count / $total) * 100)

        try {
            $schemaLiteral = Quote-SqlLiteral $schemaName
            $objectIdLiteral = [string]$objectId

            $columnsQuery = @"
SELECT
    c.column_id,
    c.name,
    ty.name AS type_name,
    SCHEMA_NAME(ty.schema_id) AS type_schema,
    c.user_type_id,
    c.system_type_id,
    c.max_length,
    c.precision,
    c.scale,
    c.collation_name,
    c.is_nullable,
    c.is_identity,
    IDENT_SEED(QUOTENAME(OBJECT_SCHEMA_NAME(c.object_id)) + '.' + QUOTENAME(OBJECT_NAME(c.object_id))) AS identity_seed,
    IDENT_INCR(QUOTENAME(OBJECT_SCHEMA_NAME(c.object_id)) + '.' + QUOTENAME(OBJECT_NAME(c.object_id))) AS identity_increment,
    c.is_computed,
    cc.definition AS computed_definition,
    cc.is_persisted,
    dc.name AS default_name,
    dc.definition AS default_definition
FROM sys.columns c
INNER JOIN sys.types ty ON ty.user_type_id = c.user_type_id
LEFT JOIN sys.computed_columns cc ON cc.object_id = c.object_id AND cc.column_id = c.column_id
LEFT JOIN sys.default_constraints dc ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
WHERE c.object_id = $objectIdLiteral
ORDER BY c.column_id
"@

            $keyConstraintsQuery = @"
SELECT
    kc.name,
    kc.type,
    i.type_desc AS index_type_desc,
    c.name AS column_name,
    ic.key_ordinal,
    ic.is_descending_key
FROM sys.key_constraints kc
INNER JOIN sys.indexes i ON i.object_id = kc.parent_object_id AND i.index_id = kc.unique_index_id
INNER JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
INNER JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
WHERE kc.parent_object_id = $objectIdLiteral
  AND ic.key_ordinal > 0
ORDER BY kc.name, ic.key_ordinal
"@

            $checksQuery = @"
SELECT name, definition
FROM sys.check_constraints
WHERE parent_object_id = $objectIdLiteral
ORDER BY name
"@

            $foreignKeysQuery = @"
SELECT
    fk.name,
    ref_schema.name AS referenced_schema,
    ref_table.name AS referenced_table,
    parent_col.name AS parent_column,
    ref_col.name AS referenced_column,
    fkc.constraint_column_id,
    fk.delete_referential_action_desc,
    fk.update_referential_action_desc
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
INNER JOIN sys.columns parent_col ON parent_col.object_id = fkc.parent_object_id AND parent_col.column_id = fkc.parent_column_id
INNER JOIN sys.tables ref_table ON ref_table.object_id = fkc.referenced_object_id
INNER JOIN sys.schemas ref_schema ON ref_schema.schema_id = ref_table.schema_id
INNER JOIN sys.columns ref_col ON ref_col.object_id = fkc.referenced_object_id AND ref_col.column_id = fkc.referenced_column_id
WHERE fk.parent_object_id = $objectIdLiteral
ORDER BY fk.name, fkc.constraint_column_id
"@

            $indexesQuery = @"
SELECT
    i.name,
    i.type_desc,
    i.is_unique,
    i.has_filter,
    i.filter_definition,
    c.name AS column_name,
    ic.key_ordinal,
    ic.index_column_id,
    ic.is_descending_key,
    ic.is_included_column
FROM sys.indexes i
INNER JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
INNER JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
WHERE i.object_id = $objectIdLiteral
  AND i.is_primary_key = 0
  AND i.is_unique_constraint = 0
  AND i.type IN (1, 2, 5, 6)
  AND i.name IS NOT NULL
ORDER BY i.name, ic.is_included_column, ic.key_ordinal, ic.index_column_id
"@

            $columns = Invoke-SqlRows $Connection $columnsQuery
            $keyConstraints = Invoke-SqlRows $Connection $keyConstraintsQuery
            $checks = Invoke-SqlRows $Connection $checksQuery
            $foreignKeys = Invoke-SqlRows $Connection $foreignKeysQuery
            $indexes = Invoke-SqlRows $Connection $indexesQuery

            $tableIdentifier = "$(Quote-SqlName $schemaName).$(Quote-SqlName $tableName)"
            $lines = [System.Collections.Generic.List[string]]::new()
            $postCreateLines = [System.Collections.Generic.List[string]]::new()

            $lines.Add("IF SCHEMA_ID($schemaLiteral) IS NULL")
            $lines.Add("    EXEC('CREATE SCHEMA $(Quote-SqlName $schemaName)');")
            $lines.Add("GO")
            $lines.Add("")
            $lines.Add("CREATE TABLE $tableIdentifier (")

            $definitions = [System.Collections.Generic.List[string]]::new()
            foreach ($column in $columns) {
                $columnDefinition = "    $(Quote-SqlName $column.name) "

                if ($column.is_computed) {
                    $columnDefinition += "AS $($column.computed_definition)"
                    if ($column.is_persisted) {
                        $columnDefinition += " PERSISTED"
                    }
                } else {
                    $columnDefinition += ConvertTo-SqlType $column

                    if ($column.collation_name) {
                        $columnDefinition += " COLLATE $($column.collation_name)"
                    }

                    if ($column.is_identity) {
                        $seed = if ($column.identity_seed) { $column.identity_seed } else { 1 }
                        $increment = if ($column.identity_increment) { $column.identity_increment } else { 1 }
                        $columnDefinition += " IDENTITY($seed,$increment)"
                    }

                    if ($column.default_definition) {
                        $columnDefinition += " CONSTRAINT $(Quote-SqlName $column.default_name) DEFAULT $($column.default_definition)"
                    }

                    $columnDefinition += if ($column.is_nullable) { " NULL" } else { " NOT NULL" }
                }

                $definitions.Add($columnDefinition)
            }

            $keyGroups = $keyConstraints | Group-Object name
            foreach ($group in $keyGroups) {
                $items = @($group.Group | Sort-Object key_ordinal)
                $first = $items[0]
                $constraintType = if ($first.type -eq "PK") { "PRIMARY KEY" } else { "UNIQUE" }
                $indexType = $first.index_type_desc.Replace("_", " ")
                $columnsSql = ($items | ForEach-Object {
                    $direction = if ($_.is_descending_key) { " DESC" } else { " ASC" }
                    "$(Quote-SqlName $_.column_name)$direction"
                }) -join ", "
                $definitions.Add("    CONSTRAINT $(Quote-SqlName $first.name) $constraintType $indexType ($columnsSql)")
            }

            foreach ($check in $checks) {
                $definitions.Add("    CONSTRAINT $(Quote-SqlName $check.name) CHECK $($check.definition)")
            }

            $fkGroups = $foreignKeys | Group-Object name
            foreach ($group in $fkGroups) {
                $items = @($group.Group | Sort-Object constraint_column_id)
                $first = $items[0]
                $parentColumns = ($items | ForEach-Object { Quote-SqlName $_.parent_column }) -join ", "
                $refColumns = ($items | ForEach-Object { Quote-SqlName $_.referenced_column }) -join ", "
                $fkDefinition = "    CONSTRAINT $(Quote-SqlName $first.name) FOREIGN KEY ($parentColumns) REFERENCES $(Quote-SqlName $first.referenced_schema).$(Quote-SqlName $first.referenced_table) ($refColumns)"
                if ($first.delete_referential_action_desc -ne "NO_ACTION") {
                    $fkDefinition += " ON DELETE $($first.delete_referential_action_desc.Replace('_', ' '))"
                }
                if ($first.update_referential_action_desc -ne "NO_ACTION") {
                    $fkDefinition += " ON UPDATE $($first.update_referential_action_desc.Replace('_', ' '))"
                }
                $definitions.Add($fkDefinition)
            }

            for ($i = 0; $i -lt $definitions.Count; $i++) {
                $suffix = if ($i -lt ($definitions.Count - 1)) { "," } else { "" }
                $lines.Add("$($definitions[$i])$suffix")
            }

            $lines.Add(");")
            $lines.Add("GO")

            $indexGroups = $indexes | Group-Object name
            foreach ($group in $indexGroups) {
                $items = @($group.Group)
                $first = $items[0]
                $keyColumns = @($items | Where-Object { -not $_.is_included_column } | Sort-Object key_ordinal)
                $includedColumns = @($items | Where-Object { $_.is_included_column } | Sort-Object index_column_id)

                if ($keyColumns.Count -eq 0) {
                    continue
                }

                $unique = if ($first.is_unique) { "UNIQUE " } else { "" }
                $indexType = $first.type_desc.Replace("_", " ")
                $keyColumnsSql = ($keyColumns | ForEach-Object {
                    $direction = if ($_.is_descending_key) { " DESC" } else { " ASC" }
                    "$(Quote-SqlName $_.column_name)$direction"
                }) -join ", "
                $indexDefinition = "CREATE $unique$indexType INDEX $(Quote-SqlName $first.name) ON $tableIdentifier ($keyColumnsSql)"

                if ($includedColumns.Count -gt 0) {
                    $includedColumnsSql = ($includedColumns | ForEach-Object { Quote-SqlName $_.column_name }) -join ", "
                    $indexDefinition += " INCLUDE ($includedColumnsSql)"
                }

                if ($first.has_filter) {
                    $indexDefinition += " WHERE $($first.filter_definition)"
                }

                $postCreateLines.Add("")
                $postCreateLines.Add($indexDefinition + ";")
                $postCreateLines.Add("GO")
            }

            foreach ($line in $postCreateLines) {
                $lines.Add($line)
            }

            $filePath = Join-Path $outDir "$(Get-SafeFileName $fullName).sql"
            [System.IO.File]::WriteAllText($filePath, (($lines -join [Environment]::NewLine).Trim() + [Environment]::NewLine), [System.Text.Encoding]::UTF8)
        } catch {
            Write-Warning "ERROR exportando tabla $fullName`: $_"
            $errors++
        }
    }

    Write-Progress -Activity "Exportando tablas" -Completed
    Write-Host "Listo tablas: $($count - $errors)/$total exportadas." -ForegroundColor Green
    if ($errors -gt 0) {
        Write-Host "Errores tablas: $errors fallaron (ver mensajes arriba)" -ForegroundColor Red
    }
}

function Export-Jobs {
    param(
        [System.Data.SqlClient.SqlConnection]$Connection,
        [string]$OutputBase
    )

    # Los jobs viven en msdb y son globales al servidor, no a una database concreta.
    $outDir = Join-Path $OutputBase "Jobs"
    Ensure-Directory $outDir

    # Trae todos los jobs con sus pasos, schedules y notificaciones.
    $jobsQuery = @"
SELECT
    j.job_id,
    j.name,
    j.enabled,
    j.description,
    j.start_step_id,
    j.category_id,
    cat.name AS category_name,
    j.owner_sid,
    SUSER_SNAME(j.owner_sid) AS owner_name,
    j.notify_level_eventlog,
    j.notify_level_email,
    j.notify_level_netsend,
    j.notify_level_page,
    j.notify_email_operator_id,
    op.name AS notify_email_operator_name,
    j.delete_level
FROM msdb.dbo.sysjobs j
LEFT JOIN msdb.dbo.syscategories cat ON cat.category_id = j.category_id
LEFT JOIN msdb.dbo.sysoperators op ON op.id = j.notify_email_operator_id
ORDER BY j.name
"@

    $stepsQuery = @"
SELECT
    js.job_id,
    js.step_id,
    js.step_name,
    js.subsystem,
    js.command,
    js.database_name,
    js.on_success_action,
    js.on_success_step_id,
    js.on_fail_action,
    js.on_fail_step_id,
    js.retry_attempts,
    js.retry_interval,
    js.output_file_name,
    js.flags
FROM msdb.dbo.sysjobsteps js
ORDER BY js.job_id, js.step_id
"@

    $schedulesQuery = @"
SELECT
    jsch.job_id,
    sch.schedule_id,
    sch.name AS schedule_name,
    sch.enabled AS schedule_enabled,
    sch.freq_type,
    sch.freq_interval,
    sch.freq_subday_type,
    sch.freq_subday_interval,
    sch.freq_relative_interval,
    sch.freq_recurrence_factor,
    sch.active_start_date,
    sch.active_end_date,
    sch.active_start_time,
    sch.active_end_time
FROM msdb.dbo.sysjobschedules jsch
INNER JOIN msdb.dbo.sysschedules sch ON sch.schedule_id = jsch.schedule_id
ORDER BY jsch.job_id, sch.name
"@

    $jobs = Invoke-SqlRows $Connection $jobsQuery
    $allSteps = Invoke-SqlRows $Connection $stepsQuery
    $allSchedules = Invoke-SqlRows $Connection $schedulesQuery

    # Indexar pasos y schedules por job_id para lookup O(1)
    $stepsByJob = @{}
    foreach ($step in $allSteps) {
        $key = $step.job_id.ToString()
        if (-not $stepsByJob.ContainsKey($key)) { $stepsByJob[$key] = [System.Collections.Generic.List[hashtable]]::new() }
        $stepsByJob[$key].Add($step)
    }

    $schedulesByJob = @{}
    foreach ($sch in $allSchedules) {
        $key = $sch.job_id.ToString()
        if (-not $schedulesByJob.ContainsKey($key)) { $schedulesByJob[$key] = [System.Collections.Generic.List[hashtable]]::new() }
        $schedulesByJob[$key].Add($sch)
    }

    $count = 0
    $errors = 0
    $total = $jobs.Count
    Write-Host "Exportando $total jobs a: $outDir" -ForegroundColor Cyan

    foreach ($job in $jobs) {
        $count++
        $jobId = $job.job_id.ToString()
        $jobName = $job.name
        Write-Progress -Activity "Exportando Jobs" `
                       -Status "$jobName ($count/$total)" `
                       -PercentComplete (($count / $total) * 100)

        try {
            $lines = [System.Collections.Generic.List[string]]::new()
            $jobNameLiteral  = Quote-SqlLiteral $jobName
            $enabledVal      = if ($job.enabled) { 1 } else { 0 }
            $descLiteral     = Quote-SqlLiteral $(if ($job.description) { $job.description } else { "" })
            $categoryLiteral = Quote-SqlLiteral $(if ($job.category_name) { $job.category_name } else { "[Uncategorized (Local)]" })
            $ownerLiteral    = Quote-SqlLiteral $(if ($job.owner_name) { $job.owner_name } else { "sa" })

            $lines.Add("-- ============================================================")
            $lines.Add("-- Job: $jobName")
            $lines.Add("-- Generado por pull-db.ps1 - NO editar manualmente")
            $lines.Add("-- ============================================================")
            $lines.Add("USE msdb;")
            $lines.Add("GO")
            $lines.Add("")

            # --- Eliminar job si existe y recrear (patron idempotente) ---
            $lines.Add("IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = $jobNameLiteral)")
            $lines.Add("    EXEC msdb.dbo.sp_delete_job @job_name = $jobNameLiteral, @delete_unused_schedule = 0;")
            $lines.Add("GO")
            $lines.Add("")

            # --- Crear job ---
            $lines.Add("EXEC msdb.dbo.sp_add_job")
            $lines.Add("    @job_name          = $jobNameLiteral,")
            $lines.Add("    @enabled           = $enabledVal,")
            $lines.Add("    @description       = $descLiteral,")
            $lines.Add("    @category_name     = $categoryLiteral,")
            $lines.Add("    @owner_login_name  = $ownerLiteral,")

            # Notificacion por email
            if ($job.notify_email_operator_name -and $job.notify_level_email -gt 0) {
                $opLiteral = Quote-SqlLiteral $job.notify_email_operator_name
                $lines.Add("    @notify_level_email  = $($job.notify_level_email),")
                $lines.Add("    @notify_email_operator_name = $opLiteral,")
            }

            $lines.Add("    @delete_level      = $($job.delete_level);")
            $lines.Add("GO")
            $lines.Add("")

            # --- Servidor destino ---
            $lines.Add("EXEC msdb.dbo.sp_add_jobserver")
            $lines.Add("    @job_name   = $jobNameLiteral,")
            $lines.Add("    @server_name = N'(LOCAL)';")
            $lines.Add("GO")
            $lines.Add("")

            # --- Pasos ---
            $steps = if ($stepsByJob.ContainsKey($jobId)) { $stepsByJob[$jobId] } else { @() }
            foreach ($step in $steps) {
                $stepNameLiteral   = Quote-SqlLiteral $step.step_name
                $subsystemLiteral  = Quote-SqlLiteral $step.subsystem
                $commandLiteral    = Quote-SqlLiteral $(if ($step.command) { $step.command } else { "" })
                $dbLiteral         = Quote-SqlLiteral $(if ($step.database_name) { $step.database_name } else { "master" })

                $lines.Add("EXEC msdb.dbo.sp_add_jobstep")
                $lines.Add("    @job_name          = $jobNameLiteral,")
                $lines.Add("    @step_id           = $($step.step_id),")
                $lines.Add("    @step_name         = $stepNameLiteral,")
                $lines.Add("    @subsystem         = $subsystemLiteral,")
                $lines.Add("    @command           = $commandLiteral,")
                $lines.Add("    @database_name     = $dbLiteral,")
                $lines.Add("    @on_success_action = $($step.on_success_action),")
                $lines.Add("    @on_success_step_id = $($step.on_success_step_id),")
                $lines.Add("    @on_fail_action    = $($step.on_fail_action),")
                $lines.Add("    @on_fail_step_id   = $($step.on_fail_step_id),")
                $lines.Add("    @retry_attempts    = $($step.retry_attempts),")
                $lines.Add("    @retry_interval    = $($step.retry_interval);")
                $lines.Add("GO")
                $lines.Add("")
            }

            # --- Paso de inicio ---
            $lines.Add("EXEC msdb.dbo.sp_update_job")
            $lines.Add("    @job_name      = $jobNameLiteral,")
            $lines.Add("    @start_step_id = $($job.start_step_id);")
            $lines.Add("GO")
            $lines.Add("")

            # --- Schedules ---
            $schedules = if ($schedulesByJob.ContainsKey($jobId)) { $schedulesByJob[$jobId] } else { @() }
            foreach ($sch in $schedules) {
                $schNameLiteral = Quote-SqlLiteral $sch.schedule_name
                $schEnabled     = if ($sch.schedule_enabled) { 1 } else { 0 }

                $lines.Add("EXEC msdb.dbo.sp_add_schedule")
                $lines.Add("    @schedule_name          = $schNameLiteral,")
                $lines.Add("    @enabled                = $schEnabled,")
                $lines.Add("    @freq_type              = $($sch.freq_type),")
                $lines.Add("    @freq_interval          = $($sch.freq_interval),")
                $lines.Add("    @freq_subday_type       = $($sch.freq_subday_type),")
                $lines.Add("    @freq_subday_interval   = $($sch.freq_subday_interval),")
                $lines.Add("    @freq_relative_interval = $($sch.freq_relative_interval),")
                $lines.Add("    @freq_recurrence_factor = $($sch.freq_recurrence_factor),")
                $lines.Add("    @active_start_date      = $($sch.active_start_date),")
                $lines.Add("    @active_end_date        = $($sch.active_end_date),")
                $lines.Add("    @active_start_time      = $($sch.active_start_time),")
                $lines.Add("    @active_end_time        = $($sch.active_end_time);")
                $lines.Add("GO")
                $lines.Add("")

                $lines.Add("EXEC msdb.dbo.sp_attach_schedule")
                $lines.Add("    @job_name      = $jobNameLiteral,")
                $lines.Add("    @schedule_name = $schNameLiteral;")
                $lines.Add("GO")
                $lines.Add("")
            }

            $filePath = Join-Path $outDir "$(Get-SafeFileName $jobName).sql"
            [System.IO.File]::WriteAllText($filePath, (($lines -join [Environment]::NewLine).Trim() + [Environment]::NewLine), [System.Text.Encoding]::UTF8)
        } catch {
            Write-Warning "ERROR exportando job '$jobName': $_"
            $errors++
        }
    }

    Write-Progress -Activity "Exportando Jobs" -Completed
    Write-Host "Listo jobs: $($count - $errors)/$total exportados." -ForegroundColor Green
    if ($errors -gt 0) {
        Write-Host "Advertencias jobs: $errors con errores (ver mensajes arriba)" -ForegroundColor Yellow
    }
}

# --- Resolver rutas ---
$ScriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot   = Split-Path -Parent $ScriptDir
if (-not $OutputBase) { $OutputBase = Join-Path $RepoRoot "database" }

if ($All) {
    $StoredProcedures = $true
    $Tables = $true
    $Triggers = $true
    $Jobs = $true
}

if (-not $StoredProcedures -and -not $Tables -and -not $Triggers -and -not $Jobs) {
    $StoredProcedures = $true
}

# Cuando solo se exportan jobs no hace falta una database de aplicacion concreta.
$NeedsAppDb = $StoredProcedures -or $Tables -or $Triggers
$ConnDatabase = if ($NeedsAppDb) { $Database } else { "master" }

# --- Solicitar password si no se proveo ---
if (-not $Password) {
    $securePass = Read-Host "Password para $User en $Server" -AsSecureString
    $Password   = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
                      [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))
}

Write-Host "Conectando a $Server / $ConnDatabase ..." -ForegroundColor Cyan

# --- Conexion via SqlClient (.NET) para manejar nvarchar(max) sin truncado ---
$ConnString = "Server=$Server;Database=$ConnDatabase;User Id=$User;Password=$Password;TrustServerCertificate=True;Connection Timeout=30"
$Conn = New-Object System.Data.SqlClient.SqlConnection($ConnString)

try {
    $Conn.Open()
} catch {
    Write-Error "No se pudo conectar a $Server/$ConnDatabase`: $_"
    exit 1
}

try {
    if ($StoredProcedures) {
        Export-StoredProcedures $Conn $OutputBase $Database
    }

    if ($Tables) {
        Export-Tables $Conn $OutputBase $Database
    }

    if ($Triggers) {
        Export-Triggers $Conn $OutputBase $Database
    }

    if ($Jobs) {
        Export-Jobs $Conn $OutputBase
    }
} finally {
    $Conn.Close()
}

Write-Host ""
if ($NeedsAppDb) {
    Write-Host "Exportacion finalizada para $Database." -ForegroundColor Green
} else {
    Write-Host "Exportacion de jobs finalizada." -ForegroundColor Green
}
