CREATE OR ALTER PROCEDURE [dbo].[SearchRedirectorE911]  
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
 Declare @EsPosicion Int = 0	--0.No 1.Si
 If @filter Like '%"property":"gps_iid"%'
	Set @EsPosicion = 1

 DECLARE @SqlFilter AS VARCHAR(4096)  
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Person')  
 
 --Sql  
 DECLARE @Sql NVARCHAR(MAX) = ' FROM _Datos.dbo.p_PosicionesGPS o'
 SET @Sql += '	Inner Join [_Datos].[dbo].[DispositivoMovil] m on o.gps_idCuenta = m.OwnerId
				Inner Join [_Datos].[dbo].[m_cuentas] c on c.cue_iid = o.gps_idCuenta'
 
 If @EsPosicion = 0
 Begin
 	SET @Sql += '	Inner Join [_Datos].[dbo].[p_recepcion] e on o.gps_idRec = e.rec_iid'
	SET @Sql += '	Inner Join [_Tablas].[dbo].[t_codigos_alarma] a On a.cod_ccodigo = e.rec_calarma'
 End
 Else
 	SET @Sql += '	Inner Join [_Tablas].[dbo].[t_codigos_alarma] a On a.cod_ccodigo = ''_P_'' '

 SET @Sql += '   Where 1 = 1 ' + @SqlFilter  
 
 --Total Rows  
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)   
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)   
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql  
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'  
      
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT     
 
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX) = 'SELECT * FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber ,m.Domain As DeviceId'     
 If @EsPosicion = 0
 	SET @DynamicSqlReturnRows += ',FORMAT(CAST(rec_tfechahora AT TIME ZONE ''Argentina Standard Time'' AT TIME ZONE ''UTC'' AS datetime2(6)), ''yyyy-MM-dd HH:mm:ss.ffffff'') AS Fechahora'
 Else
	SET @DynamicSqlReturnRows += ',FORMAT(CAST(gps_tfechahora AT TIME ZONE ''Argentina Standard Time'' AT TIME ZONE ''UTC'' AS datetime2(6)), ''yyyy-MM-dd HH:mm:ss.ffffff'') AS Fechahora'

 SET @DynamicSqlReturnRows += ',IsNull(o.gps_rLatitud,0) AS Latitud
			,IsNull(o.gps_rLongitud,0) AS Longitud
			,o.gps_iVelocidad As Velocidad
			,gps_iRumbo As Sentido
			,gps_rAccuracy As Precision
			,gps_iBattery As Bateria
			,a.cod_cdescripcion As Evento'

 If @EsPosicion = 0
	SET @DynamicSqlReturnRows += ',o.gps_idRec As EventoId,e.rec_tfechahora	'
 Else 
	SET @DynamicSqlReturnRows += ',o.gps_iid As EventoId,o.gps_tfechahora	'

 SET @DynamicSqlReturnRows += ',c.cue_clinea ' + @Sql + ' ) AS T
			WHERE RowNumber BETWEEN @from AND @to  '  

 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                     
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'                  
         
 DECLARE @from INT  
 DECLARE @to INT  
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit  
  
/*
PRINT '-----'
PRINT @DynamicSqlReturnRows  
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to