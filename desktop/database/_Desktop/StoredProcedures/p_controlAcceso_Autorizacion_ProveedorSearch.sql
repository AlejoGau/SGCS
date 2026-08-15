CREATE OR ALTER PROCEDURE [dbo].[p_controlAcceso_Autorizacion_ProveedorSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',   
@token VARCHAR(128) = '', 
 @activas varchar(1)='',-- autorizaciones activas o vencidas
 @filterextra VARCHAR(2048) = '',
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[caa_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_controlAcceso_Autorizacion')

DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlFilter = @SqlFilter + @SqlFilterRango

print ' -- Rangos -- '
print @SqlFilterRango
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.p_controlAcceso_Autorizacion o
		left join _datos..m_AccesosProveedores prov ON caa_idautorizado = prov.apr_idKey
		left join _datos..m_cuentas c ON cue_iid = o.caa_usuautoriza 
		left join _datos..p_controlAcceso_IO cio on o.caa_idkey = cio.cac_autorizaid 
					and o.caa_tipo = cio.cac_autorizadotipoid
		left join _datos..m_cuentas c2 on o.caa_usuautoriza = c2.cue_iid 
		
		outer apply 
			(
				select top 1 * from _datos..p_controlacceso_io 
					where cac_autorizacodigo = o.caa_codigo
					order by cac_idkey desc
			) as cac
			WHERE 1 = 1 AND o.caa_tipo = 3227 AND cio.cac_autorizaid IS  NULL AND o.caa_estado < 2 ' + @SqlFilter
	if @activas='S'
		SET @sql = @sql + ' AND GETDATE() < caa_fechahasta+convert(datetime,caa_horahasta)
				AND GETDATE() >= CONVERT(DATETIME,CONVERT(date,GETDATE()))+convert(datetime,caa_horadesde)
				 and GETDATE() <= CONVERT(DATETIME,CONVERT(date,GETDATE()))+convert(datetime,caa_horahasta) 
				 and (DATEPART(dw,getdate()) = caa_diasemana+1 or caa_diasemana= -1 or(caa_diasemana = 7 and DATEPART(dw,getdate())=1 ) )' 
	if @activas='N'
		SET @sql = @sql + ' AND ( 
				GETDATE() > caa_fechahasta+convert(datetime,caa_horahasta)
				and GETDATE() > caa_fechadesde+convert(datetime,caa_horadesde)
				or
				  (

					((DATEPART(dw,getdate()) <> caa_diasemana+1 and caa_diasemana <> -1)  )
					)

				/*or GETDATE() < CONVERT(DATETIME,CONVERT(date,GETDATE()))+convert(datetime,caa_horadesde)
				 or GETDATE() > CONVERT(DATETIME,CONVERT(date,GETDATE()))+convert(datetime,caa_horahasta) 
				 ) or
				  (
					((DATEPART(dw,getdate()) <> caa_diasemana+1 and caa_diasemana <> -1) or(caa_diasemana <> 7 and DATEPART(dw,getdate())<>1 ) )
					)*/
				)
		
		'
	if @filterextra!=''
		SET @sql = @sql +' AND '+ @filterextra


 print @Sql
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 
print '@DynamicSqlTotalRows: '+@DynamicSqlTotalRows
print '@DynamicSqlTotalRowsParams: '+@DynamicSqlTotalRowsParams


 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
		FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, caa_idkey Id, o.*, c.*, prov.*, cac.*,
		CASE
			WHEN GETDATE() >= CONVERT(DATETIME,caa_fechadesde)+convert(datetime,caa_horadesde)
				 and GETDATE() <= CONVERT(DATETIME,caa_fechahasta)+convert(datetime,caa_horahasta) 
				 and (DATEPART(dw,getdate()) = caa_diasemana+1 or caa_diasemana= -1 or(caa_diasemana = 7 and DATEPART(dw,getdate())=1 ) ) 
				 THEN ''''
			WHEN GETDATE() <= CONVERT(DATETIME,caa_fechadesde)+convert(datetime,caa_horadesde)
				 and GETDATE() <= CONVERT(DATETIME,caa_fechahasta)+convert(datetime,caa_horahasta) 
				 --and (DATEPART(dw,getdate()) = caa_diasemana+1 or caa_diasemana= -1 or(caa_diasemana = 7 and DATEPART(dw,getdate())=1 ) ) 
				 THEN ''estado1''
	
			WHEN GETDATE() >= CONVERT(DATETIME,caa_fechadesde)+convert(datetime,caa_horadesde)
				 and GETDATE() <= CONVERT(DATETIME,caa_fechahasta)+convert(datetime,caa_horahasta) 
				 and not (DATEPART(dw,getdate()) = caa_diasemana+1 or caa_diasemana= -1 or(caa_diasemana = 7 and DATEPART(dw,getdate())=1 ) ) 
				 THEN ''estado1''	
			
			ELSE ''estado0''
		END as estadoStyle
 ' + @Sql + ' ) AS T WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 --print 'FILTRO!!!: '+ @SqlFilter
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to