--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.360 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[GpsUpdAddress](@Id int, @Address NVARCHAR(300))
as
begin 
	set nocount on
	update _datos..p_PosicionesGPS set gps_cDireccion = @Address
	where gps_iid = @Id
end