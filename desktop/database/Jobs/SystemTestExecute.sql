-- ============================================================
-- Job: SystemTestExecute
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'SystemTestExecute')
    EXEC msdb.dbo.sp_delete_job @job_name = N'SystemTestExecute', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'SystemTestExecute',
    @enabled           = 1,
    @description       = N'Ejecuta el StoreProcedure [SystemTestExecute] y analiza resultados',
    @category_name     = N'[Database Maintenance]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'SystemTestExecute',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'SystemTestExecute',
    @step_id           = 1,
    @step_name         = N'StoreProcedure Exec',
    @subsystem         = N'TSQL',
    @command           = N'Execute [dbo].[SystemTestExecute] @fromJob = ''S''',
    @database_name     = N'_Desktop',
    @on_success_action = 4,
    @on_success_step_id = 2,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'SystemTestExecute',
    @step_id           = 2,
    @step_name         = N'Analiza resultados en [s_SystemTest]',
    @subsystem         = N'TSQL',
    @command           = N'Execute [dbo].[SystemTestAnalyze]',
    @database_name     = N'_Desktop',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'SystemTestExecute',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Control',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20210909,
    @active_end_date        = 99991231,
    @active_start_time      = 74500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'SystemTestExecute',
    @schedule_name = N'Control';
GO
