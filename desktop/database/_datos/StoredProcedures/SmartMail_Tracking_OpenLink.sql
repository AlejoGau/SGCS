CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_OpenLink]
	@ProgramId int,
	@VersionId int,
	@LinkId int,
	@EmailId int
AS
	SET NOCOUNT ON

	DECLARE @CurrentDate DATETIME
	SET @CurrentDate = GETDATE()

    DECLARE @Opened BIT
	SELECT @Opened = COUNT(*) FROM SmartMailTracking_UserLink WHERE ProgramId = ProgramId AND VersionId = @VersionId AND EmailId = @EmailId AND LinkId = @LinkId

	IF @Opened = 0
	   INSERT INTO SmartMailTracking_UserLink (ProgramId, VersionId, EmailId, LinkId, OpenedDate, LastOpenedDate, QtyOpenings) VALUES (@ProgramId, @VersionId, @EmailId, @LinkId, @CurrentDate, @CurrentDate, 1)
	IF @Opened = 1
	   UPDATE SmartMailTracking_UserLink SET LastOpenedDate = @CurrentDate, QtyOpenings = QtyOpenings + 1 WHERE ProgramId = ProgramId AND VersionId = @VersionId AND EmailId = @EmailId AND LinkId = @LinkId