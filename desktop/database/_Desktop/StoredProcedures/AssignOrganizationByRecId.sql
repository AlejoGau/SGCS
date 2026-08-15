CREATE OR ALTER PROCEDURE [dbo].[AssignOrganizationByRecId] 
	@rec_iid int,
	@clinea char(3) = '',
	@organizationId int OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	SET DATEFIRST 7;

	SELECT @organizationId=0

	-- me fijo si hay una organizacion activa para el dealer
	declare @mydate datetime = getdate()
	declare @mytime varchar(5)
	select @mytime = convert(varchar(5), @mydate, 108)

	print @mytime

	select @organizationId = isnull(tmd_iorganizacion,0) from _tablas..t_monitoreo_dealer where 
		tmd_clinea = @clinea
		and tmd_diasemana = datepart(weekday,@mydate)-1
		and @mytime between tmd_horadesde and tmd_horahasta
		and tmd_estado = 1
END

/*
declare @mydate datetime = getdate()
declare @mytime varchar(5)
select @mytime = convert(varchar(5), @mydate, 108)

if @mytime between '09:40' and '18:00'
BEGIN
	print 'si'
END
else
BEGIN
	print  'no'
END
 */