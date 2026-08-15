--select * from _tablas..t_tecnicos


							CREATE OR ALTER PROCEDURE [dbo].[Searchs_perfiles]
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

    -- Insert statements for procedure here
	SELECT * from _sistema..s_perfiles