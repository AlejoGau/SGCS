CREATE OR ALTER PROCEDURE [dbo].[SmartMailProgramInsertSearch]
	@Id INT = 0,
	@CueIid INT = 0
AS
BEGIN
   update _datos..SmartMail_Program set CueIid = @CueIid		
		where [Id] = @Id				
										
END