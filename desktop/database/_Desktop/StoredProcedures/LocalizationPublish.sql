CREATE OR ALTER PROCEDURE [dbo].[LocalizationPublish]
	@BundleId INT
AS
	SET NOCOUNT ON
	
	--Get data from bundle
	DECLARE @Language NVARCHAR(64)	
	DECLARE @Data XML
	
	SELECT @Language = Name, @Data = Data FROM Bundle WHERE Id = @BundleId AND ObjectTypeId = dbo.GetObjectId('Localization')	
	
	IF @Language IS NOT NULL
	BEGIN
		--Delete data from localization
		DELETE FROM _Sistema.dbo.Localization WHERE Language = @Language
		
		--insert data for localization
		INSERT INTO _Sistema.dbo.Localization (Name, UiApplication, Language, Translation, [Status])
		SELECT d.l.value('Name[1]', 'varchar(256)') Name,
			   d.l.value('UiApplication[1]', 'varchar(64)') UiApplication,
			   d.l.value('Language[1]', 'nvarchar(64)') Language,
			   d.l.value('Translation[1]', 'nvarchar(64)') Translation,
			   d.l.value('Status[1]', 'nvarchar(64)') Status
			FROM @Data.nodes('/Data/Localization') as d(l)
	END