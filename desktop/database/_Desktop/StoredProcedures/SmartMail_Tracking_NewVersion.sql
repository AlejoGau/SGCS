CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_NewVersion]
	@ProgramId int
AS
	SET NOCOUNT ON
	
	INSERT INTO SmartMailTracking_Version (ProgramId) VALUES (@ProgramId)

	SELECT SCOPE_IDENTITY()