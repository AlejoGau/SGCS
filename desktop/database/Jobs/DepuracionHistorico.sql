-- ============================================================
-- Job: DepuracionHistorico
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'DepuracionHistorico')
    EXEC msdb.dbo.sp_delete_job @job_name = N'DepuracionHistorico', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'DepuracionHistorico',
    @enabled           = 1,
    @description       = N'Depura  p_recepcion por dia',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'DepuracionHistorico',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'DepuracionHistorico',
    @step_id           = 1,
    @step_name         = N'Depuracion',
    @subsystem         = N'TSQL',
    @command           = N'Exec [dbo].[SGSP_Depuracion] @cTipo = ''xDia'',
	@iTimeout =180,
	@iTop =10000,
	@IsDebug = 0 --1.Para que no ejecute y solamente muestre el query de delete',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'DepuracionHistorico',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Crea Historia',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 8,
    @freq_subday_interval   = 5,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20120201,
    @active_end_date        = 99991231,
    @active_start_time      = 54500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'DepuracionHistorico',
    @schedule_name = N'Crea Historia';
GO
