CREATE OR ALTER PROCEDURE [dbo].[Searchm_clientes_fc_bycuenta]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @id int = 0,             
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'cli_icodigo_ID ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 
 if(@id is not null and @id != 0)
 begin
	set @SqlFilter = 'and cli_icodigo_ID = ' + CONVERT(varchar, @id) + ' ' + @SqlFilter
 end
 --select * from _datos..m_clientes_fc
 --select * from _datos..m_relacion_cliente_cuentas_fc
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'from _datos..m_cuentas c
	inner join [_Sistema].[dbo].[DealerRango] dr on (dr.dealer = c.cue_clinea and c.cue_ncuenta between CuentaDesde and CuentaHasta)
	inner join _datos..organization org on org.Id = dr.IdEntidad
	left join _Datos.[dbo].[m_clientes_fc] o on org.Account = o.cli_icodigo_ID
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
	SELECT [cli_icodigo_ID]
      ,[cli_cnombre],[cli_cidentificacion],[cli_ccategoriaimpositiva],[cli_ivendedor],[cli_icobrador]
      ,[cli_czona],[cli_ccallefiscal],[cli_clocalidadfiscal],[cli_cprovinciafiscal],[cli_ccodigopostalfiscal]
      ,[cli_ccallecobranza],[cli_clocalidadcobranza],[cli_cprovinciacobranza],[cli_ccodigopostalcobranza]
      ,[cli_nlunes],[cli_nmartes],[cli_nmiercoles],[cli_njueves],[cli_nviernes],[cli_nsabado],[cli_ndomingo],[cli_chora]
	  ,[cli_cservicio],[cli_dproximafactura],[cli_cformatoimpresion],[cli_ccondicionpago],[cli_ctelefono]
      ,[cli_ccontacto],[cli_cobservacion],[cli_nsituacion],[cli_inumero],[cli_nDocCAE],[cli_cDatosExtra]
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, c.*,o.* ' + @Sql + ' ) AS T
	WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to