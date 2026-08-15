--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.983 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[SearchObjectByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('SearchObject')
										
										Select o.[Id] Id,  Name , o.[ObjectTypeId], o.[Content], o.[SearchType], o.[IdProperty], o.[TokenProperty], o.[TotalRowsParameterName] 
										  from [SearchObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id