--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.233 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.517 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_AddLink]
	@ProgramId int,
	@VersionId int,
	@Name NVARCHAR(512),
	@Url NVARCHAR(1024)
AS
	SET NOCOUNT ON

	DECLARE @LinkId INT
	SELECT @LinkId = LinkId FROM SmartMailTracking_Link WHERE ProgramId = @ProgramId AND VersionId = @VersionId AND Url = @Url

	IF @LinkId IS NULL
	BEGIN
		INSERT INTO SmartMailTracking_Link (ProgramId, VersionId, Name, Url) VALUES (@ProgramId, @VersionId, @Name, @Url)

		SELECT SCOPE_IDENTITY()		
	END

	IF @LinkId IS NOT NULL
	BEGIN
		SELECT @LinkId
	END