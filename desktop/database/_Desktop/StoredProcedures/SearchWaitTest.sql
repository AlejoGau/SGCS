CREATE OR ALTER PROCEDURE [dbo].[SearchWaitTest] 
(@data int)
as begin
	if (@data = 5594)
	begin
		WAITFOR DELAY '00:05:30';
		
	end
	select 'ok5' as d
end