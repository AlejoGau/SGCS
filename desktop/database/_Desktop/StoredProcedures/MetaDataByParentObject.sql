--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.763 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[MetaDataByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('MetaData')
										
										Select o.[Id] Id,  Name, o.[DataType], o.[XmlData], o.[ObjectTypeId], o.[ObjectId], o.[Model] 
										  from [MetaData] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id