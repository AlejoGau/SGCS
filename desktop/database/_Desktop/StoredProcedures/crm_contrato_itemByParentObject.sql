CREATE OR ALTER PROCEDURE crm_contrato_itemByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('crm_contrato_item')
										
										Select o.[Id] Id, '' Name , o.[idcontrato], o.[Price], o.[Currency], o.[Status], o.[Description], o.[Quantity], o.[QuantityDelivered], o.[Code], o.[VAT], o.[ProductId], o.[idlista] 
										  from [_datos..crm_contrato_item] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id