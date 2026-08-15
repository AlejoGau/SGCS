CREATE OR ALTER TRIGGER [dbo].[TG_INS_pGAHistory] ON [dbo].[p_grabacion_audio] AFTER INSERT AS

BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''
	
	Declare @iCant Int=0 
	Select @iCant = Count(*) From inserted

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_INS_pGAHistory] | Cantidad de Registros Insertados | iCant ('+Cast(@iCant As Varchar(10))+')' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @iCant = 0
		Begin
			Set @message = 'Start DateTime : %s | [TG_INS_pGAHistory] | No graba!!!' 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set NoExec On
		End

	Declare	@iidcuenta [int] = 0,
			@iidrecepcion [int] = 0,
			@dfechahora [datetime] = '',
			@carchivo [varchar](100) = '',
			@nduracion [numeric](10, 2) = 0,
			@ioperador [int] = 0,
			@cTerminal [char](3) = '',
			@iidLlamado [int] = 0,
			@nestado [numeric] (1, 0) = 0,
			@ctelefono [varchar] (30) = '',
			@iValor [Int] = 0

	SELECT @iidcuenta=[gra_iidcuenta],@iidrecepcion=[gra_iidrecepcion],@dfechahora=[gra_dfechahora],@carchivo=[gra_carchivo],@nduracion=[gra_nduracion],@ioperador=[gra_ioperador],@cTerminal=[gra_cTerminal],@iidLlamado=[gra_iidLlamado],@nestado=[gra_nestado],@ctelefono=[gra_ctelefono]
	FROM inserted
	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_INS_pGAHistory] | Insert Into [dbo].[EventosTimeLine] '+' | @idRec : '+Cast(@iidrecepcion As Varchar(10)) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Insert Into [dbo].[EventosTimeLine]
           ([etl_iRecID]
           ,[etl_iCuenta]
           ,[etl_tFechaHora]
           ,[etl_cAccion]
           ,[etl_cObservacion]
           ,[etl_cOwner]
           ,[etl_iOperador])
     Values
           (@iidrecepcion
           ,@iidcuenta
           ,GETDATE()
           ,'Logger'
           ,'%Grabacion de audio llamado telefonico%'
           ,'%SISTEMA%'
           ,@iOperador)


	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_INS_pGAHistory] | Execute [dbo].[SGSP_p_grabacion_audioINS] '+' | @idRec : '+Cast(@iidrecepcion As Varchar(10)) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
 
	Execute [dbo].[SGSP_p_grabacion_audioINS]
		@iidcuenta=@iidcuenta,
		@iidrecepcion=@iidrecepcion,
		@dfechahora=@dfechahora,
		@carchivo=@carchivo,
		@nduracion=@nduracion,
		@ioperador=@ioperador,
		@cTerminal=@cTerminal,
		@iidLlamado=@iidLlamado,
		@nestado=@nestado,
		@ctelefono=@ctelefono,
		@iValor = @iValor OUTPUT
	
	Set NoExec Off	
END