-- DK-1498: SP MG_ContratoAFactura actualizado
-- Cambio: cuando un item tiene un producto con pro_cantidad_auto = 1,
-- la cantidad se calcula como el número de cuentas activas del cliente
-- en lugar de usar la cantidad manual del contrato.

USE _Desktop;
GO

ALTER Procedure [dbo].[MG_ContratoAFactura]
        @IdContrato int,
        @template int = 0,
        @userid int
AS
BEGIN
        BEGIN TRAN
        DECLARE @idcliente INT
        declare @cbt_ccodigo char(3)
        declare @organizacionFacturadoraId int
        declare @totalItemsSinImpuestos money = 0
        declare @Total money = 0
        declare @totalImpuestos1 money = 0
        declare @totalImpuestos2 money = 0
        declare @totalImpuestos3 money = 0
        declare @imp_nporcentaje numeric(5,2) = 0

        print '[MG_ContratoAFactura] Busco los datos asociados al contrato'
        SELECT @idcliente = cnt_idcliente 
                ,@cbt_ccodigo = cbt_ccodigo
                ,@organizacionFacturadoraId = cli_iorganizacion
                FROM _Datos..crm_contrato con
                inner join _datos..m_clientes_fc on cli_icodigo_ID = cnt_idcliente
                inner join _tablas..t_categorias_impositivas_fc on cli_ccategoriaimpositiva = cat_ccodigo and cat_orgicodigoid = cli_iorganizacion
                inner join _tablas..t_comprobantes_fc on cat_cbtidkey = cbt_idKey
                WHERE cnt_iid = @IdContrato

        -- DK-1498: Calcular cantidad de cuentas activas para este cliente
        declare @cuentasActivas int = 0
        SELECT @cuentasActivas = COUNT(*)
                FROM _Datos..m_relacion_cliente_cuentas_fc rel
                INNER JOIN _Datos..m_cuentas cue ON cue.cue_iid = rel.rel_icuenta
                WHERE rel.rel_icliente = @idcliente
                AND cue.cue_nEfectiva = 1

        print '[MG_ContratoAFactura] Cuentas activas del cliente: ' + CONVERT(varchar, @cuentasActivas)

        -- Calcular totales usando la cantidad efectiva (automática o manual)
        SELECT
                @totalItemsSinImpuestos = sum(
                        CASE WHEN ISNULL(p.pro_cantidad_auto, 0) = 1 
                             THEN (CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END) * @cuentasActivas
                             ELSE (CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END) * it.Quantity
                        END
                )
                ,@Total = sum(
                        CASE WHEN ISNULL(p.pro_cantidad_auto, 0) = 1 
                             THEN (CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END) * @cuentasActivas * (1+isnull(imp_nporcentaje,0)/100)
                             ELSE (CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END) * it.Quantity * (1+isnull(imp_nporcentaje,0)/100)
                        END
                )
                ,@imp_nporcentaje = max(isnull(imp_nporcentaje,0))
                FROM _Datos..crm_contrato con
                inner join _datos..m_clientes_fc on cli_icodigo_ID = cnt_idcliente
                inner join _tablas..t_categorias_impositivas_fc on cli_ccategoriaimpositiva = cat_ccodigo and cat_orgicodigoid = cli_iorganizacion
                inner join _tablas..t_comprobantes_fc on cat_cbtidkey = cbt_idKey
                inner join _datos..crm_contrato_item it ON con.cnt_iid = it.idcontrato
                left join  _Datos..MG_listas_precios_detalle mglpd on mglpd.mglpd_idproducto = it.ProductId and (it.idlista is not null and mglpd.mglpd_idlista = it.idlista)
                left join _datos..mg_product_impuesto on it.ProductId = mpi_idproduct
                left join _tablas..t_impuestos_fc on mpi_impidkey = imp_idkey
                -- DK-1498: join con Product para leer pro_cantidad_auto
                left join _Datos..Product p on p.Id = it.ProductId
                WHERE cnt_iid = @IdContrato
                group by cnt_idcliente, cbt_ccodigo, cli_iorganizacion

        DECLARE @cbi_cdescripcion VARCHAR (MAX)
        DECLARE @cbi_yimporte FLOAT
        DECLARE @cbi_cimpuestos varchar(1024)
        declare @cbi_icantidad float
        DECLARE @vencimiento DATE
        declare @cbi_iproducto int

        if (@imp_nporcentaje = 21)
        BEGIN
                select @totalImpuestos1 = @Total -@totalItemsSinImpuestos
        END
        ELSE
        BEGIN
                select @totalImpuestos2 = @Total -@totalItemsSinImpuestos
        END

        declare @DiaHoy datetime
        select @DiaHoy = getdate();

        print '[MG_ContratoAFactura] @idcliente'
        print @idcliente
        print '[MG_ContratoAFactura] @cbt_ccodigo'
        print @cbt_ccodigo
        print '[MG_ContratoAFactura] @organizacionFacturadoraId'
        print @organizacionFacturadoraId

        if @idcliente = 0 or @idcliente is null
        BEGIN
                print '[MG_ContratoAFactura] no se pudieron resolver los datos del contrato'
                ROLLBACK TRAN
                set noexec on
        END 

        print '[MG_ContratoAFactura] Controlo que el contrato no tenga un comprobante para este período'
        declare @cfc_idkey int = 0

        select @cfc_idkey = cfc_idkey 
                from _datos..mg_comprobantefacturacioncontrato 
                where cfc_cntiid = @IdContrato
                        and LEFT(CONVERT(varchar, GetDate(),112),6) = LEFT(CONVERT(varchar, cfc_fecha,112),6)

        if @cfc_idkey >0
        BEGIN
                print '[MG_ContratoAFactura] el contrato ya se encuentra facturado para el periodo '+LEFT(CONVERT(varchar, GetDate(),112),6)
                ROLLBACK TRAN
                set noexec on
        END 

        print '[MG_ContratoAFactura] Creo comprobante para cliente '+convert(varchar(10), @idCliente)+' TOTAL '+ convert(varchar(10), @Total)+' SUBTOTAL '+ convert(varchar(10), @totalItemsSinImpuestos)+' TipoComprobante '+ convert(varchar(10), @cbt_ccodigo)
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
                , @cbc_ctipocbte = @cbt_ccodigo
                , @organizacionFacturadoraId = @organizacionFacturadoraId
        print '[MG_ContratoAFactura] Se creo comprobante para cliente '+convert(varchar(10), @idCliente)+' con ID '+ convert(varchar(10), @ComprobanteId)

        print '[MG_ContratoAFactura] Guardo el comprobante en MG_ComprobanteFacturacionContrato'
        insert into _datos..mg_comprobantefacturacioncontrato (cfc_cntiid,cfc_iorganizacionfacturadora,cfc_cbcicodigoid,cfc_icliente, cfc_userid) 
                values (@IdContrato,@organizacionFacturadoraId,@ComprobanteId,@idCliente,@userid)

        declare @items int = 0;
        DECLARE items_contrato_cursor CURSOR LOCAL FOR
                SELECT 
                        it.ProductId as cbi_iproducto,
                        it.Description as [cbi_cdescripcion],
                        -- DK-1498: usar cuentas activas si pro_cantidad_auto = 1
                        CASE WHEN ISNULL(p.pro_cantidad_auto, 0) = 1
                             THEN CAST(@cuentasActivas AS float)
                             ELSE it.Quantity
                        END as cbi_icantidad,
                                    -- WebMG interpreta cbi_yimporte como precio unitario.
                                    CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END as cbi_yimporte,
                        convert(varchar(10),imp_idKey) as cbi_cimpuestos 
                FROM _Datos..crm_contrato_item it
                inner JOIN _Datos..crm_contrato con ON con.cnt_iid = it.idcontrato
                left join  _Datos..MG_listas_precios_detalle mglpd on mglpd.mglpd_idproducto = it.ProductId and (it.idlista is not null and mglpd.mglpd_idlista = it.idlista)
                left join _datos..mg_product_impuesto on it.ProductId = mpi_idproduct
                left join _tablas..t_impuestos_fc on mpi_impidkey = imp_idkey
                -- DK-1498: join con Product
                left join _Datos..Product p on p.Id = it.ProductId
                where cnt_iid = @IdContrato

                OPEN items_contrato_cursor;
                FETCH NEXT FROM items_contrato_cursor INTO @cbi_iproducto, @cbi_cdescripcion, @cbi_icantidad, @cbi_yimporte, @cbi_cimpuestos;

                WHILE @@FETCH_STATUS = 0
                BEGIN
                        print '[MG_ContratoAFactura] insertando item en la factura'
                        INSERT INTO _datos..[m_comprobantes_item_fc] ([cbi_iCodigoCab]
                                ,[cbi_iProducto]
                                ,[cbi_yImporte]
                                ,[cbi_iCantidad]
                                ,[cbi_cdescripcion]
                                ,[cbi_cimpuestos])
                        VALUES (@ComprobanteId, @cbi_iproducto, @cbi_yimporte, @cbi_icantidad, @cbi_cdescripcion, @cbi_cimpuestos)

                        select @items = @items + 1

                FETCH NEXT FROM items_contrato_cursor INTO @cbi_iproducto, @cbi_cdescripcion, @cbi_icantidad, @cbi_yimporte, @cbi_cimpuestos;
                END
        CLOSE items_contrato_cursor;
        DEALLOCATE items_contrato_cursor;

        print '[MG_ContratoAFactura] inserto los impuestos del comprobante.'
        exec _desktop..[MG_cacularImpuestosProductosByComprobante] @idComprobante=@ComprobanteId

        update _datos..m_comprobantes_cab_fc set cbc_cestado = 1 where cbc_iCodigo_ID = @ComprobanteId

        IF @template >0
        BEGIN
                print '[MG_ContratoAFactura] Comprobante envio por mail.'
                print '[MG_ContratoAFactura] IdTemplate: '+ CONVERT (VARCHAR(20),@template)
                EXEC Mg_EnviarComprobantePorMail @ComprobanteId, @template
                print '[MG_ContratoAFactura] FIN Comprobante envio por mail.'
        END

        if @items = 0
        BEGIN
                print '[MG_ContratoAFactura] no se encontraron los items para el contrato'
                rollback tran
        END

        COMMIT TRANSACTION

        set noexec off
END
