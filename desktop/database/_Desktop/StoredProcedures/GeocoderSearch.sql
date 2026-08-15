CREATE OR ALTER PROCEDURE [dbo].[GeocoderSearch]
	@Lat VARCHAR(20) = '',
	@Lng VARCHAR(20) = ''
	
	AS
SELECT DataXML
FROM [_Datos].[dbo].[GoogleGeocodingCache]
WHERE Lat=@Lat AND Lng=@Lng