CREATE OR ALTER PROCEDURE [dbo].[Searchp_recepcion]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',   
 @token varchar(256) = '',
 @agregafecha int = 0,
 @table VARCHAR(20) = 'p_recepcion',     
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[rec_iid] DESC')
 --Print @SqlSort
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 --@filter = N'[{"property":"o2.rec_iidcuenta","value":8},{"property":"o.rec_nestado","value":8}]',
 Set @filter = Replace(@filter,'"o2.rec_iid"','"o.[rec_ITE]"')
 Set @filter = Replace(@filter,'o2.','o.')
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')

 --print @SqlFilter
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 /*
 SET @Sql = 'FROM [_Datos]..[p_recepcion] o
			INNER JOIN [_Datos]..[p_recepcion] o2 ON o2.rec_iid = o.rec_iTE
			INNER JOIN [_Tablas]..[t_codigos_alarma] ta ON ta.cod_ccodigo = o2.rec_calarma
			LEFT JOIN [_sistema]..[s_operadores] ope ON ope.ope_iid = o.rec_ioperador
			WHERE 1 = 1 ' + @SqlFilter
*/ 

SET @Sql = 'FROM [_Datos]..['+@table+'] o With (NOLOCK)'

If @agregafecha=1
	SET @Sql += ' LEFT JOIN [_sistema]..[s_operadores] ope ON ope.ope_iid = o.rec_ioperador'

SET @Sql += ' WHERE 1 = 1 ' + @SqlFilter

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 /*
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.rec_iid Id, o.*, ta.*, ope.*, 
								o2.rec_iid as eve_rec_iid, o2.rec_calarma as eve_rec_calarma ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
*/							  


 
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.rec_iTE, o.rec_cContenido ' 
							   
If @agregafecha=1
	SET @DynamicSqlReturnRows += ',o.rec_tfechahora,o.rec_ioperador,ope.ope_clogin '
							   
SET @DynamicSqlReturnRows += @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
 
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit


Print '----------'  			  	 
print cast(@DynamicSqlReturnRows as NText)

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to