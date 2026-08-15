CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_EndVersion]
	@ProgramId int,
	@VersionId int
AS
	SET NOCOUNT ON

	DECLARE @CurrentDate DATETIME
	SET @CurrentDate = GETDATE()

	UPDATE SmartMailTracking_Version SET EndedDate = @CurrentDate WHERE ProgramId = @ProgramId AND VersionId = @VersionId