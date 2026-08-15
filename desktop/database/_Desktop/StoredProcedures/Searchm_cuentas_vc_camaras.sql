CREATE OR ALTER PROCEDURE [dbo].[Searchm_cuentas_vc_camaras]
    @IdCuenta INT,
    @filter VARCHAR(2048) = NULL
AS
BEGIN
    -- A pedido de la tarea DK-801 el store muestra solo las cámaras con los siguientes IDs: (48, 45, 39, 37)
    SET NOCOUNT ON;

    DECLARE @Sql NVARCHAR(MAX);

    SET @Sql = N'
    SELECT 
        cv.cuv_idKey AS VideoId,
        cv.cuv_cCameraDesc AS VideoDescripcion,
		tvi.tvi_iid AS VideoTypeId,
		tvi.tvi_cnombre AS VideoTypeNombre,
        NULL AS LinkId,
        CAST(''0'' AS VARCHAR(50)) AS ZonaCodigo,
        NULL AS LinkDescripcion,
        NULL AS ZonaDescripcion
    FROM _Datos.dbo.m_cuentas_video cv
    LEFT JOIN _Tablas.dbo.t_VideoID tvi ON tvi.tvi_iid = cv.cuv_iVideoID
    WHERE cv.cuv_iidCuenta = @IdCuenta
      AND ISNULL(tvi.tvi_iid, 0) IN (48, 45, 39, 37)
    ';

    -- Si viene un filtro JSON, lo convertimos a cláusula WHERE adicional
    IF (ISNULL(@filter, '') <> '')
    BEGIN
        DECLARE @SqlFilter NVARCHAR(MAX) = dbo.GetSqlFilterForJson(@filter, 'cv');
        SET @Sql = @Sql + @SqlFilter;
    END

    SET @Sql = @Sql + N'
    UNION ALL
    SELECT 
        NULL AS VideoId,
        NULL AS VideoDescripcion,
		tvi.tvi_iid AS VideoTypeId,
		tvi.tvi_cnombre AS VideoTypeNombre,
        cvl.cvl_idKey AS LinkId,
        cvl.cvl_czona AS ZonaCodigo,
        cvl.cvl_cCameraDesc AS LinkDescripcion,
        z.zon_cdescripcion AS ZonaDescripcion
    FROM _Datos.dbo.m_cuentas_video_links cvl
    LEFT JOIN _Datos.dbo.m_zonas z 
        ON cvl.cvl_czona = z.zon_ccodigo
       AND cvl.cvl_iidCuenta = z.zon_iidcuenta
    LEFT JOIN _Tablas.dbo.t_VideoID tvi ON tvi.tvi_iid = cvl.cvl_iVideoID
    WHERE cvl.cvl_iidCuenta = @IdCuenta
      AND ISNULL(tvi.tvi_iid, 0) IN (48, 45, 39, 37);
    ';

    EXEC sp_executesql @Sql, N'@IdCuenta INT', @IdCuenta = @IdCuenta;
END