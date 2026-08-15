CREATE OR ALTER PROCEDURE [dbo].[t_novedades_fcSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[nov_icodigo_ID] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_novedades_fc')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _tablas.dbo.t_novedades_fc o
	LEFT JOIN _tablas..t_impuestos_fc im1 ON im1.imp_ccodigo = nov_cimpuesto1
	LEFT JOIN _tablas..t_impuestos_fc im2 ON im2.imp_ccodigo = nov_cimpuesto2
	LEFT JOIN _tablas..t_impuestos_fc im3 ON im3.imp_ccodigo = nov_cimpuesto3

	
	LEFT JOIN _Datos.dbo.m_novedades_facturacion_fc novfac ON nfc_inovedad = nov_icodigo_ID	
	
	LEFT JOIN _Datos..m_clientes_fc cli ON nfc_icliente = cli_icodigo_ID


			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, nov_icodigo_ID Id, o.*
									, im1.imp_cdescripcion as imp1descripcion
									, im2.imp_cdescripcion as imp2descripcion
									, im3.imp_cdescripcion as imp3descripcion 
									, novfac.*
									, cli.* ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to