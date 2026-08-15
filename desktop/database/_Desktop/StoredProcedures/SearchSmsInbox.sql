--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.160 
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[SearchSmsInbox]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_iid desc')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 
 
set @SqlFilter = @SqlFilter + ' and rec_ccontenido like ''SMS Sender%'''
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'From _datos..p_recepcion O
		INNER JOIN [_Datos].[dbo].[m_cuentas] c ON c.cue_iid = o.rec_iidcuenta    
		Left Outer Join _Sistema.dbo.s_operadores OP On OP.ope_iid=O.rec_ioperador
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

declare @fields NVARCHAR(MAX)
set @fields = 'rec_tFechaHora,rec_cContenido,rec_cObservaciones,ope_cnombre,rec_iidcuenta, cue_clinea,cue_cnombre,cue_ncuenta,
	CONVERT(VARCHAR, rec_tFechaHora, 126) AS rec_isoFechaHora ';
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
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to