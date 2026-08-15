CREATE OR ALTER PROCEDURE [dbo].[TaskStatus_GetJobUnresponsiveWithoutAlarm]
as
begin
	select *, DATEDIFF(mi, lastexecutiondate, getdate()) MinuteUnresponsive  
	from _sistema..TaskStatus 
	where status = 1 
	and repetition > 0 
	and DATEDIFF(mi, lastexecutiondate, getdate()) > Repetition
end