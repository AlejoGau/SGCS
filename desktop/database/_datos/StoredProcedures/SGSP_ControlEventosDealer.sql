CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlEventosDealer]
    @idCuenta Int,
    @idRec    Int,
    @cAlarma  Char(3)
AS
Set NoCount ON

BEGIN TRY
	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_ControlEventosDealer | CodAlarma '+@cAlarma+' | Id Rec => '+ Rtrim(Cast(@idRec As varchar(10))) +' | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10))) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Declare @bAplicaCaso    Bit    = 0
	Declare @cDealer        Char(3) = ''
	Declare @cAlarmaGenerar Char(3) = ''
	Declare @iMinutos Int = 0

	Select @cDealer = cue_clinea
		From [_Datos].[dbo].[m_cuentas]
	Where cue_iid = @idCuenta

	-- la alarma es una AlarmaControl
	If Exists ( Select 1
		From [_Tablas].[dbo].[t_ControlEventosDealer]
		Where ced_cDealer        = @cDealer
		  And ced_cAlarmaControl = @cAlarma )
	Begin
		Set @bAplicaCaso = 1
		If Exists ( Select 1
			From [_Datos].[dbo].[EventosControlDealer]
			Where ced_idCuenta = @idCuenta
			  And ced_cAlarma  = @cAlarma
			  And ced_iStatus  = 0 )
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_ControlEventosDealer | AlarmaControl | Ya existe pendiente activo para esta cuenta - alarma, se omite'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
		Begin
			Select @cAlarmaGenerar = ced_cAlarmaGenerar,
				   @iMinutos       = ced_iMinutos
				From [_Tablas].[dbo].[t_ControlEventosDealer]
			Where ced_cDealer        = @cDealer
			  And ced_cAlarmaControl = @cAlarma

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_ControlEventosDealer | AlarmaControl | Insert pendiente | cAlarmaControl => '+@cAlarma+' | cAlarmaGenerar => '+@cAlarmaGenerar+' | iMinutos => '+Rtrim(Cast(@iMinutos As Varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Insert Into [_Datos].[dbo].[EventosControlDealer] (ced_idCuenta, ced_iRecId, ced_tFechaHora, ced_cAlarma, ced_cAlarmaGenerar, ced_iMinutos, ced_iStatus)
				Values (@idCuenta, @idRec, GetDate(), @cAlarma, @cAlarmaGenerar, @iMinutos, 0)
		End
	End

	-- la alarma es una AlarmaEsperada
	-- Busca si hay un pendiente activo dentro de la ventana
	-- y lo marca como correlacionado (Status 1)
	If Exists ( Select 1
		From [_Tablas].[dbo].[t_ControlEventosDealer]
		Where ced_cDealer         = @cDealer
		  And ced_cAlarmaEsperada = @cAlarma )
	Begin
		Set @bAplicaCaso = 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_ControlEventosDealer | AlarmaEsperada | Alarma esperada detectada => '+@cAlarma+' | Buscando pendiente activo dentro de ventana'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Update ecd
			Set ecd.ced_iStatus     = 1,
				ecd.ced_tStatusExec = GetDate()
		From [_Datos].[dbo].[EventosControlDealer] ecd
		Inner Join [_Tablas].[dbo].[t_ControlEventosDealer] cfg
			On  cfg.ced_cDealer         = @cDealer
			And cfg.ced_cAlarmaControl  = ecd.ced_cAlarma
			And cfg.ced_cAlarmaEsperada = @cAlarma
		Where ecd.ced_idCuenta = @idCuenta
		  And ecd.ced_iStatus  = 0
		  And DateAdd(Minute, cfg.ced_iMinutos, ecd.ced_tFechaHora) >= GetDate()

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_ControlEventosDealer | AlarmaEsperada | Registros correlacionados => '+ Rtrim(Cast(@@RowCount As Varchar(10)))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	-- Si no aplica ninguno de los dos casos
	If @bAplicaCaso = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_ControlEventosDealer | Alarma '+@cAlarma+' no configurada para el dealer '+@cDealer+', se omite'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

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