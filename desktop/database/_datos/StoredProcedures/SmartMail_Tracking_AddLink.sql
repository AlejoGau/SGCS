CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_AddLink]
	@ProgramId int,
	@VersionId int,
	@Name nVarChar(512),
	@Url nVarChar(1024)
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