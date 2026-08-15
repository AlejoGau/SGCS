CREATE OR ALTER PROCEDURE [dbo].[PoiByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Poi')
										
										
										
										Select o.[Id] Id, Name , o.[FullAddress], o.[Icon], o.[Country], o.[State], o.[City], o.[Address], o.[Number], o.[Latitude], o.[Longitude], o.CDealer										
										  from _Datos.dbo.[p_Poi] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end