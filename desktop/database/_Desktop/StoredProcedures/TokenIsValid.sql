CREATE OR ALTER PROCEDURE [dbo].[TokenIsValid] (@token varchar(500),
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = ''
 

)
as
if exists(select * from _Desktop..Token where AccessToken = @token)
select 1 Status, 'Ok' Message
else 
select 0 Status, 'Invalid Token' Message