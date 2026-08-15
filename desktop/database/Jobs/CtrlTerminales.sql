-- ============================================================
-- Job: CtrlTerminales
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'CtrlTerminales')
    EXEC msdb.dbo.sp_delete_job @job_name = N'CtrlTerminales', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'CtrlTerminales',
    @enabled           = 0,
    @description       = N'No description available.',
    @category_name     = N'[PG Timer (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'CtrlTerminales',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'CtrlTerminales',
    @step_id           = 1,
    @step_name         = N'Control',
    @subsystem         = N'TSQL',
    @command           = N'Truncate Table [_Sistema].[dbo].[s_terminales_proceso]
Go

Truncate Table [_Sistema].[dbo].[s_timer_proceso]
Go

Truncate Table [_Sistema].[dbo].[s_receptor_proceso]
Go

Truncate Table [_Sistema].[dbo].[s_ipreader_proceso]
Go

Truncate Table [_Sistema].[dbo].[s_smsg_proceso]
Go

If OBJECT_ID(''s_scheduler_proceso'') IS NOT NULL
   Truncate Table [_Sistema].[dbo].[s_scheduler_proceso]
Go',
    @database_name     = N'_Sistema',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'CtrlTerminales',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Control',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 4,
    @freq_subday_interval   = 10,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20190815,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'CtrlTerminales',
    @schedule_name = N'Control';
GO
