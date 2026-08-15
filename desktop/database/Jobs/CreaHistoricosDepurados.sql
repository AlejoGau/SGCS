-- ============================================================
-- Job: CreaHistoricosDepurados
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'CreaHistoricosDepurados')
    EXEC msdb.dbo.sp_delete_job @job_name = N'CreaHistoricosDepurados', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'CreaHistoricosDepurados',
    @enabled           = 1,
    @description       = N'Se ejecuta cada 4 meses y crea los historicos de depuracion de  los proximos 12 meses',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'CreaHistoricosDepurados',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'CreaHistoricosDepurados',
    @step_id           = 1,
    @step_name         = N'Crea Historicos',
    @subsystem         = N'TSQL',
    @command           = N'Execute [_Datos].[dbo].[SGSP_CreaHistoricosDepuracion]',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'CreaHistoricosDepurados',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Execute',
    @enabled                = 1,
    @freq_type              = 32,
    @freq_interval          = 7,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 1,
    @freq_recurrence_factor = 4,
    @active_start_date      = 20250701,
    @active_end_date        = 99991231,
    @active_start_time      = 1700,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'CreaHistoricosDepurados',
    @schedule_name = N'Execute';
GO
