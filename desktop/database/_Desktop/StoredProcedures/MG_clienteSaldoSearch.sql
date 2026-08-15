CREATE OR ALTER PROCEDURE [dbo].[MG_clienteSaldoSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'cli_icodigo_ID ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'fROM _Datos.[dbo].[m_clientes_fc] cli
inner join _tablas..t_condiciones_pago_fc cpg WITH (NOLOCK) on cli.cli_ccondicionpago = cpg.con_ccodigo and cli.cli_iOrganizacion = cpg.con_orgidcodigoid
inner join _tablas..t_formas_pago_fc fpg WITH (NOLOCK) on fpg.fpg_ccodigo = cpg.con_cFormaPagoCobrAut and cli.cli_iOrganizacion = fpg.fpg_orgidcodigoid
inner join _datos..MG_MaestroCuentas mc WITH (NOLOCK) on cli.cli_mgmcidkey = mc.mgmc_idkey and cli_iOrganizacion = mc.mgmc_idorganizacion
inner join _datos..mg_informacion_pago mip WITH (NOLOCK) on mip.mip_fpgidkey = fpg.fpg_idkey
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, * ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to