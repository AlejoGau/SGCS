--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.330 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.400 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[BundleByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Bundle')
										
										Select o.[Id] Id,  Name , o.[Data], o.[ObjectTypeId], o.[ObjectId], o.[ComponentList], o.[MimeType], o.[Version], o.[DateCreated], o.[DateUpdated], o.[Description], o.[Changelog] 
										  from [Bundle] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id