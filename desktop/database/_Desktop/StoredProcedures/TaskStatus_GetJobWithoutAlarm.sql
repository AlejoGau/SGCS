CREATE OR ALTER PROCEDURE [dbo].[TaskStatus_GetJobWithoutAlarm]
as
begin
	select * from _sistema..TaskStatus where status = 1
end