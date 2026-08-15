-- ============================================================
-- Job: ControlVtoComandos
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'ControlVtoComandos')
    EXEC msdb.dbo.sp_delete_job @job_name = N'ControlVtoComandos', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'ControlVtoComandos',
    @enabled           = 1,
    @description       = N'Pasa a vencido los comandos que no se enviaron en cierto tiempo configurado en un parametro',
    @category_name     = N'Verificacion',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'ControlVtoComandos',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ControlVtoComandos',
    @step_id           = 1,
    @step_name         = N'Ejecuto [SGSP_VtoComandos]',
    @subsystem         = N'TSQL',
    @command           = N'Exec [SGSP_VtoComandos]',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'ControlVtoComandos',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Ejecuto',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 4,
    @freq_subday_interval   = 2,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20210501,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'ControlVtoComandos',
    @schedule_name = N'Ejecuto';
GO
