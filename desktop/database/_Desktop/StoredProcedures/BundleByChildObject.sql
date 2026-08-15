--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.203 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.260 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[BundleByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Bundle')
										
										
										
										Select o.[Id] Id, Name , o.[Data], o.[ObjectTypeId], o.[ObjectId], o.[ComponentList], o.[MimeType], o.[Version], o.[DateCreated], o.[DateUpdated], o.[Description], o.[Changelog] 
										  from [Bundle] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end