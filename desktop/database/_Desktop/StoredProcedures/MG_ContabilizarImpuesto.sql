-- =============================================
-- Author:		Rodrigo Román
-- Create date: 22/04/2019
-- Description:	Agrega los montos de impuestos mg_movimientoscuentas
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_ContabilizarImpuesto]
	@mci_cbcicodigoid int -- id del comprobante
AS
BEGIN

	SET NOCOUNT ON;
	print '[MG_ContabilizarImpuesto]'
	print '@mci_cbcicodigoid'
	print @mci_cbcicodigoid

	declare @mci_total money
	declare @org_csymbol char(3)
	declare @mci_idkey int
	declare @mci_impidkey int -- tipo del impuesto
	declare @mci_mgmidkey int -- id movimiento cuenta
	declare @imp_mgmcidkey int -- id cuenta contable

	print '[MG_ContabilizarImpuesto] Busco los impuestos del comprobante'
	DECLARE impuestos_cursor CURSOR FOR SELECT mci_idkey, mci_impidkey,mci_total, imp_mgmcidkey, mci_mgmidkey 
		FROM _datos..MG_comprobante_impuesto 
		inner join _tablas..t_impuestos_fc on mci_impidkey = imp_idkey 
		where mci_cbcicodigoid=@mci_cbcicodigoid 

	OPEN impuestos_cursor   
	FETCH NEXT FROM impuestos_cursor INTO @mci_idkey,@mci_impidkey, @mci_total, @imp_mgmcidkey, @mci_mgmidkey

	WHILE @@FETCH_STATUS = 0   
	BEGIN 
		print '[MG_ContabilizarImpuesto] Proceso el impuesto'
		print @mci_idkey

		IF @mci_mgmidkey > 0
		BEGIN
			print '[MG_ContabilizarImpuesto] Impuesto ya procesado'
		END
		ELSE
		BEGIN
			print '[MG_ContabilizarImpuesto] Verifico si hay cuenta de impuestos creada'
			if @imp_mgmcidkey = 0 or @imp_mgmcidkey is null
			BEGIN
				print 'No hay cuenta de impuestos creo una en el plan de cuentas'
				EXECUTE _desktop..[MG_GetCreateCuentaIdImpuesto] @mci_impidkey ,@imp_mgmcidkey OUTPUT
			END

			print '[MG_ContabilizarImpuesto] @imp_mgmcidkey'
			print @imp_mgmcidkey

			print '[MG_ContabilizarImpuesto] Verifico que el impuesto no este contabilizado'
			if @mci_mgmidkey = 0 or @mci_mgmidkey is null
			BEGIN
				print '[MG_ContabilizarImpuesto] Busco el total de la cuenta de impuestos'
				declare @mgmc_saldo money
				select @mgmc_saldo = mgmc_saldo from _datos..MG_MaestroCuentas where mgmc_idkey = @imp_mgmcidkey

				print '[MG_ContabilizarImpuesto] Contabilizo el impuesto'
				INSERT into _datos..MG_MovimientosCuentas (mgm_idcuenta,mgm_monto,mgm_saldo,mgm_idcomprobante, mgm_fecha, mgm_estado)  
					VALUES (@imp_mgmcidkey,@mci_total,@mgmc_saldo+@mci_total,@mci_cbcicodigoid, getdate(),0);

				print '[MG_ContabilizarImpuesto] marco el impuesto como procesado'

				update _datos..MG_comprobante_impuesto set mci_mgmidkey = @@IDENTITY where mci_idkey = @mci_idkey
			END
		END

		FETCH NEXT FROM impuestos_cursor INTO @mci_idkey,@mci_impidkey, @mci_total, @imp_mgmcidkey, @mci_mgmidkey
	END   

	CLOSE impuestos_cursor   
	DEALLOCATE impuestos_cursor

END