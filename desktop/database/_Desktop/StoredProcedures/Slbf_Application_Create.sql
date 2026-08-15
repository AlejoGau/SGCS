CREATE OR ALTER PROCEDURE [dbo].[Slbf_Application_Create]
	@Name VARCHAR(128),
	@RequestURI VARCHAR(500),
	@UserAccount INT
AS
	SET NOCOUNT ON
	
	DECLARE @Id INT
	INSERT INTO [Application] (Name, RequestURI, ClientId, ClientSecret, UserAccount)
					   VALUES (@Name, @RequestURI, NEWID(), NEWID(), @UserAccount)
					   
	SET @Id = SCOPE_IDENTITY()
	
	SELECT Name, RequestURI, ClientId, ClientSecret, UserAccount FROM [Application] WHERE Id = @Id