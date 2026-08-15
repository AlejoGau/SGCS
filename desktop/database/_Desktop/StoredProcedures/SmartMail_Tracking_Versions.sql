CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_Versions]
	@ProgramId int
AS
	SET NOCOUNT ON

	SELECT * FROM SmartMailTracking_Version WHERE ProgramId = @ProgramId