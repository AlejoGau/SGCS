CREATE OR ALTER PROCEDURE [dbo].[SGSP_SofiaVideoLinks]
    @page    INT           = 1,
    @start   INT           = 0,
    @limit   INT           = 50,
    @sort    VARCHAR(256)  = '',
    @group   VARCHAR(256)  = '',
    @filter  VARCHAR(2048) = '',
    @_dc     VARCHAR(256)  = '',
    @token   VARCHAR(128),
    @totalrows INT = 1 OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    /* -------- Sort -------- */
    DECLARE @SqlSort VARCHAR(256);
    SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'Q.[iidCuenta] DESC');

    /* -------- Filters (JSON) -------- */
    DECLARE @SqlFilter VARCHAR(4096);
    SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SGSP_SofiaVideoLinks');

    /* -------- Rangos por token -------- */
    DECLARE @SqlFilterRango VARCHAR(MAX);
    EXEC getSqlRangesForToken
        @table = 'm_cuentas',
        @token = @token,
        @alias = 'c.',
        @SqlFilterRango = @SqlFilterRango OUTPUT;

    /* -------- FROM/WHERE dinámico -------- */
    DECLARE @Sql NVARCHAR(MAX);

    SET @Sql = N'
    FROM (
        SELECT
            cuv_idkey            AS id,
            ''cuentas_video''     AS source,
            cuv_iidCuenta         AS iidCuenta,
            cuv_cLink             AS link,
            cuv_cLinkDSS          AS link_dss,
            cuv_iVideoID          AS video_id,
            CAST(NULL AS NVARCHAR(50)) AS czona,
            tvi_nLaunch           AS launch,
            tvi_cdescripcion      AS descripcion,
            ''Link general de la cuenta''       AS nombre,
            tvi_iplatform         AS plataforma
        FROM _Datos.dbo.m_cuentas_video WITH (NOLOCK)
        INNER JOIN _Tablas.dbo.t_VideoID WITH (NOLOCK)
            ON cuv_iVideoID = tvi_iid

        UNION ALL

        SELECT
            cvl_idkey            AS id,
            ''cuentas_video_links'' AS source,
            cvl_iidCuenta        AS iidCuenta,
            cvl_cLink            AS link,
            cvl_cLinkDSS         AS link_dss,
            cvl_iVideoID         AS video_id,
            cvl_czona            AS czona,
            tvi_nLaunch          AS launch,
            tvi_cdescripcion     AS descripcion,
            cvl_cCameraName      AS nombre,
            tvi_iplatform        AS plataforma
        FROM _Datos.dbo.m_cuentas_video_links AS L WITH (NOLOCK)
        INNER JOIN _Tablas.dbo.t_VideoID WITH (NOLOCK)
            ON L.cvl_iVideoID = tvi_iid
    ) AS Q
    INNER JOIN _Datos.dbo.m_cuentas AS c WITH (NOLOCK) ON c.cue_iid = Q.iidCuenta
    LEFT JOIN [_Datos]..[m_zonas] z ON Q.czona = zon_ccodigo AND Q.iidCuenta = zon_iidcuenta
    WHERE 1=1 ' + ISNULL(@SqlFilter,'') + ISNULL(@SqlFilterRango,'');

    /* -------- Total Rows -------- */
    DECLARE @DynamicSqlTotalRows NVARCHAR(MAX);
    SET @DynamicSqlTotalRows = N'SELECT @TotalRows = COUNT(*) ' + @Sql;
    EXEC sp_executesql
        @DynamicSqlTotalRows,
        N'@TotalRows INT OUTPUT',
        @TotalRows = @totalrows OUTPUT;

    /* -------- Return Rows -------- */
    DECLARE @from INT, @to INT;
    SELECT @from = (@page - 1) * @limit + 1,
           @to   = @page * @limit;

    DECLARE @DynamicSqlReturnRows NVARCHAR(MAX);
    SET @DynamicSqlReturnRows = N'
        SELECT *
        FROM (
            SELECT
                ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + N') AS RowNumber,
                Q.id,
                Q.source,
                Q.iidCuenta,
                Q.link,
                Q.link_dss,
                Q.video_id,
                Q.czona,
                Q.launch,
                Q.descripcion,
                ISNULL(NULLIF(Q.nombre, ''''), z.zon_cdescripcion) as nombre,
                Q.plataforma
            ' + @Sql + N'
        ) AS T
        WHERE T.RowNumber BETWEEN @from AND @to';

    EXEC sp_executesql
        @DynamicSqlReturnRows,
        N'@from INT, @to INT',
        @from = @from,
        @to   = @to;
END