-- ============================================================
-- Job: syspolicy_purge_history
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'syspolicy_purge_history')
    EXEC msdb.dbo.sp_delete_job @job_name = N'syspolicy_purge_history', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'syspolicy_purge_history',
    @enabled           = 1,
    @description       = N'No description available.',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'syspolicy_purge_history',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'syspolicy_purge_history',
    @step_id           = 1,
    @step_name         = N'Verify that automation is enabled.',
    @subsystem         = N'TSQL',
    @command           = N'IF (msdb.dbo.fn_syspolicy_is_automation_enabled() != 1)
        BEGIN
            RAISERROR(34022, 16, 1)
        END',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 1,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'syspolicy_purge_history',
    @step_id           = 2,
    @step_name         = N'Purge history.',
    @subsystem         = N'TSQL',
    @command           = N'EXEC msdb.dbo.sp_syspolicy_purge_history',
    @database_name     = N'master',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'syspolicy_purge_history',
    @step_id           = 3,
    @step_name         = N'Erase Phantom System Health Records.',
    @subsystem         = N'PowerShell',
    @command           = N'if (''$(ESCAPE_SQUOTE(INST))'' -eq ''MSSQLSERVER'') {$a = ''\DEFAULT''} ELSE {$a = ''''};
(Get-Item SQLSERVER:\SQLPolicy\$(ESCAPE_NONE(SRVR))$a).EraseSystemHealthPhantomRecords()',
    @database_name     = N'master',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'syspolicy_purge_history',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'syspolicy_purge_history_schedule',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20080101,
    @active_end_date        = 99991231,
    @active_start_time      = 20000,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'syspolicy_purge_history',
    @schedule_name = N'syspolicy_purge_history_schedule';
GO
