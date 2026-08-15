CREATE OR ALTER PROCEDURE [dbo].[AlarmaGenerarInter]
	@cue_clinea varchar(3) = '_SG',
	@cue_ncuenta varchar(4) = 'INTE',
	@cAlarma [varchar](128),
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
	@cCallerID [varchar](100) = ''
WITH EXECUTE AS CALLER
AS
Begin
    Set NOCOUNT ON;
		

		
				DECLARE @idCuenta int

				SELECT @idCuenta = cue_iid FROM _datos..m_cuentas WHERE cue_clinea = @cue_clinea AND cue_ncuenta = @cue_ncuenta

				IF @idCuenta >0
			BEGIN

				EXEC AlarmaGenerar 
					@idCta = @idCuenta,
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
					@cCallerID = @cCallerID
		END
			ELSE 
		BEGIN
			SELECT 'No existe la cuenta '+@cue_clinea+'-'+@cue_ncuenta
		END
End