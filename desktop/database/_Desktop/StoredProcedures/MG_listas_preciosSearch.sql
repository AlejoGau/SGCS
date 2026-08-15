CREATE OR ALTER PROCEDURE [dbo].[MG_listas_preciosSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[mglp_idkey] DESC')
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'MG_listas_precios','[mglpd_idproducto],[mglpd_idproductoALL]')
DECLARE @join VARCHAR(MAX)
		SET @join = 'LEFT JOIN _Datos..MG_listas_precios_detalle pd ON mglp_idkey = mglpd_idlista'
IF @filter != ''
	BEGIN
		SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
		
		
		DECLARE @FilterProperty NVARCHAR(32)
		DECLARE @FilterValue NVARCHAR(64)
		DECLARE @Index INT
		SET @Index = 1
		WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
		BEGIN		
			--Read
			SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
			SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'	
			
			IF @FilterProperty = 'mglpd_idproducto'
				SET @SqlFilter = @SqlFilter + ' AND (mglpd_idproducto = ' + @FilterValue + '/* OR  mglp_tipo = 0*/) '
			
			ELSE IF @FilterProperty = 'mglpd_idproductoALL'
				SET @join = 'LEFT JOIN _Datos..MG_listas_precios_detalle pd ON mglp_idkey = mglpd_idlista AND mglpd_idproducto ='+@FilterValue
			SET @Index = @Index + 1
		END
	END
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 		---saqué el join de detalle de lista	'+@join+'
		-- 22/08/2023 Daniel O. Medina le puse left join al inner join del detalle por tarea:
		--https://softguard.atlassian.net/browse/DSS-204
 SET @Sql = 'FROM _Datos..MG_listas_precios o
	LEFT JOIN _Datos..MG_listas_precios_detalle D ON o.mglp_idkey = D.mglpd_idlista
			LEFT JOIN _Datos..Product p ON Id = mglpd_idproducto
			LEFT JOIN _Tablas..t_monedas mon ON mon_ccodigo = mglp_currency
			LEFT JOIN _Datos..Organization org ON org.Id = mglp_idorganizacion
			WHERE 1 = 1 ' + @SqlFilter
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT
 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)
 SET @DynamicSqlReturnRows = 'SELECT distinct *
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, mglp_idkey Id, o.* , D.*  , p.Name as nombreProdcuto, p.Price  , mon.*, org.Name as nombreOrganizacion ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
 print cast( @DynamicSqlReturnRows as NTEXT)
							 
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							 
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	
			  	
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to