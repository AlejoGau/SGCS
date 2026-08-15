--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.250 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.543 
--#############################################################################


							CREATE OR ALTER PROCEDURE [dbo].[UserAccountByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('UserAccount')
										
										Select o.[Id] Id,  Name, o.[Password], o.[FirstName], o.[LastName], o.[Email], o.[Organization], o.[Phone], o.[Extention], o.[WorkPlace], o.[Status] 
										  from [UserAccount] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id