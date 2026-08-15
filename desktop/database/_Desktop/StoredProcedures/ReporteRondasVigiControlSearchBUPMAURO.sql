CREATE OR ALTER PROCEDURE [dbo].[ReporteRondasVigiControlSearchBUPMAURO]
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
	@cue_clinea	Char(3) = '',             
	@fechadesde NVARCHAR(256) = '',
	@fechahasta NVARCHAR(256) = '',
    @fromCleanApp VARCHAR(5) = '',
	@totalrows INT = 1 --OUTPUT
AS
BEGIN
--Sort
DECLARE @SqlSort AS VARCHAR(256)
----SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, ' s.idCuenta DESC, usu_cnombre DESC, r.[Name] ASC, rp.[starthour] DESC, rp.[startminutes] DESC')
--SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, ' s.idCuenta DESC,   convert(date,s.limitdate) ASC, usu_cnombre DESC, r.[Name] ASC')
--2024-01-19. Pablo : DSS-940 se pidio cambiar el orden
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, '  s.idCuenta DESC,  FechaHoraInicioRonda, usu_cnombre DESC, r.[Name] ASC')

-- TOMO LOS CAMPOS DE LOS COMBO DEL REPORTE Y ARMO EL WHERE
DECLARE @SqlWhere NVARCHAR(MAX);
DECLARE @SqlWhere2 NVARCHAR(MAX);
DECLARE @SqlWhere3 NVARCHAR(MAX);

SET @SqlWhere = '';
SET @SqlWhere2 = '';
SET @SqlWhere3 = '';

IF (@vigilador != '')
	BEGIN
        SET @SqlWhere = @SqlWhere + ' AND u.usu_cnombre LIKE ''%' + @vigilador + '%''';
	END
IF (@cuenta != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND s.idCuenta = ''' + @cuenta + '''';
	END

--2024-08-02. Pablo : DK-282 se pidio agregar filtro
IF (@cue_clinea != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND c.cue_clinea = ''' + @cue_clinea + '''';
	END

IF (@fechadesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND s.limitdate >= ''' + @fechadesde+ '''';
		SET @SqlWhere2 = @SqlWhere2 + ' AND s2.limitdate >= ''' +@fechadesde+ '''';
		SET @SqlWhere3 = @SqlWhere3 + ' AND s2.limitdate >= inifin.FechaHoraInicioRonda';

	END
IF (@fechahasta != '')
	BEGIN
		-- SUMO 1 AL DIA QUE VIENE DESDE EL REPORTE PARA OBTENER LAS 24HS DEL DIA ANTERIOR.
		SET @SqlWhere = @SqlWhere + ' AND s.limitdate <= ''' + @fechahasta+ '''';
		SET @SqlWhere2 = @SqlWhere2 + ' AND s2.limitdate <= ''' + @fechahasta+ '''';
		SET @SqlWhere3 = @SqlWhere3 + ' AND s2.limitdate <= inifin.FechaHoraFinRonda';
	END
IF (@fromCleanApp != '')
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo = 9 ';
    END
ELSE
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo != 9 ';
    END
IF (@cuenta != '')
/*
IF (@fechadesde != '')
	BEGIN
		--SET @SqlWhere2 = @SqlWhere2 + ' AND s2.limitdate >= ''' + convert(varchar,convert(date,@fechadesde,120),112)+ '''';
	END
IF (@fechahasta != '')
	BEGIN
		-- SUMO 1 AL DIA QUE VIENE DESDE EL REPORTE PARA OBTENER LAS 24HS DEL DIA ANTERIOR.
		--SET @SqlWhere2 = @SqlWhere2 + ' AND s2.limitdate <= ''' + convert(varchar,DATEADD(day,2,convert(date,@fechahasta,120)),112)+ '''';
	END
	*/
--RANGOS
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
print ' -- Rangos -- '
print @SqlFilterRango
SET @SqlWhere = @SqlWhere + @SqlFilterRango
DECLARE @sql AS VARCHAR(MAX)
SET @sql = 'SELECT
                s.[Id]
                ,s.[Name]
                --,s.[limitdate]
                ,s.[eventtype]
                ,s.[idCuenta]
                ,s.[iRoute]
                ,s.[idUsuario]
                ,s.[status] as StatusCheckpoint
                ,s.[result] as ResultCheckpoint
                ,s.[programId]
                ,rp.[starthour] as HoraRuta
				,right(''00''+convert(varchar(2), rp.[startminutes]), 2) as MinutosRuta
                ,u.[usu_cnombre] as NombreVigilador
                ,r.[Name] as NombreRuta
                ,c.[cue_cnombre] as NombreObjectivo
                ,1 as StatusObjetivo
                ,StatusObjetivo.result as ResultObjetivo
				,inifin.FechaHoraInicioRonda --,s.startdate as FechaHoraInicioRonda
				,inifin.FechaHoraFinRonda --,s.limitdate as FechaHoraFinRonda
				,s.limitdate
				,convert(date, inifin.FechaHoraInicioRonda) as FechaInicioRonda --,convert(date,s.startdate) as FechaInicioRonda
				,convert(date, inifin.FechaHoraFinRonda) as FechaFinRonda --,convert(date,s.limitdate) as FechaFinRonda
            FROM [_Datos].[dbo].[Scheduler] s
                LEFT JOIN [_Datos].[dbo].[m_usuarios] u ON ( s.[idUsuario] = u.usu_iid AND s.[idCuenta] = u.[usu_iidcuenta] )
                LEFT JOIN [_Datos].[dbo].[VC_Routes] r ON ( s.[iRoute] = r.[Id] )
                LEFT JOIN [_Datos].[dbo].[VC_Route_Programs] rp ON ( s.[programId] = rp.[Id] )
                LEFT JOIN [_Datos].[dbo].[m_cuentas] c ON ( s.[idCuenta] = c.[cue_iid] )
                LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo
				OUTER APPLY(
					SELECT ISNULL(min(s3.startdate),'''') as FechaHoraInicioRonda,max(s3.limitdate) as FechaHoraFinRonda
                    FROM  [_Datos].[dbo].[Scheduler] s3
                    WHERE s3.template = 9001
                        AND s3.iRoute = s.iRoute
						AND s3.status >0
						and s3.idcuenta = s.idcuenta
						AND s3.programid = s.programid
						AND convert(date, s3.limitdate) = convert(date,s.limitdate)
						'+replace(@SqlWhere2,'s2','s3')+'
					
				) inifin
                OUTER APPLY (
					SELECT count(*) as result
                    FROM  [_Datos].[dbo].[Scheduler] s2
                    WHERE s2.template = 9001
                        AND s2.iRoute = s.iRoute
						AND s2.status >0
						and s2.idcuenta = s.idcuenta
						AND s2.programid = s.programid
                         --AND s2.limitdate > s.limitdate
						 and s2.result =0
						'+@SqlWhere3+'
                ) StatusObjetivo
            WHERE s.template = 9001
				and s.status > 0
				AND s.programId > 0
                ' + @SqlWhere + '
            ORDER BY ' + @SqlSort

/*
print '------'
print cast(@Sql as NText)
*/
EXECUTE (@Sql)
END