-- ============================================================
-- Job: tracguardDireccionHistorica
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'tracguardDireccionHistorica')
    EXEC msdb.dbo.sp_delete_job @job_name = N'tracguardDireccionHistorica', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'tracguardDireccionHistorica',
    @enabled           = 1,
    @description       = N'No description available.',
    @category_name     = N'[Database Maintenance]',
    @owner_login_name  = N'RodrigoR',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'tracguardDireccionHistorica',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'tracguardDireccionHistorica',
    @step_id           = 1,
    @step_name         = N'muevo noviembre',
    @subsystem         = N'TSQL',
    @command           = N'SET ANSI_NULLS, QUOTED_IDENTIFIER ON;

update h set pos_cDireccion = gps_cdireccion collate database_default
	from _History..p_Posiciones202111 as h WITH (NOLOCK) 
	inner join _datos..p_PosicionesGPS WITH (NOLOCK) on (h.pos_tfechahora = gps_tfechahora and h.pos_cIMEI = gps_cIMEI collate database_default)
where gps_cDireccion is not null and h.pos_cDireccion ='''' and gps_cDireccion!=''''',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'tracguardDireccionHistorica',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'siempre',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 2,
    @freq_subday_interval   = 10,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20211126,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'tracguardDireccionHistorica',
    @schedule_name = N'siempre';
GO
