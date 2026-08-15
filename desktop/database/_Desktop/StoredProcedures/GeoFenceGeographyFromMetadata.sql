-- =============================================
-- Author:		Rodrigo Román
-- Create date: 16/10/2019
-- Description:	Calcula el valor geografy basado en una metadata
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[GeoFenceGeographyFromMetadata]
(
	-- Add the parameters for the function here
	@metadata nvarchar(max),
	@geography geography OUTPUT
)
AS
BEGIN
	-- Declare the return variable here
	declare @path nvarchar(max)
	declare @type varchar(50)
	declare @path2 nvarchar(max)
	declare @first nvarchar(500)
	declare @metadataTable TABLE (
		[NAME] varchar(500),
		StringValue varchar(max)
	)

	select @geography = null

	-- elimino campos vacios

	
	select @metadata = REPLACE(@metadata,',"Radius":""','')
	select @metadata = REPLACE(@metadata,',"Ref":""','')
	
	if patindex('%CenterLat":-%',@metadata)>0
	begin
		select @metadata = REPLACE(@metadata,'CenterLat":-','CenterLat":"-')
		select @metadata = REPLACE(@metadata,',"CenterLng','","CenterLng')
	end

	declare @sindex int
	select @sindex = patindex('%"CenterLat":[0-9]%',@metadata)
	if @sindex>0
	begin
	print 'encontre centerlat'
		select @metadata = STUFF(@metadata,@sindex,12,'"CenterLat":"')
		select @metadata = REPLACE(@metadata,',"CenterLng','","CenterLng')
	end
	select @sindex = patindex('%"CenterLng":[0-9]%',@metadata)
	if @sindex>0
	begin
	print 'encontre CenterLng'
		select @metadata = STUFF(@metadata,@sindex,12,'CenterLng":"')
		select @metadata = REPLACE(@metadata,',"CenterLng','","CenterLng')
	end
	if patindex('%CenterLng":-%',@metadata)>0
	begin
		select @metadata = REPLACE(@metadata,'CenterLng":-','CenterLng":"-')
		--select @metadata = REPLACE(@metadata,',"Ref','","Ref')
		select @metadata = REPLACE(@metadata,',"Radius','","Radius')
		select @metadata = REPLACE(@metadata,'"circle""','"circle"')
		
	end

	select @sindex = patindex('%"Radius":[0-9]%',@metadata)
	if @sindex>0
	begin
	print 'encontre Radius'
		select @metadata = STUFF(@metadata,@sindex,9,'"Radius":"')
		select @sindex = patindex('%[0-9],%', @metadata)
		select @metadata = STUFF(@metadata,@sindex,1,'"')
		select @metadata = STUFF(@metadata, LEN(@metadata), 1, '"}')
	end


	print @metadata
	insert into @metadataTable select [NAME], StringValue from _desktop..parseJSON(@metadata)
	select @type = StringValue from @metadataTable where [NAME] = 'Type'
	print 'type: '+@type

	if @type = 'polygon'
	BEGIN
		select @path= StringValue from @metadataTable where [NAME] = 'Path'
		select @path = replace(@path,'{"lat":','')
		select @path = replace(@path,',"lng":',' ')
		select @path = replace(@path,'},',',')
		select @path = replace(@path,'}','')
		select @path = replace(@path,'[','')
		select @path = replace(@path,']','')

		SELECT @path = STUFF((
			SELECT ',' + substring(strval,patindex('% %',strval), LEN(strval))+' '+substring(strval,0,patindex('% %',strval))
			FROM _desktop..parsearray(@path,',')
			FOR XML PATH('')
		), 1, 1, '')

		select top 1  @first = strval  from _desktop..parsearray(@path,',')
		select @path ='POLYGON(('+ @path+','+@first+'))'
		
		print 'GeoFenceGeographyFromMetadata @path'
		print @path

		select @geography = geography::STGeomFromText(@path, 4326) 
		
		if @geography.EnvelopeAngle() > 90
		BEGIN
			select @geography = @geography.ReorientObject()
		END
	END
	if @type = 'polyline'
	BEGIN
		select @path= StringValue from @metadataTable where [NAME] = 'Path'
		select @path = replace(@path,'{"lat":','')
		select @path = replace(@path,',"lng":',' ')
		select @path = replace(@path,'},',',')
		select @path = replace(@path,'}','')
		select @path = replace(@path,'[','')
		select @path = replace(@path,']','')

		print 'GeoFenceGeographyFromMetadata @path previo'
		print @path

		SELECT @path = STUFF((
			SELECT ',' + substring(strval,patindex('% %',strval), LEN(strval))+' '+substring(strval,0,patindex('% %',strval))
			FROM _desktop..parsearray(@path,',')
			FOR XML PATH('')
		), 1, 1, '')

		select @path ='LINESTRING('+ @path+')'
		print 'GeoFenceGeographyFromMetadata @path'
		print @path

		select @geography = geography::STGeomFromText(@path, 4326) 
		Print 'Polyline: YA SE ASIGNO DESDE EL PATH: '+@path

	END
	if @type = 'circle'
	BEGIN
		print 'GeoFenceGeographyFromMetadata es un circulo'
		declare @lat float
		declare @lng float
		declare @distance float
		declare @start int
		declare @end int

		select @lat = convert(float,StringValue) from @metadataTable where name = 'CenterLat'
		select @lng = convert(float,StringValue) from @metadataTable where name = 'CenterLng'
		select @distance = convert(float,StringValue) from @metadataTable where name = 'Radius'
		print 'GeoFenceGeographyFromMetadata circle lat'
		print @lat
		print 'GeoFenceGeographyFromMetadata circle lng'
		print @lng
		print 'GeoFenceGeographyFromMetadata circle @distance'
		print @distance

		select @geography = geography::Point(@lat,@lng, 4326) 
		select @geography = @geography.STBuffer(@distance)
	END
END