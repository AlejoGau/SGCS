-- DK-1500: Bonificacion por contrato en facturacion
-- Objetivo:
--   1. Leer la bonificacion vigente desde crm_contrato.cnt_metadata
--   2. Aplicarla al generar el comprobante
--   3. Persistir un snapshot inmutable del descuento aplicado

USE _Datos;
GO

IF COL_LENGTH('dbo.mg_comprobantefacturacioncontrato', 'cfc_cbonificaciontipo') IS NULL
    ALTER TABLE dbo.mg_comprobantefacturacioncontrato ADD cfc_cbonificaciontipo VARCHAR(20) NULL;
GO
IF COL_LENGTH('dbo.mg_comprobantefacturacioncontrato', 'cfc_nbonificacionvalor') IS NULL
    ALTER TABLE dbo.mg_comprobantefacturacioncontrato ADD cfc_nbonificacionvalor NUMERIC(18,2) NULL;
GO
IF COL_LENGTH('dbo.mg_comprobantefacturacioncontrato', 'cfc_ybonificacionimporte') IS NULL
    ALTER TABLE dbo.mg_comprobantefacturacioncontrato ADD cfc_ybonificacionimporte MONEY NOT NULL CONSTRAINT DF_mg_comprobantefacturacioncontrato_bonif_importe DEFAULT (0);
GO
IF COL_LENGTH('dbo.mg_comprobantefacturacioncontrato', 'cfc_nbonificacionpermanente') IS NULL
    ALTER TABLE dbo.mg_comprobantefacturacioncontrato ADD cfc_nbonificacionpermanente INT NOT NULL CONSTRAINT DF_mg_comprobantefacturacioncontrato_bonif_perm DEFAULT (0);
GO
IF COL_LENGTH('dbo.mg_comprobantefacturacioncontrato', 'cfc_dbonificaciondesde') IS NULL
    ALTER TABLE dbo.mg_comprobantefacturacioncontrato ADD cfc_dbonificaciondesde DATETIME NULL;
GO
IF COL_LENGTH('dbo.mg_comprobantefacturacioncontrato', 'cfc_dbonificacionhasta') IS NULL
    ALTER TABLE dbo.mg_comprobantefacturacioncontrato ADD cfc_dbonificacionhasta DATETIME NULL;
GO

USE _Desktop;
GO

IF OBJECT_ID('[dbo].[MG_ComprobanteBonificacionSel]', 'P') IS NULL
    EXEC ('CREATE PROCEDURE [dbo].[MG_ComprobanteBonificacionSel] AS BEGIN SET NOCOUNT ON; END');
GO

ALTER PROCEDURE [dbo].[MG_ComprobanteBonificacionSel]
    @IdComprobante INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1
        cfc_cbonificaciontipo,
        cfc_nbonificacionvalor,
        cfc_ybonificacionimporte,
        cfc_nbonificacionpermanente,
        cfc_dbonificaciondesde,
        cfc_dbonificacionhasta
    FROM _Datos..mg_comprobantefacturacioncontrato
    WHERE cfc_cbcicodigoid = @IdComprobante
    ORDER BY cfc_idkey DESC;
END
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
        declare @cnt_metadata varchar(max) = ''
        declare @subtotalBruto money = 0
        declare @subtotalNeto money = 0
        declare @Total money = 0
        declare @totalImpuestos1 money = 0
        declare @totalImpuestos2 money = 0
        declare @totalImpuestos3 money = 0
        declare @imp_nporcentaje numeric(5,2) = 0
        declare @bonificacionActiva int = 0
        declare @bonificacionTipo varchar(20) = ''
        declare @bonificacionValor numeric(18,2) = 0
        declare @bonificacionImporte money = 0
        declare @bonificacionPermanente int = 0
        declare @bonificacionDesde date = null
        declare @bonificacionHasta date = null
        declare @fechaFacturacion date = cast(getdate() as date)

        print '[MG_ContratoAFactura] Busco los datos asociados al contrato'
        SELECT @idcliente = cnt_idcliente
                ,@cbt_ccodigo = cbt_ccodigo
                ,@organizacionFacturadoraId = cli_iorganizacion
                ,@cnt_metadata = isnull(cnt_metadata, '')
                FROM _Datos..crm_contrato con
                inner join _datos..m_clientes_fc on cli_icodigo_ID = cnt_idcliente
                inner join _tablas..t_categorias_impositivas_fc on cli_ccategoriaimpositiva = cat_ccodigo and cat_orgicodigoid = cli_iorganizacion
                inner join _tablas..t_comprobantes_fc on cat_cbtidkey = cbt_idKey
                WHERE cnt_iid = @IdContrato

        if (isnull(@cnt_metadata, '') <> '' and isjson(@cnt_metadata) = 1)
        begin
                select
                        @bonificacionActiva =
                                case
                                        when lower(isnull(json_value(@cnt_metadata, '$.bonificacion.activa'), 'false')) in ('true', '1')
                                                then 1
                                        else 0
                                end,
                        @bonificacionTipo = lower(isnull(json_value(@cnt_metadata, '$.bonificacion.tipo'), '')),
                        @bonificacionValor = isnull(try_convert(numeric(18,2), json_value(@cnt_metadata, '$.bonificacion.valor')), 0),
                        @bonificacionPermanente =
                                case
                                        when lower(isnull(json_value(@cnt_metadata, '$.bonificacion.permanente'), 'false')) in ('true', '1')
                                                then 1
                                        else 0
                                end,
                        @bonificacionDesde = try_convert(date, nullif(json_value(@cnt_metadata, '$.bonificacion.vigencia_desde'), '')),
                        @bonificacionHasta = try_convert(date, nullif(json_value(@cnt_metadata, '$.bonificacion.vigencia_hasta'), ''));
        end

        -- DK-1498: Calcular cantidad de cuentas activas para este cliente
        declare @cuentasActivas int = 0
        SELECT @cuentasActivas = COUNT(*)
                FROM _Datos..m_relacion_cliente_cuentas_fc rel
                INNER JOIN _Datos..m_cuentas cue ON cue.cue_iid = rel.rel_icuenta
                WHERE rel.rel_icliente = @idcliente
                AND cue.cue_nEfectiva = 1

        print '[MG_ContratoAFactura] Cuentas activas del cliente: ' + CONVERT(varchar, @cuentasActivas)

        -- Calcular subtotal bruto usando la cantidad efectiva (automática o manual)
        SELECT
                @subtotalBruto = sum(
                        CASE WHEN ISNULL(p.pro_cantidad_auto, 0) = 1
                             THEN (CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END) * @cuentasActivas
                             ELSE (CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END) * it.Quantity
                        END
                )
                ,@imp_nporcentaje = max(isnull(imp_nporcentaje,0))
                FROM _Datos..crm_contrato con
                inner join _datos..m_clientes_fc on cli_icodigo_ID = cnt_idcliente
                inner join _tablas..t_categorias_impositivas_fc on cli_ccategoriaimpositiva = cat_ccodigo and cat_orgicodigoid = cli_iorganizacion
                inner join _tablas..t_comprobantes_fc on cat_cbtidkey = cbt_idKey
                inner join _datos..crm_contrato_item it ON con.cnt_iid = it.idcontrato
                left join _Datos..MG_listas_precios_detalle mglpd on mglpd.mglpd_idproducto = it.ProductId and (it.idlista is not null and mglpd.mglpd_idlista = it.idlista)
                left join _datos..mg_product_impuesto on it.ProductId = mpi_idproduct
                left join _tablas..t_impuestos_fc on mpi_impidkey = imp_idkey
                left join _Datos..Product p on p.Id = it.ProductId
                WHERE cnt_iid = @IdContrato
                group by cnt_idcliente, cbt_ccodigo, cli_iorganizacion

        if (@bonificacionActiva = 1 and @bonificacionValor > 0)
        begin
                if (@bonificacionPermanente = 1 or @bonificacionDesde is null or @bonificacionDesde <= @fechaFacturacion)
                   and (@bonificacionHasta is null or @bonificacionHasta >= @fechaFacturacion)
                begin
                        if (@bonificacionTipo = 'porcentaje')
                        begin
                                if (@bonificacionValor > 90)
                                        set @bonificacionValor = 90

                                set @bonificacionImporte = round(@subtotalBruto * (@bonificacionValor / 100.0), 2)
                        end
                        else if (@bonificacionTipo in ('monto', 'monto_fijo', 'importe', 'fixed'))
                        begin
                                set @bonificacionImporte = @bonificacionValor
                        end
                end
        end

        if (@bonificacionImporte < 0)
                set @bonificacionImporte = 0

        if (@bonificacionImporte > @subtotalBruto)
                set @bonificacionImporte = @subtotalBruto

        set @subtotalNeto = @subtotalBruto - @bonificacionImporte
        set @Total = @subtotalNeto * (1 + isnull(@imp_nporcentaje, 0) / 100)

        if (@imp_nporcentaje = 21)
        BEGIN
                select @totalImpuestos1 = @Total - @subtotalNeto
        END
        ELSE
        BEGIN
                select @totalImpuestos2 = @Total - @subtotalNeto
        END

        DECLARE @cbi_cdescripcion VARCHAR (MAX)
        DECLARE @cbi_yimporte FLOAT
        DECLARE @cbi_cimpuestos varchar(1024)
        declare @cbi_icantidad float
        DECLARE @vencimiento DATE
        declare @cbi_iproducto int

        declare @DiaHoy datetime
        select @DiaHoy = getdate();

        print '[MG_ContratoAFactura] @idcliente'
        print @idcliente
        print '[MG_ContratoAFactura] @cbt_ccodigo'
        print @cbt_ccodigo
        print '[MG_ContratoAFactura] @organizacionFacturadoraId'
        print @organizacionFacturadoraId
        print '[MG_ContratoAFactura] @bonificacionTipo'
        print @bonificacionTipo
        print '[MG_ContratoAFactura] @bonificacionImporte'
        print convert(varchar(30), @bonificacionImporte)

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

        print '[MG_ContratoAFactura] Creo comprobante para cliente '+convert(varchar(10), @idCliente)+' TOTAL '+ convert(varchar(10), @Total)+' SUBTOTAL '+ convert(varchar(10), @subtotalNeto)+' TipoComprobante '+ convert(varchar(10), @cbt_ccodigo)
        DECLARE @ComprobanteId INT
        EXEC MG_CrearComprobante @ID = @ComprobanteId OUTPUT
                , @Name = ''
                , @cbc_icliente = @idCliente
                , @cbc_dfecha = @DiaHoy
                , @cbc_ysubtotal = @subtotalNeto
                , @cbc_ytotal = @Total
                , @cbc_yimpuesto1 = @totalImpuestos1
                , @cbc_yimpuesto2 = @totalImpuestos2
                , @cbc_yimpuesto3 = @totalImpuestos3
                , @cbc_cestado = 0
                , @cbc_ctipocbte = @cbt_ccodigo
                , @organizacionFacturadoraId = @organizacionFacturadoraId
        print '[MG_ContratoAFactura] Se creo comprobante para cliente '+convert(varchar(10), @idCliente)+' con ID '+ convert(varchar(10), @ComprobanteId)

        print '[MG_ContratoAFactura] Guardo el comprobante en MG_ComprobanteFacturacionContrato'
        insert into _datos..mg_comprobantefacturacioncontrato (
                cfc_cntiid,
                cfc_iorganizacionfacturadora,
                cfc_cbcicodigoid,
                cfc_icliente,
                cfc_userid,
                cfc_cbonificaciontipo,
                cfc_nbonificacionvalor,
                cfc_ybonificacionimporte,
                cfc_nbonificacionpermanente,
                cfc_dbonificaciondesde,
                cfc_dbonificacionhasta
        )
        values (
                @IdContrato,
                @organizacionFacturadoraId,
                @ComprobanteId,
                @idCliente,
                @userid,
                nullif(@bonificacionTipo, ''),
                case when @bonificacionValor > 0 then @bonificacionValor else null end,
                @bonificacionImporte,
                @bonificacionPermanente,
                @bonificacionDesde,
                @bonificacionHasta
        )

        declare @items int = 0;
        DECLARE items_contrato_cursor CURSOR LOCAL FOR
                SELECT
                        it.ProductId as cbi_iproducto,
                        it.Description as [cbi_cdescripcion],
                        CASE WHEN ISNULL(p.pro_cantidad_auto, 0) = 1
                             THEN CAST(@cuentasActivas AS float)
                             ELSE it.Quantity
                        END as cbi_icantidad,
                                    CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END as cbi_yimporte,
                        convert(varchar(10),imp_idKey) as cbi_cimpuestos
                FROM _Datos..crm_contrato_item it
                inner JOIN _Datos..crm_contrato con ON con.cnt_iid = it.idcontrato
                left join _Datos..MG_listas_precios_detalle mglpd on mglpd.mglpd_idproducto = it.ProductId and (it.idlista is not null and mglpd.mglpd_idlista = it.idlista)
                left join _datos..mg_product_impuesto on it.ProductId = mpi_idproduct
                left join _tablas..t_impuestos_fc on mpi_impidkey = imp_idkey
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

        -- El SP de impuestos recompone la cabecera desde los items. Como en WebMG
        -- cbi_yimporte se interpreta como precio unitario, reaseguramos el subtotal
        -- neto bonificado y los importes de impuestos calculados para el comprobante.
        update _datos..m_comprobantes_cab_fc
                set cbc_ysubtotal = @subtotalNeto,
                        cbc_ytotal = @Total,
                        cbc_yimpuesto1 = @totalImpuestos1,
                        cbc_yimpuesto2 = @totalImpuestos2,
                        cbc_yimpuesto3 = @totalImpuestos3
                where cbc_iCodigo_ID = @ComprobanteId

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
GO
