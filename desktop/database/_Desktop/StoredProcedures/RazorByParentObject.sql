--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.033 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[RazorByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Razor')
										
										Select o.[Id] Id,  Name , o.[SmallComment], o.[Razor], o.[Version], o.[DateCreated], o.[DateModified], o.[RazorType], o.[OutputMimeType] 
										  from [Razor] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id