--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.907 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[SearchObjectByChildObject]
										@ObjectType NVARCHAR(50),
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
										Select @RelationObjectTypeId = dbo.GetObjectId('SearchObject')
										
										
										
										Select o.[Id] Id, Name , o.[ObjectTypeId], o.[Content], o.[SearchType], o.[IdProperty], o.[TokenProperty], o.[TotalRowsParameterName] 
										  from [SearchObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end