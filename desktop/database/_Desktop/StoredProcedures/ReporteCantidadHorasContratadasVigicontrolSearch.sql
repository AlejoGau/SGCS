CREATE OR ALTER PROCEDURE [dbo].[ReporteCantidadHorasContratadasVigicontrolSearch]
	@page INT = 1,
	@start INT = 0,
	@limit INT = 1000,
	@sort VARCHAR(256) = '',
	@group VARCHAR(256) = '',
	@filter VARCHAR(2048) = '',
	@_dc VARCHAR(256) = '',
	@token VARCHAR(128) = '',
	@vigilador VARCHAR(256)= '',
	@vigiladornombre varchar(256) = '',
	@cuenta VARCHAR(256) = '',
	             
	@fechadesde NVARCHAR(256) = '',
	@fechahasta NVARCHAR(256) = '',
    @fromCleanApp VARCHAR(5) = '',
	@totalrows INT = 1 --OUTPUT
AS
BEGIN
--Sort
DECLARE @SqlSort AS VARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'u.usu_cnombre ASC, v.vus_dlogin DESC')
-- TOMO LOS CAMPOS DE LOS COMBO DEL REPORTE Y ARMO EL WHERE
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';
--RANGOS
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlWhere = @SqlWhere + @SqlFilterRango
--Para el cálculo de hs
print ' -- Rangos -- '
print @SqlFilterRango
IF (@vigilador != '')
	BEGIN
        SET @SqlWhere = @SqlWhere + ' AND u.usu_cnombre LIKE ''%' + @vigilador + '%''';
	END
IF (@cuenta != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND v.vus_idcuenta = ''' + @cuenta + '''';
	END
IF (@fechadesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND v.vus_dlogin >= ''' + convert(varchar,convert(date,@fechadesde,120),121)+ '''';
	END
IF (@fechahasta != '')
	BEGIN
		-- SUMO 1 AL DIA QUE VIENE DESDE EL REPORTE PARA OBTENER LAS 24HS DEL DIA ANTERIOR.
		SET @SqlWhere = @SqlWhere + ' AND v.vus_dlogin <= ''' + convert(varchar,DATEADD(day,1,convert(date,@fechahasta,120)),121)+ '''';
	END
IF (@fromCleanApp != '')
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo = 9 ';
    END
ELSE
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo != 9 ';
    END
DECLARE @sql AS VARCHAR(MAX)
IF (@group = 'yes')
	BEGIN
		SET @sql = 'SELECT
					v.vus_idcuenta
					--, COUNT (v.vus_iusuario) as vus_iusuariocant
					--, v.vus_iusuario as vus_iusuario
					--, u.usu_cnombre as NombreVigilador
					, c.cue_cnombre as NombreCuentaVigicontrol
					, mc.cue_cHorasVC
					, SUM(cast(DATEDIFF(MINUTE, v.vus_dlogin, v.vus_dlogout) as bigint)) as horasTrabajadas
					, SUM(cast(DATEDIFF(MINUTE, v.vus_dlogin, v.vus_dlogout) as bigint)) - mc.cue_cHorasVC * 60 as DifHsTrabContratadas
					FROM [_Datos]..[VigicontrolUserSessions] v
						LEFT JOIN [_Datos]..[m_usuarios] u on (
							u.usu_icodigo = v.vus_iusuario
							AND u.usu_iidcuenta = v.vus_idcuenta )
						LEFT JOIN [_Datos].[dbo].[m_cuentas] c on ( c.cue_iid = u.usu_iidcuenta )
						LEFT JOIN [_Datos].[dbo].[m_CuentasXtraInfo]  mc on mc.cue_iidCuenta = c.cue_iid
						LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo
					WHERE 1=1 '+@SqlWhere+'
						AND v.vus_dlogin IS NOT NULL
						AND v.vus_dlogout IS NOT NULL
						AND u.usu_cnombre IS NOT NULL
						AND c.cue_cnombre IS NOT NULL
					GROUP BY
						--v.vus_iusuario, u.usu_cnombre,
						c.cue_cnombre, v.vus_idcuenta
						--, v.vus_dlogin
						,mc.cue_cHorasVC
					ORDER BY '+@SqlSort
	END
END
print @Sql
		EXECUTE (@Sql)