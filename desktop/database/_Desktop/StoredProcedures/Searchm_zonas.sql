--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.710 
--#############################################################################



							CREATE OR ALTER PROCEDURE [dbo].[Searchm_zonas]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[zon_ccodigo] asc')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Zona')
 --select * from _datos..m_cuentas
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'from _Datos.dbo.[m_zonas] o
 left join _datos..m_cuentas c on (c.cue_clinea = o.zon_cdealer and c.cue_ncuenta = o.zon_ccuenta)
			WHERE 1 = 1 
			' + @SqlFilter
 
											
 
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber


,o.[zon_idKey] Id, '''' Name, 
o.zon_iidcuenta, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma
, o.zon_clistaemergencia, o.zon_cimagen, o.zon_mobservacion, o.zon_ccodigorestauracion
, o.zon_nminutosrestauracion, o.zon_nmostrar, o.zon_cdealer, o.zon_ccuenta
, o.zon_nautoprocesa, o.zon_cAlarmaAGenerar 
,c.*
' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
 			  	
--print  @DynamicSqlReturnRows
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to