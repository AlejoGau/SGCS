CREATE OR ALTER PROCEDURE [dbo].[SearchObjectExecute] 
	@SearchName VARCHAR(256),
	@Filter VARCHAR(MAX) = ''
AS
	SET NOCOUNT ON

	DECLARE @Search VARCHAR(128)
	SELECT @Search = Content FROM SearchObject WHERE Name = @SearchName
	
	DECLARE @Sql VARCHAR(MAX)
	SET @Sql = 'EXEC ' + @Search + ' @filter=''' + @Filter + ''', @limit=99999999'
	
	EXEC(@Sql)