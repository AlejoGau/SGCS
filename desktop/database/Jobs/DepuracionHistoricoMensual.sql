-- ============================================================
-- Job: DepuracionHistoricoMensual
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'DepuracionHistoricoMensual')
    EXEC msdb.dbo.sp_delete_job @job_name = N'DepuracionHistoricoMensual', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'DepuracionHistoricoMensual',
    @enabled           = 1,
    @description       = N'Depura a historico p_recepcion que no fue procesado diariamente',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'DepuracionHistoricoMensual',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'DepuracionHistoricoMensual',
    @step_id           = 1,
    @step_name         = N'Depura Mensual',
    @subsystem         = N'TSQL',
    @command           = N'EXEC [dbo].[SGSP_Depuracion]
		@cTipo = N''xMes'',  --''xDia''
		@iTimeout = 180,   -- minutos	
		@iTop = 10000,     -- Cantidad de registros a eliminar en cada loop
		@IsDebug = 0        -- 1 para que no ejecute y solamente muestre el query de delete	',
    @database_name     = N'_Datos',
    @on_success_action = 3,
    @on_success_step_id = 2,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'DepuracionHistoricoMensual',
    @step_id           = 2,
    @step_name         = N'Elimina registros de tablas inexistentes y crea depurados a futuro',
    @subsystem         = N'TSQL',
    @command           = N'Execute [SGSP_DepuracionMensualPost]',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'DepuracionHistoricoMensual',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Depura Mensual',
    @enabled                = 1,
    @freq_type              = 16,
    @freq_interval          = 5,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 1,
    @active_start_date      = 20250701,
    @active_end_date        = 99991231,
    @active_start_time      = 31500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'DepuracionHistoricoMensual',
    @schedule_name = N'Depura Mensual';
GO
