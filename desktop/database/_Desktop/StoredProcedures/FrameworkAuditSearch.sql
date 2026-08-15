--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.100 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[FrameworkAuditSearch]    
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',      
 @token NVARCHAR(128) = '',     
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT
AS    
 SET NOCOUNT ON      
 SET DATEFORMAT	ymd 
 
  --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[Id] DESC')

 --print 'SqlSort'
 --Print @SqlSort
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX) = ''
 DECLARE @SqlFilterAux AS nvarchar(MAX) = ''
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Object')

 --print '+++++++++'
 --print 'SqlFilter'
 --Print @SqlFilter


 IF @token != ''
 BEGIN
	 DECLARE @SqlFilterRango AS NVARCHAR(max)
	 EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	--print '+++++++++'
	--print '@SqlFilterRango'
	--Print @SqlFilterRango
	--2025-06-18 Pablo : porque este search se dispara desde ReporteLoginLogoutHTML y con un token sin rangos el @SqlFilter y @SqlFilterAux quedaban duplicados
	If @SqlFilterRango !='' And @SqlFilterRango Like '%[ParentDescription]%'
	Begin
		 SET @SqlFilter = @SqlFilter + @SqlFilterRango
		 SET @SqlFilterAux = @SqlFilter 
		 SET @SqlFilterAux = replace(@SqlFilterAux,'[ParentDescription]','xcue.cue_clinea+''-''+xcue.cue_ncuenta')
		 SET @SqlFilterAux = STUFF(@SqlFilterAux,CHARINDEX('AND',@SqlFilterAux),LEN('AND'),' OR ') -- 04/09/2024 Daniel O. Medina https://softguard.atlassian.net/browse/DSS-961
	 End
	--print '+++++++++'
	--print '@SqlFilterAux'
	--Print @SqlFilterAux
	
 END

 --Sql
 DECLARE @Sql NVARCHAR(MAX)

 /*
 SET @Sql = 'FROM FrameworkAudit o
LEFT JOIN FrameworkAuditExtend e on o.Id = e.Id   
			/*Daniel O. Medina 23/05/2023 para poder filtrar por codigo de organización 
				tarea: https://softguard.atlassian.net/browse/DS-486
			*/
			left join _Sistema.dbo.UsersDesktopWeb u on e.UserName=u.udw_usuario COLLATE SQL_Latin1_General_CP1_CI_AS
			--left join _Datos.dbo.Organization org on u.udw_empresa = org.Id
           INNER JOIN [Object] oj on oj.Id = o.ObjectTypeId 
           INNER JOIN [function] f on f.Id = o.FunctionId
			LEFT JOIN _datos.dbo.m_CuentasXtraInfo xc on o.ObjectId = xc.cue_idKey -- 04/09/2024 Daniel O. Medina https://softguard.atlassian.net/browse/DSS-961
			LEFT JOIN _datos.dbo.m_cuentas xcue on xc.cue_iidCuenta = xcue.cue_iid -- 04/09/2024 Daniel O. Medina https://softguard.atlassian.net/browse/DSS-961
			LEFT JOIN _Datos..m_cuentas c on o.ObjectId = c.cue_iid
			WHERE 1 = 1 AND O.ObjectTypeId=3050 /*--FILTRO QUE INDICA EL TIPO DE USUAIRO DESKTOP Daniel O. Medina*/' + @SqlFilter+@SqlFilterAux
*/

--2025-05-19 Federico : saque AND O.ObjectTypeId=3050 por tarea DSS-1140
 SET @Sql = 'FROM FrameworkAudit o
LEFT JOIN FrameworkAuditExtend e on o.Id = e.Id   
			/*Daniel O. Medina 23/05/2023 para poder filtrar por codigo de organización 
				tarea: DS-486
			*/
			left join _Sistema.dbo.UsersDesktopWeb u on e.UserName=u.udw_usuario COLLATE SQL_Latin1_General_CP1_CI_AS
			--left join _Datos.dbo.Organization org on u.udw_empresa = org.Id
           INNER JOIN [Object] oj on oj.Id = o.ObjectTypeId 
           INNER JOIN [function] f on f.Id = o.FunctionId
			--LEFT JOIN _datos.dbo.m_CuentasXtraInfo xc on o.ObjectId = xc.cue_idKey -- 04/09/2024 Daniel O. Medina DSS-961
			--LEFT JOIN _datos.dbo.m_cuentas xcue on xc.cue_iidCuenta = xcue.cue_iid -- 04/09/2024 Daniel O. Medina DSS-961
			LEFT JOIN _datos.dbo.m_cuentas xcue on o.ObjectId = xcue.cue_iid -- 03/10/2025 Pablo DSS-1381
			--LEFT JOIN _Datos..m_cuentas c on o.ObjectId = c.cue_iid	--2025-06-26 Pablo DSS-1140
			LEFT JOIN _Datos..m_cuentas c on e.ParentObjectId = c.cue_iid
			WHERE 1 = 1 ' + @SqlFilter+@SqlFilterAux


--Print '====='
--print 'Sql'
--Print @Sql
--Print '====='

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.[Id]
      ,o.[UserId]
      ,o.[ObjectTypeId]
      ,o.[ObjectId]
      ,o.[ObjectName]
      ,o.[FunctionId]
	  ,o.AuditDate as RawAuditDate -- Daniel O. Medina 23/05/2023 agrego fecha sin formato
      ,FORMAT( AuditDate, ''MM/dd/yyyy h:mm:ss tt'')  AuditDate
      ,o.[XmlOld]
      ,o.[XmlNew]
	  ,e.UserName, e.ParentObjectTypeId, e.ParentObjectId,IIF(e.ParentDescription='''',concat(xcue.cue_clinea COLLATE SQL_Latin1_General_CP1_CI_AS,''-'',xcue.cue_ncuenta COLLATE SQL_Latin1_General_CP1_CI_AS,'' '' ,xcue.cue_cnombre ),e.ParentDescription) AS ParentDescription, e.ApplicationModule
	  ,oj.Name ObjectTypeName
	  ,f.Name FunctionName
	  ,c.*
		' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
 Print '------'
 Print @DynamicSqlReturnRows
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to