CREATE OR ALTER PROCEDURE [dbo].[ProductSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @token varchar(MAX) = '',
 @MoneyGuardActivated INT = 0,
 @showAll INT = 0,
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   

 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)

	
 DECLARE @IdOrganizacion INT = 0;
 select @IdOrganizacion = udw_empresa from _sistema..UsersDesktopWeb where udw_idKey = @UserId

 if @IdOrganizacion=NULL
 begin
	SET @IdOrganizacion=0
 End

 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[Id] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'Product','[id_lista],[id_organizacion],[pro_iidorganizacion]')

 PRINT 'FILTER: '+@SqlFilter

 DECLARE @joins VARCHAR (MAX) = ''

 DECLARE @idLista INT = 0

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
			
			IF @FilterProperty = 'id_lista' AND @FilterValue != 0
				BEGIN
					SET @SqlFilter = @SqlFilter + ' AND mglp_idkey = '''+@FilterValue+''' ' 					
					SET @idLista = @FilterValue
				END
			SET @Index = @Index + 1
		END
	END
 

--Sql
DECLARE @Sql NVARCHAR(MAX)
DECLARE @Fields NVARCHAR(MAX)
print '[ProductSearch] Lista '+ CONVERT(varchar(10),@idLista) + ' Organizacion '+CONVERT(varchar(10),@IdOrganizacion)

IF @idLista = '0'
	BEGIN
		 print '[ProductSearch] Sin lista'
		 IF(@showAll = 0)
			BEGIN
				SET @SqlFilter = @SqlFilter + ' AND (pro_iidorganizacion = '+CONVERT(varchar(10),@IdOrganizacion)+' OR pro_iidorganizacion is null OR pro_iidorganizacion = 0) ' 					
			END
		 SET @Sql = 'FROM _datos..Product o
						LEFT JOIN _Tablas..t_monedas mon ON mon_ccodigo = pro_currency			
					WHERE 1 = 1 ' + @SqlFilter
		
		 SET @Fields = ' o.*, mon.*, o.Price as final_price, ''Precio-Base'' as description '
		
	END
ELSE
	BEGIN
		DECLARE @tipoLista int = 0
		SELECT @tipoLista = mglp_tipo FROM _Datos..MG_listas_precios WHERE mglp_idkey = @idLista
		print '[ProductSearch] Tipo de lista '+CONVERT(varchar(10),@tipoLista)

		IF(@showAll = 0)
			BEGIN
		SET @SqlFilter = @SqlFilter + ' AND (mglp_idorganizacion = '+CONVERT(varchar(10),@IdOrganizacion)+' OR pro_iidorganizacion is null OR pro_iidorganizacion = 0) ' 			
			END
		IF @tipoLista = 1
		BEGIN
			print '[ProductSearch] Con lista'

			SET @Sql = '
						FROM _datos..Product o

						LEFT JOIN _Datos..MG_product_impuesto ON mpi_idproduct = o.Id
						LEFT JOIN _Tablas..t_impuestos_fc imp ON imp_idkey = mpi_impidkey
						LEFT JOIN _Datos..MG_listas_precios_detalle lisd ON mglpd_idproducto = o.Id
						LEFT JOIN _Datos..MG_listas_precios lis ON mglpd_idlista = mglp_idkey						
						LEFT JOIN _Tablas..t_monedas mon ON mon_ccodigo = mglp_currency
					
						WHERE 1 = 1 AND o.Id IS NOT NULL ' + @SqlFilter
			/*SET @Sql = '
						FROM _Datos..MG_listas_precios lis
						LEFT JOIN _Datos..MG_listas_precios_detalle lisd ON mglpd_idlista = mglp_idkey						
						LEFT JOIN _datos..Product o ON mglpd_idproducto = o.Id
						LEFT JOIN _Tablas..t_monedas mon ON mon_ccodigo = mglp_currency
						WHERE 1 = 1 AND o.Id IS NOT NULL ' + @SqlFilter*/
			SET @Fields = ''''+@token+''' as token ,'+convert(varchar,@IdOrganizacion)+' as orgobtenida, o.*, mon.*, lis.*, mglpd_valor as final_price, ''Precio-Fijo'' as description, imp.* '
		END
		ELSE
		BEGIN
			print '[ProductSearch] Con multiplicador'
			SET @Sql = '
						FROM _datos..Product o
						LEFT JOIN _Datos..MG_product_impuesto ON mpi_idproduct = o.Id
						LEFT JOIN _Tablas..t_impuestos_fc imp ON imp_idkey = mpi_impidkey
						LEFT JOIN _Datos..MG_listas_precios lis ON mglp_idkey = '+CONVERT(varchar(10),@idLista)+'	
						left join	_Datos..MG_listas_precios_detalle mglpd on mglpd.mglpd_idproducto = o.Id and  (mglpd.mglpd_idlista = lis.mglp_idkey)
						LEFT JOIN _Tablas..t_monedas mon ON mon_ccodigo = mglp_currency
						WHERE 1 = 1 ' + @SqlFilter
			SET @Fields = ''''+@token+''' as token ,'+convert(varchar,@IdOrganizacion)+' as idorganizacion, o.*, mon.*,lis.*, /*(Price*mglp_multiplicador)*/    o.Price * mglp_multiplicador as final_price , ''Precio-Dinamico'' as description, imp.*'
		END

	END

print @Sql
 
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
	'+@Fields+'

	' + @Sql + ' ) AS T
	WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
 
 print cast (@DynamicSqlReturnRows as ntext)

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to