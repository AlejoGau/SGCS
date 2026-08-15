CREATE OR ALTER PROCEDURE [dbo].[GoogleGeocodingCacheSet] (@Lat varchar(128), @Lng varchar(128), @Data varchar(max))
as
begin
set nocount on
delete from _datos..GoogleGeocodingCache where Lat = @Lat and Lng = @Lng
insert into _datos..GoogleGeocodingCache(Lat,Lng,Data)
values(@Lat, @Lng, @Data)
end