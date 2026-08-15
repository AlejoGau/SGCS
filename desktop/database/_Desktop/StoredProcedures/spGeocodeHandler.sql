CREATE OR ALTER PROCEDURE [dbo].[spGeocodeHandler]
	@GPSLatitude real,
	@GPSLongitude real,
	@Address varchar(300)= '' OUTPUT 
AS
BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max)=''

	--Buscar cual es el proveedor de Geocoding
	Declare @iParametro Int = IsNull(( Select [par_ivalor] From [_Tablas].[dbo].[t_parametros] With (NOLOCK) Where [par_cCodigo]='GEOCODINGPROVIDER' ),1)
		
	Set @Address = ''
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [spGeocodeHandler] | Exec [spGeocode] | GeocodingProvider : ' + Cast(@iParametro As Char(1)) + ' | Lat : ' + CONVERT(Varchar,@GPSLatitude,128) + ' | Lng : '+CONVERT(Varchar,@GPSLongitude,128)
		 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @iParametro = 1	--Google
	Begin
		Exec _Desktop.dbo.spGeocodeGoogle @GPSLatitude=@GPSLatitude, @GPSLongitude=@GPSLongitude, @ResulType=1, @Address=@Address Output

		If @Address = 'ZERO_RESULTS'
		Begin
			Set @Address=''
			Exec _Desktop.dbo.spGeocodeGoogle @GPSLatitude=@GPSLatitude, @GPSLongitude=@GPSLongitude, @ResulType=0, @Address=@Address Output
		End
	End
	Else If @iParametro = 2	--Geoapify
	Begin
		Exec _Desktop.dbo.spGeocodeGeoapify @GPSLatitude=@GPSLatitude, @GPSLongitude=@GPSLongitude, @Address=@Address Output
	End
	Else If @iParametro = 3	--Here
	Begin
		Exec _Desktop.dbo.spGeocodeHere @GPSLatitude=@GPSLatitude, @GPSLongitude=@GPSLongitude, @Address=@Address Output
	End
END