--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.323 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[Tables_CodigosAlarmasAll]      
 @cod_ntipo INT = NULL,    
 @cod_nMail INT = NULL,  
 @cod_nSms INT = NULL,
 @cod_nMovil INT = NULL,
 @cod_nVideo INT = NULL,
 @page INT = 1,             
 @start INT = 0,             
 @limit INT = 50,             
 @sort NVARCHAR(64) = '',          
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',            
 @totalrows INT = 1 OUTPUT            
AS      
 SET NOCOUNT ON  


 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 't_codigos_alarma','[porNombreOCodigo][for_cProtocolo][cod_cGrupo]')



IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN			
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		/*
		PRINT 'FilterProperty - ' + @filterproperty
		PRINT 'FilterValue - ' + @FilterValue
		*/
		--Set Filters
		IF @FilterProperty = 'porNombreOCodigo'
				SET @SqlFilter = @SqlFilter + ' AND ( ( cod_cdescripcion LIKE ''%'+@FilterValue+'%'' OR cod_ccodigo LIKE ''%'+@FilterValue+'%'' ) )' 
		Else IF @FilterProperty = 'for_cProtocolo'
				SET @SqlFilter = @SqlFilter + ' AND ( ( cod_ccodigo in ( select for_calarma from _datos..m_formatos where for_cProtocolo LIKE ''%'+@FilterValue+'%'') ) OR cod_ccodigo in (''_NR'',''_PI'',''_NC'') )' 
		Else IF @FilterProperty = 'cod_cGrupo'
				SET @SqlFilter = @SqlFilter + ' AND cod_cGrupo LIKE ''%'+@FilterValue+'%''' 

	SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END 
   
 DECLARE @SQL NVARCHAR(2048)    
     
 SET @SQL = 'SELECT * FROM _Tablas.dbo.t_codigos_alarma o WHERE 1=1 ' + @SqlFilter
--select @SQL     
 IF @cod_ntipo IS NOT NULL
    SET @SQL = @SQL + ' AND cod_ntipo = ' + CAST(@cod_ntipo AS VARCHAR)        
      
 IF @cod_nMail IS NOT NULL
    SET @SQL = @SQL + ' AND cod_nMail = ' + CAST(@cod_nMail AS VARCHAR)            
    
 IF @cod_nSms IS NOT NULL    
    SET @SQL = @SQL + ' AND cod_nSms = ' + CAST(@cod_nSms AS VARCHAR)                            
 
 IF @cod_nMovil IS NOT NULL    
    SET @SQL = @SQL + ' AND cod_nMovil = ' + CAST(@cod_nMovil AS VARCHAR)     

IF @cod_nVideo IS NOT NULL    
    SET @SQL = @SQL + ' AND cod_nVideo = ' + CAST(@cod_nVideo AS VARCHAR)    
	

 SET @SQL = @SQL + ' ORDER BY cod_cdescripcion ASC'         

/*
Print '--------------'
print Cast(@sql As ntext)
*/

 EXEC(@SQL)