--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.527 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.630 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Tables_ParametrosAll]
(@par_ccodigo NVARCHAR(30) = null)
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Tablas.dbo.t_parametros
	where 1=1 and (@par_ccodigo is null or par_ccodigo like '%' + @par_ccodigo + '%')