-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[copyLocalizationFromDevel] 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	/*
    insert into [_sistema].[dbo].[localization] (Name,UiApplication,Language,Translation,Status,Created)
	select Name,UiApplication,Language,Translation,Status,Created from [9090].[_sistema].[dbo].[localization]
	where UiApplication = 'Combined'
		and Status = 'New'
		and Name not in (
			select name from [_sistema].[dbo].[localization] where UiApplication = 'Combined'
		)
		*/
END