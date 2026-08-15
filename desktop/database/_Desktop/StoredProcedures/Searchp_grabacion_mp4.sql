CREATE OR ALTER PROCEDURE [dbo].[Searchp_grabacion_mp4]
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
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'grm_idkey DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '_datos..p_grabacion_mp4')

 print @SqlFilter

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos].[dbo].p_grabacion_mp4 o
LEFT OUTER JOIN [_datos].[dbo].p_recepcion r ON r.rec_iid = o.grm_iidrecepcion
LEFT JOIN [_Datos].[dbo].[m_cuentas] c ON c.cue_iid = grm_iidcuenta
left JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=r.rec_calarma
			WHERE 1 = 1 ' + @SqlFilter
 
 print @Sql
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
							   [grm_idKey]
      ,[grm_iidCuenta]
      ,[grm_iidRecepcion]
      ,[grm_dFechaHora]
      ,[grm_cCarpeta]
      ,[grm_cArchivo]
      ,[grm_cTipo]
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
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to