CREATE OR ALTER PROCEDURE [dbo].[SearchLocalizationUserNameList]
(
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     )
as
select distinct UserName from _sistema..Localization  
	where username IS NOT NULL 
	and username != ''
	order by UserName