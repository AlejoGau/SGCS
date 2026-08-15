--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.853 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.820 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ8](@IdEvento NVARCHAR(128))
as 
begin
set nocount on
--Para saber los reportes a autoridad
--Lo llamamos Q8
SELECT [aut_cnombre], [rep_mcomentario], [rep_nestado], [rep_dresolfechahora], [rep_dEnvioFechaHora]
 FROM [_Datos].[dbo].[p_reporte_autoridades]
Inner Join  [_Tablas].[dbo].[t_autoridades] On  [aut_ccodigo]= [rep_cautoridad]
Where  [rep_iidrecepcion]=@IdEvento
end