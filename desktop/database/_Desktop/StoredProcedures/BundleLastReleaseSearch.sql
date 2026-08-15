--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.743 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[BundleLastReleaseSearch]
@list NVARCHAR(30)=''
AS
	SET NOCOUNT ON

	if (@list = 'true')
	BEGIN
	SELECT Name,Version 
	  FROM Bundle 
	 WHERE ObjectTypeId=51 and Id IN (SELECT MAX(Id) 
					FROM Bundle 
				GROUP BY Name)
	END
	ELSE
	BEGIN
	SELECT * 
	  FROM Bundle 
	 WHERE Id IN (SELECT MAX(Id) 
					FROM Bundle 
				GROUP BY Name)
	END