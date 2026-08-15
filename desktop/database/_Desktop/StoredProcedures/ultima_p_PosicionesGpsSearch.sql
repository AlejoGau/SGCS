CREATE OR ALTER PROCEDURE [dbo].ultima_p_PosicionesGpsSearch
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[gps_iid] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_PosicionesGps')
 print @SqlFilter
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Datos]..[p_PosicionesGps] o
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT top 1 * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, gps_iid Id 
									, gps_iid,gps_tfechahora,gps_idCuenta,gps_idRec
									,gps_rLatitud,gps_rLongitud,gps_iRumbo,gps_tRawfechahora
									,gps_iVelocidad,gps_iOdometro
									,gps_cDireccion,gps_cIMEI,gps_rAccuracy,gps_cMethod,gps_iBattery
									,gps_iNivelSenial,gps_iSatelites,gps_iExtBattery,gps_iFuel							   
							   
							   ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to