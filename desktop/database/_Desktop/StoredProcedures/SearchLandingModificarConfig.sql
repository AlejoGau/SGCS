CREATE OR ALTER PROCEDURE [dbo].[SearchLandingModificarConfig] 
	-- Parametros para verificacion
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort VARCHAR(256) = '',   
	 @group VARCHAR(256) = '',            
	 @filter VARCHAR(2048) = '',        
	 @_dc VARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT 
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @SqlFilter AS NVARCHAR(MAX)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson('[{"property":"lcfg_cname","value":"pga"}]', 'Scheduler')

	--Sql
	DECLARE @Sql NVARCHAR(MAX)
	SET @Sql = 'FROM _Datos..LandingConfig o
	WHERE 1 = 1 ' + @SqlFilter		
		
	 --Execute Sql (ReturnRows)
	 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
	 SET @DynamicSqlReturnRows = 'SELECT lcfg_ccontent 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY lcfg_cname) AS RowNumber, o.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
	 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
	 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
	 DECLARE @from INT
	 DECLARE @to INT
	 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
	 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

END