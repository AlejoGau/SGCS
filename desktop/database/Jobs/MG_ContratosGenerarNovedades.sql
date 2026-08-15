-- ============================================================
-- Job: MG_ContratosGenerarNovedades
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'MG_ContratosGenerarNovedades')
    EXEC msdb.dbo.sp_delete_job @job_name = N'MG_ContratosGenerarNovedades', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'MG_ContratosGenerarNovedades',
    @enabled           = 1,
    @description       = N'Genera las novedades de los contratos activos',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'MG_ContratosGenerarNovedades',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'MG_ContratosGenerarNovedades',
    @step_id           = 1,
    @step_name         = N'MG_ContratosGenerarNovedades',
    @subsystem         = N'TSQL',
    @command           = N'Exec _desktop..MG_ContratosGenerarNovedades',
    @database_name     = N'master',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'MG_ContratosGenerarNovedades',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Mensual',
    @enabled                = 1,
    @freq_type              = 16,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 1,
    @active_start_date      = 20180801,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'MG_ContratosGenerarNovedades',
    @schedule_name = N'Mensual';
GO
