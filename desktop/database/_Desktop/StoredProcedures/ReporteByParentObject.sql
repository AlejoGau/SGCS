--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.897 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.990 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[ReporteByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Reporte')
										
										Select o.[rep_idKey] Id, '' Name , o.[rep_iidcuenta], o.[rep_ntipo], o.[rep_tproximoenvio], o.[rep_nfrecuencia], o.[rep_cmail], o.[rep_iLimiteSMS], o.[rep_nLimiteCada], o.[rep_nCadaUnidadTiempo], o.[rep_cMailRuteoSMS], o.[rep_cSMSParaInforme], o.[rep_iModemSMS] 
										  from [_datos].dbo.[m_reportes_automaticos] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[rep_idKey]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id