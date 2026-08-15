-- ============================================================
-- Job: ShrinkLog
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'ShrinkLog')
    EXEC msdb.dbo.sp_delete_job @job_name = N'ShrinkLog', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'ShrinkLog',
    @enabled           = 1,
    @description       = N'Achica el LogTransaction de las DB',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'ShrinkLog',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ShrinkLog',
    @step_id           = 1,
    @step_name         = N'Shrink _Datos',
    @subsystem         = N'TSQL',
    @command           = N'Use _Datos
GO	
DBCC SHRINKFILE (''_Datos_Log'',1)
GO',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ShrinkLog',
    @step_id           = 2,
    @step_name         = N'Shrink _Sistema',
    @subsystem         = N'TSQL',
    @command           = N'Use _Sistema	
GO
DBCC SHRINKFILE (''_Sistema_Log'',1)
GO',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ShrinkLog',
    @step_id           = 3,
    @step_name         = N'Shrink _Tablas',
    @subsystem         = N'TSQL',
    @command           = N'Use _Tablas	
GO
DBCC SHRINKFILE (''_Tablas_Log'',1)
GO',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ShrinkLog',
    @step_id           = 4,
    @step_name         = N'Shrink _History',
    @subsystem         = N'TSQL',
    @command           = N'Use _History
GO
DBCC SHRINKFILE (''_History'',1)
GO',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ShrinkLog',
    @step_id           = 5,
    @step_name         = N'TaskStatus',
    @subsystem         = N'TSQL',
    @command           = N'-- Aviso que la tarea esta funcionando	60min * 25hs * 2dias = 3000
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N''ShrinkLog'', @Repetition = 3000
--',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'ShrinkLog',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Para ejecutar ShrinkLog',
    @enabled                = 1,
    @freq_type              = 8,
    @freq_interval          = 43,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 1,
    @active_start_date      = 20040901,
    @active_end_date        = 99991231,
    @active_start_time      = 50000,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'ShrinkLog',
    @schedule_name = N'Para ejecutar ShrinkLog';
GO
