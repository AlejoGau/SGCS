CREATE OR ALTER PROCEDURE [dbo].[t_lineasSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',    
 @porrango INT = 1,
 @totalrows INT = 1 OUTPUT,
 @token NVARCHAR(128) = ''
       
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[lin_ccodigo] ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_lineas')


--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)
SET @SqlFilterRango = '';

IF @porrango = 1
BEGIN
	EXEC getSqlRangesForTokenForT_lineas @table = 'lineas', @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT
	--print '@SqlFilterRango'
	--print @SqlFilterRango
END
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _tablas..t_lineas o
	left join _tablas..t_provincias p ON pro_ccodigo = lin_cprovincia
	left join _Datos..Organization org on lin_iOrganizacion = org.Id
	WHERE 1 = 1 ' + @SqlFilter + @SqlFilterRango
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT *
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, lin_idKey Id, o.*, p.*, org.Name as _organization ' + @Sql + ' ) AS T
	WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
Print '------'  			  	 
Print @DynamicSqlReturnRows
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to