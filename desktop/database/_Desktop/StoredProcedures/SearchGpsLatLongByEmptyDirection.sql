CREATE OR ALTER PROCEDURE [dbo].[SearchGpsLatLongByEmptyDirection](@Limit int = 50)
as
begin
set nocount on

exec  ('select top ' + @Limit +  ' gps_iid, [gps_rLatitud], [gps_rLongitud], gps_idcuenta
 from _datos..p_posicionesGps where ([gps_cDireccion] is null or [gps_cDireccion] = '''' )
 order by gps_iid desc')
 /*
 exec  ('select top ' + @Limit +  ' gps_iid, [gps_rLatitud], [gps_rLongitud], gps_idcuenta
 from _datos..p_posicionesGps where [gps_cDireccion] is null 
 and gps_iid > 356986 or gps_iid = 1115470')
 */
 
end