CREATE OR ALTER PROCEDURE [dbo].[SGSP_EvaluarControlEventosDealer]
AS
Set NoCount ON

BEGIN TRY
	Declare @message nVarChar(Max) = '',
		    @StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_EvaluarControlEventosDealer | Inicio'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @ahora          Datetime = GetDate()
	Declare @ced_idKey      Int
	Declare @idCuenta       Int
	Declare @cAlarmaGenerar Char(3)
	Declare @iValor         Int

	-- PASO 1: Procesar correlacionados (Status 1)
	Declare cur_alarmas Cursor Local Fast_Forward For
		Select ced_idKey, ced_idCuenta, ced_cAlarmaGenerar
		From [_Datos].[dbo].[EventosControlDealer]
		Where ced_iStatus = 1

	Open cur_alarmas
	Fetch Next From cur_alarmas Into @ced_idKey, @idCuenta, @cAlarmaGenerar

	While @@Fetch_Status = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_EvaluarControlEventosDealer | Execute [SGSP_AlarmaGenerar] | idCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10))) +' | cAlarma => '+ @cAlarmaGenerar
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Execute [_Datos].[dbo].[SGSP_AlarmaGenerar]
			@idCta   = @idCuenta,
			@cAlarma = @cAlarmaGenerar,
			@cQuien  = 'SoftGuard',
			@iValor  = @iValor Output

		Update [_Datos].[dbo].[EventosControlDealer]
			Set ced_iStatus     = 2,
				ced_tStatusExec = @ahora
		Where ced_idKey = @ced_idKey

		Fetch Next From cur_alarmas Into @ced_idKey, @idCuenta, @cAlarmaGenerar
	End

	Close cur_alarmas
	Deallocate cur_alarmas

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_EvaluarControlEventosDealer | Paso 1 completado'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- PASO 2: Marcar vencidos sin correlacion (Status 3)
	Update [_Datos].[dbo].[EventosControlDealer]
		Set ced_iStatus     = 3,
			ced_tStatusExec = @ahora
	Where ced_iStatus = 0
	  And DateAdd(Minute, ced_iMinutos, ced_tFechaHora) < @ahora

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_EvaluarControlEventosDealer | Registros vencidos sin correlacion => '+ Rtrim(Cast(@@RowCount As Varchar(10)))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_EvaluarControlEventosDealer | Fin'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

END TRY
BEGIN CATCH
		Begin
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
		End
END CATCH