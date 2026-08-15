--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.113 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchStatsServer]
AS
BEGIN
		SELECT TOP 10
		qs.total_worker_time/qs.execution_count as [avgcputime],
		SUBSTRING(qt.text,qs.statement_start_offset/2,
		(case when qs.statement_end_offset = -1
		then len(convert(NVARCHAR(max), qt.text)) * 2
		else qs.statement_end_offset end -qs.statement_start_offset)/2)
		as query_text,
		qt.dbid, dbname=db_name(qt.dbid),
		qt.objectid
		FROM sys.dm_exec_query_stats qs
		cross apply sys.dm_exec_sql_text(qs.sql_handle) as qt
		ORDER BY
		[avgcputime] DESC
END