CREATE OR ALTER PROCEDURE [dbo].[SearchGpsLatLongByParametro](@Limit int = 50)
as
begin
set nocount on

declare @lastid int
declare @lastdate datetime
declare @now datetime

select @now = GETDATE()
select @lastid =CONVERT(int, par_ivalor) from _tablas..t_parametros where par_ccodigo ='GEOFENCELASTID'

if(@lastid is null)
	set @lastid = 0

select top 1 @lastdate = gps_trawfechahora from _datos..p_posicionesGps 
	where gps_iid >= @lastid
	and gps_trawfechahora < @now
	order by gps_trawfechahora asc

print 'lastid:'+convert(varchar(10),@lastid)
print '@lastdate'
print @lastdate

select top (@Limit) gps_iid, [gps_rLatitud], [gps_rLongitud], gps_idcuenta, gps_tfechahora, gps_trawfechahora
	from _datos..p_posicionesGps 
	left join _datos..p_recepcion on gps_idrec = rec_iid
	inner join _datos..m_cuentas on cue_cimei = gps_cimei -- me aseguro qeu los imei correspondan a cuentas y no a SP o vc
	where gps_iid > @lastid and (rec_calarma is null or rec_calarma not in ('_FR','_IG','_EG')) and gps_cimei is not null and gps_cimei != ''
	and gps_trawfechahora > @lastdate
	and gps_trawfechahora > (select top 1  isnull(fechaultposicion,'1900-01-01') from _Datos..GeoFenseCuenta g where cue_iid = g.CuentaId order by FechaUltPosicion desc)
	and gps_trawfechahora <= @now
	order by gps_trawfechahora asc
end