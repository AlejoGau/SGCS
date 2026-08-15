CREATE OR ALTER PROCEDURE [dbo].[MG_TransformarCotizacionEnComprobante]
	@idCotizacion int,
	@tipoComprobante VARCHAR(3) 
AS
BEGIN


DECLARE @idOrganizacionFacturadora INT 
DECLARE @idCliente INT 


SELECT @idOrganizacionFacturadora = cli_iOrganizacion,
	@idCliente  = org.Account
	FROM _Datos..[Order] ord
	LEFT JOIN _Datos..Organization org ON org.Id = ClientId
	LEFT JOIN _Datos..m_clientes_fc cli ON cli_iCodigo_ID = org.Account
	WHERE ord.Id = @idCotizacion;

	print 'IdOrganizacionFacturadora: '+convert(varchar(20),@idOrganizacionFacturadora)
	print 'idCliente: '+convert(varchar(20),@idCliente)
	print 'tipoComprobante: '+convert(varchar(20),@tipoComprobante)

	--genero cabeera
	DECLARE @DateCreated Date
	DECLARE @SubTotal float
	DECLARE @Total float
	DECLARE @Impuesto money
	DECLARE @ComprobanteId INT

	SELECT  @DateCreated = DateCreated,							
		@SubTotal = (TotalPrice - VAT),--subtotal
		@Impuesto = VAT,						
		@Total = TotalPrice							
	FROM _Datos..[Order] WHERE Id = @idCotizacion


	EXEC MG_CrearComprobante @ID = @ComprobanteId OUTPUT
		, @Name = ''
		, @cbc_icliente = @idCliente
		, @cbc_dfecha = @DateCreated
		, @cbc_ysubtotal = @SubTotal
		, @cbc_ytotal = @Total
		, @cbc_yimpuesto1 = @Impuesto
		, @cbc_yimpuesto2 = 0
		, @cbc_yimpuesto3 = 0
		, @cbc_cestado = 0
		, @cbc_ctipocbte = @tipoComprobante
		, @organizacionFacturadoraId = @idOrganizacionFacturadora


--copio items
	INSERT INTO	_datos..m_comprobantes_item_fc (
		cbi_iCodigoCab,
		cbi_iRenglon,
		cbi_iProducto,
		cbi_iNovedad,
		cbi_iNovedadTabla,
		cbi_yImporte,
		cbi_iCantidad,
		cbi_nDescuento
	)  SELECT
		@ComprobanteId,		
		0,
		ProductId,
		0,
		0,
		Price,
		Quantity,
		0
		FROM _datos..OrderItem
		where OrderId = @idCotizacion

--genero relacion comprobate > cotizacion
	INSERT INTO _Desktop..RelationObject (
		ObjectTypeId,
		ObjectId,
		RelationObjectTypeId,
		RelationObjectId,
		DateCreated
		) values (
			624,
			@idCotizacion,
			3151,
			@ComprobanteId,
			GETDATE()
		)

	--cambio el estado a que se genero un comprobante
	UPDATE  _Datos..[Order] SET Status = 9 WHERE Id = @idCotizacion;

	--devuelvo el comprobante que se creo
	SELECT  * FROM _datos..m_comprobantes_cab_fc WHERE cbc_iCodigo_ID = @ComprobanteId 

END