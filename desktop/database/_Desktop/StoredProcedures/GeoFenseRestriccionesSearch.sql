CREATE OR ALTER PROCEDURE [dbo].[GeoFenseRestriccionesSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[Id] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'GeoFense')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM _Datos.dbo.GeoFense o
	OUTER APPLY (
		SELECT TOP 1
				*
		FROM
			_Datos.dbo.GeoFenseCuenta cfgs
		LEFT JOIN _Datos.dbo.m_cuentas cues ON cues.cue_iid = cfgs.CuentaId
		WHERE cfgs.GeoFenseId = o.Id
		ORDER BY
			cfgs.Id ASC
	) cuentaReceptora 
	OUTER APPLY (
		SELECT TOP 1
				*
		FROM
			_Datos.dbo.GeoFenseCuenta cfgs
		LEFT JOIN _Datos.dbo.m_cuentas cues ON cues.cue_iid = cfgs.CuentaId
		WHERE cfgs.GeoFenseId = o.Id
		ORDER BY
			cfgs.Id DESC
	) cuentaMonitoreada 
	
	WHERE 1 = 1 AND GeoType = ''D'' ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.[Id]
      ,o.[Name]
      ,o.[GeoType]
      ,o.[Dealer]
      ,o.[MetaData]
      ,o.[Style]
      ,o.[MaxSpeed], 
										cuentaReceptora.cue_cnombre as nombreCuentaReceptora,
										cuentaReceptora.cue_iid as idCuentaReceptora,
										cuentaMonitoreada.cue_cnombre as nombreCuentaMonitoreada,
										cuentaMonitoreada.cue_iid as idCuentaMonitoreada
								' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to