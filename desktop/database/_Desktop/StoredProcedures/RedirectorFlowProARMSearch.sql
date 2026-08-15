CREATE OR ALTER PROCEDURE [dbo].[RedirectorFlowProARMSearch]  
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.gps_iid DESC')  
   
 --Filters  
 DECLARE @SqlFilter AS VARCHAR(4096)  
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Person')  
   
 --Sql  
 DECLARE @Sql NVARCHAR(MAX)  
 SET @Sql = ' FROM _Datos.dbo.p_PosicionesGPS o
			  INNER JOIN _Datos.dbo.p_recepcion e on o.gps_idRec = e.rec_iid
			  INNER JOIN [_Datos].[dbo].[DispositivoMovil] m on o.gps_idCuenta = m.OwnerId
			  WHERE 1 = 1 ' + @SqlFilter  
   
 --Total Rows  
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)   
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)   
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql  
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'  
      
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT     
 
-- PRINT @DynamicSqlTotalRows
  
 --Execute Sql (ReturnRows)  
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)     
 SET @DynamicSqlReturnRows = 'SELECT *   
          FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, gps_iRumbo AS direccion, gps_cDireccion AS descUbicacion
			,m.Domain as dominio,o.gps_idRec AS evento, o.gps_rLatitud AS latitud, o.gps_rLongitud AS longitud
			,o.gps_iVelocidad AS velocidad
			,substring(convert(varchar, e.rec_tfechahora,103),7,4)
				+substring(convert(varchar, e.rec_tfechahora,103),4,2) 
				+substring(convert(varchar, e.rec_tfechahora,103),1,2) AS fecha
			,replace(Convert (varchar(8),e.rec_tfechahora, 108),'':'','''') AS hora' + @Sql + ' ) AS T
         WHERE RowNumber BETWEEN @from AND @to 
		 '  
           
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                     
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'                  
         
 DECLARE @from INT  
 DECLARE @to INT  
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit  
  
PRINT '-----'
PRINT @DynamicSqlReturnRows  

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to