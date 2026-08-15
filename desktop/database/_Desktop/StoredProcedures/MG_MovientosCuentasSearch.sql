-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2/7/2018
-- Description:	Lista de movimientos con datos del comprobante y cliente
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_MovientosCuentasSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[mgm_fecha] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'MG_MovimientosCuentas')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM [_Datos].[dbo].[MG_MovimientosCuentas] o
  left join _datos..[m_comprobantes_cab_fc] c on mgm_idcomprobante = cbc_icodigo_id
  inner join _datos..m_clientes_fc cli on cbc_icliente  = cli_icodigo_id
  inner join _datos..mg_maestrocuentas mc on mgmc_idkey = o.mgm_idcuenta
  left join _tablas..t_comprobantes_fc tc on (cbc_ctipocbte = cbt_ccodigo and cbt_idorganizacionfacturadora = cbc_iOrganizacionFacturadora)
			WHERE 1 = 1 ' + @SqlFilter
 print @Sql
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.*, c.*,cli.*, tc.*, mc.*
								' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to