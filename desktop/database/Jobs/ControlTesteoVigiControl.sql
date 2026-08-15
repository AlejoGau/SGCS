-- ============================================================
-- Job: ControlTesteoVigiControl
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'ControlTesteoVigiControl')
    EXEC msdb.dbo.sp_delete_job @job_name = N'ControlTesteoVigiControl', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'ControlTesteoVigiControl',
    @enabled           = 1,
    @description       = N'Controla el test periodico enviado por los dispositivos que utilizan Vigicontrol',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'ControlTesteoVigiControl',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ControlTesteoVigiControl',
    @step_id           = 1,
    @step_name         = N'Control',
    @subsystem         = N'TSQL',
    @command           = N'exec [SGSP_ControlTesteoVigiControl]',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'ControlTesteoVigiControl',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'recurring',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 4,
    @freq_subday_interval   = 1,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20171001,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'ControlTesteoVigiControl',
    @schedule_name = N'recurring';
GO
