CREATE OR ALTER PROCEDURE [dbo].[Searchs_tablahistoricos]
    @page INT = 1,
    @start INT = 0,
    @limit INT = 50,
    @sort VARCHAR(256) = '',
    @token VARCHAR(256) = '',
    @group VARCHAR(256) = '',
    @filter VARCHAR(2048) = '',
    @_dc VARCHAR(256) = '',
    @totalrows INT = 1 OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    -- Pablo Castrovinci | 07/01/2026 | Se agrega ORDER BY DESC sobre c_periodo para asegurar el orden correcto de períodos históricos en la búsqueda.

    DECLARE @orderDir NVARCHAR(4) = N'DESC';
    IF @sort IS NOT NULL AND @sort LIKE '%"direction":"ASC"%'
        SET @orderDir = N'ASC';

    ;WITH base AS (
        SELECT DISTINCT RTRIM(c_periodo) AS c_periodo
        FROM _Sistema..s_tablahistoricos
        WHERE c_periodo <> 'p_recepcion_D'
          AND TRY_CONVERT(INT, SUBSTRING(RTRIM(c_periodo), 12, 6))
              <= TRY_CONVERT(INT, CONVERT(NVARCHAR(6), GETDATE(), 112))
    )
    SELECT @totalrows = COUNT(1) FROM base;

    DECLARE @sql NVARCHAR(MAX) = N'
        WITH base AS (
            SELECT DISTINCT RTRIM(c_periodo) AS c_periodo
            FROM _Sistema..s_tablahistoricos
            WHERE c_periodo <> ''p_recepcion_D''
              AND TRY_CONVERT(INT, SUBSTRING(RTRIM(c_periodo), 12, 6))
                  <= TRY_CONVERT(INT, CONVERT(NVARCHAR(6), GETDATE(), 112))
        )
        SELECT c_periodo
        FROM base
        ORDER BY c_periodo ' + CASE WHEN @orderDir = N'ASC' THEN N'ASC' ELSE N'DESC' END + N'
        OFFSET @start ROWS FETCH NEXT @limit ROWS ONLY;
    ';

    EXEC sp_executesql @sql, N'@start INT, @limit INT', @start=@start, @limit=@limit;
END