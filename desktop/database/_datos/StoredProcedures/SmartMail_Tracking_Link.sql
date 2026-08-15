CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_Link]
	@ProgramId int,
	@VersionId int,
	@LinkId int
AS
	SET NOCOUNT ON
	SELECT Url FROM SmartMailTracking_Link WHERE ProgramId = @ProgramId AND VersionId = @VersionId AND LinkId = @LinkId