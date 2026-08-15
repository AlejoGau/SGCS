--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.920 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[Tables_TiposAll]   
 @tip_nCondicion VARCHAR = '',
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(64) = '',            
 @filter NVARCHAR(2048) = '',          
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON  
  
 DECLARE @Sql NVARCHAR(500)

--Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Tipos')
   
 SET @Sql = ' SELECT * FROM _Tablas.dbo.t_tipos WHERE 1=1 '
 
 IF @tip_nCondicion != ''
    SET @Sql = @Sql + ' AND tip_nCondicion = ' + @tip_nCondicion
   
 SET @Sql = @Sql + @SqlFilter + ' order by tip_cdescripcion asc'

 print cast(@Sql as NTEXT)

 EXEC(@Sql)