-- =============================================
-- Author:		Rodrigo Román
-- Create date: 29/4/2019
-- Description:	Genera los comprobantes para un pais en base a la tabla [t_comprobantes_fc_Base]
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createComprobantesfromBase]
	@pais char(2) = 'AR',
	@idorganizacion int
AS
BEGIN
	print '[mg_createComprobantesfromBase]'
	SET NOCOUNT ON;

	INSERT INTO [_Tablas].[dbo].[t_comprobantes_fc]
		([cbt_ccodigo]
		,[cbt_cdescripcion]
		,[cbt_cdescripcionreducida]
		,[cbt_ntipo]
		,[cbt_cletra]
		,[cbt_cprefijo]
		,[cbt_inumero]
		,[cbt_ncopias]
		,[cbt_casociado]
		,[cbt_nCbteCAE]
		,[cbt_idOrganizacionFacturadora])
    select 
		[cbt_ccodigo]
        ,[cbt_cdescripcion]
		,''
        ,[cbt_ntipo]
		,[cbt_cletra]
		,[cbt_cprefijo]	
        ,0
        ,0
        ,''
        ,[cbt_nCbteCAE]
        ,@idorganizacion
		from _tablas..t_comprobantes_fc_Base 
		where [cbt_cpais] = @pais
		and [cbt_ccodigo] not in (select [cbt_ccodigo] from _tablas..[t_comprobantes_fc] where cbt_idOrganizacionFacturadora = @idorganizacion)

		select * from [_Tablas].[dbo].[t_comprobantes_fc] where [cbt_idOrganizacionFacturadora]=@idorganizacion

END