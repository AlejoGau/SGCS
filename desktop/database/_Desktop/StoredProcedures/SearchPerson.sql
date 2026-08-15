CREATE OR ALTER PROCEDURE [dbo].[SearchPerson]  
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id DESC')  
   
 --Filters  
 DECLARE @SqlFilter AS VARCHAR(4096)  
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Person')  
/*
Print 'Filter'   
Print @SqlFilter
Print ''
*/
 --Sql  
 DECLARE @Sql NVARCHAR(MAX)  
 SET @Sql = 'FROM [_datos]..[Person] o
 
	  left join [_datos]..[relationObject] ro on (
					objecttypeid = 600 
					and	relationobjecttypeid = 601 
					and relationobjectid = o.id
				)
		left join [_datos]..[organization] as orga on orga.Id = ro.ObjectId
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
          FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, orga.Name as Organizacion , orga.Id as OrganizacionId , o.*' + @Sql + ' ) AS T
         WHERE RowNumber BETWEEN @from AND @to 
		 '  
           
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                     
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'                  
         
 DECLARE @from INT  
 DECLARE @to INT  
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit  

/*
Print '-----'           
Print Cast(@DynamicSqlReturnRows As nText)
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to