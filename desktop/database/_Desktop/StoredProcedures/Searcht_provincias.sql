CREATE OR ALTER PROCEDURE [dbo].[Searcht_provincias]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT,
	@query VARCHAR(256) = ''   
AS
BEGIN
  SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[pro_cdescripcion] ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_provincias')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_tablas]..[t_provincias] o
			WHERE 1 = 1 AND o.pro_iparentID != 0 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@totalrows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 print @totalrows

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, pro_idKey Id, o.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to


END