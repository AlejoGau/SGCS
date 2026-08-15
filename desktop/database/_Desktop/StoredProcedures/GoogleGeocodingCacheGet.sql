CREATE OR ALTER PROCEDURE [dbo].[GoogleGeocodingCacheGet](@Lat varchar(128), @Lng varchar(128))
as
begin
set nocount on;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
if (ISNUMERIC(@Lat)=1 and ISNUMERIC(@Lng)=1 and (@lat != '0' and @lng!='0'))
begin
	select top 1 DataXML from _datos..GoogleGeocodingCache where 
	CONVERT(decimal(17,3), Lat) = CONVERT(decimal(17,3), @Lat) 
	and CONVERT(decimal(17,3), Lng) = CONVERT(decimal(17,3), @Lng)
END
end