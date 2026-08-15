-- ============================================================
-- Job: ControlSMS
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'ControlSMS')
    EXEC msdb.dbo.sp_delete_job @job_name = N'ControlSMS', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'ControlSMS',
    @enabled           = 1,
    @description       = N'-Controla y resetea los contadores de SMS Enviados',
    @category_name     = N'Verificacion',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'ControlSMS',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ControlSMS',
    @step_id           = 1,
    @step_name         = N'Ejecuta SGSP_CtrlSmsEnviados',
    @subsystem         = N'TSQL',
    @command           = N'Exec SGSP_CtrlSmsEnviados',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'ControlSMS',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'ControlSMS',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20130313,
    @active_end_date        = 99991231,
    @active_start_time      = 5,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'ControlSMS',
    @schedule_name = N'ControlSMS';
GO
