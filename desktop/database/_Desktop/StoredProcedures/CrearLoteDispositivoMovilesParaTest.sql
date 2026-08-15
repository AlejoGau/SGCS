CREATE OR ALTER PROCEDURE [dbo].[CrearLoteDispositivoMovilesParaTest]
@cantidad INT = 0,
@dealer VARCHAR (3) = ''
AS
BEGIN




DECLARE @cnt INT = 0;
WHILE @cnt < @cantidad
BEGIN
		DECLARE @nextcue_ncuenta varchar(4);
		DECLARE @cue_iid int;
		DECLARE @nowDate Datetime = GETDATE();

		select @nextcue_ncuenta = RIGHT('0000' + 
		 rtrim(upper(dbo.base36encode(dbo.base36decode(MAX(rtrim(cue_ncuenta))) + 1)))
		 , 4)  from _datos..m_cuentas s where cue_clinea = @dealer
			
		DECLARE @nombreCuenta VARCHAR(256) = 'Dispositivo Movil TEST '+@dealer+'-'+@nextcue_ncuenta
		EXEC CuentaIns 
			@Name = '',
			@cue_clinea = @dealer,
			@cue_ncuenta = @nextcue_ncuenta,
			@cue_cnombre = @nombreCuenta,
			@cue_ctipo = 'CMA'

		

		SELECT @cue_iid = cue_iid FROM _Datos.dbo.[m_cuentas] 
			WHERE cue_ncuenta = @nextcue_ncuenta AND cue_clinea = @dealer


		INSERT INTO _Datos.dbo.DispositivoMovil (		
			Name,
			OwnerTypeId,
			OwnerId
		) VALUES (
			@nombreCuenta,
			3001,
			@cue_iid
		)

			

		DECLARE @IMEI varchar(256) = 'IMEI-'+CONVERT(VARCHAR(11),@cue_iid)
			
		DECLARE @lat Decimal(9,6) = -37.323136+RAND()
		DECLARE @lng Decimal(9,6) = -59.184589+RAND()



		INSERT INTO _datos..p_gps (
			gps_tfechahora,
			gps_idCuenta,
			gps_idRec,
			gps_rLatitud,
			gps_rLongitud,
			gps_iVelocidad,
			gps_iOdometro,
			gps_iRumbo,
			gps_cDireccion,
			gps_tRawfechahora,
			gps_cIMEI,
			gps_rAccuracy,
			gps_cMethod,
			gps_iBattery,
			gps_iNivelSenial,
			gps_iSatelites,
			gps_iExtBattery
		) VALUES (
			@nowDate,
			@cue_iid,
			0,
			@lat ,
			@lng,
			0,
			0,
			'',
			'Sin direccion (TEST)',
			@nowDate,
			@IMEI,
			0,
			'TEST',
			0,
			0,
			0,
			0
		)
		

		UPDATE _Datos.dbo.[m_estado_cuenta_cab] SET
		est_nestado = 0
		WHERE [est_iidcuenta] = @cue_iid 


   SET @cnt = @cnt + 1;
END;

END