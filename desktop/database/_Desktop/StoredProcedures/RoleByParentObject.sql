CREATE OR ALTER PROCEDURE [dbo].[RoleByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Role')
										
										Select o.Id, o.Name, o.Tag1 
										  from Role o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.Id
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id