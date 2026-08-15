-- ============================================================
-- Job: BorraTimerSinProcesar
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'BorraTimerSinProcesar')
    EXEC msdb.dbo.sp_delete_job @job_name = N'BorraTimerSinProcesar', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'BorraTimerSinProcesar',
    @enabled           = 1,
    @description       = N'Borra de P_Timer Eventos Sin Horario',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'BorraTimerSinProcesar',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'BorraTimerSinProcesar',
    @step_id           = 1,
    @step_name         = N'Borra Timer Sin Procesar',
    @subsystem         = N'TSQL',
    @command           = N'EXECUTE sp_BorraTimerSinProcesar',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'BorraTimerSinProcesar',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Borra Timer Sin Procesar',
    @enabled                = 1,
    @freq_type              = 16,
    @freq_interval          = 5,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 1,
    @active_start_date      = 20050801,
    @active_end_date        = 99991231,
    @active_start_time      = 13000,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'BorraTimerSinProcesar',
    @schedule_name = N'Borra Timer Sin Procesar';
GO
