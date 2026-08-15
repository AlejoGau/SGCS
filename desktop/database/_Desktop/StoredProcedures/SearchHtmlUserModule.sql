CREATE OR ALTER PROCEDURE [dbo].[SearchHtmlUserModule]
(@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
 )
as
begin
 



--Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.udw_usuario, udm_modulo')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'UsersDesktopWeb')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'From _sistema..UsersDesktopWeb o
 left join _sistema..UsersDesktopWebModulos udwm on (o.udw_idkey = udwm.dwm_idweb)
 left join _sistema..UsersDesktopModules m on (m.udm_idKey = udwm.dwm_idModules)
 left join _Datos..Organization z on (o.udw_empresa = z.Id)
left join _sistema..UsersDesktopWebModulosSecurity um on (udwm.dwm_idweb = um.ums_idWeb and udwm.dwm_idmodules = um.ums_idmodules)
			WHERE 1 = 1 ' + @SqlFilter
 --select * from _sistema..UsersDesktopWebModulosSecurity
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
							   --o.udw_usuario, o.udw_metadata,
							   o.*,z.*,
							    ums_idModules, m.*, um.ums_data
							   ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to


end