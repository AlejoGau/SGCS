CREATE OR ALTER PROCEDURE [dbo].[ReporteCuentasEliminadasSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',  
 @token VARCHAR(256) = '',  
 @totalrows INT = 1 OUTPUT     
AS  
SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'a.[aud_tFechaHora] DESC')

 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '_Sistema..s_auditoria')
 
 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max) = ''
 EXEC getSqlRangesForToken @table = '[_Datos]..[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

 SET @SqlFilterRango = REPLACE(@SqlFilterRango,'c.cue_clinea','CONVERT(varchar(3), LEFT(RIGHT(aud_cObservacion,8),3))')
 SET @SqlFilterRango = REPLACE(@SqlFilterRango,'c.cue_ncuenta','CONVERT(varchar(4), RIGHT(RIGHT(aud_cObservacion,8),4))')

 SET @SqlFilter = @SqlFilter + @SqlFilterRango;

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' 
    FROM _Sistema..s_auditoria  a
        LEFT JOIN _datos..m_cuentas c ON ( 
            LEFT(RIGHT(a.aud_cObservacion,8),3) = c.cue_clinea
            AND RIGHT(RIGHT(a.aud_cObservacion,8),4) = c.cue_ncuenta
        )
        WHERE aud_cProceso = ''Cuentas'' AND aud_cAccion = ''D'' ' + @SqlFilter
 
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,
                                    a.*
                                    ,LEFT(RIGHT(aud_cObservacion,8),3) as cuenta_cue_clinea
                                    ,RIGHT(RIGHT(aud_cObservacion,8),4) as cuenta_cue_cnumero ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
						  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to