--SearchGpsParametro
CREATE OR ALTER PROCEDURE [dbo].[SearchGpsParametro](@newvalue int = null)
as
begin
set nocount on

declare @lastid int
select @lastid = CONVERT(int, par_ivalor) from _tablas..t_parametros where par_ccodigo ='GEOFENCELASTID'

if(@lastid is null)
	set @lastid = 0
	
if(@newvalue is not null and @newvalue>@lastid)
begin
	set @lastid = @newvalue
	if exists (select * from _tablas..t_parametros where par_ccodigo ='GEOFENCELASTID')
		update _tablas..t_parametros set par_ivalor = @newvalue where par_ccodigo ='GEOFENCELASTID'
	else
		insert into _tablas..t_parametros (par_ccodigo, par_ivalor, par_cdescripcion, par_mobservacion) values('GEOFENCELASTID', @newvalue, 'Ultimo id procesado para geocercas', '')
end
	
select @lastid GEOFENCELASTID

end