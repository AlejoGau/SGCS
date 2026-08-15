CREATE OR ALTER PROCEDURE [dbo].[m_tstconexionSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[txc_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_tstconexion')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.m_tstconexion o
			left join [_Tablas].[dbo].[t_iprsconn] iprs (NOLOCK) on iprs.iprsc_ipcidkey = o.txc_idIRSConn
			left join _tablas..t_ip_con ipc (NOLOCK) on (iprs.iprsc_ipcidkey = ipc.ipc_idKey)
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = '
	SELECT * 
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, txc_idKey Id, [txc_idKey]
      ,[txc_idCuenta]
      ,[txc_idIRSConn]
      ,[txc_cAlarmaEsperada]
      ,[txc_iMinutos]
      ,[txc_cAlarmaAGenerar]
      ,[txc_cAlarmaAutoprocesa]
      ,[txc_tEnFalloDeDesde]
      ,[txc_tFechaUltimaRX]
	  ,ipc.ipc_cdescripcion
		' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

 -- truncate table _datos.dbo.m_tstconexion