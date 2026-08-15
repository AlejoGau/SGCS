-- =============================================
-- Author:Ignacio Martin Velez Spitale
-- Create date: 05/04/2024
-- Description:	Servicio para alta de cuenta y cliente en modulo MoneyGuard desde aplicaciones externas
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[AltaCuentaClienteMG] 
	@nombre varchar(100),
    @identificacion varchar(100) = '',
	@identificacion_fiscal varchar(100) = '',
	@localidad varchar(100) = '',
	@calle_y_numero varchar(150) = '',
	@telefono varchar(100) = '',
	@telefono_movil varchar(100) = '',
	@nota varchar(max) = '',
	@dealer varchar(50) = '',
    @nro_cta varchar(50) = '',
    @cp varchar(100) = '',
    @mail varchar(150) = '',
    @tipo char(3),
    @observacion varchar(max) = '',
	@fecha_alta datetime,
	@fecha_de_servicio datetime

AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @cue_iid int = 0;
	DECLARE @id_cliente INT;
	DECLARE @id_organizacion INT;

	BEGIN TRY
		BEGIN TRANSACTION;
		--CREO EL CLIENTE EN MG
		INSERT INTO _datos..m_clientes_fc(
			cli_cnombre,
			cli_cidentificacion,
			cli_clocalidadfiscal,
			cli_ccallecobranza,
			cli_ctelefono)
		VALUES(
			@nombre,
			@identificacion,
			@localidad,
			@calle_y_numero,
			@telefono);

		SET @id_cliente = SCOPE_IDENTITY();
		PRINT @id_cliente
		
		--CREO EL CLIENTE EN CRM (ORGANIZACION)
		INSERT INTO _datos..Organization(
			Name,
			StateTax,
			NationalTax,
			City,
			Address,
			Phone,
			Mobile,
			SmallComment,
			OrganizationType,
			Status,
			Account)
		VALUES(
			@nombre,
			@identificacion,
			@identificacion_fiscal,
			@localidad,
			@calle_y_numero,
			@telefono,
			@telefono_movil,
			@nota,
			'CLI',
			7,
			@id_cliente);

		SET @id_organizacion = SCOPE_IDENTITY();

		DECLARE @iid int
	
		SELECT @iid = par_ivalor+1 From _Tablas.dbo.t_parametros (UPDLOCK) Where par_cCodigo='M_CUENTAS'     
		UPDATE _Tablas.dbo.t_parametros SET par_ivalor = @iid Where par_cCodigo='M_CUENTAS' 

		declare @ncuentaNew varchar(10) = '';
		IF @nro_cta = ''
			BEGIN
			DECLARE	@return_value int, @cue_ncuenta char(10)
			EXEC @return_value = [dbo].[SearchCuentaProximoNumero]
				@cue_clinea = @dealer,
				@cue_ncuenta = @cue_ncuenta OUTPUT
			SET @ncuentaNew = @cue_ncuenta
		END
		ELSE
			BEGIN
			SET @ncuentaNew = @nro_cta
		END

		CREATE TABLE #TempTable (
			Id int,
			name varchar(150),
			cue_clinea char(3),
			cue_ncuenta varchar(20),
			cue_cnombre varchar(60),
			cue_ccalle varchar(160),
			cue_clocalidad varchar(40), 
			cue_cprovincia char(3), 
			cue_ccodigopostal varchar(8), 
			cue_ccallecorreo varchar(80),
			cue_clocalidadcorreo varchar(40), 
			cue_cprovinciacorreo char(3), 
			cue_ccodigopostalcorreo varchar(8), 
			cue_ctelefono varchar(30), 
			cue_cclave varchar(40),
			cue_cpermiso varchar(40), 
			cue_ctipo char(3), 
			cue_cubicacion text, 
			cue_nparticion varchar(60),  
			cue_cobservacion text, 
			cue_cfoto varchar(60), 
			cue_dfechaalta datetime, 
			cue_dservicio datetime, 
			cue_nmostrar varchar(20), 
			cue_nsonidoul varchar(60), 
			cue_nllaveul varchar(60), 
			cue_cemail varchar(150), 
			cue_cinstalador char(3), 
			cue_cIMEI varchar(120), 
			cue_cLatLng varchar(30),
			Situacion varchar(120),
			cue_nEfectiva varchar(60), 
			cue_cIdExtendido varchar(100), 
			cue_iZonaHoraria varchar(60), 
			cue_cPartitionInfo varchar(max),
			cue_nAutoMonitoreo varchar(60), 
			cue_nPrioridad varchar(60)
		);
		
		DECLARE @ID_NUEVA_CUENTA nvarchar(max)

		EXEC[CuentaIns] 
			  @cue_iid = @iid
			, @Name = @nombre
			, @cue_clinea = @dealer
			, @cue_ncuenta = @ncuentaNew
			, @cue_cnombre = @nombre
			, @cue_ccalle = @calle_y_numero
			, @cue_cemail = @mail
			, @cue_ctelefono = @telefono	
			, @cue_nprioridad = 1
			, @cue_nllaveul = 1
			, @cue_ctipo = @tipo	
			, @cue_ccodigopostal = @cp
			, @cue_cobservacion = @observacion
			, @cue_dfechaalta = @fecha_alta       
			, @cue_dservicio =@fecha_de_servicio
			, @cue_clocalidad=@localidad
			, @Situacion='habilitada' ,
			  @cue_iZonaHoraria = -100 ;

			PRINT @ID_NUEVA_CUENTA

			--CREO LA RELACION ENTRE EL CLIENTE DE MG Y LA CUENTA
			INSERT INTO _datos..m_relacion_cliente_cuentas_fc(
				rel_icliente,
				rel_icuenta,
				rel_ntipo,
				rel_cdealer,
				rel_inovedadtabla)
			VALUES(
				@id_cliente,
				@iid,
				1,
				@dealer,
				0)

			INSERT INTO _Sistema..DealerRango(
				Name
				,NombreEntidad
				,IdEntidad
				,Dealer
				,CuentaDesde
				,CuentaHasta)
			VALUES(
				@nombre
				 ,@nombre
				 ,@id_organizacion
				 ,@dealer
				 ,@nro_cta
				 ,@nro_cta)
	 
			SELECT @ID_NUEVA_CUENTA = MAX(cue_iid) FROM _Datos..m_cuentas 
		
			INSERT INTO #TempTable EXEC CuentaSel @ID_NUEVA_CUENTA
	
			ALTER TABLE #TempTable ADD cli_icodigo_ID  INT
			UPDATE #TempTable 
			SET cli_icodigo_ID = @id_cliente
	
			SELECT *FROM #TempTable
			DROP TABLE #TempTable;

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			-- Si hay un error, rollback
			IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION;
        
			-- Manejar el error
			PRINT ERROR_MESSAGE();
		END CATCH
END