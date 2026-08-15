-- ============================================================
-- Job: BackupDesktop
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'BackupDesktop')
    EXEC msdb.dbo.sp_delete_job @job_name = N'BackupDesktop', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'BackupDesktop',
    @enabled           = 1,
    @description       = N'No description available.',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'BackupDesktop',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupDesktop',
    @step_id           = 1,
    @step_name         = N'Bup',
    @subsystem         = N'TSQL',
    @command           = N'Execute [_Desktop].[dbo].[SGSP_BackupDB] @DBName = N''_Desktop''',
    @database_name     = N'_Desktop',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 1,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupDesktop',
    @step_id           = 2,
    @step_name         = N'Del Log',
    @subsystem         = N'TSQL',
    @command           = N'Declare @dbPath NVARCHAR(200) = ''''
Select Top 1 @dbPath = m.physical_device_name
	From msdb.dbo.backupset s
Inner Join msdb.dbo.backupmediafamily m ON s.media_set_id = m.media_set_id
	Where s.database_name = ''_Desktop'' 
		And s.type= ''L'' --''LOG''  
Order By backup_start_date DESC
Print  @dbPath

If @dbPath Is Not Null
Begin
	Declare @cNombre Varchar(200) = ''Del ''+Rtrim(@dbPath)
	Print @cNombre
	EXEC xp_cmdshell @cNombre 
End
Go',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupDesktop',
    @step_id           = 3,
    @step_name         = N'TaskStatus',
    @subsystem         = N'TSQL',
    @command           = N'-- Aviso que la tarea esta funcionando	60min * 25hs *7 dias = 10500
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N''BackupDesktop'', @Repetition = 10500
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
    @job_name      = N'BackupDesktop',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Backup',
    @enabled                = 1,
    @freq_type              = 8,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 1,
    @active_start_date      = 20160101,
    @active_end_date        = 99991231,
    @active_start_time      = 21000,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'BackupDesktop',
    @schedule_name = N'Backup';
GO
