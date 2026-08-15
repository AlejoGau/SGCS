--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.450 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[m_stock_cabeceraSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[stc_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'm_stock_cabecera','[stc_iddepositoorigenORstc_iddepositodestino]')




IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty VARCHAR(64)
	DECLARE @FilterValue VARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN	

		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		PRINT 'FilterProperty - ' + @filterproperty

		--Set Filters
		IF @FilterProperty = 'stc_iddepositoorigenORstc_iddepositodestino'
			begin
print '123123'
				set @SqlFilter = @SqlFilter + ' AND (stc_iddepositoorigen = '+@FilterValue+' OR  stc_iddepositodestino = '+@FilterValue+') '
			end
		

		
		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END   
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos]..[m_stock_cabecera] o
					--	LEFT JOIN _Datos..[Organization] orgOrigen ON stc_iddepositoorigen = orgOrigen.Id
					--	LEFT JOIN _Datos..[Organization] orgDestino ON stc_iddepositodestino = orgDestino.Id
						LEFT JOIN _Tablas..[t_stock_depositos] depoOrigen ON stc_iddepositoorigen = depoOrigen.tsd_idKey
						LEFT JOIN _Tablas..[t_stock_depositos] depoDestino ON stc_iddepositodestino = depoDestino.tsd_idKey
						LEFT JOIN _Tablas..[t_instaladores] inst ON stc_itecnico = ins_idKey
						LEFT JOIN _Sistema..[UsersDesktopWeb] us ON stc_iusuariodss = udw_idKey

			WHERE 1 = 1 ' + @SqlFilter


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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, stc_idkey Id, o.*, depoOrigen.Name as nameOrigen, depoDestino.Name as nameDestino, inst.*, us.* ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to