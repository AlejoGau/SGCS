CREATE OR ALTER PROCEDURE [dbo].[SearchUserWithToken]    
AS  
 SET NOCOUNT ON  
   
 SELECT * FROM [_Desktop].[dbo].[Token] t
  inner join [_Sistema].[dbo].[UsersDesktopWeb] u
  on t.UserId = u.[udw_usuario]