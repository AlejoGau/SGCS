--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.510 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.780 
--#############################################################################


							CREATE OR ALTER PROCEDURE [dbo].[UserAccountByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('UserAccount')
										
										
										
										Select o.[Id] Id,  Name, o.[Password], o.[FirstName], o.[LastName], o.[Email], o.[Organization], o.[Phone], o.[Extention], o.[WorkPlace], o.[Status] 
										  from [UserAccount] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end