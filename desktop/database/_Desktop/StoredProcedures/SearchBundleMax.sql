--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.577 
--#############################################################################
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SearchBundleMax]
	-- Add the parameters for the stored procedure here
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT,
 @list bit = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT MAX([Id]) as Id
      ,[Name]
      ,[ObjectTypeId]
      ,[ObjectId]
      ,MAX([Version]) as Version
  FROM [_Desktop].[dbo].[Bundle]
  WHERE ObjectTypeId = 51
  group by Name, [ObjectTypeId], [ObjectId]
  
  order by Id desc
END