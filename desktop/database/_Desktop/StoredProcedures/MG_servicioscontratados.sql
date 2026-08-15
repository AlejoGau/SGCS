--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 11/23/2023 4:21:31 PM 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[MG_servicioscontratados]
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
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..crm_contrato_item o 
				inner join  _datos..crm_contrato c on c.cnt_iid = o.idcontrato 
				left join _datos..RelationObject r on ObjectTypeId = 3148 AND ObjectId = c.cnt_iid AND RelationObjectTypeId = 3001
				left join _datos..m_cuentas cue on r.RelationObjectId = cue.cue_iid

				left join	_Datos..MG_listas_precios_detalle mglpd on mglpd.mglpd_idproducto = o.ProductId and  (o.idlista is not null and mglpd.mglpd_idlista = o.idlista)
						
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber
							   ,cue.*
							   , c.cnt_iid,c.cnt_idcliente,c.cnt_fechaalta,c.cnt_fechavto,c.cnt_estado
							   , o.Id, 	case c.cnt_dinamico  when 1 then mglpd.mglpd_valor else o.Price end Price,
							   o.idcontrato,o.Currency,o.Status,o.Description,o.Quantity,o.QuantityDelivered,o.Code,o.VAT,o.ProductId,o.idlista ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
print @DynamicSqlReturnRows							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to