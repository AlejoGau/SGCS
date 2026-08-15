--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.680 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.940 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[HorarioToleranciaByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentatol_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[tol_iidcuenta] Id, '' Name,o.[tol_iidcuenta], o.[tol_naperturaantes], o.[tol_caperturaantesalarma], o.[tol_naperturadespues], o.[tol_caperturadespuesalarma], o.[tol_ncierreantes], o.[tol_ccierreantesalarma], o.[tol_ncierredespues], o.[tol_ccierredespuesalarma], o.[tol_nnyo], o.[tol_nnyc], o.[tol_nControl], o.[tol_nModo], o.[tol_nAPNYO], o.[tol_nAPNYC] 
											, isnull([tol_dVacacionesHasta],'1900/1/1')
											, isnull([tol_dVacacionesDesde],'1900/1/1')
											from _Datos.dbo.[m_horarios_tolerancia] o
											where [tol_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('HorarioTolerancia')
										
										
										
										Select o.[tol_iidcuenta] Id, '' Name,o.[tol_iidcuenta], o.[tol_naperturaantes], o.[tol_caperturaantesalarma], o.[tol_naperturadespues], o.[tol_caperturadespuesalarma], o.[tol_ncierreantes], o.[tol_ccierreantesalarma], o.[tol_ncierredespues], o.[tol_ccierredespuesalarma], o.[tol_nnyo], o.[tol_nnyc], o.[tol_nControl], o.[tol_nModo], o.[tol_nAPNYO], o.[tol_nAPNYC] 
										, isnull([tol_dVacacionesHasta],'1900/1/1')
										, isnull([tol_dVacacionesDesde],'1900/1/1')
										  from _Datos.dbo.[m_horarios_tolerancia] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[tol_iidcuenta]
										end