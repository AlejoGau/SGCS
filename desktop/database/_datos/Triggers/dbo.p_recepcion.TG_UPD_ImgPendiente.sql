CREATE OR ALTER TRIGGER [dbo].[TG_UPD_ImgPendiente] ON [dbo].[p_recepcion] AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
		    @StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Inicio-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @idRec Int
	Declare @idCta Int
	Declare @cContenido nVarChar(50)
	Declare @cImg nVarChar(200)
    Declare @cCarpeta nVarChar(200)
    Declare @cTipo nVarChar(20)

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Busco MultiMedia sin visualizar-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
    
  	Select Top 1 @idRec=inserted.rec_iid, @idCta=inserted.rec_iidCuenta, @cContenido=inserted.rec_cContenido, @cImg=EP.rxi_cImg, @cCarpeta=EP.rxi_cCarpeta, @cTipo=EP.rxi_cTipo  
		From inserted
	Inner Join [dbo].[EventosPendientes] EP On EP.[rec_iid]=inserted.[rec_iid]
	Where inserted.rec_nEstado = 3 And rxi_nEstado = 0 And rxi_cTipo In('jpg','avi') And inserted.rec_calarma<>'_VA'

	If @idRec > 0
		Begin
			Declare @iValor Int

			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Genero _VA-- '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@idCta, @cAlarma='_VA', @cQuien='SoftGuard' , @cObs='', @cContenido=@cContenido, @iUsuario=0, @iValor=@iValor OUTPUT

			If @iValor > 0
				Begin
					Insert Into p_RXImg (rxi_iRecId,rxi_cImg,rxi_cCarpeta,rxi_nEstado,rxi_cTipo)
					 Values (@iValor,@cImg,@cCarpeta,0,@cTipo)
				End
		End

	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Declare @nEstado Numeric(1)
	--For perfomance issues--
	If ( Select Count(rec_iid) From inserted ) > 1
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | Hay mas de 1-- '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Declare cDel CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
				For	Select rec_nestado, rec_iid From inserted

			Open cDel
			Fetch Next From cDel Into @nEstado,@idRec
			While @@FETCH_STATUS = 0
			Begin
				If @idRec > 0
					Begin
						Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | @nEstado ('+Cast(@nEstado As char(1))+'--)'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						If @nEstado IN(3,5,6,7,8)
							Begin
								Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | Delete [EventosPendientes]-- | @idRec ('+Cast(@idRec As Varchar(10))+')'
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								Delete From [dbo].[EventosPendientes] Where [rec_iid] = @idRec
							End 
						Else 
							Begin
								Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | SGSP_Fill_EventosPendientes-- | @idRec ('+Cast(@idRec As Varchar(10))+')'
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								Execute SGSP_Fill_EventosPendientes @idRec, 0
							End
					End

				Fetch Next From cDel Into @nEstado,@idRec
			End

			Close cDel
			Deallocate cDel
		End
	Else
		Begin
			--Evito el Cursor
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | Hay solo 1. Evito el Cursor--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Select @nEstado=rec_nestado, @idRec=rec_iid From inserted
			If @idRec > 0
				Begin
					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | @nEstado ('+Cast(@nEstado As char(1))+'--)'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
					If @nEstado IN(3,5,6,7,8)
						Begin
							Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | Delete [EventosPendientes]-- | @idRec ('+Cast(@idRec As Varchar(10))+')'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							Delete From [dbo].[EventosPendientes] Where [rec_iid] = @idRec
						End 
					Else 
						Begin
							Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Pendientes | SGSP_Fill_EventosPendientes-- | @idRec ('+Cast(@idRec As Varchar(10))+')'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							Execute SGSP_Fill_EventosPendientes @idRec, 0
						End
				End
		End

	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Depuracion--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	--Update de depurado por recategorizacion de evento procesado--
	Declare @cCierre Char(6)

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Depuracion | Busco estado en inserted por recategorizacion de evento procesado--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

  	Select @idRec = rec_iid, @nEstado = rec_nestado,  @cCierre=Left(Convert(CHARACTER, rec_tfechahora, 112),6) From inserted --deleted

	/*
	Estado	Descripcion
		0	Evento Nuevo/Pendiente	
		1	Evento esta siendo Procesado 
		2	Evento en Espera
		3	Evento Procesado/Fin
		4	Evento esta siendo Procesado en Espera
		5	Evento Procesado Automaticamente que No Genera Alerta
		6	Evento Procesado Automaticamente por Modo Prueba
		7	Evento Procesado Automaticamente por Modo Desactivado ( Cuenta NO Habilitada )
		8	Evento Llamado Telefonico / SMS
		9	Evento en estado Temporal usado por ProcesaTodo
	*/
	If @nEstado IN(3,5,6,7,8)
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Depuracion | Update de depurado por recategorizacion de evento procesado--' + '| @idRec ('+Cast(@idRec As Varchar(10))+') | @nEstado ('+Cast(@nEstado As char(1))+')' 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @cSQL nVarChar(Max) = ''
		Set @cSQL = 'MERGE INTO [dbo].[p_recepcion' +  @cCierre  + '] AS TGT
		USING ( Select rec_iid,rec_nEstado,rec_tFechaProceso,rec_cObservaciones,rec_idResolucion,rec_cContenido,rec_cCategorizacion,rec_ioperador From [dbo].[p_recepcion] WITH (NOLOCK) 
			Where rec_iid ='+Cast(@idRec As VarChar(10))+' 
		) AS SRC ON TGT.rec_iid = SRC.rec_iid

		WHEN MATCHED THEN
			UPDATE SET
			TGT.rec_nEstado=SRC.rec_nEstado,
			TGT.rec_tFechaProceso=SRC.rec_tFechaProceso,
			TGT.rec_cObservaciones=SRC.rec_cObservaciones,
			TGT.rec_idResolucion=SRC.rec_idResolucion,
			TGT.rec_cContenido=SRC.rec_cContenido,
			TGT.rec_cCategorizacion=SRC.rec_cCategorizacion,
			TGT.rec_ioperador=SRC.rec_ioperador;'

		--Print (@cSQL)
		Execute (@cSQL)
	End

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --[TG_UPD_ImgPendiente] | Fin-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

END