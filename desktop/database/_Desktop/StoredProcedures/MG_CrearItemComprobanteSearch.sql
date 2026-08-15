CREATE OR ALTER PROCEDURE [dbo].[MG_CrearItemComprobanteSearch]												
	@cbi_icodigocab Int = 0,
	@cbi_irenglon SmallInt = 0,
	@cbi_iproducto Int = 0,
	@cbi_inovedad Int = 0,
	@cbi_inovedadtabla Int = 0,
	@cbi_yimporte  Money = 0,
	@cbi_icantidad SmallInt = 0,
	@cbi_ndescuento numeric (5,2) = 0
--WITH ENCRYPTION			 
AS
	set noCount on
	Insert into _datos.dbo.m_comprobantes_item_fc ([cbi_icodigocab],[cbi_irenglon],[cbi_iproducto],[cbi_inovedad],[cbi_inovedadtabla],[cbi_yimporte],[cbi_icantidad],[cbi_ndescuento])
		values ( @cbi_icodigocab, @cbi_irenglon, @cbi_iproducto, @cbi_inovedad, @cbi_inovedadtabla, @cbi_yimporte, @cbi_icantidad, @cbi_ndescuento)