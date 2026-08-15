CREATE OR ALTER PROCEDURE [dbo].[MG_FacturacionAutomaticaContabilizacionSearch]
	@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @id int = 0,             
-- @totalrows INT = 1 OUTPUT,
@node varchar = ''
AS  
 SET NOCOUNT ON  


 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'cli_icodigo_ID ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 
 SET @Sql = '
DECLARE @cantidadClientes INT = 0
DECLARE @cantidadProvincias INT = 0
DECLARE @cantidadCategoriasImpositivas INT = 0
DECLARE @cantidadDeNovedades INT = 0


SELECT @cantidadClientes = COUNT(1) FROM _Datos.[dbo].[m_clientes_fc] WHERE 1 = 1 ' + @SqlFilter+';
SELECT @cantidadProvincias = COUNT(DISTINCT  cli_cprovinciacobranza) FROM _Datos.[dbo].[m_clientes_fc] WHERE 1 = 1 ' + @SqlFilter+' ;
SELECT @cantidadCategoriasImpositivas = COUNT(DISTINCT  cli_ccategoriaimpositiva) FROM _Datos.[dbo].[m_clientes_fc] WHERE 1 = 1 ' + @SqlFilter+' ;
SELECT @cantidadDeNovedades = COUNT(1) from _Datos..m_novedades_facturacion_fc
													left join _Datos.[dbo].[m_clientes_fc] ON nfc_icliente = cli_icodigo_ID
													where 1=1 ' + @SqlFilter+' and nfc_nestado = 0;

SELECT @cantidadClientes as cantidadClientes,
				@cantidadProvincias as cantidadProvincias,
				@cantidadCategoriasImpositivas as cantidadCategoriasImpositivas,
				@cantidadDeNovedades as cantidadDeNovedades
'					

	EXEC(@Sql)