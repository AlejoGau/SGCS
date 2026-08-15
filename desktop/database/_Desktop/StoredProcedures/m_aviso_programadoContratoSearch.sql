CREATE OR ALTER PROCEDURE [dbo].[m_aviso_programadoContratoSearch]
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
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_aviso_programado')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..m_aviso_programado o
			INNER JOIN [_Datos]..crm_contrato c ON prg_objectid = c.cnt_iid
			LEFT JOIN [_tablas]..[t_condiciones_pago_fc] fp ON con_idkey = cnt_formapago
			LEFT JOIN [_tablas]..[t_organizacion_fc] org ON cnt_org_fc = org_icodigo_ID
			LEFT JOIN  [_Datos]..[Organization] orgs ON cnt_idcliente = orgs.Id
			LEFT JOIN  [_Datos]..[m_template_contrato] template ON cnt_tmp_id = template.Id
			WHERE 1 = 1 AND prg_objecttypeid = 3148  ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.*, c.*, fp.*,org.*, orgs.id as idOrganizacion, orgs.Name as nombreOrganizacion
										, template.Name as templateName
										, template.tmp_cuerpo as templateCuerpo
										, template.tmp_metadata as templateMetadata
										, (
												select   FORMAT(ISNULL(SUM((ct.Quantity*ct.Price)*(1+ct.VAT/100)),0), ''N2'') from _datos..crm_contrato_item ct where idcontrato = c.cnt_iid
										) as total ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to