CREATE OR ALTER PROCEDURE [dbo].[MG_cacularImpuestosProductosByComprobante]
	@idComprobante INT 
AS
BEGIN
	print '[MG_cacularImpuestosProductosByComprobante] INICIO Calculo impuesto de los productos para contrato '+convert(varchar(100),@idComprobante)
	
	IF EXISTS(SELECT COUNT(1) FROM _Datos..MG_comprobante_impuesto WHERE mci_cbcicodigoid = @idComprobante ) 
	BEGIN
		print '[MG_cacularImpuestosProductosByComprobante] Elimino calculos de impuestos anteriores '+convert(varchar(100),@idComprobante)
		DELETE FROM _Datos..MG_comprobante_impuesto WHERE mci_cbcicodigoid = @idComprobante
	END
	
	INSERT INTO _Datos..MG_comprobante_impuesto (mci_cbcicodigoid,mci_impidkey ,mci_total,mci_baseimponible)
		SELECT
			@idComprobante,
			imp_idKey,
			((ISNULL(imp_nporcentaje,0)/100))*SUM(cbi_yImporte*cbi_iCantidad), --saque el +1 por que se debe almacenar el total impuesto solo
			SUM(cbi_yImporte*cbi_iCantidad)
		FROM _Datos..m_comprobantes_item_fc  ci
			LEFT JOIN _Datos..Product p ON p.Id = cbi_iProducto
			LEFT JOIN _Datos..MG_product_impuesto pi ON cbi_iProducto = mpi_idproduct		
			LEFT JOIN _Tablas..t_impuestos_fc i ON i.imp_idKey = 
				CASE
					WHEN cbi_cimpuestos!='' THEN convert(int,cbi_cimpuestos)
					ELSE mpi_impidkey
				END		
		WHERE cbi_iCodigoCab =  @idComprobante
		GROUP BY imp_idKey,imp_nporcentaje,cbi_iCantidad,imp_cdescripcion

	-- actualizo el subtotal con las bases imponibles
	declare @subtotal money = 0
	declare @yimpuesto1 money = 0
	declare @yimpuesto2 money = 0
	declare @yimpuesto3 money = 0

	select @subtotal = SUM(mci_baseimponible) from _Datos..MG_comprobante_impuesto WHERE mci_cbcicodigoid = @idComprobante group by mci_cbcicodigoid

	select @yimpuesto1 = mci_total from _Datos..MG_comprobante_impuesto 
		inner join _tablas..t_impuestos_fc on mci_impidkey = imp_idKey
		where mci_cbcicodigoid = @idComprobante
		and imp_nporcentaje = 21

	select @yimpuesto2 = mci_total from _Datos..MG_comprobante_impuesto 
		inner join _tablas..t_impuestos_fc on mci_impidkey = imp_idKey
		where mci_cbcicodigoid = @idComprobante
		and imp_nporcentaje = 10.5

	update _Datos..m_comprobantes_cab_fc 
		set cbc_ySubTotal = @subtotal
		, cbc_yImpuesto1 = @yimpuesto1
		, cbc_yImpuesto2 = @yimpuesto2
		, cbc_yImpuesto3 = @yimpuesto3 
		WHERE cbc_iCodigo_ID = @idComprobante

	print '[MG_cacularImpuestosProductosByComprobante] FIN Calculo impuesto de los productos para contrato '+convert(varchar(100),@idComprobante)
END