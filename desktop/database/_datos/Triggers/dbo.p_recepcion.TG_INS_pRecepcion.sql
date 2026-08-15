CREATE OR ALTER TRIGGER [dbo].[TG_INS_pRecepcion] ON [dbo].[p_recepcion] AFTER INSERT AS
BEGIN
	SET NOCOUNT ON;
	Declare @cDebug CHAR(2) = 'No'	--'Si' 

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(Max) = ''

	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Inicio'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Declare @idRec Int = 0,
			@idCuenta Int = 0,
			@iUsuario Int = 0,
			@nCheck Int = 1,
			@nOrigen Int = 0
	Declare @cCodAlarma Char(3) = '',
			@cFecha Char(10) = '',
			@cHora Char(10) = ''
	Declare @cObs nVarChar(max) = ''
			 
	Select @idRec = rec_iId, @idCuenta = rec_iidcuenta, @cCodAlarma = rec_cAlarma, @iUsuario = rec_iusuario, @cFecha = Convert(Char(10), rec_tFechaHora,103),
		   @cHora  = Convert(Char(10), rec_tFechaHora,108), @nOrigen=rec_nOrigen
	From inserted
			
	Select @cObs = CAST(t.rec_cObservaciones As nVarChar(max))
	From [p_recepcion] AS t
		Inner Join inserted AS i ON t.rec_iid = i.rec_iid

	If @cCodAlarma = '_NP'
		Set @nCheck = 0

	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | idRec => '+ Cast(@idRec As VarChar(10)) + ' | idCuenta => '+ Cast(@idCuenta As VarChar(10)) + ' | cCodAlarma => '+ @cCodAlarma + ' | iUsuario => '+ Cast(@iUsuario As VarChar(10)) + ' | nCheck => '+ Cast(@nCheck As VarChar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_Fill_EventosPendientes] '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Execute SGSP_Fill_EventosPendientes @idRec, @nCheck

	IF @cDebug = 'Si'
	Begin
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_IRSRedirectorEventos] '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Execute SGSP_IRSRedirectorEventos @idCuenta, @idRec , @cCodAlarma

	IF @cDebug = 'Si'
	Begin
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_IRSEstadosDinamicos] '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Execute SGSP_IRSEstadosDinamicos @idCuenta, @cCodAlarma, @iUsuario
	
	IF @cDebug = 'Si'
	Begin	
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_ControlEstadoPanel] '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Execute SGSP_ControlEstadoPanel @idCuenta, @cCodAlarma, @iUsuario, @idRec, @cDebug

	IF @cDebug = 'Si'
	Begin
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_AutoProcesoEvento] '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Execute SGSP_AutoProcesoEvento @cCodAlarma, @idRec, @idCuenta, @cDebug

	If @cCodAlarma IN('OPV','OSA','OPF')
	Begin	
		IF @cDebug = 'Si'
		Begin
			Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_ControlCierre] '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Execute SGSP_ControlCierre @idCuenta, @idRec
	End

	If @cCodAlarma = '_ST'
	Begin
		IF @cDebug = 'Si'
		Begin
			Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_NotificacionEncuesta] '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		
		Execute SGSP_NotificacionEncuesta @cCodAlarma, @idRec, @idCuenta
	End

	/*Se paso a AlarmaGenerar x que al generar un evento manual que tiene Orden de ST automatica, daba error de Nested Insert
	Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_OrdenSTAutomaticas] '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Execute SGSP_OrdenSTAutomaticas @cCodAlarma, @idCuenta, @cFecha, @cHora
	*/

	If @cObs Is Not Null And @cObs Like '%Fecha y Hora:%'  And  @cObs Like '%Matricula:%' 
	Begin
		IF @cDebug = 'Si'
		Begin
			Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_FillEventosIngEgr] '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Execute SGSP_FillEventosIngEgr @idRec, @idCuenta, @cObs
	End

	IF @cDebug = 'Si'
	Begin
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Execute [SGSP_ControlEventosDealer] '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Execute SGSP_ControlEventosDealer @idCuenta, @idRec, @cCodAlarma

	IF @cDebug = 'Si'
	Begin
		Set @message = 'Start DateTime : %s | [TG_INS_pRecepcion] | Fin'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End
END