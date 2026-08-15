CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlLogOutVigicontrol] As
--Controla el tiempo de logueo de los guardias de Vigicontrol
--Autor :Pablo O. Canónico
--Fecha :23/01/2024
SET NOCOUNT ON

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlLogOutVC', @Repetition = 10
--	
Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

Declare @iMinutos Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIEMPODESLOGUEO' )		
If @iMinutos Is Null
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_ControlLogOutVigicontrol] Sin tiempo configurado. No controla!!!'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End

Declare @iUsuario Int=0,
		@idCuenta Int=0,
		@iValor Int=0,
		@vcid Int=0

Declare	@cObs nVarChar(Max) = '',
		@cPushToken VarChar(1024) = ''

DECLARE CursorCTLOVC CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
Select Distinct [vus_iusuario],[vus_idcuenta]
	From [_Datos].[dbo].[VigicontrolUserSessions]
  Where [vus_dlogout] Is Null
	And [vus_dlogin] > DateAdd(DAY,-5,Getdate())
	And DateAdd(MINUTE,@iMinutos,[vus_dlogin]) < Getdate()
	Order By [vus_iusuario],[vus_idcuenta]

OPEN CursorCTLOVC
FETCH NEXT FROM CursorCTLOVC INTO @iUsuario, @idCuenta
WHILE @@FETCH_STATUS = 0
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_ControlLogOutVigicontrol] | Genero V97 para @idCuenta => '+Cast(@idCuenta As Varchar(10))+ ' con @iUsuario => '+Cast(@iUsuario As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @cObs = 'Control LogOut Vigicontrol'
		Execute [_Datos].[dbo].[SGSP_AlarmaGenerar] @idCta=@idCuenta, @cAlarma='V97',@cObs=@cObs, @iUsuario=@iUsuario, @iValor=@iValor OUTPUT

		If @iValor > 0
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_ControlLogOutVigicontrol] | Busco PushToken'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Select @cPushToken=[pushToken],@vcid=[Id]
				From [_Datos].[dbo].[SmartTrack] With (NOLOCK)
			Inner Join [_Datos].[dbo].[VigicontrolUserCurrentSession] ON [Id]=[vucs_vcid]
			Where [vucs_cueiid]=@idCuenta

			If @cPushToken != '' And @cPushToken Is Not Null
			Begin
				Insert Into [_Datos].[dbo].[p_push_queue] (
					[ppq_msg]
					,[ppq_estado]
					,[ppq_fechacreacion]
					,[ppq_idmessage]
					,[ppq_idcuenta])
				Values (
					'{ 
						"message":{
							"data": {
								"action": "LOGOUT",
								"content_available":"true"
									},
							"token":"' + @cPushToken + '"
							}
					}'
					/*
					'{ 
						"data": {
							"action": "ALARM_LOGOUT"
						},
						"notification" : {
							"content_available": true
						},
						"to":"'+@cPushToken+'"
					}'
					*/
					,0
					,GETDATE()
					,@vcid*(-1)
					,@idCuenta )
			End
			Else
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_ControlLogOutVigicontrol] | NO hay PushToken configurado'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_ControlLogOutVigicontrol] | Execute [_Desktop].[dbo].[VigicontrolCreateUserSessions]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute [_Desktop].[dbo].[VigicontrolCreateUserSessions]
		End 
		FETCH NEXT FROM CursorCTLOVC INTO @iUsuario, @idCuenta
	End

CLOSE CursorCTLOVC
DEALLOCATE CursorCTLOVC

Set NoExec Off