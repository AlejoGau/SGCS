-- =============================================
-- Author:		Rodrigo Román
-- Create date: 19/06/2019
-- Description:	Agrega los montos de impuestos mg_movimientoscuentas CREDITO FISCAL
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_ContabilizarImpuestoCredito]
	@mci_cbcicodigoid int -- id del comprobante
AS
BEGIN

	SET NOCOUNT ON;
	print '[MG_ContabilizarImpuestoCredito]'
	print '@mci_cbcicodigoid'
	print @mci_cbcicodigoid

	declare @mci_total money
	declare @org_csymbol char(3)
	declare @mci_idkey int
	declare @mci_impidkey int -- tipo del impuesto
	declare @mci_mgmidkey int -- id movimiento cuenta
	declare @imp_mgmcidkeyCredito int -- id cuenta contable credito fiscal

	print '[MG_ContabilizarImpuestoCredito] Busco los impuestos del comprobante'
	DECLARE impuestos_cursor CURSOR FOR SELECT mci_idkey, mci_impidkey,mci_total, mci_mgmidkey,imp_mgmcidkeyCredito
		FROM _datos..MG_comprobante_impuesto 
		inner join _tablas..t_impuestos_fc on mci_impidkey = imp_idkey 
		where mci_cbcicodigoid=@mci_cbcicodigoid

	OPEN impuestos_cursor   
	FETCH NEXT FROM impuestos_cursor INTO @mci_idkey,@mci_impidkey, @mci_total, @mci_mgmidkey,@imp_mgmcidkeyCredito

	WHILE @@FETCH_STATUS = 0   
	BEGIN 
		print '[MG_ContabilizarImpuestoCredito] Proceso el impuesto'
		print @mci_idkey


		IF @mci_mgmidkey > 0
		BEGIN
			print '[MG_ContabilizarImpuestoCredito] Impuesto ya procesado'
		END
		ELSE
		BEGIN
			print '[MG_ContabilizarImpuestoCredito] Verifico si hay cuenta de impuestos creada'
			if @imp_mgmcidkeyCredito = 0 or @imp_mgmcidkeyCredito is null
			BEGIN
				print '[MG_ContabilizarImpuestoCredito] No hay cuenta de impuestos creo una en el plan de cuentas'
				EXECUTE _desktop..MG_GetCreateCuentaIdImpuestoCredito @mci_impidkey ,@imp_mgmcidkeyCredito OUTPUT
			END

			print '[MG_ContabilizarImpuestoCredito] @imp_mgmcidkey'
			print @imp_mgmcidkeyCredito

			print '[MG_ContabilizarImpuestoCredito] Verifico que el impuesto no este contabilizado'
			if @mci_mgmidkey = 0 or @mci_mgmidkey is null
			BEGIN
				print '[MG_ContabilizarImpuestoCredito] Busco el total de la cuenta de impuestos'
				declare @mgmc_saldo money
				select @mgmc_saldo = mgmc_saldo from _datos..MG_MaestroCuentas where mgmc_idkey = @imp_mgmcidkeyCredito

				print '[MG_ContabilizarImpuestoCredito] Contabilizo el impuesto'
				INSERT into _datos..MG_MovimientosCuentas (mgm_idcuenta,mgm_monto,mgm_saldo,mgm_idcomprobante, mgm_fecha, mgm_estado)  
					VALUES (@imp_mgmcidkeyCredito,@mci_total,@mgmc_saldo+@mci_total,@mci_cbcicodigoid, getdate(),0);
			END
		END

		FETCH NEXT FROM impuestos_cursor INTO @mci_idkey,@mci_impidkey, @mci_total, @mci_mgmidkey,@imp_mgmcidkeyCredito
	END   

	CLOSE impuestos_cursor   
	DEALLOCATE impuestos_cursor

END