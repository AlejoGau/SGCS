-- =============================================
-- Author:		Rodrigo Román
-- Create date: 6/2/2018
-- Description:	Agrega los montos del pago a la tabla mg_cuentacontable
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_ContabilizarPago]
	@pag_iCodigo_ID int
AS
BEGIN

	SET NOCOUNT ON;
	print '[MG_ContabilizarPago]'
	print '@pag_iCodigo_ID'
	print @pag_iCodigo_ID

	declare @pag_yImporte money
	declare @org_csymbol char(3)
	declare @cbc_icodigoid int
	declare @mgmc_idkey int -- id cuenta contable

	print '[MG_ContabilizarPago] busco los datos del pago'

	SELECT @cbc_icodigoid = [pag_iCodigoCbte]
		  ,@mgmc_idkey = [pag_iCodigoCaja]
		  ,@pag_yImporte = [pag_yImporte]
	  FROM _datos..[m_pagos_fc]
	  where [pag_iCodigo_ID] = @pag_iCodigo_ID

	IF @mgmc_idkey > 0
	BEGIN
		print '[MG_ContabilizarPago] Pago ya procesado'
		set NOEXEC ON
	END

	print '[MG_ContabilizarPago] recibo, nota credito, ajuste credito, resto en la CC'
	-- me fijo si es un pago para generar el movimiento en la cuenta CASH
	-- tomo el id de la cuenta y su saldo actual
	declare @fpg_mgmcidkey int
	declare @mgmc_saldo money = 0
	declare @fpg_idkey int

	select @fpg_mgmcidkey=fpg_mgmcidkey, @mgmc_saldo = isnull(mgmc_saldo,0), @fpg_idkey= fpg_idkey from _Datos..m_pagos_fc 
		inner join _tablas..t_formas_pago_fc on fpg_ccodigo = pag_cFormaPago
		left join _Datos..MG_MaestroCuentas on mgmc_idkey = fpg_mgmcidkey
		where pag_icodigo_id = @pag_iCodigo_ID and pag_yImporte !=0

	print '[MG_ContabilizarPago] Busco o creo en el plan de cuentas'
	print '@fpg_idkey'
	print @fpg_idkey
		
	EXECUTE [dbo].[MG_GetCreateCuentaIdFormaPago] @fpg_idkey ,@fpg_mgmcidkey OUTPUT

	print '[MG_ContabilizarPago] @fpg_mgmcidkey'
	print @fpg_mgmcidkey

	if @fpg_mgmcidkey > 0
	BEGIN
		print '[MG_ContabilizarPago] es un pago actualizo la cuenta CASH'
		INSERT into _datos..MG_MovimientosCuentas (mgm_idcuenta,mgm_monto,mgm_saldo,mgm_idcomprobante, mgm_fecha, mgm_estado)  
			VALUES (@fpg_mgmcidkey,@pag_yImporte,@mgmc_saldo+@pag_yImporte,@cbc_icodigoid, getdate(),0);
	END

	print '[MG_ContabilizarPago] Actualizo el pago'
	update _datos..[m_pagos_fc] set [pag_iCodigoCaja] = @fpg_mgmcidkey where [pag_iCodigo_ID] = @pag_iCodigo_ID

	-- me fijo si debo actualizar imputaciones y saldos
	declare @imp_iCodigoCbteDebito int-- id del comprobante de pago (recibo)

	-- me fijo si existe la imputación
	-- no tengo como volver a imputar una vez qeu limpie todo esto hay que analizar.
	
	set NOEXEC OFF

END