--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.657 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.570 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[UIApplicationByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('UIApplication')
										
										Select o.[Id] Id,  Name , o.[MenuName], o.[Icon], o.[SmallComment], o.[Description], o.[RazorTemplateId], o.[Viewport], o.[Version] 
										  from [UIApplication] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id