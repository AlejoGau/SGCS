--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.517 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.693 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[POIByDealer]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(64) = '',            
 @filter NVARCHAR(2048) = '',      
 @texto NVARCHAR(128) = '', 
 @token NVARCHAR(128),     
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT              
AS                
BEGIN                
 SET NOCOUNT ON              
 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
  
 DECLARE @HasAdministratorModule INT 
 DECLARE @HasTrackguardModule INT

 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator'),
		@HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'Trackguard')
            
 --Order          
 DECLARE @SortField NVARCHAR(64)           
 DECLARE @SortDirection NVARCHAR(4)          
 SELECT @SortField = 'Name', @SortDirection = 'ASC'          
           
 IF @sort != ''          
 BEGIN          
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                   
 END          
                 
 --Temp          
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                
           
 DECLARE @Sql NVARCHAR(MAX)          
 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)          
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, Id           
      FROM _Datos.dbo.p_Poi
     WHERE 1 = 1 '                         
 
 --Filters
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
		
		--Set Filters		
		SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''     
		
		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END       
 
 --Filter Security
 IF @HasAdministratorModule = 0 AND @HasTrackguardModule = 0
	SET @Sql = @Sql + ' AND 1 = 2'
 
 IF @HasTrackguardModule != 0
	SET @Sql = @Sql + ' AND (CDealer IN (SELECT um.dwm_dealer 
						FROM _Sistema.dbo.UsersDesktopWebModulos um
							INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND m.udm_key_reference IN (''Trackguard'')
						WHERE um.dwm_idWeb = ' + CAST(@UserId AS VARCHAR) + ') 
			OR ISNULL(CDealer,'''') = '''') '
          
 PRINT(@Sql)              
 EXEC(@Sql)              
               
 --Cantidad de registros              
 SELECT @totalrows = MAX(RowNumber) FROM #Temp              
               
 --Paginacion              
SELECT RowNumber,p.[Id]
      ,REPLACE(p.[Name],0x09,' ') as Name
      ,p.[FullAddress]
      ,p.[Icon]
      ,p.[Country]
      ,p.[State]
      ,p.[City]
      ,p.[Address]
      ,p.[Number]
      ,p.[Latitude]
      ,p.[Longitude]
      ,p.[CDealer]
      ,p.[Organization], l.lin_crazonsocial
  FROM _Datos.dbo.p_Poi p
	   INNER JOIN #Temp t ON t.Id = p.Id
	   LEFT JOIN _Tablas.dbo.t_lineas l ON l.lin_ccodigo = p.CDealer
 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)                     
 ORDER BY t.RowNumber ASC          
              
END