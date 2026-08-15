CREATE OR ALTER PROCEDURE [dbo].[AlarmaGenerarMultimedia]
	@idCta [int] = 0,
	@cAlarma [varchar](128) = '',
	@cObservaciones [varchar](max) = '',
	@cContenido [varchar](max) = '',
	@cRoute [varchar](max) = NULL,
	@cGeofenceName [varchar](100) = NULL,
	@iroute [int] = NULL,
	@lat [real] = NULL,
	@lng [real] = NULL,
	@imei [varchar](128) = '',
	@rumbo [int] = 0,
	@rawFechaHora [datetime] = null,
	@velocidad [int] = 0,
	@cData [varchar](max) = '',
	@idUsuario [int] = 0,
	@cZona [varchar](3) = '',
	@fecha [datetime] = NULL,
	@rec_norigen [int] = 5,
	@cUser [varchar](max) = 'SISTEMA',
	@rec_idReceptor [int] = NULL,
	@iPuerto [int] = 0,
	@rec_idMap [int] = 0,
	@rec_idFwd [int] = 0,
	@cDll [nvarchar](100) = '',
	@iOdometro [int] = 0,
	@rAccuracy [real] = 0,
	@cMethod [varchar](10) = '',
	@iBattery [int] = 0,
	@iExtBattery [int] = 0,
	@iNivelSenial [int] = 0,
	@iSatelites [int] = 0,
	@cCallerID [varchar](100) = '',
	@preventNotification [int] = 0,
	@cEvento [varchar](128) = '',
	@spGeoAutoproceso [int] = 0,
	@cDebug Char(2) = 'No',
    @postImages [varchar](4000) = ''
WITH EXECUTE AS CALLER
AS
Begin
    Set NOCOUNT ON;

	IF @idCta >0
		BEGIN
			declare @rec_iid int
			declare @cue_ncuenta varchar(10)
			declare @cue_clinea char(3)

			select @cue_ncuenta = cue_ncuenta, @cue_clinea = cue_clinea from _datos..m_cuentas where cue_iid = @idCta

			EXEC @rec_iid = [_Desktop].[dbo].[AlarmaGenerar] 
				@idCta = @idCta,
				@cAlarma = @cAlarma,
				@cObservaciones = @cObservaciones,
				@cContenido = @cContenido,
				@cRoute = @cRoute,
				@cGeofenceName = @cGeofenceName,
				@iroute = @iroute,
				@lat = @lat,
				@lng = @lng,
				@imei = @imei,
				@rumbo = @rumbo,
				@rawFechaHora = @rawFechaHora,
				@velocidad = @velocidad,
				@cData = @cData,
				@idUsuario = @idUsuario,
				@cZona = @cZona,
				@fecha = @fecha,
				@rec_norigen = @rec_norigen,
				@cUser = @cUser,
				@rec_idReceptor = @rec_idReceptor,
				@iPuerto = @iPuerto,
				@rec_idMap = @rec_idMap,
				@rec_idFwd = @rec_idFwd,
				@cDll = @cDll,
				@iOdometro = @iOdometro,
				@rAccuracy = @rAccuracy,
				@cMethod = @cMethod,
				@iBattery = @iBattery,
				@iExtBattery = @iExtBattery,
				@iNivelSenial = @iNivelSenial,
				@iSatelites = @iSatelites,
				@cCallerID = @cCallerID,
				@preventNotification = @preventNotification,
				@cEvento  = @cEvento,
				@spGeoAutoproceso = @spGeoAutoproceso,
				@cDebug = @cDebug

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [IPRS_VideoLinkParser]'
				Print ' @idCta      : ' + CONVERT(VARCHAR(10), @idCta)
				Print ' @cAlarma    : ' + @cAlarma
				Print ' @cZona      : ' + @cZona
				Print ' @clinea     : ' + @cue_clinea
				Print ' @ncuenta    : ' + @cue_ncuenta
				Print ' @cDll       : ' + @cDll
				Print ' @postimages : ' + @postimages
			End

			Execute _Desktop.dbo.[IPRS_VideoLinkParser]
					 @iRecID = @rec_iid
					,@idCta = @idCta
					,@cAlarma = @cAlarma
					,@cZona = @cZona
					,@clinea = @cue_clinea
					,@ncuenta = @cue_ncuenta
					,@cDll = @cDll
					,@postImages = @postimages
	END
		ELSE 
	BEGIN
		SELECT 'Debe enviar un idcta'
	END
End