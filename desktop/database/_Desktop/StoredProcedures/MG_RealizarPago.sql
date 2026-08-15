CREATE OR ALTER PROCEDURE [dbo].[MG_RealizarPago]
	--@idComprobante INT,
	--@formaDePago INT,
	--@importe float,
	@arrayPagos VARCHAR(MAX) = '',
	@arrayComprobantesImputados VARCHAR(MAX) = '',
	@clienteId INT,
	@_dc VARCHAR(256) = '',
	@codigoComprobante VARCHAR(3),
	@fechaComprobante VARCHAR(10) = ''
AS
BEGIN

	BEGIN TRY
	BEGIN TRANSACTION;
	print '[MG_RealizarPago]'
	print '[MG_RealizarPago] GENERO TABLAS'
	DECLARE @PagosTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	INSERT INTO @PagosTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@arrayPagos) WHERE NAME IN ('cuota', 'importe','forma','numeroCheque','banco','firmante','vencimiento')		
	
	DECLARE @ComprobantesImputadosTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	INSERT INTO @ComprobantesImputadosTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@arrayComprobantesImputados) WHERE NAME IN ('imputar', 'Id', 'IdComprobante')		

	DECLARE @ComprobanteDePagoId INT
	print '[MG_RealizarPago] GENEREO LOS PAGOS'
	DECLARE @PagoForma char(3)
	declare @PagoFormaId int
	DECLARE @PagoImporte float
	DECLARE @PagoCuota int
	DECLARE @NumeroCheque int
	DECLARE @Banco VARCHAR(3)
	DECLARE @Firmante int
	DECLARE @Vencimiento VARCHAR(20)
	DECLARE @TotalDePagos float = 0

	print '[MG_RealizarPago] si no llega la fecha para el comprobante considero que es para hoy'
	DECLARE @dateNow Date
	IF @fechaComprobante = ''
		BEGIN
			SET @dateNow = GETDATE()
		END
	ELSE
		BEGIN
			SET @dateNow = @fechaComprobante
		END

	DECLARE @PagoIndex INT
	SET @PagoIndex = 1
	

/** Esto ahora se toma por input para que el usuario pueda elegir desde la UI que comprabte tipo 7 utiliza
	--traigo el codigo de comporbante tipo recibo
	--DECLARE @codigoComprobante VARCHAR (5)	
	--SELECT top 1 @codigoComprobante  = cbt_ccodigo FROM _Tablas..t_comprobantes_fc WHERE cbt_ntipo = 7
*/
	print '[MG_RealizarPago] GENERO COMPROBANTE Y GUARDO EL ID PARA ASOCIARLO A LOS PAGOS Y LUEGO ACTUALIZAR LOS TOTALES'
	EXEC _desktop..MG_CrearComprobante @ID = @ComprobanteDePagoId OUTPUT, @Name = '', @cbc_icliente = @clienteId, @cbc_dfecha = @dateNow, @cbc_ysubtotal = 0, @cbc_ytotal = 0, @cbc_cestado = 1, @cbc_cTipoCbte = @codigoComprobante

	WHILE((SELECT COUNT(*) FROM @PagosTable WHERE parent_ID = @PagoIndex) != 0)
	BEGIN	
		--Read
		SELECT @PagoForma = REPLACE(StringValue, '''', '''''') FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'forma'
		SELECT @PagoFormaId = REPLACE(StringValue, '''', '''''') FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'formaId'
		SELECT @PagoImporte = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'importe'																
		SELECT @PagoCuota = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'cuota'
		SELECT @NumeroCheque = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'numeroCheque'
		SELECT @Banco = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'banco'
		SELECT @Firmante = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'firmante'
		SELECT @Vencimiento = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @PagosTable WHERE parent_ID = @PagoIndex AND NAME = 'vencimiento'
			
		--Next
		SET @PagoIndex = @PagoIndex + 1	

		print @PagoForma
		print @PagoImporte
		print @PagoCuota

		INSERT INTO _datos..m_pagos_fc
		(
			pag_iCodigoCbte,
			pag_iCodigoCaja,
			pag_cFormaPago, 
			pag_iNumero,
			pag_cBanco,
			pag_dVencimiento,
			pag_yImporte,
			pag_cFirmante
		) VALUES (
			@ComprobanteDePagoId,
			0,
			@PagoForma,
			@NumeroCheque,
			@Banco,
			CONVERT(datetime, @Vencimiento, 103),
			@PagoImporte,
			@Firmante
		)

		SET @TotalDePagos = @TotalDePagos + @PagoImporte

	END

	print '[MG_RealizarPago] MODIFICO SALDOS'
	DECLARE @ComprobanteId VARCHAR(128)
    DECLARE @CuentaCorrienteId VARCHAR(128)
	DECLARE @ComprobanteImputar VARCHAR(max)

	DECLARE @ComprobanteIndex INT
	SET @ComprobanteIndex = 1
	WHILE((SELECT COUNT(*) FROM @ComprobantesImputadosTable WHERE parent_ID = @ComprobanteIndex) != 0)
	BEGIN	
		--Read
		SELECT @ComprobanteId = REPLACE(StringValue, '''', '''''') FROM @ComprobantesImputadosTable WHERE parent_ID = @ComprobanteIndex AND NAME = 'IdComprobante'
		SELECT @ComprobanteImputar = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @ComprobantesImputadosTable WHERE parent_ID = @ComprobanteIndex AND NAME = 'imputar'																
		SELECT @CuentaCorrienteId = REPLACE(StringValue, '''', '''''') FROM @ComprobantesImputadosTable WHERE parent_ID = @ComprobanteIndex AND NAME = 'Id'

		--Next
		SET @ComprobanteIndex = @ComprobanteIndex + 1	

		print '[MG_RealizarPago] ACTUALIZO CADA CUENTA CORRIENTE'
		print @CuentaCorrienteId
		print '[MG_RealizarPago] @ComprobanteImputar'
		print @ComprobanteImputar
		print '[MG_RealizarPago] @CuentaCorrienteId'
		print @CuentaCorrienteId

		UPDATE _datos..m_cuenta_corriente_fc
			SET cta_ySaldo = cta_ySaldo - @ComprobanteImputar
			WHERE cta_iCodigo_ID = @CuentaCorrienteId

		INSERT INTO _Datos..m_imputaciones_fc (
			imp_dFecha,
			imp_iCodigoCbteDebito,
			imp_nCuotaDebito,
			imp_iCodigoCbteCredito,
			imp_nCuotaCredito,
			imp_yImporteImputado
		)
		VALUES
		(
			GETDATE() ,
			@ComprobanteDePagoId,
			0 , --cItemsCobranza.cta_nCuota
			@ComprobanteId,
			0,
			@ComprobanteImputar
		)

	END

	print '[MG_RealizarPago] ACTUALIZO EL TOTAL DEL COMPROBANTE'
	UPDATE _datos.dbo.m_comprobantes_cab_fc
		SET cbc_ysubtotal = @TotalDePagos , cbc_ytotal = @TotalDePagos
		WHERE cbc_iCodigo_ID = @ComprobanteDePagoId

	SELECT '[MG_RealizarPago] Transaccion realizada con exito.' as msg, '0' as Error

	COMMIT;  
	END TRY

	BEGIN CATCH		
		ROLLBACK TRANSACTION
		SELECT '[MG_RealizarPago] Ocurio un error en la transaccion. '+ ERROR_MESSAGE() as msg, '1' as Error
	END CATCH
	

END