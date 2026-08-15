CREATE OR ALTER PROCEDURE [dbo].[Tables_ProductoAll]
(
@pro_ccodigo CHAR(3) = null,@pro_cdescripcion CHAR(50) = null,@pro_nstockminimo NUMERIC(6) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Tablas.dbo.t_productos
	where 1=0 
	 or (@pro_ccodigo is null or pro_ccodigo like  '%' + @pro_ccodigo + '%') or (@pro_cdescripcion is null or pro_cdescripcion like  '%' + @pro_cdescripcion + '%')