CREATE OR ALTER TRIGGER [dbo].[TG_INS_EventosInformados] ON [dbo].[EventosInformados] AFTER INSERT AS

BEGIN
	SET NOCOUNT ON;
	
	Declare @iCuentaId Int=0, 
			@iRecId Int=0,
			@iCheckType Int=0,
			@iCant Int=0,
			@iValor Int=0,
			@iDenuncias Int=0
	
	Declare	@cObs nVarChar(Max) = '',
			@cAlarma Char(3) = '',
			@cAlarmaDesc VarChar(100)

	Declare @message nVarChar(Max) = '',
            @StartDateTimeText VarChar(max) = ''
	

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
    Set @message = 'Start DateTime : %s | [EventosInformados] | Me fijo si es una denuncia'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Select @iRecId=[evi_iRecId],@iCuentaId=[evi_iCuentaId],@iCheckType=[evi_iCheckType],
		@cAlarma= [evi_cAlarma],@cAlarmaDesc=[evi_cAlarmaDesc] 
	From inserted
		
	If @iCheckType=1 --Denuncia
	Begin
		Set @iDenuncias = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='CANTREPORTES' )
		If @iDenuncias Is Null
			Set @iDenuncias = 3

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
		Set @message = 'Start DateTime : %s | [EventosInformados] | Es denuncia. Tengo que ver si es mayor o igual a '+Cast(@iDenuncias As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT		

	    Select @iCant=Count([evi_iRecId])
			From [_Datos].[dbo].[EventosInformados]
		Where [evi_iCheckType]=1 --Denuncia
			And [evi_iRecId]=@iRecId
		  Group By [evi_iRecId]

		If @iCant >= @iDenuncias
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
			Set @message = 'Start DateTime : %s | [EventosInformados] | Verifico que el [evi_iRecId] = '+Rtrim(Cast(@iRecId As VarChar(10)))+' no tenga _DE ya generado'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @iCant=0
			Select Top 1 @iCant=[evi_iRecId]
				From [_Datos].[dbo].[EventosInformados]
			Where [evi_iCheckType]=1 --Denuncia
				And [evi_iRecId]=@iRecId
				And [evi_iGenRecId]>0

			If @iCant Is Null Or @iCant=0
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
				Set @message = 'Start DateTime : %s | [EventosInformados] | Genero evento _DE'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Set @cObs = 'Evento denunciado : '+@cAlarma+'-'+@cAlarmaDesc
				Execute [_Datos].[dbo].[SGSP_AlarmaGenerar] @idCta=@iCuentaId, @cAlarma='_DE',@cObs=@cObs, @iValor=@iValor OUTPUT

				If @iValor>0
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
					Set @message = 'Start DateTime : %s | [EventosInformados] | RecId generado => '+Cast(@iValor As VarChar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Update [_Datos].[dbo].[EventosInformados]
						Set [evi_iGenRecId]=@iValor,
							[evi_iStatus]=1,
							[evi_tStatusExec]=GetDate()
						Where [evi_iCheckType]=1 --Denuncia
							And [evi_iRecId]=@iRecId
							And [evi_iGenRecId]=0
				End
			End
		End
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
	Set @message = 'Start DateTime : %s | [EventosInformados] | Fin' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
END