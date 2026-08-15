CREATE OR ALTER PROCEDURE [dbo].[spGeocodeGoogle]
@GPSLatitude real,
@GPSLongitude real,
@ResulType int = 0,
@Address varchar(300)= '' OUTPUT 
AS

DECLARE @tempTable Table ( yourXML VarChar(Max) )

DECLARE
	@Country varchar(80),
	@Province varchar(80),
	@Region varchar(80),
	@City varchar(40),
	@PostalCode varchar(20),
	@MapURL varchar(1024);

SET NOCOUNT ON
Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

DECLARE @KEY varchar(MAX) = (SELECT [par_cValor] FROM [_Tablas].[dbo].[t_parametros] Where [par_ccodigo] = 'KEYGOOGLEMAPS')
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | Key : ' + @KEY
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

--DECLARE @URL varchar(MAX) = 'https://maps.google.com/maps/api/geocode/xml?latlng=' + CAST(@GPSLatitude AS varchar(20))+','+CAST(@GPSLongitude AS varchar(20))+'&key='+Rtrim(@KEY)
--2023-03-08 : Pablo. Cambie a Convert x que Cast pierde decimales
DECLARE @URL varchar(MAX) = 'https://maps.google.com/maps/api/geocode/xml?latlng=' + Rtrim(CONVERT(Varchar,@GPSLatitude,128))+','+Rtrim(CONVERT(Varchar,@GPSLongitude,128))+'&key='+Rtrim(@KEY)
If @ResulType = 1
	Set @URL += '&result_type=street_address'

SET @URL = REPLACE(@URL, ' ', '+')
Set @Address = ''

Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | URL : ' + @URL
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

DECLARE @Response VARCHAR(MAX) = ''
--DECLARE @XML xml
DECLARE @Obj int
DECLARE @Result int
DECLARE @HTTPStatus int
DECLARE @ErrorMsg varchar(MAX) = ''

--1ero busco en el cache
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | Busco en el cache'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select Top 1 @Address=[Address] From _Datos.dbo.GoogleGeocodingCache
	Where [Lat] = Rtrim(CONVERT(Varchar,@GPSLatitude,128)) 
	  And [Lng] = Rtrim(CONVERT(Varchar,@GPSLongitude,128))

If @Address Is Not Null And @Address != ''
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | Address Cache : ' + @Address
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	--2do si no pudo resolver sigo por la API
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | No encontro en Cache resuelvo por la API'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	EXEC @Result = sp_OACreate 'MSXML2.ServerXMLHttp', @Obj OUT

	BEGIN TRY
		EXEC @Result = sp_OAMethod @Obj, 'open', NULL, 'GET', @URL, false
		EXEC @Result = sp_OAMethod @Obj, 'setRequestHeader', NULL, 'Content-Type', 'application/x-www-form-urlencoded'
		EXEC @Result = sp_OAMethod @Obj, send, NULL, ''
		EXEC @Result = sp_OAGetProperty @Obj, 'status', @HTTPStatus OUT

		INSERT @tempTable ( yourXML )
			EXEC @Result = sp_OAGetProperty @Obj, 'responseXML.xml'--, @Response OUT

		Set @Response = (Select * from @tempTable)
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | Response : ' + @Response
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	END TRY
	BEGIN CATCH
		SET @ErrorMsg = ERROR_MESSAGE()
	END CATCH

	EXEC @Result = sp_OADestroy @Obj

	IF (@ErrorMsg IS NOT NULL And @ErrorMsg!='' ) OR (@HTTPStatus <> 200) 
	BEGIN
		If @HTTPStatus <> 200
			SET @ErrorMsg = 'HTTP result is : ' + CAST(@HTTPStatus AS varchar(10))
		Else
			SET @ErrorMsg = ISNULL(@ErrorMsg, 'ErrorMsg is Null')
		
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | Resuelvo por la API | Error : ' + @ErrorMsg
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		RETURN
	END

	If @Response Is Null Or @Response = ''
		Set @Response = (Select * from @tempTable)

	If @Response Like '%ZERO_RESULTS%'
		Set	@Address = 'ZERO_RESULTS'
	Else
	Begin
		-- Primero valida el status de la API
		Declare @APIStatus varchar(50) = ''
		Select @APIStatus=SUBSTRING(yourXML,
						 CHARINDEX('<status>',yourXML)+LEN('<status>'),
						 CHARINDEX('</status>',yourXML)-CHARINDEX('<status>',yourXML)-LEN('</status>') +1)
		From @tempTable

		If @APIStatus != 'OK'
		Begin
			-- Si el status no es OK, extrae el error
			If @APIStatus = 'REQUEST_DENIED'
			Begin
				Select @ErrorMsg=SUBSTRING(yourXML,
							 CHARINDEX('<error_message>',yourXML)+LEN('<error_message>'),
							 CHARINDEX('</error_message>',yourXML)-CHARINDEX('<error_message>',yourXML)-LEN('</error_message>') +1)
				From @tempTable
				Set @Address = 'API ERROR: REQUEST_DENIED - ' + @ErrorMsg
			End
			Else
				Set @Address = 'API ERROR: ' + @APIStatus
		
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | API Error : ' + @Address
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
		Begin
			-- Solo si status es OK, extrae el formatted_address
			Select @Address=SUBSTRING(yourXML,
							 CHARINDEX('<formatted_address>',yourXML)+LEN('<formatted_address>'),
							 CHARINDEX('</formatted_address>',yourXML)-CHARINDEX('<formatted_address>',yourXML)-LEN('</formatted_address>') +1)
			From @tempTable

			--Guarda en cache si es exitoso
			If @Address Is Not Null And @Address != ''
			Begin
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | Guardo en [GoogleGeocodingCache]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
				INSERT INTO [_Datos].[dbo].[GoogleGeocodingCache] ([Lat],[Lng],[DataXML],[Address])
					VALUES(Rtrim(CONVERT(Varchar,@GPSLatitude,128)), Rtrim(CONVERT(Varchar,@GPSLongitude,128)), @Response, @Address)
			End
		End
	End	
End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [spGeocodeGoogle] | Address : ' + @Address
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT