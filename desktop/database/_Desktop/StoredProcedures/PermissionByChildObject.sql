--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.287 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[PermissionByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Permission')
										
										Select o.Id, o.Name, o.ObjectId, o.FunctionId 
										  from Permission o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.Id