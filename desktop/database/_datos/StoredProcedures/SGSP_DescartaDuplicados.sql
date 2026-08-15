CREATE OR ALTER PROCEDURE [dbo].[SGSP_DescartaDuplicados]
	@idCta [int] = 0,
	@cDataString [nVarChar](MAX) = '',
	@tFechaHora [smalldatetime] = Null,
	@iConexion [int] = 0,
	@cDebug Char(2) = 'No'
AS
--Es utilizado por IRServices para verificar duplicidad de eventos recibidos
--Autor :Pablo O. Canónico
--Fecha :15/03/2017
--2018-09-28 : Se agrego @iConexion para controla duplicidad por puertos y no por parametro
--2026-07-81 : Se agrego @cDebug
Set NoCount On
BEGIN TRY
Declare @cLog nVarChar(MAX) = '',
		@message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  

Declare @tLimite SmallDatetime = Null

Declare @iDescarta Int = 0
--Declare @iParametro Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DESCARTADUPLICADOS' )

Declare @iParametro Int = ( Select IsNull([iprsc_iDuplicado],0) From [_Tablas].[dbo].[t_IPRSConn] Where [iprsc_ipcidkey]=@iConexion )
If @iParametro = 1
Begin
	Select @cLog = [cte_cLog], @tLimite = DATEADD(MINUTE,3,[cte_tFechaHora])
		From [_Datos].[dbo].[p_CtrlEventos] 
	Where [cte_iCta]=@idCta

	If NOT @tLimite Is Null
		Begin	
			Set @message = 'Start DateTime : %s | [SGSP_DescartaDuplicados] | Fecha Limite => '+ Convert(VarChar(MAX), @tLimite, 20) + ' | Fecha Evento => '+ Convert(VarChar(MAX), @tFechaHora, 20)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @tLimite > @tFechaHora And @cLog = @cDataString
				Begin	--Descartar Evento
					Set @iDescarta = 1
					IF @cDebug = 'Si'
					Begin
						Set @message = 'Start DateTime : %s | [SGSP_DescartaDuplicados] | Descartar Evento Duplicado => '+ @cDataString
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End
				End
			Else --Tengo que actualizar el evento de la cuenta
				Begin
					IF @cDebug = 'Si'
					Begin
						Set @message = 'Start DateTime : %s | [SGSP_DescartaDuplicados] | Update p_CtrlEventos con idCta ('+ Rtrim(Cast(@idCta As VarChar(10))) +') cDataString => '+ @cDataString
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Update p_CtrlEventos 
					 Set cte_cLog=@cDataString,
				 		 cte_tFechaHora=@tFechaHora
					Where cte_iCta=@idCta
				End 
		End
	Else --Tengo que insertar el evento	 	
		Begin
			IF @cDebug = 'Si'
			Begin
				Set @message = 'Start DateTime : %s | [SGSP_DescartaDuplicados] | Insert Into p_CtrlEventos con idCta ('+ Rtrim(Cast(@idCta As VarChar(10))) +') cDataString => '+ @cDataString
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			Insert Into p_CtrlEventos(cte_iCta,cte_tFechaHora,cte_cLog) 
			Values (@idCta,@tFechaHora,@cDataString)
		End 
End 
Else
Begin
	IF @cDebug = 'Si'
	Begin
		Set @message = 'Start DateTime : %s | NO Controla Evento Duplicado. Conexion ('+ Rtrim(Cast(@iConexion As VarChar(10))) +') configurada en NO'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End
End

Return @iDescarta
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