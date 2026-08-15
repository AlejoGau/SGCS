CREATE OR ALTER PROCEDURE [dbo].[OrderItemByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('OrderItem')
										
										
										
										Select o.[Id] Id, Name , o.[OrderId], o.[Price], o.[Currency], o.[Status], o.[Description], o.[Quantity], o.[QuantityDelivered], o.[Code] 
										  from _datos..[OrderItem] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end