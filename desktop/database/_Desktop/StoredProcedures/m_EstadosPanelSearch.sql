CREATE OR ALTER PROCEDURE [dbo].[m_EstadosPanelSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[mep_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_EstadosPanel')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..m_EstadosPanel o
					LEFT JOIN _datos..m_usuarios uc ON mep_iUsuarioControl = uc.usu_idKey
					LEFT JOIN _datos..m_usuarios ue ON mep_iUsuarioEsperado = ue.usu_idKey


					LEFT JOIN _Tablas..t_codigos_alarma ac ON ac.cod_ccodigo = mep_cAlarmaControl
					LEFT JOIN _Tablas..t_codigos_alarma ae ON ae.cod_ccodigo = mep_cAlarmaEsperada
					LEFT JOIN _Tablas..t_codigos_alarma ag ON ag.cod_ccodigo = mep_cAlarmaAGenerar

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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, mep_idKey Id, o.*,

									uc.usu_cnombre as usuarioControl,
									ue.usu_cnombre as usuarioEsperado,

									ac.cod_cdescripcion as alarmaControl,
									ae.cod_cdescripcion as alarmaEsperada,
									ag.cod_cdescripcion as alarmaGenerar
								' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to