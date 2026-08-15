--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.400 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[LocalizationBundle]
	@Language NVARCHAR(256),	
	@Version NVARCHAR(128)
AS
	SET NOCOUNT ON
	
	DECLARE @Data NVARCHAR(MAX)

	SELECT @Data = STUFF((SELECT *
							  FROM _Sistema.dbo.Localization 
							 WHERE Language = @Language
							   FOR XML PATH('Localization'), ROOT('Data')), 1, 0, '')
                 
	INSERT INTO Bundle (Name, Data, ObjectTypeId, ObjectId, ComponentList, MimeType, Version, DateCreated, DateUpdated, Description, Changelog)
				SELECT @Language, @Data, dbo.GetObjectId('Localization'), 0, '', 'text/xml', @Version, GETDATE(), GETDATE(), '', ''						       			
				
	SELECT @@IDENTITY