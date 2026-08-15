CREATE OR ALTER PROCEDURE [dbo].[EventosInformados_Fetch] 
    @estado       VARCHAR(30)  = 'Revision',
    @page         INT          = 1,
    @start        INT          = 0,
    @limit        INT          = 50,
    @sort         VARCHAR(256) = 'fechaHora',
    @dir          VARCHAR(4)   = 'DESC',
    @group        VARCHAR(256) = '',
    @filter       VARCHAR(2048)= '',
    @_dc          VARCHAR(256) = '',
    @oauth_token  VARCHAR(100) = '',
    @debug        BIT          = 0,              -- 👈 NUEVO
    @totalrows    INT          = 0 OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    ------------------------------------------------------------
    -- Normalización básica
    ------------------------------------------------------------
    SET @estado = LTRIM(RTRIM(ISNULL(@estado,'')));
    SET @sort   = LTRIM(RTRIM(ISNULL(@sort,'')));
    SET @dir    = UPPER(LTRIM(RTRIM(ISNULL(@dir,'DESC'))));

    IF @sort = '' SET @sort = 'fechaHora';

    IF @dir NOT IN ('ASC','DESC') SET @dir = 'DESC';

    ------------------------------------------------------------
    -- Whitelist para @sort (evita inyección y errores)
    ------------------------------------------------------------
    IF @sort NOT IN (
        'id','fechaHora','descripcionEvento','video','imagen','audio',
        'comentarioEvento','usuarioEvento','cantReportes','estadoEvento','idEstado'
    )
    BEGIN
        SET @sort = 'fechaHora';
    END

    IF @debug = 1
    BEGIN
        PRINT 'DEBUG ON';
        PRINT 'estado=' + ISNULL(@estado,'NULL') + ' | start=' + CAST(@start AS VARCHAR(20)) + ' | limit=' + CAST(@limit AS VARCHAR(20));
        PRINT 'sort=' + ISNULL(@sort,'NULL') + ' | dir=' + ISNULL(@dir,'NULL');
    END

    ------------------------------------------------------------
    -- Temp 1: Reportes
    ------------------------------------------------------------
    CREATE TABLE #TempReportes (
        evi_iRecId INT PRIMARY KEY,
        cantReportes INT
    );

    INSERT INTO #TempReportes (evi_iRecId, cantReportes)
    SELECT 
        evi_iRecId,
        SUM(CASE WHEN evi_iCheck = 1 AND evi_iCheckType IN (1,2,3) THEN 1 ELSE 0 END) AS cantReportes
    FROM [_Datos].[dbo].[EventosInformados]
    GROUP BY evi_iRecId;

    IF @debug = 1
        SELECT COUNT(*) AS Debug_TempReportesRows FROM #TempReportes;

    ------------------------------------------------------------
    -- Temp 2: Data final
    ------------------------------------------------------------
    CREATE TABLE #TempData (
        id INT PRIMARY KEY,
        fechaHora DATETIME,
        descripcionEvento NVARCHAR(255),
        video INT,
        imagen INT,
        audio INT,
        comentarioEvento NVARCHAR(MAX),
        usuarioEvento NVARCHAR(255),
        cantReportes INT,
        estadoEvento NVARCHAR(50),
        idEstado INT
    );

    ------------------------------------------------------------
    -- Insert de datos (query fija)
    ------------------------------------------------------------
    INSERT INTO #TempData
    (
        id, fechaHora, descripcionEvento, video, imagen, audio,
        comentarioEvento, usuarioEvento, cantReportes, estadoEvento, idEstado
    )
    SELECT
        ei.evi_iRecId AS id,
        MIN(pr.rec_tfechahora) AS fechaHora,
        ei.evi_cAlarmaDesc AS descripcionEvento,
        CASE WHEN pr.rec_cContenido LIKE '%\[MP4\]%' ESCAPE '\' THEN 1 ELSE 0 END AS video,
        CASE WHEN pr.rec_cContenido LIKE '%\[JPG\]%' ESCAPE '\' THEN 1 ELSE 0 END AS imagen,
        CASE WHEN pr.rec_cContenido LIKE '%\[MP3\]%' ESCAPE '\' THEN 1 ELSE 0 END AS audio,
        CASE 
            WHEN CHARINDEX('[SmartPanics]', CAST(pr.rec_cobservaciones AS NVARCHAR(MAX))) > 0 THEN
                LTRIM(
                    SUBSTRING(
                        CAST(pr.rec_cobservaciones AS NVARCHAR(MAX)),
                        CHARINDEX('[SmartPanics]', CAST(pr.rec_cobservaciones AS NVARCHAR(MAX))) + LEN('[SmartPanics]'),
                        CASE 
                            WHEN CHARINDEX('[', CAST(pr.rec_cobservaciones AS NVARCHAR(MAX)),
                                 CHARINDEX('[SmartPanics]', CAST(pr.rec_cobservaciones AS NVARCHAR(MAX))) + LEN('[SmartPanics]')) > 0
                            THEN CHARINDEX('[', CAST(pr.rec_cobservaciones AS NVARCHAR(MAX)),
                                 CHARINDEX('[SmartPanics]', CAST(pr.rec_cobservaciones AS NVARCHAR(MAX))) + LEN('[SmartPanics]')) -
                                 (CHARINDEX('[SmartPanics]', CAST(pr.rec_cobservaciones AS NVARCHAR(MAX))) + LEN('[SmartPanics]'))
                            ELSE LEN(CAST(pr.rec_cobservaciones AS NVARCHAR(MAX)))
                        END
                    )
                )
            ELSE ''
        END AS comentarioEvento,
        u.usu_cnombre AS usuarioEvento,
        r.cantReportes,
        CASE 
            WHEN ei.evi_iStatus = 0 THEN 'Aprobado'
            WHEN ei.evi_iStatus = 1 THEN 'En Revision'
            WHEN ei.evi_iStatus = 2 THEN 'Denegado'
            ELSE ''
        END AS estadoEvento,
        ei.evi_iStatus AS idEstado
    FROM [_Datos].[dbo].[p_recepcion] pr
    INNER JOIN #TempReportes r 
        ON pr.rec_iid = r.evi_iRecId
    INNER JOIN [_Datos].[dbo].[EventosInformados] ei 
        ON pr.rec_iid = ei.evi_iRecId
    INNER JOIN [_Datos].[dbo].[m_cuentas] mc 
        ON mc.cue_iid = ei.evi_iCuentaId
    INNER JOIN [_Datos].[dbo].[m_usuarios] u 
        ON pr.rec_iidcuenta = u.usu_iidcuenta 
       AND u.usu_icodigo    = pr.rec_iusuario
    WHERE 
        (
            @estado = 'Todas'
            OR (@estado = 'Aprobado' AND ei.evi_iStatus = 0)
            OR (@estado = 'Revision' AND ei.evi_iStatus = 1)
            OR (@estado = 'Denegado' AND ei.evi_iStatus = 2)
        )
    GROUP BY 
        ei.evi_iRecId,
        ei.evi_cAlarmaDesc,
        u.usu_cnombre,
        ei.evi_iStatus,
        CAST(pr.rec_cobservaciones AS NVARCHAR(MAX)),
        pr.rec_cContenido,
        r.cantReportes;

    IF @debug = 1
    BEGIN
        SELECT COUNT(*) AS Debug_TempDataRows FROM #TempData;

        -- Te sirve para ver si estás paginando fuera de rango
        SELECT MIN(fechaHora) AS Debug_MinFecha, MAX(fechaHora) AS Debug_MaxFecha FROM #TempData;
    END

    ------------------------------------------------------------
    -- Total rows (para paginación)
    ------------------------------------------------------------
    SELECT @totalrows = COUNT(*) FROM #TempData;

    ------------------------------------------------------------
    -- SQL dinámico (ORDER BY / OFFSET)
    ------------------------------------------------------------
    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'
SELECT *
FROM #TempData
ORDER BY ' + QUOTENAME(@sort) + N' ' + @dir + N'
OFFSET @start ROWS FETCH NEXT @limit ROWS ONLY;
';

    -- 👇 esto te devuelve el SQL generado “tal cual”
    IF @debug = 1
    BEGIN
        SELECT @sql AS Debug_SQL_Generado;
    END

    EXEC sp_executesql
        @sql,
        N'@start INT, @limit INT',
        @start = @start,
        @limit = @limit;

    DROP TABLE #TempReportes;
    DROP TABLE #TempData;
END