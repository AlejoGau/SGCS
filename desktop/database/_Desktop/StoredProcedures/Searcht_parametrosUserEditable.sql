CREATE OR ALTER PROCEDURE [dbo].[Searcht_parametrosUserEditable]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 /*DECLARE @SqlSort AS VARCHAR(256)
 if (@sort = '[{"property":"par_ccategoria","direction":"ASC"}]')
 begin
 SELECT @SqlSort = 'o.[par_ccategoria] ASC, o.[par_ccodigo] ASC'
 end
 else
 begin
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[par_ccodigo] ASC')
 end*/

 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[par_ccategoria] ASC')

 declare @Language [varchar](256)
 select @language = par_cValor from _tablas..t_parametros  where par_ccodigo = 'IDIOMAMSJ'
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_parametros')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_tablas]..[t_parametros] o
			WHERE par_cCategoria != ''INTERNO''
			' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT T.Id, isnull(translation,par_ccategoria) as par_ccategoria, par_cconfig,par_cvalor,par_ccodigo,par_cdescripcion,par_ivalor,par_mobservacion
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, par_idKey Id, o.* ' + @Sql + ' ) AS T
							   left join _sistema..localization l on (language='''+@language+''' and UIApplication=''Combined'' and Name = par_ccategoria)
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'		
 
 --Print '------'
 --print 	@DynamicSqlReturnRows	  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to