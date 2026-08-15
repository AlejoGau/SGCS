CREATE OR ALTER PROCEDURE [dbo].[IPRS_GrabaNoRestauradas]
	@iIdCuenta [int],
	@tFechaHora [datetime],
	@cZona [varchar](10) = '',
	@cCodAlarma [varchar](10) = '',
	@iRecId [int],
	@cZonaEvento [char](3) = '',
	@bGrabo [bit] OUTPUT
WITH EXECUTE AS CALLER
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		SET @bGrabo = 0

		DECLARE @ccodigorestauracion VARCHAR(10)
			,@cAlarmaAGenerar VARCHAR(10)
		DECLARE @nminutosrestauracion INT
			,@nautoprocesa INT
			,@iRecIdOri INT
		DECLARE @tLimite DATETIME
			,@ahora DATETIME = getdate()

		--Query
		SELECT @ccodigorestauracion = zon_ccodigorestauracion
			,@nminutosrestauracion = zon_nminutosrestauracion
			,@nautoprocesa = zon_nautoprocesa
			,@cAlarmaAGenerar = zon_cAlarmaAGenerar
			,@tLimite = DATEADD(MINUTE, zon_nminutosrestauracion, @ahora)
		FROM [_Datos].[dbo].[m_Zonas]
		WHERE zon_cCodigoRestauracion <> ''
			AND zon_nMinutosrestauracion > 0
			AND zon_iidcuenta = @iIdCuenta
			AND zon_ccodigo = @cZona
			AND zon_codigoalarma = @cCodAlarma

		--Si el query trae algun valor
		IF (@tLimite IS NOT NULL)
		BEGIN
			SET @bGrabo = 1
			SET @iRecIdOri = @iRecId

			IF @nautoprocesa <> 1 --Autoprocesa No
				SET @iRecId = 0

			INSERT INTO [_Datos].[dbo].[p_Timer] (
				tim_iidcuenta
				,tim_tfechahora
				,tim_calarma
				,tim_czona
				,tim_cusuario
				,tim_copnclo
				,tim_irecid
				,tim_cAlarmaAGenerar
				,tim_iIdEventoNR
				)
			VALUES (
				@iIdCuenta
				,@tLimite
				,@ccodigorestauracion
				,@cZona
				,@nminutosrestauracion
				,'R'
				,@iRecId
				,@cAlarmaAGenerar
				,@iRecIdOri
				)

			------------------
			--p_EventosTimer--
			IF OBJECT_ID('[_Datos].[dbo].[p_EventosTimer]') IS NOT NULL
			BEGIN
				PRINT '[IPRS_GrabaNoRestauradas] Grabacion de p_EventosTimer';

				INSERT INTO [_Datos].[dbo].[p_EventosTimer] (
					[pet_cTipo]
					,[pet_idCuenta]
					,[pet_iRecId]
					,[pet_tFechaHora]
					,[pet_cAlarma]
					,[pet_cZona]
					,[pet_iUsuario]
					,[pet_iRecId_NR]
					,[pet_tLimite_NR]
					,[pet_cEvento_NR]
					,[pet_iMinutos_NR]
					,[pet_cAlarmaAGenerar_NR]
					,[pet_cZona_NR]
					)
				VALUES (
					'R'
					,@iIdCuenta
					,@iRecIdOri
					,@tFechaHora
					,@cCodAlarma
					,@cZonaEvento
					,0
					,@iRecId
					,@tLimite
					,@ccodigorestauracion
					,@nminutosrestauracion
					,@cAlarmaAGenerar
					,@cZona
					)
			END
					------------------
		END
	END TRY

	BEGIN CATCH
		IF ERROR_NUMBER() = 2627
		BEGIN
			PRINT 'Handling PK violation...';
		END;
		ELSE IF ERROR_NUMBER() = 547
		BEGIN
			PRINT 'Handling CHECK/FK constraint violation...';
		END;
		ELSE IF ERROR_NUMBER() = 515
		BEGIN
			PRINT 'Handling NULL violation...';
		END;
		ELSE IF ERROR_NUMBER() = 245
		BEGIN
			PRINT 'Handling conversion error...';
		END;
		ELSE
		BEGIN
			PRINT 'Re-throwing error...';
		END;

		PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
		PRINT 'Error Message : ' + ERROR_MESSAGE();
		PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
		PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
		PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
		PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
	END CATCH
END