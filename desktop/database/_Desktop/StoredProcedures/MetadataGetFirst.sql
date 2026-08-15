--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.137 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[MetadataGetFirst](	@ObjectTypeId int,	@ObjectId int,	@Name NVARCHAR(128))as	select Id, Name, DataType, XmlData, ObjectTypeId, ObjectId, Model	from Metadata	where ObjectTypeId = @ObjectTypeId		and ObjectId = @ObjectId		and Name = @Name