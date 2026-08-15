USE _Desktop;
GO

CREATE OR ALTER PROCEDURE [dbo].[MG_CuentasActivasClienteSearch]
    @iCliente INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(*) AS cuentas_activas
    FROM _Datos..m_relacion_cliente_cuentas_fc rel
    INNER JOIN _Datos..m_cuentas cue ON cue.cue_iid = rel.rel_icuenta
    WHERE rel.rel_icliente = @iCliente
      AND cue.cue_nEfectiva = 1;
END
GO

IF NOT EXISTS (
    SELECT 1
    FROM dbo.SearchObject
    WHERE Name = 'MG_CuentasActivasCliente'
)
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
        'MG_CuentasActivasCliente',
        0,
        'MG_CuentasActivasClienteSearch',
        'Sql',
        NULL,
        NULL,
        NULL
    );
END
GO
