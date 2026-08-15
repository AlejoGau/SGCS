-- ============================================================
-- Job: BackupLogs
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'BackupLogs')
    EXEC msdb.dbo.sp_delete_job @job_name = N'BackupLogs', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'BackupLogs',
    @enabled           = 1,
    @description       = N'Hace Backup de los logs de transacciones cada 10 minutos',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'BackupLogs',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupLogs',
    @step_id           = 1,
    @step_name         = N'Control ejecucion ShrinkLog',
    @subsystem         = N'TSQL',
    @command           = N'Declare @job_id UNIQUEIDENTIFIER;

-- Obtener el ID del segundo job
Select @job_id = job_id From msdb.dbo.sysjobs
	Where name = ''ShrinkLog''

-- Verificar si el segundo job está en ejecución
If EXISTS ( Select 1From msdb.dbo.sysjobactivity As ja
			Join msdb.dbo.sysjobs AS j On ja.job_id = j.job_id
			Where j.job_id = @job_id
				And ja.stop_execution_date IS NULL
				And ja.start_execution_date IS NOT NULL )
Begin
    -- Hacer fallar el step para detener el job
    RAISERROR(''ShrinkLog Job se está ejecutando, este job no continuará.'', 16, 1);
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
    @job_name          = N'BackupLogs',
    @step_id           = 2,
    @step_name         = N'BupLogDatos',
    @subsystem         = N'TSQL',
    @command           = N'CHECKPOINT
Go

Backup Log _Datos  TO DISK = N''NUL:'' 
Go',
    @database_name     = N'_Datos',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupLogs',
    @step_id           = 3,
    @step_name         = N'BupLogTablas',
    @subsystem         = N'TSQL',
    @command           = N'CHECKPOINT
Go

Backup Log _Tablas TO DISK = N''NUL:''
Go',
    @database_name     = N'_Tablas',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupLogs',
    @step_id           = 4,
    @step_name         = N'BupLogSistema',
    @subsystem         = N'TSQL',
    @command           = N'CHECKPOINT
Go

Backup Log _Sistema  TO DISK = N''NUL:'' 
Go',
    @database_name     = N'_Sistema',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupLogs',
    @step_id           = 5,
    @step_name         = N'BupLogHistory',
    @subsystem         = N'TSQL',
    @command           = N'CHECKPOINT
Go

Backup Log _History  TO DISK = N''NUL:'' 
Go',
    @database_name     = N'_History',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BackupLogs',
    @step_id           = 6,
    @step_name         = N'TaskStatus',
    @subsystem         = N'TSQL',
    @command           = N'-- Aviso que la tarea esta funcionando	
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N''BackupLogs'', @Repetition = 90
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
    @job_name      = N'BackupLogs',
    @start_step_id = 2;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'ScheduleBupLog',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 4,
    @freq_subday_interval   = 10,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20160101,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'BackupLogs',
    @schedule_name = N'ScheduleBupLog';
GO
