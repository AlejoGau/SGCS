CREATE OR ALTER PROCEDURE [dbo].[Tables_DepositoAll]
(
@dep_ccodigo CHAR(3) = null,@dep_cdescripcion CHAR(30) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Tablas.dbo.t_depositos
	where 1=0 
	 or (@dep_ccodigo is null or dep_ccodigo like  '%' + @dep_ccodigo + '%') or (@dep_cdescripcion is null or dep_cdescripcion like  '%' + @dep_cdescripcion + '%')