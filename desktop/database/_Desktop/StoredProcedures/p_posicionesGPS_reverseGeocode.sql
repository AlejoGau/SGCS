CREATE OR ALTER PROCEDURE [dbo].[p_posicionesGPS_reverseGeocode]
	@Top Int = 10, 
	@aaaamm Char(6)  = ''
AS
BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max)=''

	If @aaaamm = '' 
		Set @aaaamm = Convert(Char(6), Getdate(), 112)

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [p_posicionesGPS_reverseGeocode] | Top : ' + Cast(@top As Varchar(10)) + ' | AAAAMM : ' + @aaaamm	
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @PosicionesHistory Table ([idKey] [int],[rLatitud] [real],[rLongitud] [real] )

	Insert @PosicionesHistory ( [idKey],[rLatitud],[rLongitud] )
			Execute _History.dbo.PosicionesByMes @Top, @aaaamm

	Declare @rLatitud Real,
			@rLongitud Real
	Declare @idKey Int
	Declare @SQL VarChar(max) = ''

	DECLARE posCursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY 
	FOR
		Select * From @PosicionesHistory
	OPEN posCursor

	FETCH NEXT FROM posCursor
	INTO @idKey,@rLatitud,@rLongitud

	WHILE @@FETCH_STATUS = 0
	BEGIN
		--Buscar cual es el proveedor de Geocoding
		Declare @iParametro Int = IsNull(( Select [par_ivalor] From [_Tablas].[dbo].[t_parametros] With (NOLOCK) Where [par_cCodigo]='GEOCODINGPROVIDER' ),1)
		
		Declare @Address varchar(300) = ''
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [p_posicionesGPS_reverseGeocode] | Exec [spGeocode] | GeocodingProvider : ' + Cast(@iParametro As Char(1)) + ' | Lat : ' + CONVERT(Varchar,@rLatitud,128) + ' | Lng : '+CONVERT(Varchar,@rLongitud,128)
		 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If @iParametro = 1	--Google
		Begin
			Exec _Desktop.dbo.spGeocodeGoogle @GPSLatitude=@rLatitud, @GPSLongitude=@rLongitud, @ResulType=1, @Address=@Address Output

			If @Address = 'ZERO_RESULTS'
			Begin
				Set @Address=''
				Exec _Desktop.dbo.spGeocodeGoogle @GPSLatitude=@rLatitud, @GPSLongitude=@rLongitud, @ResulType=0, @Address=@Address Output
			End
		End
		Else If @iParametro = 2	--Geoapify
		Begin
			Exec _Desktop.dbo.spGeocodeGeoapify @GPSLatitude=@rLatitud, @GPSLongitude=@rLongitud, @Address=@Address Output
		End
		Else If @iParametro = 3	--Here
		Begin
			Exec _Desktop.dbo.spGeocodeHere @GPSLatitude=@rLatitud, @GPSLongitude=@rLongitud, @Address=@Address Output
		End

		If @Address is null or @Address=''
			Set @Address = '*'

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [p_posicionesGPS_reverseGeocode] | Update [p_Posiciones'+@aaaamm+'] Address : ' + @Address
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @Address = Replace(@Address,Char(39),'´')
		Set @SQL = 'Update [_History].[dbo].[p_Posiciones'+@aaaamm+'] 
					Set [pos_cDireccion] = ''' +Rtrim(@Address) + ''''
		Set @SQL += ' Where pos_idKey='+Cast(@idKey As VarChar(10))

		--Print (@SQL)
		Execute (@SQL)

		FETCH NEXT FROM posCursor
		INTO @idKey,@rLatitud,@rLongitud
	END

	CLOSE posCursor
	DEALLOCATE posCursor

END