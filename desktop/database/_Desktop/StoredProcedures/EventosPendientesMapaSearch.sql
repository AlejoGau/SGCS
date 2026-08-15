CREATE OR ALTER PROCEDURE [dbo].[EventosPendientesMapaSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',     
 @token VARCHAR(128) = '',         
 @totalrows INT = 1 OUTPUT,

 -- Agregado por MapGuard
 @disabledOrganization varchar(10) = 'false',
 @excluirOrganizacionUsuarioActual VARCHAR(10) = 'false'
AS
BEGIN
SET NOCOUNT ON   

DECLARE @SqlFilter AS VARCHAR(4096)
SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'EventosPendientes','[operadorAtendiendoCuentaININT],[rec_iprioridadININT]')

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print @SqlFilterRango


/* Si se desea agregar que solo muestre los eventos de la organizacion del usuario
 * descomentar el codigo desde la linea 36 a la 72

-- Agrego Filtro por Organizacion
--Paramentro
DECLARE @MONITOREODEALER INT = 0;
SELECT @MONITOREODEALER = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'MONITOREODEALER'
--Usuario
DECLARE @OrganizacionCurrentUser INT = 0
DECLARE @TipoCurrentUser INT = 0;
IF @MONITOREODEALER = 1 
	BEGIN
	 DECLARE @UserId INT
	 SELECT @UserId = dbo.GetUserIdByToken(@token)
	 SELECT @OrganizacionCurrentUser = udw_empresa, @TipoCurrentUser = udw_tipo FROM _Sistema..UsersDesktopWeb WHERE udw_idKey = @UserId
	END
--FILTRO PARA ORGANIZACION
DECLARE @SqlFilterOrganizaciones AS VARCHAR(MAX) = '';
IF @disabledOrganization = 'false'
	BEGIN
		 IF @MONITOREODEALER = 1 AND @TipoCurrentUser != 0 AND @excluirOrganizacionUsuarioActual != 'true'
			BEGIN	 
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion = '+CONVERT(VARCHAR(50),@OrganizacionCurrentUser)+' AND _idOrganizacion != 0 '
			END
		ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser != 0 AND @excluirOrganizacionUsuarioActual = 'true'
			BEGIN
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion != '+CONVERT(VARCHAR(50),@OrganizacionCurrentUser)+' AND _idOrganizacion != 0 '		
			END
        ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser = 0 AND @excluirOrganizacionUsuarioActual != 'true'
			BEGIN
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion = 0 '		
			END
		ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser = 0 AND @excluirOrganizacionUsuarioActual = 'true'
			BEGIN
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion != 0 '		
			END
            
 END 

 SET @SqlFilter = @SqlFilter + @SqlFilterOrganizaciones
*/

SET @SqlFilter = @SqlFilter + @SqlFilterRango

 
DECLARE @item VARCHAR
DECLARE @sql varchar(max);

set @sql = '
SELECT
	rec_iid,
	rec_iidCuenta rec_iidcuenta,
	rec_cAlarma rec_calarma,
	rec_cZona rec_czona,
	rec_cContenido rec_ccontenido,
	rec_nEstado rec_nestado,
	MAX (rec_tFechaHora) rec_tfechahora,
	o.cue_cLinea cue_clinea,
	o.cue_nCuenta cue_ncuenta,
	o.cue_cNombre cue_cnombre,
	o.cue_cCalle cue_ccalle,
	o.cue_cLocalidad cue_clocalidad,
	o.cue_cProvincia cue_cprovincia,
	o.cue_nParticion cue_nparticion,
	cod_cdescripcion cod_cdescripcion,
	cod_ncolor cod_ncolor,
	cod_ncolorletra cod_ncolorletra,
	rec_iidCuenta cue_iid,
	gps.*
	
FROM
	_datos.dbo.EventosPendientes o
	left join _datos..m_cuentas c WITH (NOLOCK) on c.cue_iid = o.rec_iidcuenta
OUTER APPLY (
	SELECT CASE
	WHEN CAST (o.sp_rLongitud AS VARCHAR) != '''' and o.sp_rLongitud is not null and o.sp_rLongitud!= 0 THEN
		CAST (o.sp_rLongitud AS VARCHAR)
		
	WHEN CAST (o.gps_rlongitud AS VARCHAR) != '''' and o.sp_rLongitud is not null and o.sp_rLongitud!= 0 THEN
		CAST (o.gps_rlongitud AS VARCHAR)
		
	ELSE
		
	 (SELECT TOP 1  CAST (Item AS VARCHAR) item FROM dbo.SplitString(o.cue_cLatLng, '','') order by id desc)
	
	END	as long,

	CASE
	WHEN CAST (o.sp_rLatitud AS VARCHAR) != '''' and o.sp_rLatitud is not null and o.sp_rLatitud!= 0 THEN
		CAST (o.sp_rLatitud AS VARCHAR)
		
	WHEN CAST (o.gps_rLatitud AS VARCHAR) != '''' and o.sp_rLatitud is not null and o.sp_rLatitud!= 0 THEN
		CAST (o.gps_rLatitud AS VARCHAR)
	
	ELSE
		(SELECT top 1  CAST (Item AS VARCHAR) item FROM dbo.SplitString(o.cue_cLatLng, '','') )
			--where CAST (Item AS VARCHAR) != (SELECT TOP 1  item FROM dbo.ParseArray(o.cue_cLatLng, '','')) OR (CAST (Item AS VARCHAR) = ''0.0''))
	--(SELECT TOP 1  CAST (strval AS VARCHAR) item FROM dbo.ParseArray(o.cue_cLatLng, '',''))
	END	as lat
) AS gps

where 
1 = 1  
	--gps.lat != '''' AND gps.long != '''' AND gps.lat != ''0.0'' AND gps.long != ''0.0''  AND gps.lat != ''0'' AND gps.long != ''0'' 
	'+@SqlFilter+' 
GROUP BY
	rec_iid,
	rec_iidCuenta ,
	rec_cAlarma ,
	rec_cZona ,
	rec_cContenido,
	rec_nEstado,
	o.cue_cLinea ,
	o.cue_nCuenta ,
	o.cue_cNombre ,
	o.cue_cCalle ,
	o.cue_cLocalidad ,
	o.cue_cProvincia ,
	o.cue_nParticion ,
	cod_cdescripcion ,
	cod_ncolor,
	cod_ncolorletra,
	gps.lat, gps.long
'


 print @sql
 EXECUTE (@Sql)

END