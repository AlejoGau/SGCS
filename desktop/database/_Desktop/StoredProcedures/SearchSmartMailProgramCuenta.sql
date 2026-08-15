CREATE OR ALTER PROCEDURE [dbo].[SearchSmartMailProgramCuenta]  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort VARCHAR(256) = '',     
 @group VARCHAR(256) = '',              
 @filter VARCHAR(2048) = '',          
 @_dc VARCHAR(256) = '',    
 @notBody varchar (10) = 'false',
 @totalrows INT = 1 OUTPUT       
AS    
 SET NOCOUNT ON     
   
 --Sort  
 DECLARE @SqlSort AS VARCHAR(256)  
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id DESC')  
   
 --Filters  
 DECLARE @SqlFilter AS VARCHAR(4096)  
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'SmartMail_Program','[DateEndGTE],[DateEndLTE]')
 

IF @filter != ''        
 BEGIN
	 SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
	
		DECLARE @DateEndGTE VARCHAR(255) = ''
		SELECT TOP 1 @DateEndGTE = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'DateEndGTE')
		
		DECLARE @DateEndLTE VARCHAR(255) = ''
		SELECT TOP 1 @DateEndLTE = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'DateEndLTE')

		
	 IF @DateEndGTE != ''
		BEGIN

			SET @SqlFilter = @SqlFilter + ' AND DateEnd >= '''+@DateEndGTE+''''
		END

	IF @DateEndLTE != ''
		BEGIN

			SET @SqlFilter = @SqlFilter + ' AND DateEnd <= '''+@DateEndLTE+''''
		END

 END 
  
 --Sql  
 DECLARE @Sql NVARCHAR(MAX)  
 SET @Sql = ' FROM _datos..[SmartMail_Program] o  
 left join _datos..m_cuentas c on (o.cueiid = c.cue_iid)  
 --left join _datos..[SmartMailTracking_Email] e on (o.Id = e.programId)
   WHERE 1 = 1 and o.Priority != 750' + @SqlFilter  

 print @Sql
   
 --select * from _datos..smartmail_program  
 --Total Rows  
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)   
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)   
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql  
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'  
      
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT     
  
 --Execute Sql (ReturnRows)  
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)    

IF @notBody = 'false'
	BEGIN
		 SET @DynamicSqlReturnRows = 'SELECT 
				*, 
				CONVERT(VARCHAR, DateStart, 126) AS IsoDateStart, 
				CONVERT(VARCHAR, DateEnd, 126) AS IsoDateEnd   
						FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,   
							o.*  
							,c.*
							--,e.*
							' + @Sql + ' ) AS T  
						 WHERE RowNumber BETWEEN @from AND @to '  
       
		END
	ELSE 
		BEGIN
			
				SET @DynamicSqlReturnRows = 'SELECT 
					*, 
					CONVERT(VARCHAR, DateStart, 126) AS IsoDateStart, 
					CONVERT(VARCHAR, DateEnd, 126) AS IsoDateEnd   
							FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,   
								o.Id,
								o.Body,
								o.Name,
								o.[From],								
								o.DateStart,
								o.DateEnd,
								o.Count,
								o.Status,
								o.Query,
								o.TransportType,
								o.Recurrent,
								o.Priority,
								o.CueIid,
								o.RecurrentType,
								o.RecurrentTime,
								o.RecurrentDateEnd
								,c.*
								--,e.*
								' + @Sql + ' ) AS T  
							 WHERE RowNumber BETWEEN @from AND @to '  

		END



 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                     
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'                  
         
 DECLARE @from INT  
 DECLARE @to INT  
 

 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to