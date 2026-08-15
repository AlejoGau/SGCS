--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.657 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[PermissionByParentObject]
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
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.Id
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id