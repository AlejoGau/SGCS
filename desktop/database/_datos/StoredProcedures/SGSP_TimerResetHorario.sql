CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerResetHorario]
AS
--Ejecucion de rutinas reseteo
--Autor : Pablo O. Canónico
--Fecha : 06/11/2017
--04-08-2018 se agrego el DateFirst porque en sistemas en Language no US toma lunes como dia 1
--06-05-2021 se saco control de ComandosIP, Ahora esta con un job propio
--11-11-2021 se agrego eliminacion de registros ya procesados en AccesosPendientes
--02-03-2022 se agrego eliminacion de registros huerfanos de EventosEnAutoProceso
--15-04-2026 se agrego eliminacion de EventosControlDealer
SET NOCOUNT ON

BEGIN TRY
	-- Aviso que la tarea esta funcionando	60min * 25hs * 1 dia = 1500
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'TimerResetHorario', @Repetition = 1500
	--
	SET DATEFIRST 7
	DECLARE @cSQL nVarChar(Max) = '',
		@message nVarChar(Max) = '',
		@StartDateTimeText VARCHAR(max) = ''

	--Notas
	SET @StartDateTimeText = CONVERT(VARCHAR, GetDate(), 120)
	SET @message = 'Start DateTime : %s | TimerResetHorario | Notas'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	UPDATE [_Datos].[dbo].[m_notas]
	SET not_mnotatemporal = ' ',
		not_dtemporaldesde = NULL,
		not_dtemporalHasta = NULL
	WHERE DATEDIFF(minute, GetDate(), not_dtemporalhasta) <= 0 AND Year(not_dtemporalhasta) <> 9999

	--Horarios Alternativos
	SET @StartDateTimeText = CONVERT(VARCHAR, GetDate(), 120)
	SET @message = 'Start DateTime : %s | TimerResetHorario | Horarios Alternativos'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DECLARE @iDia INT = DATEPART(dw, GetDate()),
		@iDiaActual INT = DATEPART(dw, GetDate())

	IF @iDia = 1
		SET @iDia = 7

	DELETE [_Datos].[dbo].[m_horarios_alternativos]
	WHERE alt_ndiacierre <= @iDia AND alt_ndiacierre <> @iDiaActual

	--Falsas Alarmas
	SET @StartDateTimeText = CONVERT(VARCHAR, GetDate(), 120)
	SET @message = 'Start DateTime : %s | TimerResetHorario | Falsas Alarmas'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DECLARE @iCuenta INT = 0,
		@iContador INT = 0,
		@iMargen INT = 0,
		@iMeses INT = 0,
		@iControl INT = 0
	DECLARE @tFecha DATETIME

	DECLARE cFalsas CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY
	FOR
	SELECT sta_iidcuenta,
		sta_ncontadorfa,
		sta_dfechaprimerfa,
		fal_nmargen,
		fal_nmeses
	FROM [_Datos].[dbo].[m_status]
	LEFT JOIN [_Datos].[dbo].[m_falsas] ON fal_iidCuenta = sta_iidCuenta
	WHERE sta_ncontadorfa > 0

	OPEN cFalsas

	FETCH NEXT
	FROM cFalsas
	INTO @iCuenta,@iContador,@tFecha,@iMargen,@iMeses

	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @iControl = DATEDIFF(Month, @tFecha, GetDate())

		IF @iControl >= @iMeses
		BEGIN
			UPDATE [_Datos].[dbo].[m_status]
			SET sta_ncontadorfa = 0,
				sta_dfechaprimerfa = NULL,
				sta_nEnvioMailFA = 0
			WHERE sta_iidcuenta = @iCuenta
		END

		FETCH NEXT
		FROM cFalsas
		INTO @iCuenta,@iContador,@tFecha,@iMargen,@iMeses
	END

	CLOSE cFalsas
	DEALLOCATE cFalsas

	--AccesosPendientes
	SET @StartDateTimeText = CONVERT(VARCHAR, GetDate(), 120)
	SET @message = 'Start DateTime : %s | TimerResetHorario | AccesosPendientes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Delete [_Datos].[dbo].[AccesosPendientes]
	WHERE [acp_iStatus] = 1 AND DATEDIFF(DAY, [acp_tStatusExec], getdate()) > 7

	--EventosEnAutoProceso
	SET @StartDateTimeText = CONVERT(VARCHAR, GetDate(), 120)
	SET @message = 'Start DateTime : %s | TimerResetHorario | EventosEnAutoProceso'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Delete Top (1000) [dbo].[EventosEnAutoProceso]
	Where [eap_iRecID] Not In ( Select[rec_iID] From [dbo].[p_recepcion])	

	--EventosControlDealer
	Declare @iHorasRetener Int = 48
	Delete From [_Datos].[dbo].[EventosControlDealer]
	Where ced_iStatus In (2, 3)
	  And ced_tFechaHora < DateAdd(Hour, -@iHorasRetener, GetDate())

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