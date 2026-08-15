--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.520 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[p_VirtualIRByChildObject]
										@ObjectType NVARCHAR(50),
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
										Select @RelationObjectTypeId = dbo.GetObjectId('p_VirtualIR')
										
										
										
										Select o.[vir_iId] Id, ''Name , o.[vir_cDll], o.[vir_tFechaHora], o.[vir_nStatus], o.[vir_cPackage] 
										  from [_Datos..p_VirtualIR] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[vir_iId]
										end