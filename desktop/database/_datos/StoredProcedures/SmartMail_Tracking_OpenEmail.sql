CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_OpenEmail]
	@ProgramId int,
	@VersionId int,
	@EmailId int
AS
	SET NOCOUNT ON

	DECLARE @CurrentDate DATETIME
	SET @CurrentDate = GETDATE()

    DECLARE @Read INT
	SELECT @Read = [Read] FROM SmartMailTracking_Email WHERE ProgramId = @ProgramId AND VersionId = @VersionId AND EmailId = @EmailId

	IF @Read = 0
		UPDATE SmartMailTracking_Email SET [Read] = 1, ReadDate = @CurrentDate WHERE ProgramId = @ProgramId AND VersionId = @VersionId AND EmailId = @EmailId
	
	UPDATE SmartMailTracking_Email SET ReadDate = @CurrentDate, LastReadDate = @CurrentDate, QtyReadings = QtyReadings + 1 WHERE ProgramId = @ProgramId AND VersionId = @VersionId AND EmailId = @EmailId