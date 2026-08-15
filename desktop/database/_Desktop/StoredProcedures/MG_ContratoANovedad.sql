CREATE OR ALTER PROCEDURE [dbo].[MG_ContratoANovedad]
	@IdContrato int 
AS
BEGIN
	
	DECLARE @idcliente INT
	--traigo contrato
	SELECT @idcliente = cnt_idcliente FROM _Datos..crm_contrato WHERE cnt_iid = @IdContrato

	DECLARE @nov_cdescripcion VARCHAR (MAX)
	DECLARE @nov_mimporte FLOAT
	DECLARE @nov_cimpuesto1 FLOAT
	DECLARE @vencimiento DATE
	declare @nov_idproducto int

	DECLARE items_contrato_cursor CURSOR LOCAL FOR
		SELECT p.Name as nov_cdescripcion,
				(it.Price*it.Quantity) as nov_mimporte,
				imp_ccodigo as nov_cimpuesto1,
			--	0 as nov_cimpuesto2,
			--	0 as nov_cimpuesto3,
				con.cnt_fechavto as vencimiento,
				ProductId as nov_idproducto
		FROM _Datos..crm_contrato_item it
		LEFT JOIN _Datos..crm_contrato con ON con.cnt_iid = it.idcontrato
		left join _datos..mg_product_impuesto on it.ProductId = mpi_idproduct
		left join _tablas..t_impuestos_fc on mpi_impidkey = imp_idkey
		--LEFT JOIN _Datos..Product p ON p.Code = it.Code
		--LEFT JOIN _Datos..Product p ON p.Id = it.ProductId
				
		outer apply
		( select top 1 *
			from ( 
					select * from _Datos..Product px where px.Id = it.ProductId
					UNION ALL
					select * from _Datos..Product px2 where px2.Code = it.Code
			) uni
		) p

		WHERE idcontrato = @IdContrato

		OPEN items_contrato_cursor;
		FETCH NEXT FROM items_contrato_cursor INTO @nov_cdescripcion, @nov_mimporte, @nov_cimpuesto1,@vencimiento,@nov_idproducto;

		WHILE @@FETCH_STATUS = 0
		BEGIN
					
			print 'Vencimiento'
			print @vencimiento
			IF @vencimiento > GETDATE()
			BEGIN
				print 'insertando contrato en novedad'
				--guardo en novedades
				INSERT INTO _Tablas..t_novedades_fc (nov_cdescripcion,nov_mimporte,nov_cimpuesto1,nov_cimpuesto2,nov_cimpuesto3, nov_idproducto)
					VALUES (@nov_cdescripcion, @nov_mimporte, ISNULL(@nov_cimpuesto1,0),0,0,@nov_idproducto)--Daniel O. Medina 28/08/2024 validación de valor NULL en var @nov_cimpuesto1 según https://softguard.atlassian.net/browse/DK-259
				print 'insertando contrato en novedad extra'
				--gaurdo extra novedades para que sea recurrente
				INSERT INTO _Datos..m_novedades_facturacion_fc (nfc_inovedad,nfc_nrecurrente,nfc_nestado,nfc_icliente)
					VALUES (@@Identity, 0, 0,@idcliente)
			END

		FETCH NEXT FROM items_contrato_cursor INTO @nov_cdescripcion, @nov_mimporte, @nov_cimpuesto1,@vencimiento,@nov_idproducto;
		END
		CLOSE items_contrato_cursor;
		DEALLOCATE items_contrato_cursor;

END