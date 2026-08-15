--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.923 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[RazorByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Razor')
										
										
										
										Select o.[Id] Id, Name , o.[SmallComment], o.[Razor], o.[Version], o.[DateCreated], o.[DateModified], o.[RazorType], o.[OutputMimeType] 
										  from [Razor] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end