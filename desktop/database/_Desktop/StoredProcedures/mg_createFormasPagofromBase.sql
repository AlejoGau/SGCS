-- =============================================
-- Author:		Rodrigo Román
-- Create date: 13/05/2019
-- Description:	Genera los una forma de pago por cada tipo de forma de pago de la tabla t_tipos_formapago_fc
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createFormasPagofromBase]
	@idorganizacion int
AS
BEGIN
	
	SET NOCOUNT ON;

	print '[mg_createFormasPagofromBase]'

	INSERT INTO [_Tablas].[dbo].[t_formas_pago_fc]
           ([fpg_ccodigo]
           ,[fpg_cdescripcion]
           ,[fpg_cdescripcionreducida]
           ,[fpg_npidenumero]
           ,[fpg_npidevencimiento]
           ,[fpg_npidebanco]
           ,[fpg_ctipo]
           ,[fpg_mgmcidkey]
           ,[fpg_orgidcodigoid])
     select
           tfp_ccodigo
           ,tfp_cdescripcion
           ,tfp_ccodigo
           ,0
           ,0
           ,0
           ,tfp_ccodigo
           ,0
           ,@idorganizacion
	from _tablas..t_tipos_formapago_fc
	where tfp_ccodigo not in (select [fpg_ccodigo] from _tablas..[t_formas_pago_fc] where [fpg_orgidcodigoid] = @idorganizacion)



END