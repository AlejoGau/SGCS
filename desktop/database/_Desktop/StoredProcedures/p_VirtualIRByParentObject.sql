--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.537 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[p_VirtualIRByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('p_VirtualIR')
										
										Select o.[vir_iId] Id, '' Name , o.[vir_cDll], o.[vir_tFechaHora], o.[vir_nStatus], o.[vir_cPackage] 
										  from [_Datos..p_VirtualIR] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[vir_iId]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id