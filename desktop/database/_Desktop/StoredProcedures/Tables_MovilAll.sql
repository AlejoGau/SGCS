--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.390 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.490 
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[Tables_MovilAll]
(
@mov_ccodigo CHAR(3) = null,@mov_cdescripcion CHAR(30) = null,@mov_mobservaciones NTEXT = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Tablas.dbo.t_moviles
	where 1=0 
	 or (@mov_ccodigo is null or mov_ccodigo like  '%' + @mov_ccodigo + '%') or (@mov_cdescripcion is null or mov_cdescripcion like  '%' + @mov_cdescripcion + '%') or (@mov_mobservaciones is null or mov_mobservaciones like  '%' + cast(@mov_mobservaciones as NVARCHAR(256)) + '%')