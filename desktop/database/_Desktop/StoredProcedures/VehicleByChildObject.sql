CREATE OR ALTER PROCEDURE [dbo].[VehicleByChildObject]
										@ObjectType VarChar(50),
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Vehicle')
										
										
										
										Select o.[Id] Id, Name , o.[Brand], o.[Model], o.[Year], o.[Domain], o.[Colour], o.[VehicleType], o.[Photo], o.[PhotoType], o.[VehicleBrand], o.[VehicleModel], o.[OwnerTypeId], o.[OwnerId] 
										  from _Datos.dbo.[Vehicle] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end