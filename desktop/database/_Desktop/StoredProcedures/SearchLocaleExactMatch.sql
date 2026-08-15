CREATE OR ALTER PROCEDURE [dbo].[SearchLocaleExactMatch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',        
 @tag varchar(1024),
 @language varchar(5) = '',      
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   

 BEGIN
 select * from _sistema..localization 
	where name = @tag and
	cast(name as varbinary(1024)) = cast(name as varbinary(1024))
	and uiapplication='Combined'
 END