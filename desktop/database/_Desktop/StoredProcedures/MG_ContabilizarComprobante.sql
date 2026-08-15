-- =============================================
-- Author:		Rodrigo Román
-- Create date: 6/2/2018
-- Description:	Agrega los montos del comprobante a la tabla mg_cuentacontable
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_ContabilizarComprobante]
	@cbc_icodigo_id int
AS
BEGIN

	SET NOCOUNT ON;
	print '[MG_ContabilizarComprobante]'
	print 'cbc_icodigo_id: '+convert(varchar(20),@cbc_icodigo_id)

    declare @cbt_ntipo int
	declare @cbc_ytotal money
	declare @cbc_icliente int
	declare @cbc_dfecha datetime
	declare @org_factelect varchar(64)
	declare @org_csymbol char(3)
	declare @org_icodigo_id int
	declare @cbc_cestado char(1)
	declare @mgmc_saldo money
	declare @con_idkey int
	
	declare @mgmc_idkey int -- id cuenta contable

	-- busco los datos del comprobante
	select @cbc_icliente = cbc_icliente,
		@cbt_ntipo = cbt_ntipo,
		@cbc_ytotal = cbc_ytotal,
		@org_csymbol = org.org_csymbol,
		@org_factelect = org.org_factelect,
		@org_icodigo_id = org.org_icodigo_id,
		@cbc_cestado = cbc_cestado,
		@cbc_dfecha = cbc_dfecha,
		@con_idkey = con_idKey
		from _datos..m_comprobantes_cab_fc mc 
			inner join _tablas..t_comprobantes_fc tc on mc.cbc_ctipocbte = tc.cbt_ccodigo and tc.cbt_idorganizacionfacturadora = cbc_iorganizacionfacturadora -- tipo de comprobante
			inner join _Tablas..t_organizacion_fc org on mc.cbc_iorganizacionfacturadora = org.org_icodigo_id
			left join _Datos.[dbo].[m_clientes_fc] cli on mc.cbc_iCliente = cli.cli_icodigo_ID
			LEFT JOIN _Tablas..t_condiciones_pago_fc ON cli_ccondicionpago=con_ccodigo
		where cbc_icodigo_id = @cbc_icodigo_id

	print '[MG_ContabilizarComprobante] @cbc_icliente'
	print @cbc_icliente
	print '[MG_ContabilizarComprobante] @cbc_cestado'
	print @cbc_cestado

	IF @cbc_icliente IS NULL or @cbc_cestado='0' or @cbc_cestado is null or @cbc_cestado = '' or @cbc_ytotal=0 or @cbt_ntipo = 4
	BEGIN
		print '[MG_ContabilizarComprobante] No se procesa'
		set NOEXEC ON
	END

	print '[MG_ContabilizarComprobante] traigo la cuenta contable del cliente y la creo si no existe'
	print '[MG_ContabilizarComprobante] @cbc_icliente'
	print @cbc_icliente
	print '[MG_ContabilizarComprobante] @mgmc_idkey'
	print @mgmc_idkey

	if @cbt_ntipo!=5
		exec MG_GetCreateCuentaIdCLiente @cli_icodigo_id=@cbc_icliente, @mgmc_idkey=@mgmc_idkey output
	ELSE
		exec MG_GetCreateCuentaIdProveedor @cli_icodigo_id=@cbc_icliente,@mgmc_idorganizacion=@org_icodigo_id, @mgmc_idkey=@mgmc_idkey output

	print '[MG_ContabilizarComprobante] @mgmc_idkey'
	print @mgmc_idkey

	/*
	Tipo de Cbte

	1 Factura VENTA
	2 Nota Debito cliente
	3 Ajuste Debito cliente
	4 Orden Pedido            
	5 Factura Compra                                     
	7 Recibo VENTA
	8 Nota Credito cliente
	9 Ajuste Credito cliente
	*/
	print '[MG_ContabilizarComprobante] tipo comprobante @cbt_ntipo'
	print @cbt_ntipo

	declare @pag_icodigo_id int = 0
	if @cbt_ntipo in (7,8,9) 
	BEGIN
		print '[MG_ContabilizarComprobante] Contabilizo los pagos'
		DECLARE pagos_cursor CURSOR FOR SELECT pag_icodigo_id FROM _datos..m_pagos_fc where pag_icodigocaja=0

		OPEN pagos_cursor   
		FETCH NEXT FROM pagos_cursor INTO @pag_icodigo_id   

		WHILE @@FETCH_STATUS = 0   
		BEGIN 
			print '[MG_ContabilizarComprobante] Contabilizo el pago'
			print @pag_icodigo_id
			exec _desktop..mg_contabilizarpago @pag_icodigo_id
			FETCH NEXT FROM pagos_cursor INTO @pag_icodigo_id   
		END   

		CLOSE pagos_cursor   
		DEALLOCATE pagos_cursor

		print '[MG_ContabilizarComprobante] recibo, nota credito, ajuste credito, resto en la CC'
		-- paso a restar para la cuenta del cliente.
		select @cbc_ytotal = @cbc_ytotal * -1
		print @cbc_ytotal
	END

	if @cbt_ntipo in (5) 
	BEGIN
		print '[MG_ContabilizarComprobante] Contabilizo los pagos proveedor'

		select @pag_icodigo_id = 0
		DECLARE pagos_cursor CURSOR FOR SELECT pag_icodigo_id FROM _datos..m_pagos_fc where pag_icodigocaja=0

		OPEN pagos_cursor   
		FETCH NEXT FROM pagos_cursor INTO @pag_icodigo_id   

		WHILE @@FETCH_STATUS = 0   
		BEGIN 
			exec _desktop..mg_contabilizarpagoProv @pag_icodigo_id
			FETCH NEXT FROM pagos_cursor INTO @pag_icodigo_id   
		END   

		CLOSE pagos_cursor   
		DEALLOCATE pagos_cursor

		print '[MG_ContabilizarComprobante] recibo, nota credito, ajuste credito, resto en la CC'
		-- paso a restar para la cuenta del proveedor.
		select @cbc_ytotal = @cbc_ytotal * -1
		print @cbc_ytotal
	END
	if @cbt_ntipo in (1) 
	BEGIN
		--Armo cuenta corriente
		print '[MG_ContabilizarComprobante] Creo cuenta corriente para comprobante '+convert(varchar(10), @cbc_icodigo_id)
		print '[MG_ContabilizarComprobante] CC Total:'+convert(varchar(10), @cbc_ytotal)
				
		EXEC MG_m_cuenta_corriente_fcInsSearch 
			@cta_iCodigoCbte = @cbc_icodigo_id,
			@cta_nCuota = 0,
			@cta_yTotal = @cbc_ytotal,
			@cta_ySaldo = @cbc_ytotal,
			@cta_dVencimiento = @cbc_dfecha,
			@cta_dCobro = null,
			@idCondicionPago = @con_idkey
	END

	-- busco el saldo de la cuenta
	select @mgmc_saldo = isnull(mgmc_saldo,0) from _Datos..MG_MaestroCuentas
	where mgmc_idkey = @mgmc_idkey

	print isnull(@mgmc_saldo,0)+@cbc_ytotal

	print '[MG_ContabilizarComprobante] me fijo si el movimiento esta en la CC'
	if not exists (select * from _datos..MG_MovimientosCuentas where mgm_idcuenta=@mgmc_idkey and mgm_idcomprobante = @cbc_icodigo_id)
	BEGIN
		INSERT into _datos..MG_MovimientosCuentas (mgm_idcuenta,mgm_monto,mgm_saldo,mgm_idcomprobante, mgm_fecha, mgm_estado)  
			VALUES (@mgmc_idkey,@cbc_ytotal,@mgmc_saldo+@cbc_ytotal,@cbc_icodigo_id, @cbc_dfecha,0);
	END

	print '[MG_ContabilizarComprobante] contabilizo los impuestos.'
	if @cbt_ntipo!=5
		EXECUTE _desktop..[MG_ContabilizarImpuesto]  @cbc_icodigo_id
	ELSE
		EXECUTE _desktop..[MG_ContabilizarImpuestoCredito]  @cbc_icodigo_id

	-- si es una factura la imprimo o mando a afip
	-- solo lo deberia hacer si ya no se mando antes?
	if @cbt_ntipo in (1) -- (1.-factura,2.- nota debito,3.- ajuste debito)
	BEGIN
	    -- me fijo si el cliente factura con afip
		if (@org_factelect = 'AfipCae' and not exists (select * from [_Datos]..[MG_Afip_Cae] where [mac_idcbte] = @cbc_icodigo_id) )
		BEGIN
			-- inserto en la tabla de pendientes AFIP

		INSERT INTO [_Datos]..[MG_Afip_Cae]
			([mac_idcbte]
			,[mac_estado]
			,[mac_fechaalta])
		VALUES
			(@cbc_icodigo_id
			,null
			,GETDATE())
		END
	END

	-- mando a imprimir
	-- exec _desktop..RemoteCall_ComprobanteExport @cbc_icodigo_id
	
	set NOEXEC OFF
END