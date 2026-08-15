CREATE OR ALTER TRIGGER [dbo].[TG_UPD_ComandosRX] ON [dbo].[p_comandos_ip] AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;
	
	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''
		
	Declare @idCmd Int = 0,
			@nEstado Int = 0
	Declare @cDll Varchar(50) = '',
			@cAlarmaGenerar char(3) = ''
	
	Select Top 1 @nEstado=[cmd_nEstado],@cDll=RC.[rec_cdll],@cAlarmaGenerar=[cmd_cAlarmaGenerar] From deleted
		Inner Join [dbo].[m_receptores_cab] RC On RC.[rec_iid]=deleted.[cmd_idReceptor]

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_UPD_ComandosRX] | Estado Old : '+Cast(@nEstado As Varchar(10))+' | Dll : '+ @cDll 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_UPD_ComandosRX] | cAlarmaGenerar :' + @cAlarmaGenerar
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
	
	--Porque IRS actualiza el comando 2 veces, por lo tanto si ya estaba en 3 no hago nada
	If @nEstado!=3 And @cDll In('IntelbrasPacketParser','VettiPacketParser') 
	Begin
  		Select Top 1 @idCmd=inserted.[cmd_iid] From inserted
		Where [cmd_nEstado] = 3 And [cmd_iEsCustom]=0 And ( [cmd_cValores] Like '$AMT|%' Or  [cmd_cValores] Like 'AC|%' )
		--	Inner Join [dbo].[m_receptores_cab] RC On RC.[rec_iid]=inserted.[cmd_idReceptor]
		--Where inserted.[cmd_nEstado] = 3 And [cmd_iEsCustom]=0 And RC.[rec_cdll] In('IntelbrasPacketParser','NanoCommPacketParser') 

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_UPD_ComandosRX] | ID Cmd : '+Cast(@idCmd As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

		If @idCmd > 0
			Insert Into [p_ComandosRX] ([crx_iCmdId]) Values (@idCmd)
	End

	Declare @cObs VarChar(100) = '',
			@cUserName VarChar(200) = ''
	Declare @idCta Int = 0

	Select Top 1 @nEstado=[cmd_nEstado],@cObs=[cmd_cObservaciones],@idCta=[cmd_idCuenta],@cUserName=e.[UserName] From inserted
		Left Join [_Audit].[dbo].[FrameworkAudit] a WITH (NOLOCK) On cmd_iid = a.ObjectId And a.ObjectTypeId = 3065
		Left Join [_Audit].[dbo].[FrameworkAuditExtend] e WITH (NOLOCK) On a.id = e.id

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_UPD_ComandosRX] | Estado New : '+Cast(@nEstado As Varchar(10))+' | UserName : '+ @cUserName
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
	
	If @nEstado=3	--Procesado
	Begin
		--Generar evento '_CE' informando envio de comando
		Declare @iParametro Int = IsNull(( Select [par_ivalor] From [_Tablas].[dbo].[t_parametros] With (NOLOCK) Where [par_cCodigo]='GENEROEVTCMD' ),0)

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_UPD_ComandosRX] | GENEROEVTCMD : '+Cast(@iParametro As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

		If @iParametro = 1 And @cAlarmaGenerar != ''	--Si y se configuro un codigo de alarma
		Begin
			Declare @iValor Int=0
			Set @cObs = Rtrim(@cObs)
			Set @cObs += ' | '+ Rtrim(@cUserName)

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [TG_UPD_ComandosRX] | Exec SGSP_AlarmaGenerar '+@cAlarmaGenerar+' | ' + @cObs
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute [_Datos].[dbo].[SGSP_AlarmaGenerar] @idCta=@idCta, @cAlarma=@cAlarmaGenerar, @cObs=@cObs, @iValor=@iValor OUTPUT

		End
	End
End