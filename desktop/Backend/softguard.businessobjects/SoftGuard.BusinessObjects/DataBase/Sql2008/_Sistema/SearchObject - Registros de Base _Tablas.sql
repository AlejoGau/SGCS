CREATE PROCEDURE Tables_CodigosAlarmasAll  
 @cod_ntipo INT = 0,
 @page INT = 1,         
 @start INT = 0,         
 @limit INT = 50,         
 @sort VARCHAR(64) = '',      
 @filter VARCHAR(2048) = '',    
 @_dc VARCHAR(256) = '',        
 @totalrows INT = 1 OUTPUT        
AS  
 SET NOCOUNT ON  
   
 DECLARE @SQL VARCHAR(2048)
 
 SET @SQL = 'SELECT * FROM _Tablas.dbo.t_codigos_alarma WHERE 1=1'
 
 IF @cod_ntipo != 0
    SET @SQL = @SQL + ' AND cod_ntipo = ' + CAST(@cod_ntipo AS VARCHAR)    

 EXEC(@SQL)
GO

INSERT INTO SearchObject (Name, ObjectTypeId, Content, SearchType) VALUES ('CodigosAlarmas', 3001, 'Tables_CodigosAlarmasAll', 'Sql')
GO