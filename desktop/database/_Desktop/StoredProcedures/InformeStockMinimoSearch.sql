--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.850 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[InformeStockMinimoSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = ''--,              
-- @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[stt_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_stock_totales')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = '

		SELECT stt_idproducto, p.Name, count(1) as cantidad
		FROM _Datos..[Product] p
		LEFT JOIN  [_datos]..[m_stock_totales] o on p.Id = stt_idproducto
			WHERE 1 = 1 
				AND Status =  1
		' + @SqlFilter + '
		GROUP BY stt_idproducto, p.Name
		ORDER BY p.Name ASC 
	'



exec(@Sql)