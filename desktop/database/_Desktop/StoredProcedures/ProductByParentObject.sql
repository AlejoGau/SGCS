--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.880 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[ProductByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Product')
										
										Select o.[Id] Id,  Name , o.[SmallComment], o.[LargeComment], o.[Body], o.[Available], o.[Price], o.[Structure], o.[Weight], o.[MetaDescription], o.[MetaKeywords], o.[Status], o.[AttachId], o.[Code] 
										  from _datos..[Product] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id