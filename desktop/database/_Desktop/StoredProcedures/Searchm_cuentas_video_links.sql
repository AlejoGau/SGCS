CREATE OR ALTER PROCEDURE [dbo].[Searchm_cuentas_video_links]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @token VARCHAR(128),               
 @totalrows INT = 1 OUTPUT     
AS
BEGIN
	

 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[cvl_iidcuenta] DESC')
 IF PATINDEX('%cue_clinea%', @SqlSort) > 0
 BEGIN
	SELECT @SqlSort = @SqlSort + ' ,cue_ncuenta ASC'
 END
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_cuentas_video_links')



  --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas_video', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
 
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Datos]..[m_cuentas_video_links] o
		--LEFT JOIN [_Tablas]..[t_VideoID] v ON v.tvi_cdescripcion =  SUBSTRING(cvl_clink,0,CHARINDEX('':'',cvl_clink)+1)              
		LEFT JOIN [_Tablas]..[t_VideoID] v ON (o.cvl_iVideoID = v.tvi_iid)
		LEFT JOIN [_Datos]..[m_zonas] z ON cvl_czona = zon_ccodigo AND cvl_iidcuenta = zon_iidcuenta
		LEFT JOIN [_Tablas]..[t_codigos_alarma] a ON cvl_calarma = cod_ccodigo
		INNER JOIN _Datos.dbo.[m_cuentas] c ON z.zon_iidcuenta = c.cue_iid
			WHERE 1 = 1 ' + @SqlFilter +@SqlFilterRango




 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,
 cvl_iidcuenta Id,
o.cvl_cLinkDSS as cvl_clinkdss, 
o.cvl_calarma, 
o.cvl_czona, 
o.cvl_clink, 
o.cvl_idKey, 
o.cvl_rLatitud,
o.cvl_rLongitud,
z.*, a.*,c.*,v.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to
END