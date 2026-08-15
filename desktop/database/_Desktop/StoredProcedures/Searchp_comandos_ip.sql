CREATE OR ALTER PROCEDURE [dbo].[Searchp_comandos_ip]
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
 --@sort = N'[{"property":"cmd_tfechahoraiso","direction":"ASC"}]',
 If @sort Like '%cmd_tfechahoraiso%'
	Set @sort = Replace(@sort,'cmd_tfechahoraiso','cmd_tfechahora')

 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'cue_iid desc')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 
 
--set @SqlFilter = @SqlFilter + ' and rec_ccontenido like ''SMS Sender%'''
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'From [_Datos].[dbo].[p_comandos_ip] o
  inner join [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) on (o.cmd_idCuenta = c.cue_iid)
  inner join [_Tablas].[dbo].[t_comandos] t WITH (NOLOCK) on (o.cmd_iComando = t.tcm_iid)
  left join _audit..frameworkaudit a WITH (NOLOCK) on o.cmd_iid = a.ObjectId and a.ObjectTypeId = 3065
  left join _audit..frameworkauditextend e WITH (NOLOCK) on a.id = e.id
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

declare @fields varchar(8000)
set @fields = 'o.*,t.*,e.username,c.cue_clinea,c.cue_ncuenta,c.cue_cnombre, CONVERT(VARCHAR, cmd_tfechahora, 126) AS cmd_tfechahoraiso ';
 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT *
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, ' + @fields + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '


 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)     
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
Print '************************************'
Print Cast( @DynamicSqlReturnRows As varchar(max))  			  	 
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to