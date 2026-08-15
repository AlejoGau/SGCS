-- =============================================
-- Author:		Rodrigo Román
-- Create date: 07/04/2016
-- Description:	Datos para HeatMap Eventos
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SearchMapaDelito]
    @codigosalarma NVARCHAR(512) = '',
    
    @filter VARCHAR(2048) = '',        
    @_dc VARCHAR(256) = '',  
    @token VARCHAR(256) = ''

AS
BEGIN
	SET NOCOUNT ON;

    --Filters
    DECLARE @SqlFilter AS VARCHAR(MAX)
    SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')

    -- Rangos
    DECLARE @SqlFilterRango AS VARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
    SET @SqlFilter = @SqlFilter + @SqlFilterRango


    -- Codigos Alarma provenientes del combo GRUPO
    IF @codigosalarma != ''            
    SET @SqlFilter = @SqlFilter + ' AND rec_calarma IN (''' + replace (@codigosalarma, ',', ''',''') + ''') ' 
    

    -- Imprimo Filter con Rangos incluídos
    --print @SqlFilter

    -- Query
    DECLARE @Sql NVARCHAR(MAX)
     SET @Sql = '
	 ;WITH Cuentas AS
	 (Select * From _Datos.dbo.m_cuentas 
		Where (cue_cLatLng != '''' And Len(cue_cLatLng) > 6 ) ) 
        SELECT TOP 10000
            count (*) as [weight],
            round(isnull(pg.gps_rLatitud,latlng.lat),3) as gps_rLatitud,
            round(isnull(pg.gps_rLongitud,latlng.long),3) as gps_rLongitud
        FROM _datos..p_recepcion pr
            LEFT JOIN _datos..p_PosicionesGPS pg ON ( pr.rec_iid = pg.gps_idRec )
            LEFT JOIN Cuentas c ON ( pr.rec_iidcuenta = c.cue_iid )
			outer apply
				(Select Substring(c.cue_cLatLng, 1,Charindex('','', cue_cLatLng)-1) as lat,
				Substring(cue_cLatLng, Charindex('','', cue_cLatLng)+1, LEN(cue_cLatLng)) as  long
			) as latlng
        WHERE (pg.gps_rLatitud != '''' OR pg.gps_rLongitud != '''' OR c.cue_cLatLng != '''') ' + @SqlFilter + '
        GROUP BY round(isnull(pg.gps_rLatitud,latlng.lat),3)
		,round(isnull(pg.gps_rLongitud,latlng.long),3)
		ORDER BY 1 DESC '

	/*
    Print '-----------'
    print @Sql
	*/

    EXECUTE sp_executesql @Sql

    
END