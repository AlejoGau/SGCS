CREATE OR ALTER PROCEDURE [dbo].[VehicleModelByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										VehicleBrandVehicleBrandVehicleBrand
										*/
										
										else if(@ObjectType = 'VehicleBrand')
										begin
											Select o.[Id] Id,  Name , o.[VehicleBrand] 
											from _Tablas.dbo.[VehicleModel] o
											where [VehicleBrand] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('VehicleModel')
										
										
										
										Select o.[Id] Id, Name , o.[VehicleBrand] 
										  from _Tablas.dbo.[VehicleModel] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end