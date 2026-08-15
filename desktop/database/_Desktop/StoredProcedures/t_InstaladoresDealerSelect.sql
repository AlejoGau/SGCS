CREATE OR ALTER PROCEDURE [dbo].[t_InstaladoresDealerSelect]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT ,
 @token NVARCHAR(128) = ''        
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'ins.[ins_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.[GetSqlFilterForJsonWithIgnore](@filter, 't_InstaladoresDealer','[lin_ccodigo]')

 IF @filter != ''
	BEGIN

		SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
		
		DECLARE @FilterProperty NVARCHAR(32)
		DECLARE @FilterValue NVARCHAR(64)

		DECLARE @Index INT
		SET @Index = 1
		WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
		BEGIN		
			--Read
			SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
			SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'	
			
			IF @FilterProperty = 'lin_ccodigo' AND @FilterValue != ''
				BEGIN
					SET @SqlFilter = @SqlFilter + ' AND (ins_idkey in (
						select tid_iidInstalador from _tablas..t_InstaladoresDealer 
							LEFT JOIN _Tablas..t_lineas l ON lin_idKey = tid_iidDealer
							where lin_ccodigo ='''+@FilterValue+''')
					OR ins_cdealer = '''+@FilterValue+''')'
				END
					
			
			SET @Index = @Index + 1
		END
	END


 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _tablas..t_instaladores ins

	
			WHERE 1 = 1 ' + @SqlFilter
 
  print @sql
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, ins.* , ins.ins_idKey as Id ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to