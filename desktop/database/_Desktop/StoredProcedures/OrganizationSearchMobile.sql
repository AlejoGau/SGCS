-- =============================================
-- Author:      YourName
-- Create date: 2023-08-25
-- Description: Your description here
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[OrganizationSearchMobile]
    @Numero VARCHAR(50) = 0
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;

    -- Insert statements for procedure here
    SELECT [Id]
      ,[Name]
      ,[Address]
      ,[Country]
      ,[State]
      ,[City]
      ,[Zip]
      ,[Phone]
      ,[Mobile]
      ,[Fax]
      ,[Email]
      ,[NationalTax]
      ,[StateTax]
      ,[Account]
      ,[Web] FROM [_Datos].[dbo].[Organization] 
	  WHERE @Numero IN (Mobile, Phone);
END