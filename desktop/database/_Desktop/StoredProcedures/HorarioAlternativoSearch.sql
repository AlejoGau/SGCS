CREATE OR ALTER PROCEDURE [dbo].[HorarioAlternativoSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 --OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[alt_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_horarios_alternativos')
 print @SqlFilter
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 declare @fields nvarchar(max)


 -- busco parametro por ajuste de horario
Declare @iAjustaHora Int
set @iAjustaHora =  (select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO')     
											    
If @iAjustaHora = 1
BEGIN
	declare @now date = getdate()
	declare @dayNow int = DATEPART(weekday,@now)

	select @fields = '[alt_idKey] Id
			,'''' Name
			,alt_iidcuenta
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as alt_ndiaapertura
			,CONVERT(VARCHAR(5),cal.diahhoraapertura,108) AS alt_choraapertura
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as alt_ndiacierre
			,CONVERT(VARCHAR(5),cal.diahhoracierre,108) AS alt_choracierre'

	 SET @Sql = ' 
			
		FROM [_Datos].[dbo].[m_horarios_alternativos] o
		inner join _datos..m_cuentas on alt_iidcuenta = cue_iid
		inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
		cross apply (select (ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
			,dateadd(minute,(ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[alt_ndiaapertura]-'+CONVERT(varchar(2),@dayNow)+',convert(date,getdate())))) + convert(datetime, [alt_choraapertura]) as diahhoraapertura
			,dateadd(minute,(ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[alt_ndiacierre]-'+CONVERT(varchar(2),@dayNow)+',convert(date,getdate())))) + convert(datetime, [alt_choracierre]) as diahhoracierre) as cal
			WHERE 1 = 1 ' + @SqlFilter 
			
END
ELSE
BEGIN
	 select @fields = 'alt_idKey Id, o.*'
	 SET @Sql = '  FROM _datos..m_horarios_alternativos o
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