--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.040 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.007 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[BundleSearch]
 @Id Int = 0,
 @name NVARCHAR(255) = ''
AS
BEGIN
	IF @Id != 0 
	BEGIN
		Select TOP 1 b.id as Id,b.name as Name, b.data as Data, ui.DefaultDBVersion, b.Version as Version
		from [Bundle] b 
		LEFT JOIN UIApplication ui ON ui.Name = b.Name
		where b.id = @Id
	END
	
  IF @name != '' 
	BEGIN

		Select TOP 1 b.id as Id,b.name as Name, b.data as Data, ui.DefaultDBVersion, b.Version as Version
		from [Bundle] b 
		LEFT JOIN UIApplication ui ON ui.Name = b.Name
		where b.Name = @name
		ORDER BY b.id DESC
	END
END