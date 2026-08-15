CREATE OR ALTER PROCEDURE [dbo].[ReporteRondasVigiControlSearch]
    @page INT = 1,
    @start INT = 0,
    @limit INT = 1000,
    @sort VARCHAR(256) = '',
    @group VARCHAR(256) = '',
    @filter VARCHAR(2048) = '',
    @_dc VARCHAR(256) = '',
    @token VARCHAR(128) = '',
    @vigilador VARCHAR(256) = '',
    @cuenta VARCHAR(256) = '',
    @cue_clinea Char(3) = '',
    @fechadesde NVARCHAR(256) = '',
    @fechahasta NVARCHAR(256) = '',
    @fromCleanApp VARCHAR(5) = '',
    @totalrows INT = 1
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @SqlSort VARCHAR(256);
    SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, ' s.idCuenta DESC, FechaHoraInicioRonda, usu_cnombre DESC, r.[Name] ASC');

    DECLARE @SqlWhere  NVARCHAR(MAX) = '';
    DECLARE @SqlWhereS3 NVARCHAR(MAX) = ''; -- filtros para s3 (inifin)
    DECLARE @SqlWhereS2 NVARCHAR(MAX) = ''; -- filtros para s2 (StatusObjetivo)

    IF (@vigilador <> '')
        SET @SqlWhere = @SqlWhere + ' AND u.usu_cnombre LIKE ''%' + @vigilador + '%''';

    IF (@cuenta <> '')
        SET @SqlWhere = @SqlWhere + ' AND s.idCuenta = ''' + @cuenta + '''';

    IF (@cue_clinea <> '')
        SET @SqlWhere = @SqlWhere + ' AND c.cue_clinea = ''' + @cue_clinea + '''';

    IF (@fechadesde <> '')
        SET @SqlWhere = @SqlWhere + ' AND s.limitdate >= ''' + @fechadesde + '''';

    IF (@fechahasta <> '')
        SET @SqlWhere = @SqlWhere + ' AND s.limitdate <= ''' + @fechahasta + '''';

    IF (@fechadesde <> '')
        SET @SqlWhereS3 = @SqlWhereS3 + ' AND s3.limitdate >= ''' + @fechadesde + '''';

    IF (@fechahasta <> '')
        SET @SqlWhereS3 = @SqlWhereS3 + ' AND s3.limitdate <= ''' + @fechahasta + '''';

    IF (@fechadesde <> '')
        SET @SqlWhereS2 = @SqlWhereS2 + ' AND s2.limitdate >= inifin.FechaHoraInicioRonda';

    IF (@fechahasta <> '')
        SET @SqlWhereS2 = @SqlWhereS2 + ' AND s2.limitdate <= inifin.FechaHoraFinRonda';

    IF (@fromCleanApp <> '')
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo = 9 ';
    ELSE
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo != 9 ';

    DECLARE @SqlFilterRango VARCHAR(MAX) = '';
    EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT;
    SET @SqlWhere = @SqlWhere + @SqlFilterRango;

    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'
        SELECT
            s.[Id],
            s.[Name],
            s.[eventtype],
            s.[idCuenta],
            s.[iRoute],
            s.[idUsuario],
            s.[status] as StatusCheckpoint,
            s.[result] as ResultCheckpoint,
            s.[programId],
            rp.[starthour] as HoraRuta,
            right(''00''+convert(varchar(2), rp.[startminutes]), 2) as MinutosRuta,
            u.[usu_cnombre] as NombreVigilador,
            r.[Name] as NombreRuta,
            c.[cue_cnombre] as NombreObjectivo,
            1 as StatusObjetivo,
            StatusObjetivo.result as ResultObjetivo,
            inifin.FechaHoraInicioRonda,
            inifin.FechaHoraFinRonda,
            s.limitdate,
            convert(date, inifin.FechaHoraInicioRonda) as FechaInicioRonda,
            convert(date, inifin.FechaHoraFinRonda) as FechaFinRonda,

            VC.chp_rLatitud  AS CheckpointLat,
            VC.chp_rLongitud AS CheckpointLng

        FROM [_Datos].[dbo].[Scheduler] s
            LEFT JOIN [_Datos].[dbo].[m_usuarios] u
                ON ( s.[idUsuario] = u.usu_iid AND s.[idCuenta] = u.[usu_iidcuenta] )
            LEFT JOIN [_Datos].[dbo].[VC_Routes] r
                ON ( s.[iRoute] = r.[Id] )
            LEFT JOIN [_Datos].[dbo].[VC_Route_Programs] rp
                ON ( s.[programId] = rp.[Id] )
            LEFT JOIN [_Datos].[dbo].[m_cuentas] c
                ON ( s.[idCuenta] = c.[cue_iid] )
            LEFT OUTER JOIN _Tablas.dbo.t_tipos
                ON tip_ccodigo = c.cue_ctipo

            LEFT JOIN [_Tablas].[dbo].[t_CheckPoints_VC] VC
                ON VC.chp_iCuenta = s.idCuenta
               AND LTRIM(RTRIM(VC.chp_cZona)) COLLATE DATABASE_DEFAULT
                   = LTRIM(RTRIM(s.cZona))    COLLATE DATABASE_DEFAULT

            OUTER APPLY(
                SELECT
                    ISNULL(min(s3.startdate),'''') as FechaHoraInicioRonda,
                    max(s3.limitdate) as FechaHoraFinRonda
                FROM [_Datos].[dbo].[Scheduler] s3
                WHERE s3.template = 9001
                    AND s3.iRoute = s.iRoute
                    AND s3.status > 0
                    AND s3.idcuenta = s.idcuenta
                    AND s3.programid = s.programid
                    AND convert(date, s3.limitdate) = convert(date, s.limitdate)
                    ' + @SqlWhereS3 + N'
            ) inifin

            OUTER APPLY (
                SELECT count(*) as result
                FROM [_Datos].[dbo].[Scheduler] s2
                WHERE s2.template = 9001
                    AND s2.iRoute = s.iRoute
                    AND s2.status > 0
                    AND s2.idcuenta = s.idcuenta
                    AND s2.programid = s.programid
                    AND s2.result = 0
                    ' + @SqlWhereS2 + N'
            ) StatusObjetivo

        WHERE s.template = 9001
            AND s.status > 0
            AND s.programId > 0
            ' + @SqlWhere + N'
        ORDER BY ' + @SqlSort + N';';

    EXECUTE (@sql);
END