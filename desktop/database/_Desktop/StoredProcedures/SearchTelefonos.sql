--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.470 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchTelefonos]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',      
 @token varchar(256) = '',
 @totalrows INT = 1 OUTPUT     
AS
BEGIN
  SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.tel_iid DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'telefono')

 -- Rangos
 DECLARE @SqlFilterRango AS VARCHAR(max) = ''

 if @token != ''
 BEGIN
	EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
 END
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..[m_telefonos] o
		LEFT JOIN [_tablas]..[t_listas_emergencia] le ON  o.tel_clista = le.lis_ccodigo
		left join _datos..m_cuentas c with (nolock) on cue_iid = tel_iidcuenta
		left join _tablas..t_provincias p with (nolock) on c.cue_cprovincia = p.pro_ccodigo
		WHERE 1 = 1 ' + @SqlFilter + @SqlFilterRango
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber
		,[tel_iidcuenta]
		,[tel_iid]
		,[tel_clista]
		,[tel_cnombre]
		,[tel_cobservacion]
		,[tel_ctelefono]
		,[tel_ndiscado]
		,[tel_cpredigito]
		,[tel_cpostdigito]
		,[tel_norden]
		,[tel_ntr]
		,[tel_cclave]
		,[tel_cpermiso]
		,[tel_nsms]
		,[tel_nsp]
		,[tel_idKey]
		,[lis_ccodigo]
		,[lis_cdescripcion]
		,[lis_idKey]
		,cue_cnombre
		,cue_clinea
		,cue_cubicacion
		,cue_clocalidad
		,pro_cdescripcion
		,cue_ncuenta
		,cue_cemail ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to


END