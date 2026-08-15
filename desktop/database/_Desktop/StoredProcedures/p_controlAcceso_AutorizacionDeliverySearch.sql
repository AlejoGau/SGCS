CREATE OR ALTER PROCEDURE [dbo].[p_controlAcceso_AutorizacionDeliverySearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, '[caa_idkey] DESC')
 
 --Print '@SqlSort'
 --Print @SqlSort
 ---------------22/04/2022  Daniel O. Medina------------------------
  if @SqlSort Like '%\[_cuenta\]%' ESCAPE '\'
 Begin
	if @SqlSort Like '%ASC%'
		Set @SqlSort = '[cue_clinea]  ASC,[cue_ncuenta] ASC'
	else
		Set @SqlSort = '[cue_clinea]  DESC,[cue_ncuenta] DESC'

	 --Print '@SqlSort _cuenta'
	 --Print @SqlSort
 End
 --------------------------

  --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_controlAcceso_Autorizacion')

DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

--2024-12-18 Pablo : porque las Autorizaciones Delivery se linkean a la cuenta por caa_usuautoriza y el rango de token es contra el join original de cue_iid
Set @SqlFilterRango = Replace(@SqlFilterRango,'c.','c2.')
/*
print ' -- Rangos -- '
print @SqlFilterRango
*/
SET @SqlFilter = @SqlFilter + @SqlFilterRango


 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.p_controlAcceso_Autorizacion o
		left join _datos..m_usuarios u ON caa_idautorizado = usu_idKey
		left join _datos..m_cuentas c ON cue_iid = usu_iidcuenta 
		left join _datos..p_controlAcceso_IO cio on o.caa_idkey = cio.cac_autorizaid 
					and o.caa_tipo = cio.cac_autorizadotipoid
		left join _datos..m_cuentas c2 on o.caa_usuautoriza = c2.cue_iid 
		
		outer apply 
			(
				select top 1 * from _datos..p_controlacceso_io 
					where cac_autorizacodigo = o.caa_codigo
					order by cac_idkey desc
			) as cac
			WHERE 1 = 1   AND o.caa_estado < 2 ' + @SqlFilter
	if @activas='S'
		SET @sql = @sql + ' AND GETDATE() < caa_fechahasta+convert(datetime,caa_horahasta)
				AND GETDATE() >= CONVERT(DATETIME,CONVERT(date,GETDATE()))+convert(datetime,caa_horadesde)
				 and GETDATE() <= CONVERT(DATETIME,CONVERT(date,GETDATE()))+convert(datetime,caa_horahasta) 
				 and (DATEPART(dw,getdate()) = caa_diasemana+1 or caa_diasemana= -1 or caa_diasemana = 0 or(caa_diasemana = 7 and DATEPART(dw,getdate())=1 ) )' 
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


--Print '----'
--print cast(@Sql as NText)

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 
--print '@DynamicSqlTotalRows: '+@DynamicSqlTotalRows
--print '@DynamicSqlTotalRowsParams: '+@DynamicSqlTotalRowsParams


 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = '
;WITH DatosConEstado AS (
    SELECT 
        caa_idkey AS Id,
        o.*, c2.*, cac.*,
        CASE
            WHEN GETDATE() >= CONVERT(DATETIME, caa_fechadesde) + CONVERT(DATETIME, caa_horadesde)
                 AND GETDATE() <= CONVERT(DATETIME, caa_fechahasta) + CONVERT(DATETIME, caa_horahasta)
                 AND (
                     DATEPART(dw, GETDATE()) = caa_diasemana + 1
                     OR caa_diasemana IN (-1, 0)
                     OR (caa_diasemana = 7 AND DATEPART(dw, GETDATE()) = 1)
                 )
                THEN ''''
            WHEN GETDATE() <= CONVERT(DATETIME, caa_fechadesde) + CONVERT(DATETIME, caa_horadesde)
                 AND GETDATE() <= CONVERT(DATETIME, caa_fechahasta) + CONVERT(DATETIME, caa_horahasta)
                THEN ''estado1''
            WHEN GETDATE() >= CONVERT(DATETIME, caa_fechadesde) + CONVERT(DATETIME, caa_horadesde)
                 AND GETDATE() <= CONVERT(DATETIME, caa_fechahasta) + CONVERT(DATETIME, caa_horahasta)
                 AND NOT (
                     DATEPART(dw, GETDATE()) = caa_diasemana + 1
                     OR caa_diasemana IN (-1, 0)
                     OR (caa_diasemana = 7 AND DATEPART(dw, GETDATE()) = 1)
                 )
                THEN ''estado1''
            ELSE ''estado0''
        END AS estadoStyle
    ' + @Sql + '
)
SELECT * FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,
        *
    FROM DatosConEstado
) AS T
WHERE RowNumber BETWEEN @from AND @to;
'

 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
Print '------'
Print Cast(@DynamicSqlReturnRows As Ntext)
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to