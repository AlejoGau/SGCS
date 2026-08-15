-- =============================================
-- Author:		Rodrigo Román
-- Create date: 11/02/2020
-- Description:	Crea viajes de trackguard teniendo en cuenta la velocidad de los vehículos
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[TG_creaViajeVelocidad]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	-- busco comienzos de viaje
declare @minVelocidad int = 5;
declare @detenidoLimit int = 3;

with pmov as 
	(
	select gps_idcuenta, 
		gps_trawfechahora, 
		gps_iVelocidad,
		gps_rlatitud,
		gps_rlongitud,
		gps_iid,
		dm.Id,
		row_number() over(partition by gps_idcuenta order by gps_trawfechahora asc)  r
		from _datos..p_PosicionesGPS WITH (NOLOCK)
		inner join _datos..DispositivoMovil dm on gps_idCuenta = OwnerId
		where 1 = 1 
		and gps_iVelocidad > @minVelocidad
		-- no tiene viaje comenzado
		and gps_idcuenta not in (select tgv_cueiid from _datos..m_tgviaje WITH (NOLOCK) where tgv_estado = 1)
		-- si tiene un viaje terminado me aseguro analizar posterior al ultimo
		and gps_trawfechahora > isnull((select top 1 tgv_fechafin from [_Datos].[dbo].[m_tgviaje] where tgv_cueiid = gps_idCuenta order by tgv_fechafin desc),CONVERT(DATETIME, -53690))
	)
	INSERT INTO _datos.[dbo].[m_tgviaje]
        ([tgv_nombre]
        ,[tgv_fechainicio]
        ,[tgv_reciid_inicio]
        ,[tgv_cueiid]
        ,[tgv_estado]
		,tgv_movil_transportista)
     select 
        CONVERT(nvarchar, gps_trawfechahora, 20)
        ,gps_trawfechahora
        ,gps_iid
        ,gps_idcuenta
        ,1
		,Id
	from pmov
	where r = 1;
	
-- actualizo los finales de viajes

with vel as 
	(
	select gps_idcuenta, 
         gps_trawfechahora, 
		 gps_iVelocidad,
		 gps_rlatitud,
		 gps_rlongitud,
		 gps_iid,
		 gps_idRec,
		 tgv_idkey,
		 row_number() over(partition by gps_idcuenta order by gps_trawfechahora asc) - row_number() over(partition by gps_idcuenta, gps_iVelocidad order by gps_trawfechahora asc)  r
	from _datos..p_PosicionesGPS
		inner join _datos..m_tgviaje WITH (NOLOCK) on tgv_cueiid = gps_idcuenta and tgv_estado = 1
		where gps_trawfechahora > tgv_fechainicio
	),
	detenido as (
	select 
		gps_idcuenta
		,tgv_idkey
		, min(gps_trawfechahora) as min_fecha
		, max(gps_trawfechahora) as max_fecha
		, max(gps_rlatitud) as gps_rlatitud
		, max(gps_rlongitud) as gps_rlongitud
		, max(gps_iid) as max_gpsiid
 		, DATEDIFF(minute,  min(gps_trawfechahora), max(gps_trawfechahora)) as minutos
		, row_number() over(partition by gps_idcuenta order by min(gps_trawfechahora))  r2
	from vel
	where gps_iVelocidad = 0 
	group by gps_idcuenta, r, tgv_idkey
	having DATEDIFF(minute,  min(gps_trawfechahora), max(gps_trawfechahora)) > @detenidoLimit 
	)
	update tgv
		set tgv.tgv_estado = 2,
		tgv.tgv_nombre = tgv.tgv_nombre+' - '+CONVERT(nvarchar, d.max_fecha, 20),
		tgv.tgv_fechafin = d.max_fecha,
		tgv.tgv_reciid_fin = d.max_gpsiid
		from [_Datos].[dbo].[m_tgviaje] tgv
		inner join detenido as d on d.tgv_idkey = tgv.tgv_idkey
	
	
END