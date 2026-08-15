CREATE OR ALTER PROCEDURE [dbo].[GuidedMonitoringStepsSearch]
    @page INT = 1,
    @start INT = 0,
    @limit INT = 50,
    @sort VARCHAR(256) = '',
    @group VARCHAR(256) = '',
    @filter VARCHAR(2048) = '',
    @_dc VARCHAR(256) = '',
    @gms_iTemplateID INT = NULL,     -- NUEVO PARAMETRO
    @totalrows INT = 1 OUTPUT
AS
SET NOCOUNT ON;

-- Sort
DECLARE @SqlSort AS VARCHAR(256);
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[gms_iStepNumber] DESC');

-- Filter
DECLARE @SqlFilter AS VARCHAR(4096);
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'EventosIngresosEgresos');

-- Agrego filtro por TemplateID si viene
IF @gms_iTemplateID IS NOT NULL
    SET @SqlFilter = @SqlFilter + ' AND o.gms_iTemplateID = ' + CAST(@gms_iTemplateID AS VARCHAR);

-- SQL Base
DECLARE @Sql NVARCHAR(MAX);
SET @Sql = '
FROM _Datos.dbo.GuidedMonitoringTemplateSteps o
LEFT JOIN _Tablas.dbo.t_GuidedStepOptions stepOpt ON o.gms_iStepID = stepOpt.gso_idKey
WHERE 1=1 ' + @SqlFilter;

-- Conteo total
DECLARE @DynamicSqlTotalRows NVARCHAR(MAX);
SET @DynamicSqlTotalRows = 'SELECT @TotalRows = COUNT(*) ' + @Sql;
EXEC sp_executesql @DynamicSqlTotalRows, N'@TotalRows INT OUTPUT', @totalrows OUTPUT;

-- Datos paginados
DECLARE @DynamicSqlReturnRows NVARCHAR(MAX);
DECLARE @from INT, @to INT;
SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit;

SET @DynamicSqlReturnRows = '
SELECT * FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,
        gms_idKey AS Id,
        o.*,
        stepOpt.gso_cDescripcion,  -- Aseguro incluir esta columna
		stepOpt.gso_cType
' + @Sql + '
) AS T
WHERE RowNumber BETWEEN @from AND @to';

EXEC sp_executesql @DynamicSqlReturnRows, N'@from INT, @to INT', @from = @from, @to = @to;