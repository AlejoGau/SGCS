CREATE OR ALTER PROCEDURE [dbo].[AttachByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Attach')
										
										Select o.[Id] Id,  Name , o.[FullName], o.[Format], o.[Weight], o.[Location], o.[Width], o.[Height], o.[SaveAs], o.[Target], o.[Link], o.[Status], o.[SmallComment], o.[LargeComment], o.[DateCreated], o.[FolderId] 
										  from _Datos..[Attach] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id