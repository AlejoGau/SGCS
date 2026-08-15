--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.937 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[UserByCuentaWithRangoSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',
 
 @totalrows INT = 1 --OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[dwm_idKey] DESC')
 
 --Filters
-- DECLARE @SqlFilter AS NVARCHAR(4096)
 --SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'UsersDesktopWebModulos')
-- print @SqlFilter

DECLARE @SQLfilter NVARCHAR(MAX) = '';
IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)
	DECLARE @dealer NVARCHAR(3)
	DECLARE @cuenta NVARCHAR(4)
	DECLARE @cuenta_hasta NVARCHAR(4)
	DECLARE @cuenta_desde NVARCHAR(4)


	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		PRINT 'FilterProperty - ' + @filterproperty
		--Set Filters

		IF @FilterProperty = 'dealer'
			begin
				set @dealer = @FilterValue
			end
		ELSE IF @FilterProperty = 'cuenta'
			begin
				set @cuenta = @FilterValue
			end
		ELSE IF @FilterProperty = 'udw_usuario' or @FilterProperty = 'udw_usuario:LIKE'
			begin
				set @SQLfilter = @SQLfilter + ' AND udw_usuario LIKE ''%'+@FilterValue+'%'''
			end
		ELSE IF @FilterProperty = 'udw_tipo'
			begin
				set @SQLfilter = @SQLfilter + ' AND udw_tipo IN ( '''+@FilterValue+''')' 
			end
		ELSE IF @FilterProperty = 'cuenta_desde'
			begin
				set @cuenta_desde = @FilterValue
			end
	  ELSE IF @FilterProperty = 'cuenta_hasta'
			begin
				set @cuenta_hasta = @FilterValue
			end
		ELSE IF @FilterProperty = 'udw_idKey'
			begin
				set @SQLfilter = @SQLfilter + ' AND udw_idKey = '''+@FilterValue+''''
			end
		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END    

IF @dealer != '' AND @cuenta != ''
		begin
			set @SQLfilter = @SQLfilter + 'AND (dwm_dealer = ''' + @dealer + ''' AND dwm_cuenta_desde <= ''' + @cuenta + ''' AND dwm_cuenta_hasta >= ''' + @cuenta + ''') '
		end
IF @dealer != '' AND @cuenta_desde != '' AND @cuenta_hasta != ''
		begin
			set @SQLfilter = @SQLfilter + 'AND (dwm_dealer = ''' + @dealer + ''' AND dwm_cuenta_desde <= ''' + @cuenta_desde + ''' AND dwm_cuenta_hasta >= ''' + @cuenta_hasta + ''') '
		end 
ELSE IF @dealer != ''
		begin
			set @SQLfilter = @SQLfilter + ' AND dwm_dealer = ''' + @dealer + '''  '
		end

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Sistema]..[UsersDesktopWebModulos] o	
INNER JOIN [_Sistema]..[UsersDesktopWeb] u ON o.dwm_idWeb = udw_idKey	
left join _datos..organization c on u.udw_empresa = c.id
			WHERE 1 = 1 
			--and udw_tipo in (1,2)
	
	' +@SQLfilter

print @SQLfilter

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.dwm_idKey Id, o.*, u.*, c.Name as OrganizationName ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to