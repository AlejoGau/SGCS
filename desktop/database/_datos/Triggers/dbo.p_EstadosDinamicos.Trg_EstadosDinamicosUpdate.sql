CREATE OR ALTER TRIGGER [dbo].[Trg_EstadosDinamicosUpdate] ON [dbo].[p_EstadosDinamicos] FOR UPDATE AS
BEGIN

	Set NoCount On

	Declare @cCodigo nVarChar(10)='',
			@cFormato nVarChar(10)=''

	Declare	@iValorOld Int=0,
			@iValorNew Int=0,
			@iCtaID Int=0

	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = ''


	Select Top 1 @iValorOld=[ped_iValor], @cCodigo=[ped_cCodigo] From deleted
	Select Top 1 @iValorNew=[ped_iValor], @iCtaID=[ped_iCtaId] From inserted
	
	If @cCodigo = 'ALARIE1' And @iValorOld<>@iValorNew
		Set @cFormato = 'E1V'+Cast(@iValorNew As Char(1))
	Else If @cCodigo = 'ALARIE2' And @iValorOld<>@iValorNew
		Set @cFormato = 'E2V'+Cast(@iValorNew As Char(1))
	Else If @cCodigo = 'ALARIE3' And @iValorOld<>@iValorNew
		Set @cFormato = 'E3V'+Cast(@iValorNew As Char(1))
	Else If @cCodigo = 'ALARIE4' And @iValorOld<>@iValorNew
		Set @cFormato = 'E4V'+Cast(@iValorNew As Char(1))

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] Formato : '+@cFormato
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @cFormato<>''
		Begin
			Declare @iReceptor Int = 0,
					@iCtaMap Int,
					@iCtaFwd Int

			Declare @cAlarma nVarChar(10)=''
			
			Select Top 1 @iReceptor=[rec_iid] From [dbo].[m_receptores_cab] Where [rec_cdll]='Alari3PacketParser'

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] Execute [_Datos].[dbo].[SGSP_IRSBuscoFormato] '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute [_Datos].[dbo].[SGSP_IRSBuscoFormato] 
				@iReceptor = @iReceptor,
				@iCuenta = @iCtaID,
				@iTipo = 0,
				@cEvento = @cFormato,
				@cZona = '',
				@cProtocolo = 'ALARI',
				@cAlarma = @cAlarma OUTPUT,
				@iCtaMap = @iCtaMap OUTPUT,
				@iCtaFwd = @iCtaFwd OUTPUT

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] Alarma: ' + @cAlarma
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @cAlarma<>''
				Begin
					/*
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] Execute [_Desktop].[dbo].[AlarmaGenerar] '
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] @idCta          = ' + CONVERT(VARCHAR(10), @iCtaID)
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] @cAlarma        = ' + @cAlarma
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] @rec_norigen    = 5 '
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] @rec_idReceptor = ' + CONVERT(VARCHAR(10), @iReceptor)
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] @cDll           = Alari3PacketParser'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
					Execute [_Desktop].[dbo].[AlarmaGenerar] 
						@idCta = @iCtaID, 
						@cAlarma = @cAlarma, 
						@rec_norigen = 5, 
						@rec_idReceptor = @iReceptor,
						@cDll = 'Alari3PacketParser'
					*/
 
 					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] Execute [_Datos].[dbo].[SGSP_pRecepcionINS]'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT		

					Declare @fecha [datetime] = GetDate();
					Declare @iid AS INT=0;

					Execute [_Datos].[dbo].[SGSP_pRecepcionINS] 
						@rec_iidcuenta = @iCtaID, 
						@rec_calarma = @cAlarma, 
						@rec_czona = '', 
						@rec_iusuario = 0, 
						@rec_tfechahora = @fecha, 
						@rec_tFechaRecepcion = @fecha, 
						@rec_nestado = 0, 
						@rec_cObservaciones = '', 
						@rec_cContenido = '', 
						@rec_nOrigen = 5, 
						@rec_iPuerto = 0, 
						@rec_idReceptor = @iReceptor, 
						@rec_idMap = 0,
						@rec_idFwd = 0,
						@iValor = @iid OUTPUT;
    
					If @iid=0
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [Trg_EstadosDinamicosUpdate] Execute [_Datos].[dbo].[SGSP_pRecepcionINS] volvio con iValor 0!!!.'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
					End
				End
		End 

END