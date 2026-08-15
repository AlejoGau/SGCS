CREATE OR ALTER PROCEDURE crm_contrato_itemByChildObject
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
										Select @RelationObjectTypeId = dbo.GetObjectId('crm_contrato_item')
										
										
										
										Select o.[Id] Id, ''Name , o.[idcontrato], o.[Price], o.[Currency], o.[Status], o.[Description], o.[Quantity], o.[QuantityDelivered], o.[Code], o.[VAT], o.[ProductId], o.[idlista] 
										  from [_datos..crm_contrato_item] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end