CREATE OR ALTER TRIGGER [dbo].[TG_UPD_pGAHistory] ON [dbo].[p_grabacion_audio] AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Declare @iCant Int=0 
	Select @iCant = Count(*) From inserted

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_UPD_pGAHistory] | Cantidad de Registros Actualizados | iCant ('+Cast(@iCant As Varchar(10))+')' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @iCant = 0
		Begin
			Set @message = 'Start DateTime : %s | [TG_UPD_pGAHistory] | No graba!!!' 
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

        
	Declare @cCierre Char(6) = CONVERT(CHAR(6), @dfechahora, 112)
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_UPD_pGAHistory] | cCierre : '+@cCierre
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF OBJECT_ID(N'[_History].[dbo].[p_grabacion_audio' + @cCierre + ']', 'U') IS NOT NULL
	BEGIN
		Declare @cSQL nVarchar(MAX)
		Set @cSQL = 'MERGE INTO [_History].[dbo].[p_grabacion_audio' +  @cCierre  + '] AS TGT '
		Set @cSQL += Char(10)
		Set @cSQL += 'USING (Select @iidcuenta As  _iidcuenta,@iidrecepcion As _recid,@dfechahora As _dfechahora,@carchivo As _carchivo,@nduracion As _nduracion,@ioperador As _ioperador,@cTerminal As _cTerminal,@iidLlamado As _iidLlamado,@nestado As _nestado,@ctelefono As _ctelefono) AS SRC'
		Set @cSQL += Char(10)
		Set @cSQL += 'ON TGT.[gra_iidrecepcion] = SRC.[_recid] And TGT.[gra_dfechahora] = SRC.[_dfechahora]'
		Set @cSQL += Char(10)
		Set @cSQL += '
			WHEN MATCHED THEN
			UPDATE SET
				TGT.[gra_iidcuenta] = SRC.[_iidcuenta],
				TGT.[gra_carchivo] = SRC.[_carchivo],
				TGT.[gra_nduracion] = SRC.[_nduracion],
				TGT.[gra_ioperador] = SRC.[_ioperador],
				TGT.[gra_cTerminal] = SRC.[_cTerminal],
				TGT.[gra_iidLlamado] = SRC.[_iidLlamado],
				TGT.[gra_nestado] = SRC.[_nestado],
				TGT.[gra_ctelefono] = SRC.[_ctelefono];'
		/*
		Set @cSQL += '
		WHEN NOT MATCHED THEN
			INSERT ([gra_iidcuenta],[gra_iidrecepcion],[gra_dfechahora],[gra_carchivo],[gra_nduracion],[gra_ioperador],[gra_cTerminal],[gra_iidLlamado],[gra_nestado],[gra_ctelefono])
			VALUES (SRC.[_iidcuenta],SRC.[_recid],SRC.[_dfechahora],SRC.[_carchivo],SRC.[_nduracion],SRC.[_ioperador],SRC.[_cTerminal],SRC.[_iidLlamado],SRC.[_nestado],SRC.[_ctelefono]);'
		*/

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_UPD_pGAHistory] | cSQL : ' + @cSQL
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @DynamicSqlParams NVarchar(MAX)
		Set @DynamicSqlParams = '@iidcuenta [int],@iidrecepcion [int],@dfechahora [datetime],@carchivo [varchar](100),@nduracion [numeric](10, 2),@ioperador [int],@cTerminal [char](3),@iidLlamado [int],@nestado [numeric] (1, 0),@ctelefono [varchar] (30)'

		Set @message = 'Start DateTime : %s | [TG_UPD_pGAHistory] | DynamicSqlParams : ' + @DynamicSqlParams
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Execute sp_executesql @cSQL, @DynamicSqlParams, @iidcuenta=@iidcuenta, @iidrecepcion=@iidrecepcion, @dfechahora=@dfechahora, @carchivo=@carchivo, @nduracion=@nduracion,	@ioperador=@ioperador, @cTerminal=@cTerminal, @iidLlamado=@iidLlamado, @nestado=@nestado, @ctelefono=@ctelefono
	END
	ELSE
	BEGIN
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [TG_UPD_pGAHistory] | NO existe : [_History].[dbo].[p_grabacion_audio' + @cCierre + ']'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	END							
	Set NoExec Off
END