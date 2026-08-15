--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.283 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.267 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ3](@IdEvento NVARCHAR(128))
as 
begin
set nocount on
--Para saber si se guardo audio de llamado telefonico
--Lo llamamos Q3
SELECT [gra_carchivo] FROM [_Datos].[dbo].[p_grabacion_audio]
Where  [gra_iidrecepcion]=@IdEvento
end