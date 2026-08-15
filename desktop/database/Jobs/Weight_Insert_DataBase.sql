-- ============================================================
-- Job: Weight_Insert_DataBase
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'Weight_Insert_DataBase')
    EXEC msdb.dbo.sp_delete_job @job_name = N'Weight_Insert_DataBase', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'Weight_Insert_DataBase',
    @enabled           = 0,
    @description       = N'Mido el peso de las tablas y lo inserto dentro de la base Weight_DB para dejar informacion sobre el crecimiento',
    @category_name     = N'Data Collector',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'Weight_Insert_DataBase',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'Weight_Insert_DataBase',
    @step_id           = 1,
    @step_name         = N'Select And Insert',
    @subsystem         = N'TSQL',
    @command           = N'Use [Weight_DB]
Go

Declare @NameTabletDate nVarChar(100) = '''', @ScriptExec nVarChar(Max) = ''''

-- Seteo nombre de tabla con fecha.
Select @NameTabletDate = ''DB_Datos_Info_'' + Replace(CONVERT(varchar,GetDate(),1),''/'',''_'')

-- Verifica si existe la tabla
IF (Select [name] From SysObjects Where [name] = @NameTabletDate) Is Not Null 
Begin
	Set @ScriptExec = ''Drop Table '' +  @NameTabletDate
	Exec sp_executesql @ScriptExec
	--Print @ScriptExec
End

Use [_Datos]
-- Seteo e inserto los datos en la base de datos para los datos del dia
Set @ScriptExec =
''SELECT
s.Name AS SchemaName,
t.Name AS TableName,
p.rows AS RowCounts,
CAST(ROUND((SUM(a.used_pages) / 128.00), 2) AS NUMERIC(36, 2)) AS Used_MB,
CAST(ROUND((SUM(a.total_pages) - SUM(a.used_pages)) / 128.00, 2) AS NUMERIC(36, 2)) AS Unused_MB,
CAST(ROUND((SUM(a.total_pages) / 128.00), 2) AS NUMERIC(36, 2)) AS Total_MB
INTO [Weight_DB].[dbo].['' + @NameTabletDate + '']
FROM sys.tables t
INNER JOIN sys.indexes i ON t.OBJECT_ID = i.object_id
INNER JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
INNER JOIN sys.allocation_units a ON p.partition_id = a.container_id
INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
GROUP BY t.Name, s.Name, p.Rows
ORDER BY 4 Desc''
----------------------------------
Exec sp_executesql @ScriptExec
--Print @ScriptExec
Go',
    @database_name     = N'master',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'Weight_Insert_DataBase',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Inicio Diario',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20200409,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'Weight_Insert_DataBase',
    @schedule_name = N'Inicio Diario';
GO
