CREATE OR ALTER PROCEDURE [dbo].[MG_CalcularFactura]
	@idComprobante INT
AS
BEGIN

	--armos totales de los items
	DECLARE @totalItems float
	DECLARE @totalImpuestosItems float
	DECLARE @totalSinImpuestosItems float

	SELECT  @totalItems =  SUM((cbi_yImporte*cbi_iCantidad*VAT)/100+cbi_yImporte),
					@totalImpuestosItems = SUM((cbi_yImporte*cbi_iCantidad*VAT)/100),
					@totalSinImpuestosItems = SUM(cbi_yImporte*cbi_iCantidad)
	FROM _datos..m_comprobantes_item_fc
	LEFT JOIN _datos..Product ON Id = cbi_iProducto
		WHERE cbi_iCodigoCab = @idComprobante

	print 'Total de items';
	print @totalItems
	print 'Total de impuestos items'
	print @totalImpuestosItems

	
	--armo totales del comprobante
	DECLARE @total float
	DECLARE @totalImpuestos float
	SELECT @total = ((@totalSinImpuestosItems*cbc_yImpuesto1)/100+(@totalSinImpuestosItems*cbc_yImpuesto2)/100+(@totalSinImpuestosItems*cbc_yImpuesto3)/100+@totalItems),
				 @totalImpuestos = ((@totalSinImpuestosItems*cbc_yImpuesto1)/100+(@totalSinImpuestosItems*cbc_yImpuesto2)/100+(@totalSinImpuestosItems*cbc_yImpuesto3)/100) 
	FROM _datos..m_comprobantes_cab_fc
	WHERE cbc_iCodigo_Id = @idComprobante

	print 'Total impuestos de comprobante'
	print @totalImpuestos
	print 'Total'
	print @total
	

	select 	@idComprobante as idComprobante,
					@totalItems as totalItems,
					@totalImpuestosItems as totalImpuestosItems,
					@totalSinImpuestosItems as toalSinImpuesotsItems,
					@totalImpuestos as totalImpuestos,
					@total as total
		


	--traigo cabecera de comprobante
END