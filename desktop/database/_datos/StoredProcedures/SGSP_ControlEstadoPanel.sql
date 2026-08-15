CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlEstadoPanel]
	@iIdCuenta [int]=0,
	@cCodAlarma [char](3)='',
	@iUsuario [int]=0,
	@iRecId [int]=0,
	@cDebug Char(2) = 'No'	--'Si' 
AS
--Analizador de Eventos configurados para control de estado panel
--Autor : Pablo O. Canónico
--Fecha : 03/01/2018
--27-05-2024 : Pablo.DSS guarda usu_idkey en lugar de usu_icodigo. Se contiene desde aca (DSS-1020)
--2026-07-81 : Se agrego @cDebug

Set NoCount ON
BEGIN TRY
	Declare @cAlarmaEsperada Char(3),
		    @cAlarmaAGenerar Char(3)
	Declare @iUsuarioEsperado Int,
			@iMinutos Int

	Declare @tLimite Datetime,
		    @ahora Datetime = GetDate()

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Declare  @iExecute Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIMEREXECUTE' )
	If @iExecute = 0
	Begin	
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_ControlEstadoPanel] | TimerExecute configurado para NO ejecutar'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Set NoExec On
	End
	
	--@iUsuario es usu_iCodigo y [mep_iUsuarioControl] guarda [usu_idKey]
	Select @iUsuario=[usu_idKey] From [_Datos].[dbo].[m_usuarios]  With (NOLOCK)
		Where [usu_iCodigo]=@iUsuario And [usu_iidcuenta]=@iIdCuenta

	--Query
	Select @cAlarmaEsperada=[mep_cAlarmaEsperada],@iUsuarioEsperado=[mep_iUsuarioEsperado],@iMinutos=[mep_iMinutos],@cAlarmaAGenerar=[mep_cAlarmaAGenerar],@tLimite = DATEADD(MINUTE,[mep_iMinutos],@ahora)
		From [_Datos].[dbo].[m_EstadosPanel]
	Where  [mep_iMinutos]>0
		And [mep_idCuenta]=@iIdCuenta
		And [mep_cAlarmaControl]=@cCodAlarma
		And ( [mep_iUsuarioControl]=@iUsuario Or [mep_iUsuarioControl]=0)

	--Si el query trae algun valor
	If ( @tLimite Is Not  Null ) 
	Begin

		--@iUsuarioEsperado guarda [usu_idKey] y necesito usu_iCodigo
		Select @iUsuarioEsperado=usu_iCodigo From [_Datos].[dbo].[m_usuarios]  With (NOLOCK)
			Where [usu_idKey]=@iUsuarioEsperado

		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_ControlEstadoPanel] | Grabacion de p_EventosTimer | IdCuenta => '+ Rtrim(Cast(@iIdCuenta As Varchar(10)))+' | RecId => '+ Rtrim(Cast(@iRecId As Varchar(10)))+' | Usuario Esperado => '+ Rtrim(Cast(@iUsuarioEsperado As varchar(10)))+' | Alarma Esperada => '+ @cAlarmaEsperada+' | FechaHora Limite => '+ Rtrim(Convert(VarChar, @tLimite,120) )+' | Alarma a Generar => '+ @cAlarmaAGenerar
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Insert Into [_Datos].[dbo].[p_EventosTimer] ([pet_cTipo],[pet_idCuenta],[pet_iRecId],[pet_tFechaHora],[pet_cAlarma],[pet_cZona],[pet_iUsuario],[pet_iRecId_NR],[pet_tLimite_NR],[pet_cEvento_NR],[pet_iMinutos_NR],[pet_cAlarmaAGenerar_NR],[pet_cZona_NR])
			Values ('P',@iIdCuenta,@iRecId,@ahora,@cCodAlarma,'',@iUsuarioEsperado,0,@tLimite,@cAlarmaEsperada,@iMinutos,@cAlarmaAGenerar,'')

		------------------
	End

Set NoExec Off
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