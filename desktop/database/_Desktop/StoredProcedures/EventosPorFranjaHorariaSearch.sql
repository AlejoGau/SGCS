CREATE OR ALTER PROCEDURE [dbo].[EventosPorFranjaHorariaSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 --OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[rec_iid] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'SELECT
			CONCAT (DATEPART(HOUR, o.[rec_tfechahora]) ,'' a '', (DATEPART(HOUR, o.[rec_tfechahora])+1)) rango,
			count(1) cantidad
			FROM [_Datos]..[p_recepcion] o
				WHERE 1 = 1 ' + @SqlFilter + '
				GROUP BY DATEPART(HOUR, o.[rec_tfechahora])
				ORDER BY DATEPART(HOUR, o.[rec_tfechahora]) ASC
	'
 
Exec(@Sql)