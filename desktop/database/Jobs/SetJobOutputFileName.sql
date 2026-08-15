-- ============================================================
-- Job: SetJobOutputFileName
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'SetJobOutputFileName')
    EXEC msdb.dbo.sp_delete_job @job_name = N'SetJobOutputFileName', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'SetJobOutputFileName',
    @enabled           = 1,
    @description       = N'Modifica el txt todos los dias. Inicialmente solo para jobs de TimerExecute',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'SetJobOutputFileName',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'SetJobOutputFileName',
    @step_id           = 1,
    @step_name         = N'Cambia OutputFileName',
    @subsystem         = N'TSQL',
    @command           = N'--Use msdb
Declare @OutputPath nvarchar(260) = N''C:\Data\LogsJobsSQL'',
			@cmd nvarchar(max) = '''',
			@msg nvarchar(1000)
	
Set @msg = N''
/*
flags: 
	0 - overwrite output file
	2 - append to output file
	4 - Write T-SQL output to step history in MSDB
	8 - Write log to table (overwrite existing)
	16 - Write log to table (append)
*/
'';

Declare JobCursor CURSOR LOCAL FORWARD_ONLY LOCAL
For
	Select N''EXEC msdb.dbo.sp_update_jobstep @job_id = N''''{'' + CONVERT(varchar(50), (sj.job_id)) + N''}''''
	, @step_id = '' + CONVERT(nvarchar(30), sjs.step_id) + ''
	, @output_file_name = N'''''' + @OutputPath + N''\'' + sj.name + N''_'' + REPLACE(CONVERT(Char(10), GETDATE(), 120),''-'','''')
	+ N''.txt''''
	, @flags = 2;
	''
	From dbo.sysjobs sj
		Inner Join dbo.sysjobsteps sjs ON sj.job_id = sjs.job_id
                Where sj.name Like ''TimerExec%'' Or sj.name = ''GeoFenceExecute'' Or sj.name = ''ReverseGeocoding''
	Order By sj.name, sjs.step_id

OPEN JobCursor
FETCH NEXT FROM JobCursor INTO @cmd;
WHILE @@FETCH_STATUS = 0
BEGIN
	IF LEN(@cmd)>4000 
	BEGIN
		SET @msg = ''Output of the next command is truncated.'';
		RAISERROR (@msg, 14, 1);
	END
	PRINT @cmd;

	Execute sys.sp_executesql @cmd; 

	FETCH NEXT FROM JobCursor INTO @cmd;
END
CLOSE JobCursor
DEALLOCATE JobCursor',
    @database_name     = N'msdb',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'SetJobOutputFileName',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Every Day',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20190701,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'SetJobOutputFileName',
    @schedule_name = N'Every Day';
GO
