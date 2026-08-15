CREATE OR ALTER PROCEDURE [dbo].[Searchp_grabacion_audio]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',      
 @table VARCHAR(20) = 'p_recepcion',     
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 Declare @tableAudio VARCHAR(100) = '[_datos].[dbo].p_grabacion_audio'

 IF @table IS NOT NULL And @table <> '' And  @table != 'p_recepcion' And  LEN(@table) > LEN('p_recepcion')
 BEGIN
    Declare @sufijo Varchar(6) = RIGHT(@table, 6)
     SET @tableAudio = '[_History].[dbo].p_grabacion_audio' + @sufijo;
 END

 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'gra_iid DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '_datos..p_grabacion_audio')

 --Print '@SqlFilter'
 --print @SqlFilter

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM '+@tableAudio+' o
	LEFT OUTER JOIN [_datos].[dbo].'+@table+' r ON r.rec_iid = o.gra_iidrecepcion
	LEFT JOIN [_Datos].[dbo].[m_cuentas] c ON c.cue_iid = gra_iidcuenta
	Left JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=r.rec_calarma
			WHERE 1 = 1 ' 
 Declare @where varchar(100) = ' and ( ( gra_carchivo <> '''') or ( gra_carchivo <>'''' and gra_ctelefono <> '''' and gra_nestado > 0) )'
 Set @Sql += @where
 Set @Sql += @SqlFilter

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
							   gra_iid,gra_iidcuenta,gra_dfechahora,gra_carchivo, replace(replace(convert(varchar, gra_nduracion), '',00'', ''''), ''.00'', '''') gra_nduracion, gra_iidrecepcion
	,r.* 
	,ta.* 
,c.*
							   ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
Print '-----'	  	 
Print @DynamicSqlReturnRows
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to