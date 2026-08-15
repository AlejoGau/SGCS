CREATE OR ALTER PROCEDURE [dbo].[TG_mantenimientoKM_AlarmaGenerar]
	@idCuenta varchar(3) = '',
	@cAlarma [varchar](128) = '_MV',
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
BEGIN
    SET NOCOUNT ON;
		
    -- Genero el CURSOR y VARIABLES a UTILIZAR
    DECLARE @tgms_idkey INT;
    DECLARE @tgms_cnombre NVARCHAR(50);
    DECLARE @tgms_cdescripcion NVARCHAR(250)
    DECLARE @tgms_iorganizacion INT;
    DECLARE @tgms_kilometros INT;
    DECLARE @tgmh_idispositivomovil INT;
    DECLARE @tgmh_iodometro INT;
    DECLARE @tgmh_Odometer INT;
    DECLARE @kmServicio INT;

    -- SELECT el cual trae el ultimo registro cargado para verificar si está o no vencido
    DECLARE ServiceAlert CURSOR READ_ONLY FORWARD_ONLY FOR SELECT
        ms.tgms_idkey
        ,ms.tgms_cnombre
        ,ms.tgms_cdescripcion
        ,ms.tgms_iorganizacion
        ,ms.tgms_kilometros
        ,rechistorico.tgmh_idispositivomovil
        ,rechistorico.tgmh_iodometro
        ,rechistorico.Odometer
        ,(ms.tgms_kilometros + rechistorico.tgmh_iodometro) AS kmServicio
    FROM _Tablas..t_TG_mantenimiento_servicios ms
        OUTER APPLY (
            SELECT tgmh_idispositivomovil, max(tgmh_iodometro) as tgmh_iodometro, max(Odometer) as Odometer, max(tgmh_dfecha) as tgmh_dfecha            
			FROM _Datos..TG_mantenimiento_historico mh 
                LEFT JOIN _Datos..DispositivoMovil dm ON mh.tgmh_idispositivomovil = dm.OwnerId
            WHERE 
                mh.tgmh_idservicio = ms.tgms_idkey
                AND ms.tgms_meses = 0
                AND ms.tgms_iestado = 1
			group by tgmh_idispositivomovil, tgmh_idservicio
        ) rechistorico
    WHERE rechistorico.tgmh_dfecha IS NOT NULL
	AND (ms.tgms_kilometros + rechistorico.tgmh_iodometro) < rechistorico.Odometer

    -- Apertura del CURSOR
    OPEN ServiceAlert

    -- Recorrido del CURSOR
    FETCH NEXT FROM ServiceAlert INTO
        @tgms_idkey
        ,@tgms_cnombre
        ,@tgms_cdescripcion
        ,@tgms_iorganizacion
        ,@tgms_kilometros
        ,@tgmh_idispositivomovil
        ,@tgmh_iodometro
        ,@tgmh_Odometer
        ,@kmServicio 
    WHILE @@fetch_status = 0
        BEGIN
			print 'genero el evento para el mantenimiento '+@tgms_cnombre+ ' en la cuenta:'+convert(varchar(10),@tgmh_idispositivomovil)
            EXEC AlarmaGenerar
                @idCta = @tgmh_idispositivomovil,
                @cAlarma = '_MV',
                @cObservaciones = @tgms_cnombre,
                @cContenido = '',
                @cRoute = NULL,
                @cGeofenceName = NULL,
                @iroute = NULL,
                @lat = NULL,
                @lng = NULL,
                @imei = '',
                @rumbo = 0,
                @rawFechaHora = null,
                @velocidad = 0,
                @cData = '',
                @idUsuario = 0,
                @cZona = '',
                @fecha = NULL,
                @rec_norigen = 5,
                @cUser = 'SISTEMA',
                @rec_idReceptor = NULL,
                @iPuerto = 0,
                @rec_idMap = 0,
                @rec_idFwd = 0,
                @cDll = '',
                @iOdometro = 0,
                @rAccuracy = 0,
                @cMethod = '',
                @iBattery = 0,
                @iExtBattery = 0,
                @iNivelSenial = 0,
                @iSatelites = 0,
                @cCallerID = ''

            FETCH NEXT FROM ServiceAlert INTO
                @tgms_idkey
                ,@tgms_cnombre
                ,@tgms_cdescripcion
                ,@tgms_iorganizacion
                ,@tgms_kilometros
                ,@tgmh_idispositivomovil
                ,@tgmh_iodometro
                ,@tgmh_Odometer
                ,@kmServicio 
        END

    -- Cierre del CURSOR
    CLOSE ServiceAlert
    DEALLOCATE ServiceAlert
		
END