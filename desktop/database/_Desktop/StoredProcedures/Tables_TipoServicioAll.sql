CREATE OR ALTER PROCEDURE [dbo].[Tables_TipoServicioAll]
(
@tip_ccodigo CHAR(3) = null,
@tip_cdescripcion CHAR(30) = null,
@tip_yvalor MONEY = null,
@tip_ndias NUMERIC(3) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Tablas.dbo.t_tiposervicio
	where 1=0 
	 or (@tip_ccodigo is null or tip_ccodigo like '%' + @tip_ccodigo + '%') 
	 or (@tip_cdescripcion is null or tip_cdescripcion like '%' + @tip_cdescripcion + '%')