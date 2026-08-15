CREATE OR ALTER TRIGGER [dbo].[TG_UPD_PushResponse] ON [dbo].[p_PadLocks] AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;
	
	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''
		
	Declare @jsonInfo nVarChar(Max) = '',
			@cAutObservacion nVarChar(Max) = '',
			@cLockName nVarChar(100) = ''

	Declare @iStatus Int = 0,
			@iRecId  Int = 0
	
	Select @jsonInfo=[pdl_cResponse], @iStatus=[pdl_iStatus], @iRecId=[pdl_iRecId], @cAutObservacion=[pdl_cAutObservacion], @cLockName=[pdl_cLockName] From inserted

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_UPD_PushResponse] | pdl_iStatus : '+Cast(@iStatus As Varchar(10))+' | Response : '+ @jsonInfo
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

	/*
	[pdl_iStatus]
	 1.Llave Solicitada
	 2.Llave Aprobada
	 3.Llave Rechazada
	 4.Con Error
	*/

	If @iStatus IN(2,3) And @jsonInfo!= '' And @jsonInfo Is Not Null
	Begin
		Declare @value nVarChar(Max) = ''
		Set @value=JSON_VALUE(@jsonInfo,'$.data[0].user.email'); 

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_UPD_PushResponse] | user.email : '+@value
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
	
		--Si no hay mail opara buscar SmartPanics no hago nada
		If @value!= '' And @value Is Not Null
		Begin
			Declare @cTo nVarChar(150) = ''
			Declare @idCta Int = 0

			Select Top 1 @cTo=[ID], @idCta=[CuentaId] From _Datos.dbo.SmartPanic sp
				Left Outer Join _Sistema.dbo.usersdesktopweb u WITH (NOLOCK) On u.udw_idkey = sp.awccUserId
			Where udw_usuario=Rtrim(@value)

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [TG_UPD_PushResponse] | SP ID : '+@cTo
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

			If @cTo!= '' And @cTo Is Not Null
			Begin
				Declare @cFromName nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
				Declare @cNotificacionAsunto nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILNOTIFICACIONASUNTO')
				Declare @cAsunto nVarChar(max) = Rtrim(@cFromName)+' '+Rtrim(@cNotificacionAsunto)
				Declare @cSubject nVarChar(max) = '',
						@Customdata nVarChar (max) = '',
						@translation nVarChar(Max) = ''
				Declare @dHoy DateTime = GetDate()

			    Set @Customdata = '{"cod_cdescripcion":"'
			    Declare @Msg VarChar(100) = 'Solicitud '
			    If @iStatus = 2		--2.Llave Aprobada
					Set @Msg += 'Aprobada'
				Else
					Set @Msg += 'Rechazada'

				Set @Msg += ' sobre su candado '

				Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = @Msg, @soloOutput=1, @translation = @translation OUTPUT
				Set @Msg = Rtrim(@translation)

				Set @Customdata += Rtrim(@Msg)
				Set @Customdata += '","rec_iid":"'+CONVERT(Varchar(20), @iRecId)+'"}'
				Set @cSubject = Rtrim(@Msg) + ' ' +  @cLockName + ' - ' + Rtrim(@cAutObservacion)

				Insert Into _datos..Message ( [Name], [Body],[DateCreated],[FromTypeId],[FromId],[ToTypeId],[ToId],[Customdata],[EventoID],[CuentaID])
	 				Values (@cAsunto, @cSubject, @dHoy, 0, 0, 3067, @cTo, @Customdata, @iRecId, @idCta)
			End
		End
	End
End