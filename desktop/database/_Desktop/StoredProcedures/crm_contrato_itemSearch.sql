CREATE OR ALTER PROCEDURE [dbo].[crm_contrato_itemSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[Id] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'crm_contrato_item')
 /*
	19/12/2023 Daniel O. Medina
	el valor 1 en el campo mglp_tipo de la tabla MG_listas_precios significa que la lista es estática
	el valor 0 en el campo mglp_tipo de la tabla MG_listas_precios significa que la lista es dinámica
	por el contrario
	el valor 1 en el campo cnt_dinamico de la tabla crm_contrato significva que el contrato es dinámico
	el valor 0 en el campo cnt_dinamico de la tabla crm_contrato significva que el contrato es estático

	
 */
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _Datos.dbo.crm_contrato_item o 
				inner join  _Datos.dbo.crm_contrato c on c.cnt_iid = o.idcontrato 
				left join _Datos.dbo.Product prod on o.ProductId = prod.Id
				--left join _Datos.dbo.[Organization] org on c.cnt_idcliente = org.Account
				--left JOIN _Datos..m_clientes_fc cli WITH (NOLOCK) ON cli_iCodigo_ID = org.Account
				--left join _Tablas..t_Organizacion_fc orgf on orgf.org_icodigo_ID = cli.cli_iOrganizacion
				left join _Datos..MG_listas_precios lis on o.idlista = lis.mglp_idkey
				left join _Datos..MG_listas_precios_detalle mglpd on mglpd.mglpd_idproducto = o.ProductId and mglpd.mglpd_idlista = o.idlista
						
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.Id
							   , ISNULL(case c.cnt_dinamico
									when 1 then (case lis.mglp_tipo when 0 then lis.mglp_multiplicador * prod.Price else mglpd.mglpd_valor end)
									else o.Price
								end, o.Price) as Price, /*19/12/2023 Daniel O. Medina. El precio final de este search es según la lógica en https://softguard.atlassian.net/browse/DS-1114*/
							   o.idcontrato,o.Currency,o.Status,o.Description,o.Quantity,o.QuantityDelivered,o.Code
							   ,o.VAT,o.ProductId,o.idlista ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to