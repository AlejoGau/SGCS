-- =============================================
-- Author:		Pablo Canonico
-- Create date: 04/03/2026
-- Description:	Genera las categorias impositivas para un pais en base a la tabla [t_categorias_impositivas_fc_Base]
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createCategoriasImpositivasfromBase]
	@pais char(2) = 'AR',
	@idorganizacion int
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO [_Tablas].[dbo].[t_categorias_impositivas_fc]
			   ([cat_ccodigo]
			   ,[cat_cdescripcion]
			   ,[cat_cimpuesto1]
			   ,[cat_nTipoResp]
			   ,[cat_orgicodigoid]
			   ,[cat_cbtidkey])
		 Select Distinct
			   cat_ccodigo,
			   cat_cdescripcion,
			   cat_cimpuesto1,
			   cat_nTipoResp,
			   @idorganizacion,
			   cat_cbtidkey
		From [_Tablas].[dbo].[t_categorias_impositivas_fc_Base]
		where [cat_cPais] = @pais
		and [cat_ccodigo] not in (select [cat_ccodigo] from [_Tablas].[dbo].[t_categorias_impositivas_fc] where [cat_orgicodigoid] = @idorganizacion)

END