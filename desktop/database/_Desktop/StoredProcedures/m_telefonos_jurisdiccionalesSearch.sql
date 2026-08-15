CREATE OR ALTER PROCEDURE [dbo].[m_telefonos_jurisdiccionalesSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',    
 @cue_iid int = 0,
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[tel_cprovincia], tel_cnombre asc')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'm_telefonos_jurisdiccionales','[tel_cprovincia]')

 -- filter c_provincia
 declare @filterprovincia varchar(max)=''
 declare @provincia varchar(max)
 IF @filter != ''        
 BEGIN
	--2023-08-30 Pablo : x que si el filter viene asi @filter=[{"property":"tel_cnombre:LIKE","value":"police"}] 
	--					 @filterprovincia queda en null y no se completa @Sql
	If @filter Like '%tel_cprovincia%'
	Begin
		SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
		SELECT TOP 1 @provincia = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'tel_cprovincia')
		SELECT @filterprovincia = ' AND (tel_cprovincia is null OR LTRIM(RTRIM(tel_cprovincia)) = '''' OR tel_cprovincia = '''+@provincia+''')'
	End 
 END 

 if @cue_iid > 0
 BEGIN
	select @provincia = cue_cprovincia from _datos..m_cuentas where cue_iid = @cue_iid
	SELECT @filterprovincia = ' AND (tel_cprovincia is null OR LTRIM(RTRIM(tel_cprovincia)) = '''' OR tel_cprovincia = '''+@provincia+''')'
 END

 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos]..[m_telefonos_jurisdiccionales] o
			WHERE 1 = 1 ' + @SqlFilter + @filterprovincia
 
 --print '-----'
 --print @Sql
 --print '-----'
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, tel_idKey Id, o.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '

--Print @DynamicSqlReturnRows

 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to