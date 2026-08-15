CREATE OR ALTER TRIGGER [dbo].[TG_UPD_Cecal] ON [dbo].[RedirectorQueue] AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Declare @idRec Int = 0,
			@iStatus Int = 0
	Declare @cRespuesta nVarChar(max) = ''

	Select @idRec=rdq_idRec,@cRespuesta=rdq_cRespuesta,@iStatus=rdq_iStatus From inserted
		INNER JOIN [_Tablas].[dbo].[t_ReDirector] On  [rdq_iReDirector]=[trd_idKey]
		INNER JOIN [_Tablas].[dbo].[t_ReDirectorDestino] ON [trd_iDestino]=[rrd_idKey]
		WHERE Upper(rrd_cnombre) = Upper('RedirectorCecal')

	If @iStatus Is Not Null And @iStatus>0 
	Begin
		If @cRespuesta  Like '%response result="accept"%'
		Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [TG_UPD_Cecal] | Respueta ' + Rtrim(@cRespuesta) + '. Lo proceso'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

				Declare @translation nVarChar(Max)=''
				Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Respuesta Cecal correcta', @soloOutput=1, @translation = @translation OUTPUT
				Declare  @cObs nVarChar(max)= '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [SoftGuard] '+ Rtrim(@translation)
				
				--2025-10-13 Pablo : lo cambie a update porque el servicio daba error al procesar el evento
				--Execute [_Desktop].[dbo].[SearchAtencionEventoProcesar] @rec_iid=@idRec, @rec_cObservaciones=@cObs, @_UserId='operator@soc.com'
				--El @_UserId sale de DK-1247
				Declare @tFechaHora Datetime = Getdate()
				Declare @idCuenta Int = 0,
						@nEstado Int = 0

				Select @idCuenta = rec_iidcuenta, @nEstado = rec_nEstado
					From p_recepcion WITH (NOLOCK)
					Where rec_iid=@idRec
					
					
				If @idCuenta>0  And @nEstado In(0,2)
				Begin

					Update p_recepcion
						Set rec_nEstado = 3, rec_tFechaProceso = @tFechaHora, rec_cObservaciones = @cObs
					Where rec_iid = @idRec

					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [TG_UPD_Cecal] | Inserto TimeLine'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Insert Into [_Datos].[dbo].[EventosTimeLine]
								([etl_iRecID]
								,[etl_iCuenta]
								,[etl_tFechaHora]
								,[etl_cAccion]
								,[etl_cObservacion]
								,[etl_cOwner]
								,[etl_iOperador])
						Values
								(@idRec
								,@idCuenta
								,GetDate()
								,'Autoproceso'
								,Rtrim(@cObs)
								,'%SISTEMA%'
								,0)
				End
		End
		Else
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [TG_UPD_Cecal] | NO se procesa | rdq_cRespuesta : '+@cRespuesta
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End 
	End
	Else
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_UPD_Cecal] | NO es RedirectorCecal o rdq_iStatus no es > 0'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End 
END