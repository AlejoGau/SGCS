-- ============================================================
-- Job: EventoDelete_Process
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'EventoDelete_Process')
    EXEC msdb.dbo.sp_delete_job @job_name = N'EventoDelete_Process', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'EventoDelete_Process',
    @enabled           = 1,
    @description       = N'Ejecuta SPSG_EventoDelete_ProcessQueuepara mover registros a tablas historicas',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'EventoDelete_Process',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'EventoDelete_Process',
    @step_id           = 1,
    @step_name         = N'Procesar EventoDeleteQueue',
    @subsystem         = N'TSQL',
    @command           = N'--Estos seteos con onbligatorios
SET QUOTED_IDENTIFIER ON;


-- Ejecutar el procesamiento principal
EXEC [dbo].[SPSG_EventoDelete_ProcessQueue] 
    @MaxMinutes = 50,    -- 50 minutos maximo (para dejar margen antes del proximo run que es cada 1 hora)
    @BatchSize = 100;   -- Procesar de a 100 registros

-- Limpiar registros completados de mas de 7 dias
DELETE FROM [dbo].[EventoDeleteQueue]
WHERE edq_iGeneralStatus = 2  -- Completados
  AND edq_tDateQueue < DATEADD(DAY, -7, GETDATE());',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 1,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'EventoDelete_Process',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Cada 5 minutos',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 8,
    @freq_subday_interval   = 1,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20250801,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'EventoDelete_Process',
    @schedule_name = N'Cada 5 minutos';
GO
