--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.220 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SmartPanicIdByImei](@Imei NVARCHAR(128))
as
select Id from _datos.dbo.SmartPanic where Imei = @Imei