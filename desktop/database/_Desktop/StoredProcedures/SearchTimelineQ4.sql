--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.343 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.410 
--#############################################################################





CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ4](@IdEvento NVARCHAR(128), @page int = 0, @start int = 0, @limit int = 20)
as 
begin
set nocount on
--Para saber si se guardaron imagenes
--Lo llamamos Q4
SELECT [gri_carchivo], gri_dfechahora, gri_ioperador,CONVERT(VARCHAR, gri_dfechahora, 126) AS gri_isofechahora, gri_ccarpeta
 FROM [_Datos].[dbo].[p_grabacion_img]
Where  [gri_iidrecepcion]=@IdEvento
end