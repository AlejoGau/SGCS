CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_UpdateVersion]
	@ProgramId int,
	@VersionId int,
	@QtySent int
AS
	SET NOCOUNT ON
	UPDATE SmartMailTracking_Version SET QtySent = @QtySent WHERE ProgramId = @ProgramId AND VersionId = @VersionId