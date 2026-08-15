--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.370 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.620 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[HorarioExcepcionByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentaexc_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[exc_idKey] Id, '' Name, o.exc_iidcuenta, o.exc_cevento 
											from _Datos.dbo.[m_horarios_excepcion] o
											where [exc_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('HorarioExcepcion')
										
										
										
										Select o.[exc_idKey] Id, '' Name, o.exc_iidcuenta, o.exc_cevento 
										  from _Datos.dbo.[m_horarios_excepcion] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[exc_idKey] 
										end