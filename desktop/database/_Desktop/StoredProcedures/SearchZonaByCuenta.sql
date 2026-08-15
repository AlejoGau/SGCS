--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.463 
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[SearchZonaByCuenta]
@cuentaid int = 0,
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT,
 @token NVARCHAR(128) = ''     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[zon_ccodigo] asc')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Zona')

 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max) = '';
 
 if @token != ''
 BEGIN
	EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
 END

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'from _Datos.dbo.[m_zonas] o WITH (NOLOCK)
left join _datos..m_cuentas c WITH (NOLOCK) on (c.cue_clinea = o.zon_cdealer and c.cue_ncuenta = o.zon_ccuenta)
left join _datos..m_status s WITH (NOLOCK) on (s.sta_iidcuenta = c.cue_iid)
LEFT OUTER JOIN _Tablas.dbo.t_tipos tip WITH (NOLOCK) ON tip_ccodigo = c.cue_ctipo
left join _tablas..t_codigos_alarma ca WITH (NOLOCK) on (ca.cod_ccodigo = s.sta_cultimaalarma)
			WHERE 1 = 1 
			and [zon_iidcuenta] = ' + convert(varchar,@cuentaId) + '
			' + @SqlFilter + @SqlFilterRango
  
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
,o.[zon_idKey] Id, '''' Name, o.zon_iidcuenta, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_clistaemergencia, o.zon_cimagen, o.zon_mobservacion, o.zon_ccodigorestauracion, o.zon_nminutosrestauracion, o.zon_nmostrar, o.zon_cdealer, o.zon_ccuenta, o.zon_nautoprocesa, o.zon_cAlarmaAGenerar 
,c.*
,s.*
,ca.*
,tip.*
' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

Print @DynamicSqlReturnRows