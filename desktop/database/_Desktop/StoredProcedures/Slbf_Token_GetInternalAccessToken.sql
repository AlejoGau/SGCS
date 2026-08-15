CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_GetInternalAccessToken]  
 @Code VARCHAR(500)  
AS  
 SET NOCOUNT ON  
   
 --Return AccessToken  
 SELECT AccessToken FROM Token WHERE Code = @Code