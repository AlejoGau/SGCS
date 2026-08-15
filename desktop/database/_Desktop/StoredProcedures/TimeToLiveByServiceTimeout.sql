CREATE OR ALTER PROCEDURE [dbo].[TimeToLiveByServiceTimeout]
										 @Service varchar (256)
										 ,@Timeout int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [Token], [DateCreated], [Service], datediff(second, DateCreated, GETDATE()) Elapsed
							  			 from [TimeToLive]
							 			  where [service] = @Service and datediff(second, DateCreated, GETDATE()) > @Timeout