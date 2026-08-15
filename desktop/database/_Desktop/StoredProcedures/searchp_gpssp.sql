--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.587 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[searchp_gpssp]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '', 
 @token NVARCHAR(128) = '',              
 @totalrows INT = 1 OUTPUT   
AS
BEGIN
  SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'gps_tfechahora')
 
 --Print '@SqlSort'
 --Print @SqlSort

 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'p_gpssp','')

 --print '@SqlFilter'
 --print @SqlFilter

 --RANGOS 
--DECLARE @SqlFilterRango AS NVARCHAR(max)

--EXEC getSqlRangesForToken @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT

--print @SqlFilterRango

--SET @SqlFilter = @SqlFilter + @SqlFilterRango


 DECLARE @Sql NVARCHAR(MAX)

 SET @Sql = 'SELECT * from _datos..p_gpssp
				WHERE 1 = 1 
						' + @SqlFilter +' ORDER BY '+@SqlSort


--print '@Sql'
--print @Sql
 

 EXECUTE (@Sql)

 

END