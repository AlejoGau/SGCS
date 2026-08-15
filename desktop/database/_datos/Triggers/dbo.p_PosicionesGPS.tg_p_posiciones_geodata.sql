-- =============================================
-- Author:		Rodrigo Román
-- Create date: 22/11/2019
-- Description:	Calcula el campo geodata
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[tg_p_posiciones_geodata]
   ON  [dbo].[p_PosicionesGPS]
   instead of insert
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [tg_p_posiciones_geodata] ' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    INSERT INTO p_posicionesGPS ( 
       [gps_tfechahora]
      ,[gps_idCuenta]
      ,[gps_idRec]
      ,[gps_rLatitud]
      ,[gps_rLongitud]
      ,[gps_iRumbo]
      ,[gps_tRawfechahora]
      ,[gps_iVelocidad]
      ,[gps_iOdometro]
      ,[gps_cDireccion]
      ,[gps_cIMEI]
      ,[gps_rAccuracy]
      ,[gps_cMethod]
      ,[gps_iBattery]
      ,[gps_iNivelSenial]
      ,[gps_iSatelites]
      ,[gps_iExtBattery]
	  ,[gps_iFuel]
	  ,[gps_iEngineStatus]
      ,[gps_geopoint]
    )
    SELECT
        i.[gps_tfechahora]
      ,i.[gps_idCuenta]
      ,i.[gps_idRec]
      ,i.[gps_rLatitud]
      ,i.[gps_rLongitud]
      ,i.[gps_iRumbo]
      ,i.[gps_tRawfechahora]
      ,i.[gps_iVelocidad]
      ,i.[gps_iOdometro]
      ,i.[gps_cDireccion]
      ,i.[gps_cIMEI]
      ,i.[gps_rAccuracy]
      ,i.[gps_cMethod]
      ,i.[gps_iBattery]
      ,i.[gps_iNivelSenial]
      ,i.[gps_iSatelites]
      ,i.[gps_iExtBattery]
	  ,i.[gps_iFuel]
	  ,i.[gps_iEngineStatus]
      ,geography::Point(i.[gps_rLatitud], i.[gps_rLongitud], 4326)  
    FROM
        inserted i

END