CREATE OR ALTER PROCEDURE [dbo].[mg_maestrocuentasSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',      
 @token NVARCHAR(128) = '',     
 @totalrows INT = 1 OUTPUT  
AS  
 SET NOCOUNT ON   


--Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)    

 DECLARE @HasAdministratorModule INT
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')  
 -- busco la organizacion del usuario logueado
  


 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[mgmc_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'mg_maestrocuentas')

 -- me fijo de filtrar por id organizacion del usuario logueado
 if @HasAdministratorModule!=1
 BEGIN
	DECLARE @udw_empresa INT
	SELECT @udw_empresa = udw_empresa FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId
	-- busco la primer org facturadora de la organizacion
	declare @org_icodigo_ID int

	select @org_icodigo_ID = org_icodigo_ID from _Tablas..t_Organizacion_fc where org_organizacionId = @udw_empresa

	--select @SqlFilter = @SqlFilter + ' AND mgmc_idorganizacion='+convert(varchar(5),@org_icodigo_ID)
 END
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.mg_maestrocuentas o
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, mgmc_idkey Id, o.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to