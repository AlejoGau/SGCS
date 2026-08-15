CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_AddEmail]
	@ProgramId int,
	@VersionId int,
	@ObjectTypeId int,
	@ObjectId int,
	@Email varchar(256)
AS
	SET NOCOUNT ON

	IF @ObjectTypeId = 0
	   SET @ObjectTypeId = NULL

	IF @ObjectId = 0
	   SET @ObjectId = NULL

	DECLARE @CurrentDate DATETIME
	SET @CurrentDate = GETDATE()

	INSERT INTO SmartMailTracking_Email(ProgramId, VersionId, ObjectTypeId, ObjectId, Email, SentDate) VALUES (@ProgramId, @VersionId, @ObjectTypeId, @ObjectId, @Email, @CurrentDate)

	SELECT SCOPE_IDENTITY()