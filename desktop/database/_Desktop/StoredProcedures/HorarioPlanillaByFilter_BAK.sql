CREATE OR ALTER PROCEDURE [dbo].[HorarioPlanillaByFilter_BAK]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',       
 @iidcuenta int = 0,       
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[hor_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'HorarioPlanilla')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 declare @fields nvarchar(max)


 -- busco parametro por ajuste de horario
Declare @iAjustaHora Int
set @iAjustaHora =  (select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO')     

-- busco datos de la cuenta para ajuste de horario-
declare @ttz_idkey int = 0
declare @ttz_noffset decimal (4,2) = 0

if (@iAjustaHora =1 and @iidcuenta > 0)
begin 
	
	select @ttz_idkey = cue_izonahoraria , @ttz_noffset = ttz_noffset
		from _Datos..m_cuentas 
		inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
		where cue_iid = @iidcuenta
end
											    
If @ttz_idkey > 0
BEGIN
	declare @now date = getdate()
	declare @dayNow int = DATEPART(weekday,@now)

	select @fields = '[hor_idKey] Id
			,'''' Name
			,hor_iid
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as hor_ndiaapertura
			,CONVERT(VARCHAR(5),cal.diahhoraapertura,108) AS hor_choraapertura
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as hor_ndiacierre
			,CONVERT(VARCHAR(5),cal.diahhoracierre,108) AS hor_choracierre'

	 SET @Sql = ' 
			
		FROM [_Datos].[dbo].[m_horarios_planilla] o
		cross apply (select ('+CONVERT(varchar(8),@ttz_noffset)+'*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
			,dateadd(minute,('+CONVERT(varchar(8),@ttz_noffset)+'*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[hor_ndiaapertura]-'+CONVERT(varchar(2),@dayNow)+',convert(date,getdate())))) + convert(datetime, [hor_choraapertura]) as diahhoraapertura
			,dateadd(minute,('+CONVERT(varchar(8),@ttz_noffset)+'*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[hor_ndiacierre]-'+CONVERT(varchar(2),@dayNow)+',convert(date,getdate())))) + convert(datetime, [hor_choracierre]) as diahhoracierre) as cal
			WHERE 1 = 1 ' + @SqlFilter 
			
END
ELSE
BEGIN
	 select @fields = 'hor_idKey Id, o.*'
	 SET @Sql = '  FROM _datos..m_horarios_planilla o
			WHERE 1 = 1 ' + @SqlFilter
END



 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'

 --print @DynamicSqlTotalRows
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,' +@fields+ @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '

 --print @DynamicSqlReturnRows
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to