INSERT INTO SearchObject (Name, ObjectTypeId, Content, SearchType, IdProperty, TokenProperty, TotalRowsParameterName) VALUES ('CuentaByDealer',	3001, 'CuentaByDealer', 'Sql', NULL, NULL, 'totalrows')
GO
CREATE PROCEDURE [dbo].[CuentaByDealer]          
 @page INT = 1,         
 @start INT = 0,         
 @limit INT = 50,         
 @sort VARCHAR(64) = '',      
 @filter VARCHAR(2048) = '',    
 @_dc VARCHAR(256) = '',        
 @totalrows INT = 1 OUTPUT        
AS          
BEGIN          
 SET NOCOUNT ON            
     
 --Filter    
 DECLARE @FilterSituacion VARCHAR(32)
 DECLARE @FilterSituacionText VARCHAR(32)
 DECLARE @FilterFieldText VARCHAR(32) 
 DECLARE @FilterValueText VARCHAR(32) 
     
 IF @filter != ''    
 BEGIN	 
	SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
	
	SELECT @FilterSituacionText = StringValue, @FilterSituacion = CASE StringValue WHEN 'No Habilitada' THEN '2' WHEN 'Habilitada' THEN '0' WHEN 'En Prueba' THEN '3' ELSE NULL END FROM #FilterTable WHERE NAME = 'value' and parent_ID = (SELECT parent_ID FROM #FilterTable WHERE NAME = 'property' AND StringValue = 'Situacion')
	
	SELECT @FilterFieldText = StringValue FROM #FilterTable WHERE NAME = 'property' AND StringValue != 'Situacion'
	SELECT @FilterValueText = StringValue FROM #FilterTable WHERE NAME = 'value' and parent_ID = (SELECT parent_ID FROM #FilterTable WHERE NAME = 'property' AND StringValue != 'Situacion')
	
	DROP TABLE #FilterTable	 	
 END
     
 --Order    
 DECLARE @SortField VARCHAR(64)     
 DECLARE @SortDirection VARCHAR(4)    
 SELECT @SortField = 'cue_iid', @SortDirection = 'ASC'    
     
 IF @sort != ''    
 BEGIN    
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC    
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC    
   
   IF @SortField = 'Situacion'
      SET @SortField = 'est_nEstado'
 END    
           
 --Temp    
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)          
     
 DECLARE @Sql VARCHAR(2048)    
 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)    
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, cue_iid     
      FROM _Datos.dbo.m_cuentas         
   LEFT OUTER JOIN _Datos.dbo.m_estado_cuenta_cab ON cue_iid = est_iidcuenta     
   LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = cue_iid        
   LEFT OUTER JOIN _Datos.dbo.w_activaciones a ON a.sta_iidcuenta = cue_iid        
     WHERE 1 = 1'    
         
 IF @FilterSituacion IS NOT NULL         
 BEGIN
	SET @Sql = @Sql + ' AND ('
	SET @Sql = @Sql + ' est_nEstado IN (' + @FilterSituacion + ')'
	IF @FilterSituacionText = 'En Prueba'
	   SET @Sql = @Sql + ' OR (est_nEstado = 1 AND GetDate() BETWEEN est_dfechadesde AND isnull(est_dfechahasta, getdate()+1))'  
	SET @Sql = @Sql + ')'
 END
 
 IF @FilterFieldText IS NOT NULL
 BEGIN
	SET @Sql = @Sql + ' AND ' + @FilterFieldText + ' LIKE ''%' + @FilterValueText + '%'''
 END
         
 --PRINT(@Sql)        
 EXEC(@Sql)        
         
 --Cantidad de registros        
 SELECT @totalrows = MAX(RowNumber) FROM #Temp        
         
 --Paginacion        
SELECT RowNumber, cue_iid, cue_clinea, cue_ncuenta, cue_cnombre, cue_ccalle, cue_clocalidad, cue_cprovincia, p.pro_cdescripcion as cue_provincia, cue_ccodigopostal, (CASE         
       WHEN est_nEstado=1 AND GetDate() BETWEEN est_dfechadesde AND est_dfechahasta THEN 'Prueba'          
       WHEN est_nEstado=2 THEN 'No Habilitado'         
        WHEN est_nEstado=3 THEN 'Prueba x Zonas'    
       ELSE 'Habilitado'         
       END) AS Situacion, ms.sta_cultimaalarma, CONVERT(VARCHAR, ms.sta_dfechautimaalarma, 126) sta_dfechautimaalarma, CONVERT(VARCHAR, ms.sta_dfechaultimotst, 126) sta_dfechaultimotst, ca.cod_cdescripcion,  ca.cod_nColorLetra, ca.cod_ncolor, ms.sta_nestado, a.sta_nestado as act_nestado  
  FROM _Datos.dbo.m_cuentas         
    LEFT OUTER JOIN _Datos.dbo.m_estado_cuenta_cab ON cue_iid = est_iidcuenta    
    LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = cue_iid    
    LEFT OUTER JOIN _Datos.dbo.w_activaciones a ON a.sta_iidcuenta = cue_iid    
    LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma ca ON ca.cod_ccodigo = ms.sta_cultimaalarma    
    LEFT OUTER JOIN _Tablas.dbo.t_provincias p on pro_ccodigo = cue_cprovincia  
    INNER JOIN #Temp t ON t.Id = cue_iid    
 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)               
 ORDER BY t.RowNumber ASC    
        
END
GO