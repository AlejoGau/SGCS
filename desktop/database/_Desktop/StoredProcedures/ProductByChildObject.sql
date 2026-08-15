--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.720 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[ProductByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
										--,@UserId Int = 0    
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										0
										**
										
										*/
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Product')
										
										
										
										Select o.[Id] Id, Name , o.[SmallComment], o.[LargeComment], o.[Body], o.[Available], o.[Price], o.[Structure], o.[Weight], o.[MetaDescription], o.[MetaKeywords], o.[Status], o.[AttachId], o.[Code] 
										  from _datos..[Product] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end