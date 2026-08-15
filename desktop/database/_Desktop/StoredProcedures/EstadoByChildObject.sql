--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.960 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.990 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[EstadoByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentaest_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[est_iidcuenta] Id, '' Name, o.[est_nestado], o.[est_ntipo], o.[est_dfechadesde], o.[est_nduracion], o.[est_dfechahasta], o.[est_mnota] 
											from _Datos.dbo.[m_estado_cuenta_cab] o
											where [est_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Estado')
										
										
										
										Select o.[est_iidcuenta] Id, '' Name, o.[est_nestado], o.[est_ntipo], o.[est_dfechadesde], o.[est_nduracion], o.[est_dfechahasta], o.[est_mnota] 
										  from _Datos.dbo.[m_estado_cuenta_cab] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[est_iidcuenta]
										end