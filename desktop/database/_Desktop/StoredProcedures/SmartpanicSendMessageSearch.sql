CREATE OR ALTER PROCEDURE [dbo].[SmartpanicSendMessageSearch]
	@ids varchar(max) = '',
	@filter varchar(max) = '',
	@subject varchar(max) = '',
	@body varchar(max) = '',
	@token VARCHAR(128) = '',
	@fromId varchar(max) = '',
	@soundpath varchar(max)=''
AS
BEGIN
	DECLARE @Id INT = 0;
	DECLARE @Sql VARCHAR(MAX) = ''
	DECLARE @SqlFilter AS VARCHAR(4096)
	declare @UserId INT = 0      
	Declare @EventoID INT = 0,
			@CuentaID INT = 0
	Declare @Imei varchar(128) = ''

	Declare @Text nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @Text = 'Start DateTime : %s | [SmartpanicSendMessageSearch] @ids=>'+@ids
	RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

	IF @ids != ''
		BEGIN
			SET @SqlFilter = ' AND Id IN ('+@ids+')'
		END
	ELSE IF @filter != ''
		BEGIN
			SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartPanic')
		END
	ELSE
		BEGIN
			SELECT 'ERROR NO HAY ID NI FILTERS';
		END

	--2026-01-29 Pablo : el evento estoy aqui tiene que generar message
	--Body de Estoy Aqui
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @Text = 'Start DateTime : %s | [SmartpanicSendMessageSearch] @body=>'+@body
	RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

	IF @body LIKE 'EVENT_IM_HERE|%'
	BEGIN
		Set @CuentaID = Cast(SUBSTRING(@body, CHARINDEX('|', @body) + 1, LEN(@body)) As INT)
		Set @Text = 'Start DateTime : %s | [SmartpanicSendMessageSearch] @CuentaID=>'+Cast(@CuentaID As Varchar(10))
		RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
		SET @body = LEFT(@body, CHARINDEX('|', @body) - 1)

		If @CuentaID>0
			Select Top 1 @EventoID=IsNull([rec_iid],0) From [_Datos].[dbo].[p_recepcion] Where [rec_iidcuenta] = @CuentaID And [rec_calarma]='SEA' Order By [rec_tfechahora] Desc	--SmartPanics: Estoy Aquí

		Set @Text = 'Start DateTime : %s | [SmartpanicSendMessageSearch] @EventoID=>'+Cast(@EventoID As Varchar(10))
		RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
			
	END
	--RANGOS 
	DECLARE @SqlFilterRango AS NVARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
	SET @SqlFilter = @SqlFilter + @SqlFilterRango
		
	DECLARE @CustomData as VARCHAR(MAX)
	
	--2024-10-09 Pablo : Hernan pidio que en el body del push salga el titulo del mensaje
	--SET @CustomData = '{"cod_cdescripcion":"","rec_iid":"","notification_sound":"'+@soundpath+'"}'
	SET @CustomData = '{"cod_cdescripcion":"'+Rtrim(@subject)+'","rec_iid":"","notification_sound":"'+@soundpath+'"}'

	SET @Sql = 'INSERT INTO _datos..[Message] ( 
			Name,
			Body,
			DateCreated,
			FromTypeId,
			FromId,
			ToTypeId,
			ToId,
			Status,
			EventoID,
			CuentaID,
			Customdata
		) 
		SELECT 
			'''+@subject+''',
			'''+replace(@body,'''','''''')+''',
			getdate(),
			0,
			'+@fromId+',
			3067,
			Id,
			0,
			'+CAST(@EventoID AS VARCHAR(10))+',
			'+CAST(@CuentaID AS VARCHAR(10))+',
			'''+@CustomData+'''
		FROM [_datos].dbo.[SmartPanic] o
		LEFT JOIN _datos..m_cuentas c ON (o.CuentaId = c.cue_iid)
		LEFT JOIN _datos..p_GpsSP g ON (o.imei = g.gps_cImei)
		WHERE 1=1 '+@SqlFilter

	SET QUOTED_IDENTIFIER OFF;
	/*
	Print '----'
	Print @Sql
	*/
	Execute (@Sql)
	SET QUOTED_IDENTIFIER ON;

END