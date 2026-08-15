CREATE OR ALTER PROCEDURE [dbo].[AttachByChildObject]
										@ObjectType VarChar(50),
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Attach')
										
										
										
										Select o.[Id] Id, Name , o.[FullName], o.[Format], o.[Weight], o.[Location], o.[Width], o.[Height], o.[SaveAs], o.[Target], o.[Link], o.[Status], o.[SmallComment], o.[LargeComment], o.[DateCreated], o.[FolderId] 
										  from _Datos..[Attach] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end