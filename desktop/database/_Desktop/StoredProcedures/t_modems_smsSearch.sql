CREATE OR ALTER PROCEDURE [dbo].[t_modems_smsSearch]
	@page [int] = 1,
	@start [int] = 0,
	@limit [int] = 2000,
	@sort [varchar](256) = '',
	@group [varchar](256) = '',
	@filter [varchar](2048) = '',
	@_dc [varchar](256) = '',
	@totalrows [int] = 1 OUTPUT
WITH EXECUTE AS CALLER
AS
--2026-01-05 Pablo : Deje @limit en 2000, estaba en 50. Al usar MSGateway con modems WAD el limite de 50 se queda corto
SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[sms_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_modems_sms')


  --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_tablas]..[t_modems_sms] o
INNER JOIN [_tablas]..[t_GatewaysMSG] m ON o.sms_iGateway = m.tgm_idKey
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, sms_idKey Id, o.*, m.*' + @Sql + ' ) AS T
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