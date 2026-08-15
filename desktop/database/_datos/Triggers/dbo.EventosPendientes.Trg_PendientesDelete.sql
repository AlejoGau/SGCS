CREATE OR ALTER TRIGGER [dbo].[Trg_PendientesDelete] ON [dbo].[EventosPendientes] INSTEAD OF DELETE AS
BEGIN
	Declare @idRec Int=0,
		@idKey Int=0

	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

	Declare @iCount Int = 0
	Select @iCount=Count(evp_idKey) From deleted

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | @iCount ('+Cast(@iCount As Varchar(10))+')' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--For perfomance issues--
	If ( @iCount ) > 1
		Begin	 
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | Pendientes | Hay mas de 1 '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Declare cDel CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
				For Select rec_iId,evp_idKey From deleted

			Open cDel
			Fetch Next From cDel Into @idRec,@idKey
			While @@FETCH_STATUS = 0
			Begin
		
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | SGSP_DepuraEventosPendientes | @idRec ('+Cast(@idRec As Varchar(10))+')' 
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Execute SGSP_DepuraEventosPendientes @idRec

				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | Delete [EventosPendientes] | @idRec ('+Cast(@idRec As Varchar(10))+')' 
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Delete From [EventosPendientes] Where [rec_iId]=@idRec
				--Delete From [EventosPendientes] Where [evp_idKey]=@idKey
        
				Fetch Next From cDel Into @idRec,@idKey
			End

			Close cDel
			Deallocate cDel
		End
	
	--Los TST no se guardan en pendientes y el count da cero
	If ( @iCount ) = 1
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | Pendientes | Hay solo 1. Evito el Cursor'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Select @idRec=rec_iid From deleted
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | SGSP_DepuraEventosPendientes | @idRec ('+Cast(@idRec As Varchar(10))+')' 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute SGSP_DepuraEventosPendientes @idRec

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | Delete [EventosPendientes] | @idRec ('+Cast(@idRec As Varchar(10))+')' 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Delete From [EventosPendientes] Where [rec_iId]=@idRec

		End
		
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [Trg_PendientesDelete] | FIN'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
END