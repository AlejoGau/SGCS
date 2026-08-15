--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.930 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.020 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[TestByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentatst_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[tst_iidcuenta] Id, '' Name, o.[tst_ncada], o.[tst_ntipo], o.[tst_ireinicio], o.[tst_calarma], o.[tst_ncada2], o.[tst_ntipo2], o.[tst_calarmaesperada], o.[tst_calarmagenerar], o.[tst_ncada3], o.[tst_ntipo3], o.[tst_calarma3esperada], o.[tst_calarma3generar] 
											from _Datos.dbo.[m_tst_prueba] o
											where [tst_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Test')
										
										
										
										Select o.[tst_iidcuenta] Id, '' Name, o.[tst_ncada], o.[tst_ntipo], o.[tst_ireinicio], o.[tst_calarma], o.[tst_ncada2], o.[tst_ntipo2], o.[tst_calarmaesperada], o.[tst_calarmagenerar], o.[tst_ncada3], o.[tst_ntipo3], o.[tst_calarma3esperada], o.[tst_calarma3generar] 
										  from _Datos.dbo.[m_tst_prueba] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[tst_iidcuenta]
										end