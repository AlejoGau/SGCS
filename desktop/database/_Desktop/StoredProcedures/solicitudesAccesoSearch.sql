CREATE OR ALTER PROCEDURE [dbo].[solicitudesAccesoSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '', 
 @token VARCHAR(128) = '',   
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[pdl_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_PadLocks')
 
  --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT


 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'from [_Datos].[dbo].[p_PadLocks] o
			inner join [_Datos].[dbo].[p_recepcion] r on o.pdl_iRecId=r.rec_iid
			left join _Datos.dbo.m_cuentas c on r.rec_iidcuenta = c.cue_iid
			WHERE 1 = 1 ' + @SqlFilter+@SqlFilterRango
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, pdl_idKey Id, o.*
							   ,c.cue_clinea, c.cue_ncuenta,c.cue_cnombre, c.cue_clocalidad,c.cue_cLatLng, c.cue_ccalle ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 print cast (@sql as ntext)
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to