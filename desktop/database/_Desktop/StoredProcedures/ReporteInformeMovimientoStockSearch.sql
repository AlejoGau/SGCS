--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.927 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ReporteInformeMovimientoStockSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[stc_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_stock_cabecera')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = '
			SELECT 
				deporigen.Name depositoOrigen,
				depdestino.Name depositoDestino,
				cab.stc_tipomov,
				prod.Name  producto,
				sti_cant
			FROM _Datos..m_stock_cabecera cab
			INNER JOIN _Datos..m_stock_item item ON stc_idKey = item.sti_idcabecera
			INNER JOIN _Datos..Product prod ON item.sti_idproducto = prod.Id
			INNER JOIN _Tablas..t_stock_depositos deporigen ON cab.stc_iddepositoorigen = deporigen.tsd_idKey
			INNER JOIN _Tablas..t_stock_depositos depdestino ON cab.stc_iddepositoorigen = depdestino.tsd_idKey
		WHERE 1=1 
		' + @SqlFilter + '
	'



exec(@Sql)