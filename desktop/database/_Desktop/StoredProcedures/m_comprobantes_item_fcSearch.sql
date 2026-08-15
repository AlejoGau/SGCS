--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.933 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[m_comprobantes_item_fcSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   

 -- engaño para que los editores listen los campos
 IF 1 = 2
     BEGIN
       -- These are the actual column names and types returned by the real proc
       SELECT 1 AS RowNumber, cbi_idkey Id, 
			cbi_iCodigoCab as cbi_icodigocab,
			cbi_iRenglon as cbi_irenglon,
			cbi_iProducto as cbi_iproducto,
			cbi_iNovedad as cbi_inovedad,
			cbi_iNovedadTabla as cbi_inovedadtabla,
			cbi_yImporte as cbi_yimporte,
			cbi_iCantidad as cbi_icantidad,
			cbi_nDescuento as cbi_ndescuento,
			cbi_idkey as cbi_idkey,
			cbi_cimpuestos,
		p.Name as Name 
		FROM _datos.dbo.m_comprobantes_item_fc o
		LEFT JOIN _datos..Product p ON p.Id = cbi_iProducto
     END;
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[cbi_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_comprobantes_item_fc')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM _datos.dbo.m_comprobantes_item_fc o
			LEFT JOIN _datos..Product p ON p.Id = cbi_iProducto
			LEFT JOIN _Datos..MG_product_impuesto ON mpi_idproduct = cbi_iProducto
			LEFT JOIN _Tablas..t_impuestos_fc imp ON imp_idkey = 
				CASE
					WHEN cbi_cimpuestos!='''' THEN convert(int,cbi_cimpuestos)
					ELSE mpi_impidkey
				END
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, cbi_idkey Id, 
									cbi_iCodigoCab as cbi_icodigocab,
									cbi_iRenglon as cbi_irenglon,
									cbi_iProducto as cbi_iproducto,
									cbi_iNovedad as cbi_inovedad,
									cbi_iNovedadTabla as cbi_inovedadtabla,
									cbi_yImporte as cbi_yimporte,
									cbi_iCantidad as cbi_icantidad,
									cbi_nDescuento as cbi_ndescuento,
									cbi_idkey as cbi_idkey,
									cbi_cimpuestos,
									pro_currency,
									convert(money,cbi_iCantidad * cbi_yImporte * isnull(1+imp_nporcentaje/100,1)) as _total,
									imp.*,
								isnull(p.Name,cbi_cdescripcion) as Name ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to