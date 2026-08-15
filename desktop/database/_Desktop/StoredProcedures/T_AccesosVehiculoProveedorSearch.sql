CREATE OR ALTER PROCEDURE [dbo].[T_AccesosVehiculoProveedorSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',  
 @BrandModelFilter varchar(256) = '',
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[avp_idkey] DESC')
 
 Set @SqlSort = Replace(@SqlSort,'[Brand]','vb.[Name]')
 Set @SqlSort = Replace(@SqlSort,'[Model]','vm.[Name]')
  
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'T_AccesosVehiculoProveedor')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _tablas..T_AccesosVehiculoProveedor o
			 INNER JOIN _tablas..VehicleBrand vb on o.avp_iVehicleBrand=vb.Id
			INNER JOIN _tablas..VehicleModel vm on o.avp_iVehicleModel=vm.Id

			WHERE 1 = 1 ' + @SqlFilter
 IF @BrandModelFilter!=''
	begin
		SET @BrandModelFilter = ' AND (vb.Name LIKE '''+'%'+@BrandModelFilter+'%'+''' OR vm.NAME LIKE '''+'%'+@BrandModelFilter+'%'+''')'

		SET @Sql = @Sql+ ' '+@BrandModelFilter
	end
 --Total Rows
 --print '-------sql -----'
 --print @Sql

 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, avp_idkey Id, o.*,vb.Name as Brand,vm.Name as Model ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
Print '--------'  			  	 
Print @DynamicSqlReturnRows
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to