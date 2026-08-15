CREATE OR ALTER PROCEDURE [dbo].[RelationByChildObject]
										@ObjectType VarChar(50),
										@Id Int
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Relation')
										
										
										
										Select o.[RelationId] Id, '' Name, o.[ObjectTypeId], o.[ObjectId], o.[RelationObjectTypeId], o.[RelationObjectId] 
										  from [RelationObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[RelationId]
										end