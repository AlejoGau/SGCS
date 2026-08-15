CREATE OR ALTER PROCEDURE [dbo].[SearchLocaleTotalbyStatus]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',        
 @language varchar(5) = '',      
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 if (@language = '')
 BEGIN
 select Status,count(*) as Total from _sistema..localization group by Status
 END
 ELSE
 BEGIN
 select Status,count(*) as Total from _sistema..localization where language = @language group by Status
 END