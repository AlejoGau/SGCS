-- =============================================
-- Author:		dedalo
-- Create date: 6/11/2014
-- Description:	Search para links de video de cuentas
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[Searchm_cuentas_video]
	-- Add the parameters for the stored procedure here
	--@cuv_iidCuenta int 
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',
 @token VARCHAR(128),              
 @totalrows INT = 1 OUTPUT     
AS
BEGIN
	
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[cuv_iidCuenta] DESC')

 -- si estoy filtrando por dealer agrego la cuenta como segundo filtro
 IF PATINDEX('%cue_clinea%', @SqlSort) > 0
 BEGIN
	SELECT @SqlSort = @SqlSort + ' ,cue_ncuenta ASC'
 END
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_cuentas_video')

 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas_video', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

 
 --print @filter;
 --print @SqlFilter;
 --print @SqlSort;
  
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Datos]..[m_cuentas_video] o
INNER JOIN _Datos.dbo.[m_cuentas] c ON o.cuv_iidCuenta = c.cue_iid
LEFT JOIN [_Tablas]..[t_VideoID] v ON v.tvi_iid = o.cuv_iVideoID
			WHERE 1 = 1 ' + @SqlFilter +@SqlFilterRango



 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'

 print @DynamicSqlTotalRows
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, cuv_iidCuenta Id, o.*, c.*,v.*	' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'		
 
 print @DynamicSqlReturnRows
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to
END