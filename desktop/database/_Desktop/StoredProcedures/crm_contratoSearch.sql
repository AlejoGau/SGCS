--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.373 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[crm_contratoSearch]
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
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 DECLARE @SqlSortAux AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[cnt_iid] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'crm_contrato')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM [_Datos]..crm_contrato o
LEFT JOIN [_tablas]..[t_condiciones_pago_fc] fp ON con_idkey = cnt_formapago
LEFT JOIN  [_Datos]..[m_clientes_fc] cli ON cnt_idcliente = cli_icodigo_ID
LEFT JOIN _Tablas..t_Organizacion_fc org ON cli.cli_iOrganizacion = org_icodigo_ID
LEFT JOIN  [_Datos]..[Organization] orgs ON cli_icodigo_ID = orgs.Account

LEFT JOIN  [_Datos]..[m_template_contrato] template ON cnt_tmp_id = template.Id
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 SET @SqlSortAux = @SqlSort
 SET @SqlSort = replace(@SqlSort,'idOrganizacion','cnt_iid')
 SET @SqlSortAux = replace(@SqlSortAux,'idOrganizacion','nombreCliente') --DANIEL O. MEDINA 14/08/2024  
 SET @SqlSortAux = replace(@SqlSortAux,'o.[cnt_iid] ','[cnt_iid]')

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY cnt_iid) AS RowNumber, cnt_iid Id, cli.cli_cnombre as nombreCliente,o.*, fp.*,org.*, orgs.id as idOrganizacion, orgs.Name as nombreOrganizacion
										, template.Name as templateName
										, template.tmp_cuerpo as templateCuerpo
										, template.tmp_metadata as templateMetadata
										, (
												select   CAST(ISNULL(SUM((ct.Quantity*ct.Price)*(1+ct.VAT/100)),0) as decimal(18,2)) from _datos..crm_contrato_item ct where idcontrato = o.cnt_iid
										) as total
								' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to ORDER BY '+@SqlSortAux
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'	
 
/*
 Print '------'
 PRINT @DynamicSqlReturnRows
*/			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to