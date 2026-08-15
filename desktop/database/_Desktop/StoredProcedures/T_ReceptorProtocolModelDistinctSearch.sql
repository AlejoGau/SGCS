CREATE OR ALTER PROCEDURE [dbo].[T_ReceptorProtocolModelDistinctSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS
BEGIN

 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'receptores')
 


DECLARE @Sql VARCHAR (MAX);
SET @Sql ='
		SELECT DISTINCT rpm_cMarca 
		FROM _tablas..T_ReceptorProtocolModel 		
		WHERE 1=1 '+ @SqlFilter+'
		ORDER BY rpm_cMarca'

print @Sql;
EXEC(@Sql)
END