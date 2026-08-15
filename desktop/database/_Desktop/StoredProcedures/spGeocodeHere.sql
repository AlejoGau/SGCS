CREATE OR ALTER PROCEDURE [dbo].[spGeocodeHere]
@GPSLatitude real,
@GPSLongitude real,
@Address varchar(300)= '' OUTPUT 
AS

DECLARE @tempTable Table ( resultJson VarChar(Max) )

SET NOCOUNT ON
Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

DECLARE @KEY varchar(MAX) = (SELECT [par_cValor] FROM [_Tablas].[dbo].[t_parametros] Where [par_ccodigo] = 'KEYHERE')
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [spGeocodeHere] | Key : ' + @KEY
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

--DECLARE @URL varchar(MAX) = 'https://revgeocode.search.hereapi.com/v1/revgeocode?at=' + CAST(@GPSLatitude AS varchar(20))+','+CAST(@GPSLongitude AS varchar(20))+'&lang=es-AR&apiKey='+Rtrim(@KEY)
--2023-03-08 : Pablo. Cambie a Convert x que Cast pierde decimales
DECLARE @URL varchar(MAX) = 'https://revgeocode.search.hereapi.com/v1/revgeocode?at=' + Rtrim(CONVERT(Varchar,@GPSLatitude,128)) + ',' + Rtrim(CONVERT(Varchar,@GPSLongitude,128)) + '&lang=es-AR&apiKey='+Rtrim(@KEY)


SET @URL = REPLACE(@URL, ' ', '+')
Set @Address = ''

Set @message = 'Start DateTime : %s | [spGeocodeHere] | URL : ' + @URL
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

DECLARE @Response VARCHAR(MAX) = ''
DECLARE @Obj int
DECLARE @Result int
DECLARE @HTTPStatus int
DECLARE @ErrorMsg varchar(MAX) = ''


--1ero busco en el cache
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [spGeocodeHere] | Busco en el cache'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select Top 1 @Address=[Address] From _Datos.dbo.GoogleGeocodingCache
	Where [Lat] = Rtrim(CONVERT(Varchar,@GPSLatitude,128)) 
	  And [Lng] = Rtrim(CONVERT(Varchar,@GPSLongitude,128))

If @Address Is Not Null And @Address != ''
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [spGeocodeHere] | Address Cache : ' + @Address
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	--2do si no pudo resolver sigo por la API
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [spGeocodeHere] | No encontro en Cache resuelvo por la API'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	EXEC @Result = sp_OACreate 'MSXML2.ServerXMLHttp', @Obj OUT

	BEGIN TRY
		EXEC @Result = sp_OAMethod @Obj, 'open', NULL, 'GET', @URL, false
		EXEC @Result = sp_OAMethod @Obj, 'setRequestHeader', NULL, 'Content-Type', 'application/json'
		EXEC @Result = sp_OAMethod @Obj, send, NULL, ''
		EXEC @Result = sp_OAGetProperty @Obj, 'status', @HTTPStatus OUT

		INSERT @tempTable ( resultJson )
			EXEC @Result = sp_OAGetProperty @Obj, 'responseText'

		Set @Response = (Select * from @tempTable)
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [spGeocodeHere] | Response : ' + @Response
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
		Set @message = 'Start DateTime : %s | [spGeocodeHere] | Resuelvo por la API | Error : ' + @ErrorMsg
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		RETURN
	END

	If @Response Is Null Or @Response = ''
		Set @Response = (Select * from @tempTable)

		Select @Address=JSON_VALUE(resultJson, '$.items[0].address.label')
			From  @tempTable

		--3ro si resolvio por la API lo guardo en la tabla de Cache
		If @Address Is Not Null And @Address != ''
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [spGeocodeHere] | Guardo en [GoogleGeocodingCache]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
			INSERT INTO [_Datos].[dbo].[GoogleGeocodingCache] ([Lat],[Lng],[DataXML],[Address])
				VALUES(Rtrim(CONVERT(Varchar,@GPSLatitude,128)), Rtrim(CONVERT(Varchar,@GPSLongitude,128)), @Response, @Address)
		End
End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [spGeocodeHere] | Address : ' + @Address
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT