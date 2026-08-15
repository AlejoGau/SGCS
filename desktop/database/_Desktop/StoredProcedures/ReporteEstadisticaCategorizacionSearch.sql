CREATE OR ALTER PROCEDURE [dbo].[ReporteEstadisticaCategorizacionSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(max) = '',        
 @_dc VARCHAR(256) = '',  
 @table VARCHAR(max) = 'p_recepcion',                       
 @totalrows INT = 1, --OUTPUT
 
 -- PABLOCAS: 23/4/21, se cambiaron los campos [rec_idResolucion] por [rec_cCategorizacion], estaba joineando la columna incorrecta en p_recepcion.
 -- JUAN : 04/10, Agregado dado que no consultaba Rangos. Mail Fernando a Rodri
 @token VARCHAR(128) = ''
AS  
BEGIN
    SET NOCOUNT ON   
    --Sort
    DECLARE @SqlSort AS VARCHAR(256)
    SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'tr.[res_cdescripcion] ASC')
    --Filters
    DECLARE @SqlFilter AS VARCHAR(4096)
    SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')
    --RANGOS 
    DECLARE @SqlFilterRango AS VARCHAR(max) = ''
    EXEC getSqlRangesForToken @table = '[_Datos].[dbo].m_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
    print '---';
    print @SqlFilterRango
    print '---';
    SET @SqlFilter = @SqlFilter + @SqlFilterRango
    print @SqlFilter
    --return
    if(@table = '')
        BEGIN
            set @table = 'p_recepcion'
        END
    declare @union varchar(max) = ''
    -- recorro las tablas 
    declare @items varchar(max);
    select @items = @table;
    SELECT * INTO #TempTables FROM dbo.SplitString(@items, ',')
    DECLARE @IndexTables INT
    SET @IndexTables = 1
    WHILE ((SELECT COUNT(*) FROM #TempTables WHERE Id = @IndexTables) != 0)
     BEGIN
            DECLARE @item varchar(100)
            select  @item = CAST (Item AS VARCHAR)   FROM #TempTables 
                            WHERE Id = @IndexTables
            if @IndexTables > 1
            BEGIN
              select @union = @union + ' UNION ALL  '
            END
            select @union = @union + 'select * from [_Datos].[dbo].['+@item+']'
            select @IndexTables = @IndexTables + 1
    END
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM ('+ @union +') o
        LEFT JOIN _Tablas..t_resoluciones tr ON res_ccodigo = rec_idResolucion
        INNER JOIN _Datos..m_cuentas c ON rec_iidcuenta = cue_iid 
        INNER JOIN _Tablas..t_codigos_alarma ca ON rec_calarma = cod_ccodigo 
        LEFT OUTER JOIN _Tablas.dbo.t_grupos gru ON gru_ccodigo = ca.cod_cGrupo
        WHERE (rec_nestado=3) '  + @SqlFilter + '
        GROUP BY o.rec_idResolucion, tr.res_cdescripcion '
 print @sql
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
         
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   
 --Execute Sql (ReturnRows)
 /*ECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
                               FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
                                    
                                    rec_idResolucion, 
                                    res_cdescripcion, 
                                    count(1) as cantidad 
                                ' + @Sql + ' ) AS T
                              WHERE RowNumber BETWEEN @from AND @to '
                              
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                                        
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'                                          
                 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
                 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to
*/
    -- paginacion
	print ('*******paginación*******')
    set @sql = 'with CTE  as (SELECT 
                rec_idResolucion, 
                res_cdescripcion, 
                count(1) as cantidad,
                ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber 
                ' + @sql+')
                select * from CTE
            
        --  WHERE RowNumber BETWEEN ('+cast(@page as varchar(5))+' - 1) * '+cast(@limit as varchar(5))+' + 1 AND ('+cast(@page as varchar(5))+' * '+cast(@limit as varchar(5))+')           '
     EXEC (@SQL)   
	print CAST(@sql AS NTEXT)
END