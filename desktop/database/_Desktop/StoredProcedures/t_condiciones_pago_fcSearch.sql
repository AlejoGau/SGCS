CREATE OR ALTER PROCEDURE [dbo].[t_condiciones_pago_fcSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[con_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_condiciones_pago_fc')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_tablas]..[t_condiciones_pago_fc] o WITH (NOLOCK)
  left join _tablas..t_organizacion_fc org WITH (NOLOCK) on o.con_orgidcodigoid = org.org_icodigo_id
  left join _tablas..t_formas_pago_fc fpg WITH (NOLOCK) on fpg.fpg_ccodigo = con_cFormaPagoCobrAut and fpg_orgidcodigoid = o.con_orgidcodigoid
  left join _tablas..t_remesas_fc r WITH (NOLOCK) on o.con_iremesa = r.rem_icodigo_id
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, con_idKey Id, [con_ccodigo]
      ,[con_cdescripcion]
      ,[con_ncuotas]
      ,[con_idias]
      ,[con_ifrecuencia]
      ,[con_nPideDatos]
      ,[con_nCobranzaAut]
      ,[con_cCodigoBarra]
      ,[con_iRemesa]
      ,[con_cDatosExtra]
      ,[con_cFormaPagoCobrAut]
      ,[con_idKey]
      ,[con_orgidcodigoid], [fpg_ccodigo]
      ,[fpg_cdescripcion]
      ,[fpg_cdescripcionreducida]
      ,[fpg_npidenumero]
      ,[fpg_npidevencimiento]
      ,[fpg_npidebanco]
      ,[fpg_ctipo]
      ,[fpg_idKey]
      ,[fpg_orgidcodigoid]
      ,[fpg_mgmcidkey]
	  ,[rem_icodigo_ID]
      ,[rem_cdescripcion]
      ,[rem_cnombrearchivo]
      ,[rem_cnrocomercio]
      ,[rem_cidentificacion]
      ,[rem_cconfig]
	  ,org.org_cnombre ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 Print cast (@DynamicSqlReturnRows as ntext)
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to