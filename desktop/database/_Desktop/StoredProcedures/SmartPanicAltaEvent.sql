-- =============================================
-- Author:		Román Rodrigo
-- Create date: 02/04/2015
-- Description:	Genera Eventos de smartpanics _AN y _AT
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SmartPanicAltaEvent]
	@Id int
AS
BEGIN
	SET NOCOUNT ON; 
	declare @cuenta int;
	declare @urlDesktop varchar(256);
	declare @qrcodeLink varchar(1024);
	declare @activationLink varchar(1024);
	declare @code varchar(1024);
	declare @jsondata varchar(max)='{}';
	declare @spNombre varchar(256);
	declare @spTelefono varchar(128);
	declare @spMetadata varchar(max);

	declare @configMetadata varchar(max);
	declare @configIp varchar(128);
	declare @configPort varchar(64);
	declare @Imei varchar(128);
	

	 Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''
 
	 DECLARE @TraceIDStr NVARCHAR(36);
	 -- Obtener como string (porque así se guardó)
	 SET @TraceIDStr = CONVERT(NVARCHAR(36), SESSION_CONTEXT(N'TraceID'));

	 -- Si nunca se seteó, @TraceID será NULL
	 IF @TraceIDStr IS NULL
		SET @TraceIDStr = CAST(@@SPID AS NVARCHAR); 
	 /*		
	 IF @TraceIDStr IS NULL
	 BEGIN
		SET @TraceIDStr = CONVERT(NVARCHAR(36), NEWID());
		-- Opcional: guardarlo en el contexto para futuras llamadas en la misma sesión
		EXEC sp_set_session_context @key = N'TraceID', @value = @TraceIDStr;
	 END
	 */
	 Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	 Set @message = 'Start DateTime : %s | [SmartPanicAltaEvent] Inicio'
	 RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;

	select
		@cuenta=i.CuentaId
		,@Imei = i.Imei
		,@spNombre=i.Nombre
		,@spTelefono=i.Telefono
		from [_datos].dbo.[SmartPanic] i where i.Id=@id;

	select @spNombre = dbo.UrlEncode(@spNombre); -- encodeo para que no rompa el link
	-- traigo la URL de desktop
	select @urlDesktop = par_cvalor from _tablas.dbo.t_parametros where par_ccodigo = 'DESKTOPEXTERNALURL';
	--select par_cvalor from _tablas.dbo.t_parametros where par_ccodigo = 'URLDESKTOP';
	-- traigo la configuracion de smartpanics
	select @spMetadata = xmlData from [_Desktop].[dbo].[MetaData] where objectTypeId=51 and ObjectId = 30 

	--select xmlData from [_Datos].[dbo].[MetaData] where objectTypeId=51 and ObjectId = 30
	-- parseo los valores y obtengo ip y puerto de ipreader

	DECLARE @spTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	INSERT INTO @spTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM [_desktop].[dbo].[parseJson](@spMetadata) WHERE NAME IN ('Config')	
	select @configMetadata=stringValue from @spTable;

	DECLARE @configTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	INSERT INTO @configTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM [_desktop].[dbo].[parseJson](@configMetadata) WHERE NAME IN ('readerIp','readerPort')	
	select @configIp=StringValue from @configTable where NAME = 'readerIp';
	select @configPort=StringValue from @configTable where NAME = 'readerPort';

	-- saco la / final de @urlDesktop si es que viene
	if (RIGHT(@urlDesktop,1) = '/')
	BEGIN
		set @urlDesktop = SUBSTRING( @urlDesktop ,0 , LEN(@urlDesktop))
	END

	--select @code = '/'+@configIp+'/'+@configPort+'/'+@spNombre+'/'+@spTelefono;
	select @code = '/'+@urlDesktop+'/'+@spNombre+'/'+@spTelefono;
	--select @code = @configMetadata;

	select @qrcodeLink = @urlDesktop + '/handler/QrCodeHandler?title='+@spNombre+'&code='+@code;
	--select @activationLink = 'http://softdemonitoreo.com/spapps/index.html?code='+@code;
	select @activationLink = 'https://softguard.com/spapps/index.html?code='+@code;

	select @jsondata = '{"qrcodeLink":"'+@qrcodeLink+'","activationLink":"'+@activationLink+'"}';
	print @jsondata;

	 Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	 Set @message = 'Start DateTime : %s | [SmartPanicAltaEvent] @Imei:'+Isnull(@Imei,'')
	 RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	if (@Imei is not null AND @Imei != '') -- esta activo con IMEI
	BEGIN

		 Set @message = 'Start DateTime : %s | [SmartPanicAltaEvent] esta activo con IMEI. exec _Desktop.dbo.AlarmaGenerar con _AN'

		exec _Desktop.dbo.AlarmaGenerar 
			@idCta = @cuenta
			,@cAlarma = '_AN'
			,@cObservaciones = ''
			,@cRoute = null
			,@cGeofenceName = NULL
			,@iroute = null
			,@lat = null
			,@lng = null
			,@cData = @jsondata
	END
	else -- es ALTA TEMPRANA no tiene IMEI
	BEGIN
			 Set @message = 'Start DateTime : %s | [SmartPanicAltaEvent] es ALTA TEMPRANA no tiene IMEI. exec _Desktop.dbo.AlarmaGenerar con _AT'
		exec _Desktop.dbo.AlarmaGenerar 
			@idCta = @cuenta
			,@cAlarma = '_AT'
			,@cObservaciones = ''
			,@cRoute = null
			,@cGeofenceName = NULL
			,@iroute = null
			,@lat = null
			,@lng = null
			,@cData = @jsondata
	END

	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;
END