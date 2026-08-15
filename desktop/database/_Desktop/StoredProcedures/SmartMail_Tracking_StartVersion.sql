CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_StartVersion]
	@ProgramId int,
	@VersionId int,
    @QtyTotal int
AS
	SET NOCOUNT ON

	DECLARE @CurrentDate DATETIME
	SET @CurrentDate = GETDATE()

	UPDATE SmartMailTracking_Version SET StartedDate = @CurrentDate, QtyTotal = @QtyTotal WHERE ProgramId = @ProgramId AND VersionId = @VersionId