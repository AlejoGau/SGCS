CREATE OR ALTER PROCEDURE [dbo].[invitaciones_SearchInvitados]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[caa_fechadesde] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Action')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Datos].[dbo].[p_controlAcceso_Autorizacion] o
				LEFT JOIN [_Datos].[dbo].[m_usuarios] u ON (o.caa_idautorizado = u.usu_idKey)
				LEFT JOIN [_Datos].[dbo].[m_cuentas] c ON (o.caa_usuautoriza = c.cue_iid)
			WHERE ISNULL(u.usu_ntipo, 0) <> -1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT *
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,
	o.*, 
	u.*,
	c.cue_clinea,
	DATEDIFF( HOUR, DATEADD(HOUR, DATEPART(HOUR,CONVERT(DATETIME,caa_horadesde)),caa_fechadesde),CONVERT(DATE,GETDATE()) ) as hsautorizado,
	DATEDIFF( HOUR, DATEADD(HOUR, DATEPART(HOUR,CONVERT(DATETIME,caa_horahasta)),caa_fechadesde),CONVERT(DATE,GETDATE()) ) as hsvencido,
	c.cue_cnombre as usuAutoriza_cnombre ' + @Sql + ' ) AS T
	WHERE RowNumber BETWEEN @from AND @to '
	--dateadd(hour, datepart(hour,convert(datetime,'10:00')),getdate())							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

Print 'DynamicSqlRows: '+@DynamicSqlReturnRows
Print 'DynamicSqlReturnRowsParams: '+@DynamicSqlReturnRowsParams
	
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to