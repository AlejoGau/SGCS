--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.477 
--#############################################################################



							CREATE OR ALTER PROCEDURE [dbo].[TimeToLiveByTokenService]
										 @Token NVARCHAR(500)
										 ,@Service NVARCHAR(256)
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [Token], [DateCreated], [Service]
							  			 from _Datos..[TimeToLive]
							 			  where token = @Token and [service] = @Service