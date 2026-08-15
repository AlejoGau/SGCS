--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.970 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[TaskStatus_AddAlarmForUnresponsiveJob]
as
begin
	declare @t table (
		rownumber int primary key identity(1,1)
		, Id int
		, Name NVARCHAR(128))
	insert into @t(id,Name)
	select t.Id, t.Name
	from _sistema..TaskStatus t
	where status = 1 
	and repetition > 0 
	and DATEDIFF(mi, lastexecutiondate, getdate()) > Repetition
	
	declare @rowcount int = 0
	declare @rownumber int = 0
	select @rowcount = COUNT(*) from @t
	declare @tid int = 0
	declare @tname NVARCHAR(128) = ''
	declare @cid int = 0
	
	while(@rownumber < @rowcount)
	begin
		set @rownumber = @rownumber + 1
		select @tid = id, @tname=Name from @t where rownumber = @rownumber
		
		select @cid = cue_iid from _datos..m_cuentas  where cue_clinea = '_SG' and cue_ncuenta='INTE'
		
		-- falta indicar que servicio se murio
		print @tname
		exec _desktop..[AlarmaGenerar] @cid, '_FT',@tname
		
		update _sistema..taskstatus
		set status = 2
		where id = @tid
	end

	select * from _sistema..TaskStatus t
	inner join @t tt on (t.id = tt.Id)
end