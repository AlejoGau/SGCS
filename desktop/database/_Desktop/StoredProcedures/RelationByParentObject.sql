CREATE OR ALTER PROCEDURE [dbo].[RelationByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Relation')
										
										Select o.[RelationId] Id, '' Name, o.[ObjectTypeId], o.[ObjectId], o.[RelationObjectTypeId], o.[RelationObjectId] 
										  from [RelationObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[RelationId]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id