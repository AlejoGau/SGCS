CREATE OR ALTER PROCEDURE [dbo].[SearchSmsQueue]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'cue_iid desc')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter =  dbo.GetSqlFilterForJsonWithIgnore(@filter, '','') 
 
DECLARE @Sql NVARCHAR(MAX)
/*
print '@SqlFilter'
print @SqlFilter
 */
 --Sql

 SET @Sql = 'From [_Datos].[dbo].[p_SMSqueue] o
				INNER JOIN [_Datos].[dbo].[m_cuentas] c on (o.que_idCuenta = c.cue_iid)

				-- Suma de la informacion para saber el Gateway
				INNER JOIN [_Tablas].[dbo].[t_modems_sms] t on (o.que_iModemSMS = t.sms_icodigo)


			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

declare @fields NVARCHAR(MAX)
set @fields = '*, CONVERT(VARCHAR, que_tfechahora, 126) AS que_tfechahoraiso';
 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT ' + @fields + '
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, *' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 /*
Print '------'  			  	 
Print @DynamicSqlReturnRows
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to