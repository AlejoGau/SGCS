CREATE OR ALTER PROCEDURE [dbo].[MG_LoteFacturasSearch]

	@arrayClientes varchar(MAX),
	@codigoTipoComprobante varchar(3),

	@envio INT = 0,
	@tipoEnvio VARCHAR(200) = 'Email',
	@template INT = 0
AS
BEGIN
	--parametros
	DECLARE @REDONDEO INT
	SELECT @REDONDEO = par_ivalor From _Tablas.dbo.t_parametros (UPDLOCK) Where par_cCodigo='REDONDEO'     
	IF @REDONDEO = 1
		SET @REDONDEO = 2
	ELSE
		SET @REDONDEO = 10 --es para que no redondee
	
	DECLARE @id int
	DECLARE @idCliente varchar(100)

	

	DECLARE clientes_cursor CURSOR LOCAL FOR
		SELECT id, Item
		FROM SplitString(@arrayClientes,',');

	OPEN clientes_cursor;
	FETCH NEXT FROM clientes_cursor INTO @id, @idCliente;

	WHILE @@FETCH_STATUS = 0
		 BEGIN
				
			PRINT '[MG_LoteFacturasSearch] Cliente: '+convert(varchar(10),@idCliente)+'-----';	
			PRINT @id;
			PRINT @idCliente;

			Create Table #tmpItems (
				nov_icodigo_ID int,
				nov_idproducto int,
				ser_cdescripcion varchar(200),
				cantidad int,
				nov_mimporte float,
				nov_cimpuesto1 char(3),
				nov_cimpuesto2 char(3),
				nov_cimpuesto3 char(3),
				ser_inovedad int,
				totalConImpuestoAplicado float,
				totalImpuesto1 float,
				totalImpuesto2 float,
				totalImpuesto3 float
			)

			DECLARE @cat_cimpuesto1 float
			DECLARE @cat_cimpuesto2 float
			DECLARE @cat_cimpuesto3 float
				
			DECLARE @imp_nporcentaje1 float
			DECLARE @imp_nporcentaje2 float
			DECLARE @imp_nporcentaje3 float

			DECLARE @imp_idkey1 int
			DECLARE @imp_idkey2 int
			DECLARE @imp_idkey3 int
			
			DECLARE @IdCondicionPago INT

			DECLARE @ser_nperiodo INT
			DECLARE @ser_nTipo INT
			DECLARE @cli_dproximafactura DATE
			DECLARE @organizacionFacturadoraId INT 
			
			SELECT 
				@cat_cimpuesto1 = cat_cimpuesto1,
				@cat_cimpuesto2 = cat_cimpuesto2,
				@cat_cimpuesto3 = cat_cimpuesto3,
				@imp_nporcentaje1 = impA.imp_nporcentaje,
				@imp_nporcentaje2 = impB.imp_nporcentaje,
				@imp_nporcentaje3 = impC.imp_nporcentaje,
				@imp_idkey1 = impA.imp_ccodigo,
				@imp_idkey2 = impB.imp_ccodigo,
				@imp_idkey3 = impC.imp_ccodigo,
				@IdCondicionPago = con_idKey,

				@ser_nperiodo = ser_nperiodo,
				@ser_nTipo = ser_nTipo,
				@cli_dproximafactura = cli_dproximafactura,
				@organizacionFacturadoraId = cli_iOrganizacion

			FROM _Datos.[dbo].[m_clientes_fc] 
			INNER JOIN _Tablas..t_categorias_impositivas_fc ON cli_ccategoriaimpositiva = cat_ccodigo
			LEFT JOIN _Tablas.dbo.t_impuestos_fc impA ON impA.imp_ccodigo=cat_cimpuesto1
			LEFT JOIN _Tablas.dbo.t_impuestos_fc impB ON impB.imp_ccodigo=cat_cimpuesto2
			LEFT JOIN _Tablas.dbo.t_impuestos_fc impC ON impC.imp_ccodigo=cat_cimpuesto3
			LEFT JOIN _Tablas..t_condiciones_pago_fc ON cli_ccondicionpago=con_ccodigo
			LEFT JOIN _Tablas..t_servicios_fc ON cli_cservicio=ser_ccodigo

			WHERE cli_iCodigo_ID = @idCliente
		print '[MG_LoteFacturasSearch] ORG FACTURADORA'
		print @organizacionFacturadoraId
				
		--Creo una tabla temporal apra unificar los items

				
		/**
		* Se tomo del store ArmaItemsFactura
		*/
		Declare @DiaHoy     	 DateTime
		Declare @iExiste Int

		SET @DiaHoy = GETDATE()

		Set @iExiste = (Select Top 1 rel_icliente From _Datos..m_relacion_cliente_cuentas_fc Where rel_icliente=@idCliente And rel_ntipo>0)
		print @iExiste
		IF @iExiste Is Null
		Begin
			print '[MG_LoteFacturasSearch] No existe relacion cliente cuenta'
			INSERT INTO #tmpItems
				-- [DEDALO] saco facturacion de servicios de la cuenta, pasa todo a contratos
				/*
				SELECT nov_idproducto As nfc_icodigo_ID,ser_cdescripcion As cDescripcionLargo,1 As cantidad,nov_mimporte,
				nov_cimpuesto1, nov_cimpuesto2, nov_cimpuesto3, ser_inovedad As iNovedadTabla, 0 as totalConImpuestoAplicado, 0 as totalImpuesto1, 0 as totalImpuesto2, 0 as totalImpuesto3
				FROM _Datos..m_clientes_fc
				Left Outer Join _Tablas.dbo.t_servicios_fc
				ON ser_ccodigo = cli_cservicio
				Inner Join  _Tablas.dbo.t_novedades_fc
				ON ser_inovedad=nov_icodigo_ID
				Where cli_icodigo_ID = @idCliente
				Union All
				*/
				SELECT nov_icodigo_ID,nov_idproducto, nov_cdescripcion As cDescripcionLargo,1 As cantidad,nov_mimporte,
				nov_cimpuesto1, nov_cimpuesto2, nov_cimpuesto3, nfc_inovedad As iNovedadTabla, 0 as totalConImpuestoAplicado, 0 as totalImpuesto1, 0 as totalImpuesto2, 0 as totalImpuesto3
				FROM _Datos.dbo.m_novedades_facturacion_fc
				Inner Join _Tablas.dbo.t_novedades_fc
				ON nfc_inovedad = nov_icodigo_ID
				Where nfc_icliente= @idCliente And nfc_nestado = 0
		END
		ELSE
		Begin
			Create Table #tmpCursor (Cantidad Int, Novedad Int)
					
			Insert #tmpCursor 
				SELECT Count(rel_icuenta) As nCuentas,rel_inovedadtabla FROM _Datos..m_relacion_cliente_cuentas_fc
					Where rel_ntipo = 1 And rel_icliente = @idCliente And
					rel_icuenta Not In (	
						Select est_iidcuenta FROM _Datos..m_estado_cuenta_Cab With (NOLOCK) 
						Where est_iidCuenta=rel_iCuenta 
							And ( est_nEstado=2 OR 
								( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta	) 
							)
					)
				Group By rel_inovedadtabla
						
				Union All
				SELECT Count(cue_iid) As nCuentas,rel_inovedadtabla FROM _Datos..m_relacion_cliente_cuentas_fc
					Inner Join _Datos..m_cuentas ON cue_clinea=rel_cdealer
					Where rel_ntipo = 2 And rel_icliente = @idCliente And
						cue_iid Not In (	
						Select est_iidcuenta FROM _Datos..m_estado_cuenta_Cab With (NOLOCK) 
							Where est_iidCuenta=rel_iCuenta And 
							( est_nEstado=2 OR 
								( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta	) 
							)
						)
				Group By rel_inovedadtabla
					
			Select Sum(cantidad) As cantidad,novedad Into #cUno From #tmpCursor
				Group By novedad
					

			INSERT INTO #tmpItems
				Select 
					nov_icodigo_ID,
					nov_idproducto,
					nov_cdescripcion As cDescripcionLargo,
					cantidad,
					nov_mimporte,
					nov_cimpuesto1, 
					nov_cimpuesto2, 
					nov_cimpuesto3, 
					novedad As iNovedadTabla,
					0 as totalConImpuestoAplicado, 
					0 as totalImpuesto1, 
					0 as totalImpuesto2, 
					0 as totalImpuesto3
				FROM #cUno
				Inner Join  _Tablas.dbo.t_novedades_fc
				ON novedad=nov_icodigo_ID
				Union All
				SELECT nov_idproducto,nov_icodigo_ID, nov_cdescripcion As cDescripcionLargo,1 As cantidad,nov_mimporte,
				nov_cimpuesto1, nov_cimpuesto2, nov_cimpuesto3, nfc_inovedad As iNovedadTabla, 0 as totalConImpuestoAplicado, 0 as totalImpuesto1, 0 as totalImpuesto2, 0 as totalImpuesto3
				FROM _Datos.dbo.m_novedades_facturacion_fc
				Inner Join _Tablas.dbo.t_novedades_fc
				ON nfc_inovedad = nov_icodigo_ID
				Where nfc_icliente= @idCliente And nfc_nestado = 0
					
				Drop Table #tmpCursor
				Drop Table #cUno
		END


		--DECLARE @totalItemsSinImpuestos float
					
		--calculo total de los items					
		--SELECT @totalItemsSinImpuestos = SUM(nov_mimporte*cantidad) FROM #tmpItems
		--print 'Total sin impuesto: '+convert(varchar(10), @totalItemsSinImpuestos)


		print '[MG_LoteFacturasSearch] calculo el impuesto de cada item'
		DECLARE @idItem INT
		DECLARE @cantidadItem INT
		DECLARE @importeItem INT
		declare @nov_idproducto int
		DECLARE @nov_cimpuesto1 FLOAT
		DECLARE @nov_cimpuesto2 FLOAT
		DECLARE @nov_cimpuesto3 FLOAT
					
		select * FROM #tmpItems
		DECLARE items_cursor CURSOR LOCAL FOR
			SELECT nov_icodigo_ID,nov_idproducto, cantidad,nov_mimporte,nov_cimpuesto1,nov_cimpuesto2,nov_cimpuesto3
			FROM #tmpItems;

		OPEN items_cursor;
		FETCH NEXT FROM items_cursor INTO @idItem,@nov_idproducto, @cantidadItem,@importeItem,@nov_cimpuesto1,@nov_cimpuesto2,@nov_cimpuesto3;

		WHILE @@FETCH_STATUS = 0
		BEGIN
			DECLARE @totalImpuestoItem1 float
			DECLARE @totalImpuestoItem2 float
			DECLARE @totalImpuestoItem3 float

			SET @totalImpuestoItem1 = CASE	
				WHEN @nov_cimpuesto1 = @imp_idkey1 THEN
					(@importeItem * @imp_nporcentaje1 / 100)
										
				WHEN @nov_cimpuesto1 = @imp_idkey2 THEN
					(@importeItem * @imp_nporcentaje2 / 100)
										
				WHEN @nov_cimpuesto1 = @imp_idkey3 THEN
					(@importeItem * @imp_nporcentaje3 / 100)
			END

			SET @totalImpuestoItem2 = CASE
				WHEN @nov_cimpuesto2 = @imp_idkey1 THEN
					(@importeItem * @imp_nporcentaje1 / 100)

				WHEN @nov_cimpuesto2 = @imp_idkey2 THEN
					(@importeItem * @imp_nporcentaje2 / 100)
										
				WHEN @nov_cimpuesto2 = @imp_idkey3 THEN
					(@importeItem * @imp_nporcentaje3 / 100)

			END

			SET @totalImpuestoItem3 = CASE
				WHEN @nov_cimpuesto3 = @imp_idkey1 THEN
					(@importeItem * @imp_nporcentaje1 / 100)

				WHEN @nov_cimpuesto3 = @imp_idkey2 THEN
					(@importeItem * @imp_nporcentaje2 / 100)
										
				WHEN @nov_cimpuesto3 = @imp_idkey3 THEN
					(@importeItem * @imp_nporcentaje3 / 100)
										
			END
							

			--hago defaults
			SET @totalImpuestoItem1 = ISNULL(@totalImpuestoItem1,0)
			SET @totalImpuestoItem2 = ISNULL(@totalImpuestoItem2,0)
			SET @totalImpuestoItem3 = ISNULL(@totalImpuestoItem3,0)
							
			print '/*'
			print 'Calculo impuesto para item: '+convert(varchar(10), @idItem)
			print 'impuesto calculado 1: '+convert(varchar(10), @totalImpuestoItem1)
			print 'impuesto calculado 2: '+convert(varchar(10), @totalImpuestoItem2)
			print 'impuesto calculado 3: '+convert(varchar(10), @totalImpuestoItem3)
			print 'importe sin impuestos: '+convert(varchar(10), @importeItem)
			print 'SUBTOTAL ITEM: '+convert(varchar(10), @importeItem+@totalImpuestoItem1+@totalImpuestoItem2+@totalImpuestoItem3)
			print 'TOTAL ITEMS: '+convert(varchar(10), (@importeItem+@totalImpuestoItem1+@totalImpuestoItem2+@totalImpuestoItem3)*@cantidadItem)
			print '*/'
							

							
			--guardo calculo de importe con impuestos de cada item
			UPDATE #tmpItems SET 
					totalConImpuestoAplicado = @importeItem+@totalImpuestoItem1+@totalImpuestoItem2+@totalImpuestoItem3,
					totalImpuesto1 = @totalImpuestoItem1,
					totalImpuesto2 = @totalImpuestoItem2,
					totalImpuesto3 = @totalImpuestoItem3
				WHERE nov_icodigo_ID = @idItem

			--updateo el estado de la novedad solo cuando no es recurrente
			UPDATE _Datos..m_novedades_facturacion_fc
				SET nfc_nestado=1
				WHERE nfc_inovedad=@idItem
				--	And nfc_nrecurrente = 2 --esto se saco por que sino con los contratos nuevos se tenia problemas
			FETCH NEXT FROM items_cursor INTO @idItem,@nov_idproducto, @cantidadItem,@importeItem,@nov_cimpuesto1,@nov_cimpuesto2,@nov_cimpuesto3;

		END;
		CLOSE items_cursor;
		DEALLOCATE items_cursor;
					

		--totalizo los impuestos de todos los items
		DECLARE @totalImpuestos1 float = 0
		DECLARE @totalImpuestos2 float = 0
		DECLARE @totalImpuestos3 float = 0
		DECLARE @totalItemsSinImpuestos float = 0
		DECLARE @totalItemsSinImpuestos1 float = 0
		DECLARE @totalItemsSinImpuestos2 float = 0
		DECLARE @totalItemsSinImpuestos3 float = 0

		SELECT 	@totalImpuestos1 = ISNULL(SUM(totalImpuesto1*cantidad), 0),
			@totalImpuestos2 = ISNULL(SUM(totalImpuesto2*cantidad), 0),
			@totalImpuestos3 = ISNULL(SUM(totalImpuesto3*cantidad), 0),
			@totalItemsSinImpuestos = ISNULL(SUM(nov_mimporte*cantidad), 0)
		FROM #tmpItems

					
					
		--redondeo impuesto
		--TODO: falta el parametro redondeo
		IF @REDONDEO > 0
			BEGIN							
				SET @totalImpuestos1 = ROUND(@totalImpuestos1, @REDONDEO)
				SET @totalImpuestos2 = ROUND(@totalImpuestos2, @REDONDEO)
				SET @totalImpuestos3 = ROUND(@totalImpuestos3, @REDONDEO)
			END

		--calculo total
		DECLARE @Total float
		SET @Total = @totalItemsSinImpuestos + @totalImpuestos1 + @totalImpuestos2 + @totalImpuestos3
					
		--redondeo total
		IF @REDONDEO > 0
			BEGIN	
				SET @Total = ROUND(@Total, @REDONDEO)
			END


		IF @Total > 0 
		BEGIN

			--genero comprobante
			print '[MG_LoteFacturasSearch] Creo comprobante para cliente '+convert(varchar(10), @idCliente)+' TOTAL '+ convert(varchar(10), @Total)+' SUBTOTAL '+ convert(varchar(10), @totalItemsSinImpuestos)+' TipoComprobante '+ convert(varchar(10), @codigoTipoComprobante)
			DECLARE @ComprobanteId INT
			EXEC MG_CrearComprobante @ID = @ComprobanteId OUTPUT
				, @Name = ''
				, @cbc_icliente = @idCliente
				, @cbc_dfecha = @DiaHoy
				, @cbc_ysubtotal = @totalItemsSinImpuestos
				, @cbc_ytotal = @Total
				, @cbc_yimpuesto1 = @totalImpuestos1
				, @cbc_yimpuesto2 = @totalImpuestos2
				, @cbc_yimpuesto3 = @totalImpuestos3
				, @cbc_cestado = 0
				, @cbc_ctipocbte = @codigoTipoComprobante
				, @organizacionFacturadoraId = @organizacionFacturadoraId
			print '[MG_LoteFacturasSearch] Se creo comprobante para cliente '+convert(varchar(10), @idCliente)+' con ID '+ convert(varchar(10), @ComprobanteId)

			print '[MG_LoteFacturasSearch] @totalImpuestos1'
			print @totalImpuestos1
			-- inserto los impuestos del comprobante.
			if (@totalImpuestos1>0 and @imp_idkey1>0)
			BEGIN
			INSERT INTO [_Datos]..[MG_comprobante_impuesto] ([mci_cbcicodigoid],[mci_impidkey],[mci_total],[mci_baseimponible]) VALUES (@ComprobanteId,@imp_idkey1,@totalImpuestos1,0)
			END

			if (@totalImpuestos2>0  and @imp_idkey2>0)
			BEGIN
			INSERT INTO [_Datos]..[MG_comprobante_impuesto] ([mci_cbcicodigoid],[mci_impidkey],[mci_total],[mci_baseimponible]) VALUES (@ComprobanteId,@imp_idkey2,@totalImpuestos2,0)
			END

			if (@totalImpuestos3>0  and @imp_idkey3>0)
			BEGIN
			INSERT INTO [_Datos]..[MG_comprobante_impuesto] ([mci_cbcicodigoid],[mci_impidkey],[mci_total],[mci_baseimponible]) VALUES (@ComprobanteId,@imp_idkey3,@totalImpuestos3,0)
			END

			update _datos..m_comprobantes_cab_fc set cbc_cEstado = 1 where cbc_iCodigo_ID = @ComprobanteId
			--genero items del comprobante

			--	DECLARE @idItem INT
			--	DECLARE @cantidadItem INT
			DECLARE @idNovedad INT
			DECLARE @totalItem FLOAT

							
			SELECT * FROM #tmpItems;

			DECLARE itemsTotal_cursor CURSOR LOCAL FOR
				SELECT nov_icodigo_ID,nov_idproducto, cantidad,ser_inovedad,nov_mimporte
				FROM #tmpItems;

			OPEN itemsTotal_cursor;
			FETCH NEXT FROM itemsTotal_cursor INTO @idItem,@nov_idproducto, @cantidadItem,@idNovedad,@totalItem;
			WHILE @@FETCH_STATUS = 0
			BEGIN
				print '[MG_LoteFacturasSearch] Creo item de comprobante '+convert(varchar(10), @ComprobanteId)
				SET @totalItem = ISNULL(@totalItem,0)	
				EXEC MG_CrearItemComprobanteSearch 
					@cbi_icodigocab = @ComprobanteId,
					@cbi_irenglon = 0,
					@cbi_iproducto = @nov_idproducto,
					@cbi_inovedad = @idNovedad ,
					@cbi_inovedadtabla = 0 ,
					@cbi_yimporte = @totalItem  ,
					@cbi_icantidad = @cantidadItem,
					@cbi_ndescuento = 0
				FETCH NEXT FROM itemsTotal_cursor INTO  @idItem,@nov_idproducto, @cantidadItem,@idNovedad,@totalItem;
			END;
			CLOSE itemsTotal_cursor;
			DEALLOCATE itemsTotal_cursor;

			--Armo cuenta corriente
			print '[MG_LoteFacturasSearch] Creo cuenta corriente para comprobante '+convert(varchar(10), @ComprobanteId)
			print '[MG_LoteFacturasSearch] CC Total:'+convert(varchar(10), @Total)
				
			EXEC MG_m_cuenta_corriente_fcInsSearch 
				@cta_iCodigoCbte = @ComprobanteId,
				@cta_nCuota = 0,
				@cta_yTotal = @Total,
				@cta_ySaldo = @Total,
				@cta_dVencimiento = @DiaHoy,
				@cta_dCobro = null,
				@idCondicionPago = @IdCondicionPago

			--Actualizo proxima factura		
			print '[MG_LoteFacturasSearch] Actualizo proxima fecha cliente '+convert(varchar(10),@idCliente)
			DECLARE @proximaFactura DATE
			print '[MG_LoteFacturasSearch] proxima fecha de factura'
			print @cli_dproximafactura
			IF @ser_nTipo = 1
			BEGIN
				SET @proximaFactura = DATEADD(day, @ser_nperiodo, @cli_dproximafactura);
			END
			ELSE
			BEGIN
				SET @proximaFactura = DATEADD(month, @ser_nperiodo, @cli_dproximafactura);
			END
			print '[MG_LoteFacturasSearch] proxima fecha de factura'
			print @proximaFactura
							
			UPDATE _Datos..m_clientes_fc 
				SET cli_dproximafactura = @proximaFactura
				WHERE cli_iCodigo_ID = @idCliente

			--Armo envio de la factura
			IF @envio = 1 AND @tipoEnvio = 'Email'
			BEGIN
				print '[MG_LoteFacturasSearch] Programa de envio por mail.'
				print '[MG_LoteFacturasSearch] IdTemplate: '+ CONVERT (VARCHAR(20),@template)
				EXEC Mg_EnviarComprobantePorMail @ComprobanteId, @template
				print '[MG_LoteFacturasSearch] FIN Programa de envio por mail.'
			END
			
		Drop Table #tmpItems
						
		print '[MG_LoteFacturasSearch] ----FIN Cliente-----'
	END
	ELSE 
	BEGIN

		print '[MG_LoteFacturasSearch] No se crea nada por que el total es 0'
	END

	FETCH NEXT FROM clientes_cursor INTO @id, @idCliente;
END;
			

CLOSE clientes_cursor;
DEALLOCATE clientes_cursor;

END