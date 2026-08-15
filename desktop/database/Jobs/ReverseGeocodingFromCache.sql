-- ============================================================
-- Job: ReverseGeocodingFromCache
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'ReverseGeocodingFromCache')
    EXEC msdb.dbo.sp_delete_job @job_name = N'ReverseGeocodingFromCache', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'ReverseGeocodingFromCache',
    @enabled           = 0,
    @description       = N'Busca en el Cache las direcciones no resueltas',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'ReverseGeocodingFromCache',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ReverseGeocodingFromCache',
    @step_id           = 1,
    @step_name         = N'Ejecuto [PosicionesDesdeCache]',
    @subsystem         = N'TSQL',
    @command           = N'Exec [PosicionesDesdeCache] @top=25000',
    @database_name     = N'_History',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'ReverseGeocodingFromCache',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Ejecuto',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 2,
    @freq_subday_interval   = 10,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20221027,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'ReverseGeocodingFromCache',
    @schedule_name = N'Ejecuto';
GO
