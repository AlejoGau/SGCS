-- =============================================
-- Author:		Rodrigo Román	
-- Create date: 7/2/2918
-- Description:	Contabiliza los comprobantes qeu aun no fueron contabilizados
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_ContabilizaComprobantesPendientes]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE db_cursor CURSOR FOR  
	SELECT cbc_icodigo_id FROM _datos..m_comprobantes_cab_fc 
	where cbc_icodigo_id not in (select [mgm_idcomprobante] from _datos..[MG_MovimientosCuentas] inner join _datos..mg_maestrocuentas on mgmc_idkey = mgm_idcuenta where mgmc_ctipo = 'C') -- facturas, NC
	 or cbc_icodigo_id not in (select [mgm_idcomprobante] from _datos..[MG_MovimientosCuentas] inner join _datos..mg_maestrocuentas on mgmc_idkey = mgm_idcuenta where mgmc_ctipo = 'CASH') -- recibos

	declare @cbc_icodigo_id int = 0
	OPEN db_cursor   
	FETCH NEXT FROM db_cursor INTO @cbc_icodigo_id   

	WHILE @@FETCH_STATUS = 0   
	BEGIN 
		exec _desktop..mg_contabilizarcomprobante @cbc_icodigo_id
		FETCH NEXT FROM db_cursor INTO @cbc_icodigo_id   
	END   

	CLOSE db_cursor   
	DEALLOCATE db_cursor
END