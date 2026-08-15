--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.747 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.847 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[ReporteByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
										--,@UserId Int = 0    
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentarep_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[rep_idKey] Id, '' Name , o.[rep_iidcuenta], o.[rep_ntipo], o.[rep_tproximoenvio], o.[rep_nfrecuencia], o.[rep_cmail], o.[rep_iLimiteSMS], o.[rep_nLimiteCada], o.[rep_nCadaUnidadTiempo], o.[rep_cMailRuteoSMS], o.[rep_cSMSParaInforme], o.[rep_iModemSMS] 
											from [_datos].dbo.[m_reportes_automaticos] o
											where [rep_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Reporte')
										
										
										
										Select o.[rep_idKey] Id, ''Name , o.[rep_iidcuenta], o.[rep_ntipo], o.[rep_tproximoenvio], o.[rep_nfrecuencia], o.[rep_cmail], o.[rep_iLimiteSMS], o.[rep_nLimiteCada], o.[rep_nCadaUnidadTiempo], o.[rep_cMailRuteoSMS], o.[rep_cSMSParaInforme], o.[rep_iModemSMS] 
										  from [_datos].dbo.[m_reportes_automaticos] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[rep_idKey]
										end