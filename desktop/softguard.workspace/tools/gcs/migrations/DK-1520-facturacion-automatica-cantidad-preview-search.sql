-- DK-1520: Preview de cantidad automática para el wizard de facturación
-- Expone un resumen de contratos con cantidad automática y la cantidad estimada a facturar.

USE _Desktop;
GO

CREATE OR ALTER PROCEDURE [dbo].[MG_CantidadAutomaticaFacturacionPreviewSearch]
    @iOrganizacion INT = NULL,
    @categoriaImpositiva VARCHAR(50) = NULL,
    @condicionPago VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH contratos_filtrados AS (
        SELECT
            con.cnt_iid,
            con.cnt_idcliente,
            ISNULL(con.cnt_cantidad_auto, 0) AS cnt_cantidad_auto,
            ISNULL(cuentas.cuentas_activas, 0) AS cuentas_activas
        FROM _Datos..crm_contrato con
        INNER JOIN _Datos..m_clientes_fc cli ON cli.cli_icodigo_ID = con.cnt_idcliente
        OUTER APPLY (
            SELECT COUNT(*) AS cuentas_activas
            FROM _Datos..m_relacion_cliente_cuentas_fc rel
            INNER JOIN _Datos..m_cuentas cue ON cue.cue_iid = rel.rel_icuenta
            WHERE rel.rel_icliente = con.cnt_idcliente
              AND cue.cue_nEfectiva = 1
        ) cuentas
        WHERE ISNULL(con.cnt_estado, 0) = 1
          AND (@iOrganizacion IS NULL OR @iOrganizacion = 0 OR con.cnt_org_fc = @iOrganizacion)
          AND (@iOrganizacion IS NULL OR @iOrganizacion = 0 OR cli.cli_iorganizacion = @iOrganizacion)
          AND (@categoriaImpositiva IS NULL OR LTRIM(RTRIM(@categoriaImpositiva)) = '' OR cli.cli_ccategoriaimpositiva = @categoriaImpositiva)
          AND (@condicionPago IS NULL OR LTRIM(RTRIM(@condicionPago)) = '' OR cli.cli_ccondicionpago = @condicionPago)
    ),
    items AS (
        SELECT
            cf.cnt_iid,
            cf.cuentas_activas,
            CASE
                WHEN ISNULL(p.pro_cantidad_auto, 0) = 1 THEN 1
                WHEN cf.cnt_cantidad_auto = 1 THEN 1
                ELSE 0
            END AS item_cantidad_auto,
            CASE
                WHEN ISNULL(p.pro_cantidad_auto, 0) = 1 THEN CAST(cf.cuentas_activas AS FLOAT)
                WHEN cf.cnt_cantidad_auto = 1 THEN CAST(cf.cuentas_activas AS FLOAT)
                ELSE ISNULL(it.Quantity, 0)
            END AS cantidad_calculada
        FROM contratos_filtrados cf
        INNER JOIN _Datos..crm_contrato_item it ON it.idcontrato = cf.cnt_iid
        LEFT JOIN _Datos..Product p ON p.Id = it.ProductId
    )
    SELECT
        COUNT(DISTINCT CASE WHEN item_cantidad_auto = 1 THEN cnt_iid END) AS cantidadContratosAutomaticos,
        ISNULL(CAST(SUM(CASE WHEN cantidad_calculada > 0 THEN cantidad_calculada ELSE 0 END) AS INT), 0) AS cantidadTotalCalculada,
        COUNT(DISTINCT CASE WHEN item_cantidad_auto = 1 AND cuentas_activas = 0 THEN cnt_iid END) AS cantidadContratosSinCuentas
    FROM items;
END
GO

IF EXISTS (
    SELECT 1
    FROM dbo.SearchObject
    WHERE Name = 'MG_CantidadAutomaticaFacturacionPreview'
)
BEGIN
    UPDATE dbo.SearchObject
       SET ObjectTypeId = 0,
           Content = 'MG_CantidadAutomaticaFacturacionPreviewSearch',
           SearchType = 'Sql',
           IdProperty = NULL,
           TokenProperty = NULL,
           TotalRowsParameterName = NULL
     WHERE Name = 'MG_CantidadAutomaticaFacturacionPreview';
END
ELSE
BEGIN
    INSERT INTO dbo.SearchObject (
        Name,
        ObjectTypeId,
        Content,
        SearchType,
        IdProperty,
        TokenProperty,
        TotalRowsParameterName
    )
    VALUES (
        'MG_CantidadAutomaticaFacturacionPreview',
        0,
        'MG_CantidadAutomaticaFacturacionPreviewSearch',
        'Sql',
        NULL,
        NULL,
        NULL
    );
END
GO
