CREATE OR ALTER PROCEDURE [dbo].[SeachReceptoresItem]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.rec_iid ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Datos].dbo.[m_receptores_item] o
		inner join [_Datos].dbo.[m_formatos] f on (o.rec_cformato = f.for_ccodigo)
		left join [_tablas].dbo.[t_codigos_alarma] c on (f.for_calarma = c.cod_ccodigo)
		inner join [_Datos].[dbo].[m_receptores_cab] rc on (o.rec_iid = rc.rec_iid)
		left join [_tablas].[dbo].[t_ip_con] ipcon on (o.rec_iid = ipcon.ipc_ireceptor)
		left join [_tablas].[dbo].[t_puertos] pue on (o.rec_iid = pue.pue_ireceptor)
			WHERE 1 = 1 ' + @SqlFilter
 print @Sql
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

declare @SqlFields varchar(8000)
-- saco conexion ip y puerto para limpiar search
-- si se vuelven a agregar verificar administracion de receptores
--set @SqlFields = 'o.*, f.*, c.*, rc.[rec_cdescripcion]

set @SqlFields = 'o.*, f.*, c.*, ipcon.*, pue.*, rc.[rec_cdescripcion]
      ,rc.[rec_cdll]
      ,rc.[rec_ntcpip] '

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, ' + @SqlFields + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
print @DynamicSqlReturnRows  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to