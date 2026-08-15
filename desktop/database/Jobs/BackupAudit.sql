-- ============================================================
-- Job: BackupAudit
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'BackupAudit')
    EXEC msdb.dbo.sp_delete_job @job_name = N'BackupAudit', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'BackupAudit',
    @enabled           = 1,
    @description       = N'No description available.',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'BackupAudit',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupAudit',
    @step_id           = 1,
    @step_name         = N'Bup',
    @subsystem         = N'TSQL',
    @command           = N'Execute [_Desktop].[dbo].[SGSP_BackupDB] @DBName = N''_Audit''',
    @database_name     = N'_Audit',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 1,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupAudit',
    @step_id           = 2,
    @step_name         = N'Del Log',
    @subsystem         = N'TSQL',
    @command           = N'Declare @dbPath NVARCHAR(200) = ''''
Select Top 1 @dbPath = m.physical_device_name
	From msdb.dbo.backupset s
Inner Join msdb.dbo.backupmediafamily m ON s.media_set_id = m.media_set_id
	Where s.database_name = ''_Audit'' 
	And s.type= ''L'' --''LOG''  
Order By backup_start_date DESC

If @dbPath Is Not Null
Begin
	Declare @cNombre Varchar(100) = ''Del ''+Rtrim(@dbPath)
	Print @cNombre
	EXEC xp_cmdshell @cNombre 
End
',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupAudit',
    @step_id           = 3,
    @step_name         = N'TaskStatus',
    @subsystem         = N'TSQL',
    @command           = N'-- Aviso que la tarea esta funcionando	60min * 25hs = 1500
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N''BackupAudit'', @Repetition = 1500
--	',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'BackupAudit',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Backup',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20160101,
    @active_end_date        = 99991231,
    @active_start_time      = 20500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'BackupAudit',
    @schedule_name = N'Backup';
GO
