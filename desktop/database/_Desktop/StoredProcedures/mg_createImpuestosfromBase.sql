-- =============================================
-- Author:		Rodrigo Román
-- Create date: 13/05/2019
-- Description:	Genera los impuestos para un pais en base a la tabla [t_impuestos_fc_Base]
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createImpuestosfromBase]
	@pais char(2) = 'AR',
	@idorganizacion int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [_Tablas].[dbo].[t_impuestos_fc]
           ([imp_ccodigo]
           ,[imp_cdescripcion]
           ,[imp_nporcentaje]
           ,[imp_idorganizacion]
           ,[imp_extcode]
           ,[imp_mgmcidkey])
     select
           imp_ccodigo, 
           imp_cdescripcion, 
           imp_nporcentaje, 
           @idorganizacion,
           '',
           0
	from [_Tablas].[dbo].[t_impuestos_fc_base] 
	where [imp_cpais] = @pais
	and [imp_ccodigo] not in (select [imp_ccodigo] from _tablas..[t_impuestos_fc] where imp_idorganizacion = @idorganizacion)


END